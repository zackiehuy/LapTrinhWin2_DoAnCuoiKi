const express = require('express');
const exphbs = require('express-handlebars');
const model_administrator = require('../models/administrator.models');


const router = express.Router();

router.all(function (req,res,next){
    if(!req.isAuthenticated)
    {
        res.redirect(`/account/login?retUrl=${req.originalUrl}`);
        next();
    }
    else
    {
        /*if(req.user.idaccountcategory != 4)
        {
            if(req.user.idaccountcategory === 1)
            {
                res.redirect('/');
            }
            else if(req.user.idaccountcategory === 2)
            {
                res.redirect('admin/Writter/list');
            }
            else if(req.session.passport.user.idaccountcategory === 3)
            {
                res.redirect('/admin/Editor/list');
            }
        }*/
    }
})

router.get('/home',function(req,res){
    
    res.render('admin/Administrator/home');
})

router.get('/category/list', async function(req,res){
    const maincategory = await model_administrator.allmaincategory();
    const subcategory = await model_administrator.allsubcategory();
    res.render('admin/Administrator/Category/list',{
        maincategory,
        subcategory,
        emptymain : maincategory.length === 0,
        emptysub : subcategory.length === 0
    });
});

module.exports = router;