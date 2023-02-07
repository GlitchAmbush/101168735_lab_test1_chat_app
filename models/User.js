const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    creation: {type: String}
});

UserSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
});

const User = mongoose.model("users", UserSchema);
module.exports = User;