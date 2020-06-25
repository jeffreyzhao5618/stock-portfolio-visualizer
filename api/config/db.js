const mongoose = require('mongoose');
const dbName = 'test';

function connect() {
    mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true });
}

module.exports = connect;