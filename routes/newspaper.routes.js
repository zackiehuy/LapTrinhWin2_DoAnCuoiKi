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
    const rowsnews = await model_newspaper.singlenews(idnews);
    const tags = await model_newspaper.singletags(idnews);
    const subcategory = await model_newspaper.singlesub(idnews);
    const news = rowsnews[0];
    const rowscount = await model_newspaper.count(idnews);
    const count = rowscount[0];
    const newsrandom = await model_newspaper.newsrandom(news.idmaincategory);
    const comment = await model_newspaper.comment(idnews);
    const account = req.app.locals.ida;
    res.render('Newspaper/detail',{
        news,
        tags,
        subcategory,
        count,
        newsrandom,
        comment,
        empty : account.length === 0
    })
});

router.get('/search',async function(req,res){
    const search = req.body.search;
    const title = await model_newspaper.fulltexttittle(search);
    const content = await model_newspaper.fulltexcontent(search);
    const abstract = await model_newspaper.fulltextabstract(search);
    res.render('Newspaper/search',{
        title,
        content,
        abstract
    });
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
});

router.get('/adcomment',async function(req,res){
    const today = new Date();
    const datetime = new Date(today.getFullYear,today.getMonth,today.getDay,today.getHours,today.getMinutes,today.getSeconds);
    comment = {
        content: req.body.comment,
        idnews: req.params.idnews,
        idaccount : req.params.idaccount,
        datecmt : datetime
    } 
    await model_newspaper.addcomment(comment);
    res.redirect(`/detail/${req.params.idnews}`);
    return;
})

module.exports= router;