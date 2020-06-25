const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    key: String,
    user: String
})

const authModel = mongoose.model('Auth', authSchema);

module.exports = authModel;