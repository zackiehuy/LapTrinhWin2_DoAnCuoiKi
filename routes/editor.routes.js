const express = require('express');
const model_editor = require('../models/editor.models');
const router = express.Router();

router.get('/list', async function(req,res ){
    const list = await model_editor.all(1);
    
    res.render('admin/Editor/list',{
        list,
        emptylist : list.length === 0,
        username : req.user.username
    });
});

router.get('/edit', async function(req,res){
    const maincategory = await model_editor.maincategory(1);
    const row = await model_editor.singlecategory(1);
    const subcategory = await model_editor.subcategory();
    const tag = await model_editor.tag(1);
    res.render('admin/Editor/edit',{
        maincategory,
        subcategory,
        row,
        tag,
        tagempty : tag.length === 0
    })
});

router.get('/denide', function(req,res ){
    res.render('admin/Editor/denide');
});

module.exports = router;





