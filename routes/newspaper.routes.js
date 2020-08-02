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

module.exports= router;