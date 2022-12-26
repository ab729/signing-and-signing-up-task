const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
require('dotenv').config();


const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timeStamps: true});

usersSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]})
const user = mongoose.model('user', usersSchema);
module.exports = user;