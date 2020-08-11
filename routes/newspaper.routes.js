const express = require('express');
const model_newspaper = require('../models/newspaper.model');

const router = express.Router();

router.get('/', async function(req,res){
    const hotnews = await model_newspaper.hotnews();
    const mostview1 =await model_newspaper.allmostview(0);
    const allnews1 =await model_newspaper.allnews(0);
    const mostview2 =await model_newspaper.allmostview(5);
    const allnews2 =await model_newspaper.allnews(5);
    res.render('home',{
        hotnews,
        mostview1,
        allnews1,
        mostview2,
        allnews2,
        emptyhotnews : hotnews.length === 0,
        emptymostview : mostview1.length === 0,
        emptyallnews : allnews1.length === 0
    })
})

router.get('/detail/:id',async function(req,res){
    const idnews = +req.params.id || -1;
    const news = await model_newspaper.singlenews(idnews);
    const tags = await model_newspaper.singletags(idnews);
    const subcategory = await model_newspaper.singlesub(idnews);
    res.render('Newspaper/detail',{
        news,
        tags,
        subcategory
    })
});

router.get('/search',async function(req,res){
    res.render('Newspaper/search');
})

module.exports= router;