// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://dbParadise:Paradise!4@cluster0.vkgml.mongodb.net/dbParadise?retryWrites=true&w=majority', {useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDB successfully :");
}).catch((e) => {
    console.log("Error while attempting to connecty to MongoDB");
    console.log(e);
});

// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};