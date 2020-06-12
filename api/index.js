const express = require('express');
const users = require('./Users');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    console.log('test');
    let currentUser = users.filter(user =>  {
        return req.body.email === user.email && req.body.password === user.password;
    });
    if(currentUser.length == 1) {
        res.json({success: 'true', portfolio: currentUser[0].portfolio});
    } else {
        res.json({success: ''})
    }
});

app.post('/register', (req, res) => {
    if(users.filter(user => req.body.email == user.email) == 0) {
        users.push(req.body);
        res.json(users);
    } else {
        res.json({success: ''});
    }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));