const express = require('express');
const multer = require('multer');
const db = require('../models/writters.model');

const router = express.Router();


router.post('/add', async function (req, res) {
  newspaper = {
    tittle : req.body.tittle,
    abstract : req.body.abstract,
    content : req.body.content,
    category : req.body.category
  };
  await db.addnews(newspaper);
  const id = await db.singletittle(req.body.title);
  tagnews1 = {
    idnews : id.idnews, 
    tag : req.body.tag1
  }
  tagnews2 = {
    idnews : id.idnews, 
    tag : req.body.tag2
  }
  tagnews3 = {
    idnews : id.idnews, 
    tag : req.body.tag3
  }
  tagnews4 = {
    idnews : id.idnews, 
    tag : req.body.tag4
  }
  tagnews5 = {
    idnews : id.idnews, 
    tag : req.body.tag5
  }  
  await db.addnews(tagnews1);
  await db.addnews(tagnews2);
  await db.addnews(tagnews3);
  await db.addnews(tagnews4);
  await db.addnews(tagnews5);
})

router.get('/add',async function (req, res) {
  const listCategory = await db.allcategory(); 
  res.render('admin/Writter/add',{
    listCategory
  });
})

router.post('/add', function (req, res) {
  //.....

  const storage = multer.diskStorage({
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
    destination(req, file, cb) {
      cb(null, './public/imgs');
    }
  })

  const upload = multer({ storage });
  upload.array('fuMain', 3)(req, res, function (err) {
    if (!err)
      res.render('admin/Writter/add');
    else res.send('err');
  })
})

router.get('/list',async function (req, res) {
  const listaccept = await db.listaccept(1);
  const listrefuse = await db.listrefuse(1);
  const listwait = await db.listwait(1);

  res.render('admin/Writter/list',{
        listaccept,
        listrefuse,
        listwait,
        emptyrefuse : listrefuse.length === 0,
        emptyaccept : listaccept.length === 0,
        emptywait : listwait.length === 0
  }
  );
})

router.get('/edit/:idnews',async function (req, res) {
  const idnews = +req.param.idnews || -1;
  const row = await db.single(idnews);
  if(row.length === 0)
  {
    return res.send('Invalid parameter.');
  } 
  const news = row[0];
  res.render('admin/Writter/edit',{
    news
  });
})

router.post('/update',async function(req,res){
  newspaper = {
    tittle : req.body.tittle,
    abstract : req.body.abstract,
    content : req.body.content,
    category : req.body.category
  };
  await db.patch()
  tagnews1 = {
    idnews : id.idnews, 
    tag : req.body.tag1
  }
  tagnews2 = {
    idnews : id.idnews, 
    tag : req.body.tag2
  }
  tagnews3 = {
    idnews : id.idnews, 
    tag : req.body.tag3
  }
  tagnews4 = {
    idnews : id.idnews, 
    tag : req.body.tag4
  }
  tagnews5 = {
    idnews : id.idnews, 
    tag : req.body.tag5
  }
})

module.exports = router;