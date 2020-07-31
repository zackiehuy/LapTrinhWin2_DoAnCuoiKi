const express = require('express');
const multer = require('multer');

const router = express.Router();

router.get('/wysiwyg', async function (req, res) {
  res.render('vwDemo/wysiwyg');
})

router.post('/wysiwyg', async function (req, res) {
  console.log(req.body.FullDes);
  res.send('ok');
})

router.get('/upload', function (req, res) {
  res.render('admin/Writter/add');
})

router.post('/upload', function (req, res) {
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
      res.render('vwDemo/upload');
    else res.send('err');
  })
})

module.exports = router;