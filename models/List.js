const mongoose = require('mongoose');

const CustomPropertySchema = new mongoose.Schema({
    title: String,
    defaultValue: String,
});

const ListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    customProperties: [CustomPropertySchema],
});

module.exports = mongoose.model('List', ListSchema);
