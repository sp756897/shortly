const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UrlclickSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    fullurl: {
        type: String,
        required: true
    },
    shorturl: {
        type: String,
        required: true
    },
    clicked: {
        type: Number,
        default: 0
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Urlclick = mongoose.model("urlclick", UrlclickSchema);