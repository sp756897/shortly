const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UrlSchema = new Schema({

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

});

module.exports = UrlLog = mongoose.model("urllog", UrlSchema);