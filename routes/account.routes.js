const express = require('express');
const tbl_account = require('../models/account.models');
const passport = require('passport');

const router = express.Router();

router.get('/login',function(req,res){
    res.render('Account/login',{layout : false,
        message: req.flash('loginMessage')});
})

router.post('/login',passport.authenticate('local-login', {
        successRedirect : 'home', // redirect to the secure profile section
        failureRedirect : 'login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),
    function(req, res) {
     console.log("hello");

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/');}
);

module.exports = router;