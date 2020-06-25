const transactionSchema = require('./transaction');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    portfolio: [transactionSchema],
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;