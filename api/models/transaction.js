const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema( {
    date: { type: Date, default: Date.now},
    ticker: String,
    priceShare: Number,
    totalPrice: Number,
    totalQuantity: Number,
    account: String,
    fund: String,
    summary: {type: String, default: ""}
})

module.exports = transactionSchema;