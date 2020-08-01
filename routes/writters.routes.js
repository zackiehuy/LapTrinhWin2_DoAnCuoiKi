const express = require('express');
const multer = require('multer');
const db = require('../models/writters.model');
const { listrefuse } = require('../models/writters.model');

const router = express.Router();


router.post('/add', async function (req, res) {
  console.log(req.body.FullDes);
  res.send('ok');
})

router.get('/add', function (req, res) {
  res.render('admin/Writter/add');
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

module.exports = router;