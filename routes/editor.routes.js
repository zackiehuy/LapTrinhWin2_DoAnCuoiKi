const express = require('express');
const model_editor = require('../models/editor.models');
const router = express.Router();

router.get('/list', async function(req,res ){
    const list = model_editor.all(1);
    res.render('admin/Editor/list',{
        list,
        emptylist : list.length === 0
    });
})

module.exports = router;