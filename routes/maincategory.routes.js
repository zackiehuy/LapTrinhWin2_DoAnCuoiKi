const express = require('express');
const maincategoryModel = require('../models/maincategory.model');

const router = express.Router();

router.get('/',async function(req,res){
    const  list = await maincategoryModel.all();
    res.render('/',{
        maincategory :list
    });
})

module.exports= router;