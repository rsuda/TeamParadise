const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser');

//Load in the mongoose models
const { Posts, User } = require('./db/models');

/**
 * MIDDLEWARE
 */

//Load middleware
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

//Verify Refresh Token Middleware 
let verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if(!user) {
            return Promise.reject({
                'error': 'User not found.'
            });
        }
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if(session.token === refreshToken) {
                if(User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true;
                }
            }
        });
        if (isSessionValid) {

            next();
        } else{
            return Promise.reject({
                'error': 'Refresh token is invalid or expired'
            })
        }
    }).catch((e) => {
        res.status(401).send(e);
    })
};

/* ROUTE HANDLERS */

/* LIST ROUTES */

/**
 * GET /posts
 * Purpose: Get all lists
 */
app.get('/posts', (req, res) => {
    // We want to return an array of all the posts in the database
    Posts.find({}).then((posts) => {
        res.send(posts);
    });
})

/**
 * POST /posts
 * Purpose: Create a post
 */
app.post('/posts', (req, res) => {
    // We want to create a new post and return the new post document back to the used (include the id)
    // The post information (fields) will be passed in via the JSON request body
    let title = req.body.title;
    let content = req.body.content;

    let newPost = new Posts({
        title,
        content
    })
    newPost.save().then((postDoc) => {
        //the full post document is returned
        res.send(postDoc);
    })
});

app.patch('/posts/:id', (req, res) => {
    Posts.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

app.delete('/posts/:id', (req, res) => {
    // We want to delete a posts
    Posts.findOneAndRemove({
        _id: req.params.id
    }).then((removedPostDoc) => {
        res.send(removedPostDoc);
    })
});

// User routes

/**
 * POST /users
 * Purpose: Sign up
 */
app.post('/users', (req, res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

/**
 * POST /users/login
 * Puropost: Login
 */
app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {

            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
app.get('/users/me/access-token', verifySession, (req, res) => {
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    })
})


app.listen(3000, () => {
    console.log("Server is listening on port 3001");
})