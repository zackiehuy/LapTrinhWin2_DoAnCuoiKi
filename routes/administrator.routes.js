const express = require('express');
const model_administrator = require('../models/administrator.models');

const router = express.Router();

router.get('/Category/list', async function(req,res){
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