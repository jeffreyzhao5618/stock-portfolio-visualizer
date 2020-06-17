const express = require('express');
const mongoose = require('mongoose');
const users = require('./Users');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    portfolio: Array
})

const userModel = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
    // let currentUser = users.filter(user =>  {
    //     return req.body.email === user.email && req.body.password === user.password;
    // });
    userModel.find({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) { res.json({error: ''}) }
        try {
            // if(user[0].password == req.body.password) {
            //     res.json({success: 'true', portfolio: user[0].portfolio});
            //     return;
            // } else {
            //     res.json({success: ''});
            // }
            res.json({success: 'true', portfolio: user[0].portfolio});
        }
        // No user with matching email and password
        catch(err) {
            res.json({success: ''});
        }
    });
    
});

app.post('/register', (req, res) => {
    const newUser = new userModel({email: req.body.email, password: req.body.password, portfolio: []});
    newUser.save(function (err) {
        if (err) {
            res.json({error: 'user already exists'});
            return;
        };
        res.json({success: ''});
    });
    
    // if(users.filter(user => req.body.email == user.email) == 0) {
    //     users.push(req.body);
    //     res.json(users);
    // } else {
    //     res.json({success: ''});
    // }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));