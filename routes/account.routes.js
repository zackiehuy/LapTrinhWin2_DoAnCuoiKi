const express = require('express');
const tbl_account = require('../models/account.models');
const passport = require('passport');

const router = express.Router();

router.all('/*',function(req,res,next){
  res.app.locals.layout = 'admin';
  next();
});

router.get('/login',function(req,res){
    res.render('Account/login',{layout : false,
        message: req.flash('loginMessage')});
});

router.post('/login',passport.authenticate('local-login', {
        successRedirect : 'isLogin', // redirect to the secure profile section
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
    res.redirect('/');
  }
);

router.get('/isLogin',function(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('home'); 
    },function(req,res,next){
      
        const accountcategory = req.user.idaccountcategory;
        const username = req.user.username;
        const falseaccountcategory = accountcategory === 1;
        //req.setHeader(res.locals.emptyusername,false);
        //req.setHeader(res.locals.emptyaccountcategory,false);
        res.render('_layouts/admin',{
          username
        });
        console.log(username);
        res.locals.username = username;
        if((accountcategory === 1))
        {
            res.render('home',{
              account : req.user             
            });
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
            res.render('admin/Administrator/home',{
              account : req.user             
            });
            res.redirect('/admin/Administrator/home');
        }
        
});

module.exports = router;