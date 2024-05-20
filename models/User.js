const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    properties: Map,
    unsubscribed: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
