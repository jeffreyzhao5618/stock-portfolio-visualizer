const express = require('express');
const connectToMongo = require('./config/db');
const cors = require('cors');
const app = require('./routes');
const PORT = process.env.PORT || 5000;

app.use(cors());

connectToMongo();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));