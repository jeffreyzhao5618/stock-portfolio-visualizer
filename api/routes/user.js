const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const userModel = require('../models/users');
const authModel = require('../models/auth');

const salt = Buffer.from([165,171,164,52,252,167,208,8,46,62,234,254,182,246,189,12,77]);


router.post('/login', (req, res) => {
    let encryptPassword = crypto.scryptSync(req.body.password, salt, 32).toString('hex');

    userModel.findOne({email: req.body.email, password: encryptPassword}, function(err, user){
        if (err) throw err;
        if(user) {
            let newAuth = generateAuth(user._id);
            res.cookie('auth_id', newAuth._id);
            res.cookie('auth_key', newAuth.key);
            res.json({success: 'true', user: user._id});
        } else {
            res.json({error: 'Email or password is incorrect.'})
        }    
    });
});

function generateAuth(userID) {
    let key = crypto.randomBytes(30).toString('hex');

    const newAuth = new authModel({key: key, user: userID});
    newAuth.save();

    return(newAuth);
}

router.post('/register', (req, res) => {
    let encryptPassword = crypto.scryptSync(req.body.password, salt, 32).toString('hex');

    const newUser = new userModel({email: req.body.email, password: encryptPassword, portfolio: []});
    newUser.save(function (err) {
        if (err) {
            res.json({error: 'user already exists'});
            return;
        };
        res.json({success: 'true'});
    });
})

router.post('/portfolio', (req, res) => {
    const transaction = {
        ticker: req.body.transaction.ticker,
        priceShare: req.body.transaction.priceShare,
        totalPrice: req.body.transaction.totalPrice,
        totalQuantity: req.body.transaction.totalQuantity,
        account: req.body.transaction.account,
        fund: req.body.transaction.fund
    }
    userModel.findOneAndUpdate({_id: req.body.userID},
        {$push: {portfolio: transaction}},
        function(err, user) {
            if(err) {
                res.json({error: 'unexpected error'});
                return
            }
            res.json({success: 'true'})
        });
});

router.get('/portfolio/:id', (req, res) => {
    userModel.findOne({_id: req.params.id}, function(err, user) {
            if(err) {
                res.json({error: 'unexpected error'});
                return
            }
            res.json(user.portfolio);
        });
});

router.get('/auth', (req, res) => {
    authModel.findById(req.cookies.auth_id, (err, auth) => {
        if (err) throw err;
        if(auth && auth.key == req.cookies.auth_key) {
            res.json({success: 'true'});
        } else{
            res.json({error: 'Not logged in .'});
        }
    })
})



module.exports = router;