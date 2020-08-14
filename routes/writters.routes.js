const express = require('express');
const multer = require('multer');
const db = require('../models/writters.model');
const fs = require('fs');

const router = express.Router();

router.all('/*',function(req,res,next){
  if(!req.isAuthenticated())
  {
    res.app.locals.layout = 'admin';
    res.redirect(`/account/login?retUrl=${req.originalUrl}`);
  }
  next();
});


router.post('/add', async function (req, res) {
  
  const requ = req.body;
  console.log(req.body.tittle);
  newspaper = {
    tittle : req.body.tittle,
    abstract : req.body.abstract,
    content : req.body.content,
    idmaincategory : 3,
    writter :req.app.locals.id
  };
  await db.addnews(newspaper);
  const id = await db.singletittle(req.body.tittle);
  tagnews1 = {
    idnews : id.idnews, 
    name : req.body.tag1
  }
  tagnews2 = {
    idnews : id.idnews, 
    name : req.body.tag2
  }
  tagnews3 = {
    idnews : id.idnews, 
    name : req.body.tag3
  }
  tagnews4 = {
    idnews : id.idnews, 
    name : req.body.tag4
  }
  tagnews5 = {
    idnews : id.idnews, 
    name : req.body.tag5
  }  
  await db.addtagnews(tagnews1);
  await db.addtagnews(tagnews2);
  await db.addtagnews(tagnews3);
  await db.addtagnews(tagnews4);
  await db.addtagnews(tagnews5);
  const img = {
    idnews : id[0].idnews,
    image: `./public/imgs/${id[0].idnews}/header`
  }
  await db.patch(img);
  fs.mkdir(`./public/imgs/${id[0].idnews}`,function(err){
    if(err)
    {
      console.log(err);
    }
  })

  const storage = multer.diskStorage({
    filename(req, file, cb) {
      cb(null, 'header');
    },
    destination(req, file, cb) {
      cb(null, `./public/imgs/${id[0].idnews}`);
    }
  })

  const upload = multer({ storage });
  upload.array('fuMain', 3)(req, res, function (err) {
    if (!err)
      res.render('admin/Writter/add');
    else res.send('err');
  })

})


router.get('/add',async function (req, res) {
  const listCategory = await db.allcategory(); 
  res.render('admin/Writter/add',{
    listCategory
  });
})


router.get('/list',async function (req, res) {
  const listaccept = await db.listaccept(res.app.locals.id);
  const listrefuse = await db.listrefuse(res.app.locals.id);
  const listwait = await db.listwait(res.app.locals.id);
  const tag = await db.singletag(res.app.locals.id);

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
  const row = await db.single(req.params.idnews);
  console.log(row[0]);
  const news = row[0];
  res.render('admin/Writter/edit',{
    news
  });
})

router.post('/update',async function(req,res){
  console.log(req.body.content);
  newspaper = {
    idnews : req.body.idnews,
    tittle : req.body.tittle,
    abstract : req.body.abstract,
    content : req.body.content,
    idmaincategory : req.body.idmaincategory
  };
  await db.patch(newspaper);
  /*tagnews1 = {
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
  */
 res.redirect('list');
})

module.exports = router;