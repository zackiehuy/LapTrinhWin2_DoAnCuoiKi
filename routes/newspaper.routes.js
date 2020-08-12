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
    const search = req.body.search;
    
    res.render('Newspaper/search');
});

router.get('/maincategory/:id',async function(req,res){
    const idmaincategory = +req.params.id || -1;
    for (const c of res.locals.mainCategory) {
        if (c.CatID === +req.params.id) {
          c.isActive = true;
        }
    }
    const news = await model_newspaper.allmaincategory(idmaincategory);
    res.render('Newspaper/maincategory',{
       news 
    });
});

router.get('/subcategory/:id',async function(req,res){
    const idsubcategory = +req.params.id || -1;
    const subcategory = await model_newspaper.allsubcategory(idsubcategory);
    for (const c of res.locals.subCategory) {
        if (c.CatID === +req.params.id) {
          c.isActive = true;
        }
    }
    console.log(subcategory.length);
    const news = [];
    for(let i = 0 ; i < subcategory.length;i++)
    {
        const rows = await model_newspaper.singlenews(subcategory[i].idnews);
        news.push(rows);
    }
    res.render('Newspaper/subcategory',{
       news
    });
});

router.get('/tag',async function(req,res){
    const nametag = req.query.name || "1";
    const tag = await model_newspaper.alltag(nametag);
    const news = [];
    for(let i = 0 ; i < tag.length;i++)
    {
        const rows = await model_newspaper.singlenews(tag[i].idnews);
        news.push(rows);
    }
    res.render('Newspaper/tag',{
        nametag,
        news
    })
})

module.exports= router;