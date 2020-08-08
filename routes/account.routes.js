const express = require('express');
const tbl_account = require('../models/account.models');
const passport = require('passport');
const router = express.Router();

/*router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'subcriber'; // set your layout here
  next(); // pass control to the next handler
});*/

router.get('/login',function(req,res){
    res.render('Account/login',{layout : false,
        message: req.flash('loginMessage')});
});

router.post('/login',passport.authenticate('local-login', {
        successReturnToOrRedirect : 'isLogin', // redirect to the secure profile section
        failureRedirect : 'login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),function(req,res){
      if (req.body.remember) {
        console.log('remember')
        req.session.cookie.maxAge = 2 * 60 * 1000; // Cookie expires after 30 days
    } else {
        console.log('no remember')
        req.session.cookie.expires = false; // Cookie expires at end of session
    }
      res.redirect('/');
    }
);

router.get('/register', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('Account/register', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/register', passport.authenticate('local-register', {
  successRedirect : 'profile', // redirect to the secure profile section
  failureRedirect : 'register', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/profile', function(req,res,next){
  res.app.locals.username = req.user.username;
    if(req.isAuthenticated())
        return next();
    res.redirect('/'); 
    }, function(req, res) {
  res.render('Account/profile', {
    user : req.user // get the user out of session and pass to template
  });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/isLogin',function(req,res,next){
  res.app.locals.username = req.user.username;
    if(req.isAuthenticated())
        return next();
    res.redirect('/'); 
    },function(req,res){
      
        const accountcategory = req.user.idaccountcategory;
        const username = req.user.username;
        const falseaccountcategory = accountcategory === 1;
        //req.setHeader(res.locals.emptyusername,false);
        //req.setHeader(res.locals.emptyaccountcategory,false);

        //res.setHeader(res.locals.username , username);
        
        if((accountcategory === 1))
        {
            //res.render('home',{
            //  account : req.user             
           // });
            res.redirect('/');
        }
        else if((accountcategory === 2))
        {
            res.render('admin/Writter/list',{
              account : req.user             
            });
            res.redirect('admin/Writter/list');
        }
        else if((accountcategory === 3))
        {
            res.render('admin/Editor/list',{
              account : req.user             
            });
            res.redirect('/admin/Editor/list');
        }
        else if((accountcategory === 4))
        {
            //res.render('admin/Administrator/home',{
             // account : req.user             
            //});
             res.redirect('/admin/Administrator/home');
        }
        
});

module.exports = router;