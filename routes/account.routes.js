const express = require('express');
const tbl_account = require('../models/account.models');
const passport = require('passport');
const db = require('../utils/db');
const nodemailer = require('nodemailer');
const router = express.Router();
const otp = require('../middlewares/otp.mdw');
/*router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'subcriber'; // set your layout here
  next(); // pass control to the next handler
});*/

router.get('/login',function(req,res){
    if(req.isAuthenticated())
        {
            res.redirect('/');
            next();
    }
    res.render('Account/login',{layout : false,
        message: req.flash('loginMessage')});
});

router.post('/login',passport.authenticate('local-login', {
        successReturnToOrRedirect : 'isLogin', // redirect to the secure profile section
        failureRedirect : 'login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),function(req,res){
      if (req.body.remember) {
        console.log('remember')
        req.session.cookie.maxAge = 2 * 60 * 1000; // Cookie expires after 30 days
    } else {
        console.log('no remember')
        req.session.cookie.expires = false; // Cookie expires at end of session
    }
      res.redirect('/');
    }
);

router.get('/register', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('Account/register', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/register', passport.authenticate('local-register', {
  successRedirect : 'profile', // redirect to the secure profile section
  failureRedirect : 'register', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/profile', function(req,res,next){
      if(!req.isAuthenticated())
        {
            res.redirect(`/account/login?retUrl=${req.originalUrl}`);
            next();
        }
      res.app.locals.layout = 'subcriber';
      res.app.locals.username = req.user.username;
      if(req.isAuthenticated())
          return next();
      res.redirect('/'); 
      },
    async function(req, res) {
      const ida = req.user.ida;
      const rows = await tbl_account.profile(ida);
      const user = rows[0];

    res.render('Account/profile', {
    user:user  // get the user out of session and pass to template
  });
});

router.get('/forget',function(req,res)
{
  res.render('Account/forget');
})
router.post('/checkout',async function(req,res)
{
  const user = req.body.username;
  const rows = await tbl_account.forget(user);
  const userotp = req.body.username;
  const secret  = otp.generateSecret();
  const imageUrl = otp.generateQRCode(userotp,secret);
  console.log(imageUrl);
  console.log({imageUrl});
  if(rows[0].length === 0)
  {
    alert(`Username is wrong`)
    res.redirect('/Account/forget');
  }
  else
  {
    const transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'zackie2509@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'a0918626694' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    const content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Xin chào ${rows[0].hoten},</h4>
                <div><span>Chúng tôi nhận được phản hồi quên mật khẩu từ bạn</span></div>
                <div><span style="color: black">Đây là mã OTP</span></div>
                <div><h3>${{imageUrl}}</h3></div>
            </div>
        </div>
    `;
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Newpapers',
        to: rows[0].email,
        subject: 'Phản hồi request quên mật khẩu',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            res.redirect('/');
        }
    });
  }
})

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
  req.logout();
  res.app.locals.layout = 'main';
  res.redirect('/');
});

router.get('/isLogin',function(req,res,next){
  res.app.locals.username = req.user.username;
    if(req.isAuthenticated())
        return next();
    res.redirect('/'); 
    },function(req,res){
      
        const accountcategory = req.user.idaccountcategory;
        const username = req.user.username;
        const falseaccountcategory = accountcategory === 1;
        //req.setHeader(res.locals.emptyusername,false);
        //req.setHeader(res.locals.emptyaccountcategory,false);

        //res.setHeader(res.locals.username , username);
        
        if((accountcategory === 1))
        {
            //res.render('home',{
            //  account : req.user             
           // });
            res.redirect('/');
        }
        else if((accountcategory === 2))
        {
            res.redirect('admin/Writter/list');
        }
        else if((accountcategory === 3))
        {
            res.redirect('/admin/Editor/list');
        }
        else if((accountcategory === 4))
        {
            //res.render('admin/Administrator/home',{
             // account : req.user             
            //});
             res.redirect('/admin/Administrator/home');
        }
        
});

module.exports = router;