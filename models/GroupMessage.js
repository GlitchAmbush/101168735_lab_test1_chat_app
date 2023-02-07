const mongoose = require('mongoose');

const GroupMessageSchema = new mongoose.Schema({
    from_user: {type: String},
    room: {type: String},
    message: {type: String},
    date_sent: {type: String}
});

GroupMessageSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
});

const GroupMessage = mongoose.model("group_messages", GroupMessageSchema);
module.exports = GroupMessage;