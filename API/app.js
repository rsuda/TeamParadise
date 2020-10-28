const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

const bodyParser = require('body-parser');

//Load in the mongoose models
const { Posts } = require('./db/models/posts.model');

//Load middleware
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
});
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

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})