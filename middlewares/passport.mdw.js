const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const mysql = require('mysql');
const dbconfig = require('../config/default.json');
const connection = mysql.createConnection(dbconfig.news);
const session = require('express-session');
const cookie = require('cookie-parser');
//const BetterMemoryStore = require('session-memory-store')(session);
//connection.connect();

module.exports = function(app){
    app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: false }));    
    app.set('trust proxy' , 1)
    //const store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
    app.use(session({
        secret : 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        MaxAge: 60 * 60 * 1000 
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}

connection.query('USE news');

passport.serializeUser(function(user, done) {
    done(null, user.ida);
  });
  
passport.deserializeUser(function(ida, done) {
    connection.query("SELECT username,password,ida,idaccountcategory FROM account WHERE ida = ?",[ida], function(err, rows){
        return done(err, rows[0]);
    });
});

passport.use('local-register',new LocalStrategy(
    {
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req,username,password,done){
        connection.query("SELECT * FROM account WHERE username = ?",[username], function(err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
                // if there is no user with that username
                // create the user
                const newUserMysql = {
                    username: username,
                    password: bcrypt.hashSync(password, null, null),
                    idaccountcategory : 1,
                    hoten :req.body.hoten,
                    email : req.body.email,
                    DOB : req.body.DOB
                };
                const newUser = {
                    username: username,
                    password: bcrypt.hashSync(password, null, null),
                    ida : null,
                    idaccountcategory : 1,
                    hoten :req.body.hoten,
                    email : req.body.email,
                    DOB : req.body.DOB
                };
                console.log(newUserMysql.DOB);
                const insertQuery = "INSERT INTO account ( username, password , idaccountcategory, hoten,email,	BOD ) values (?,?,?,?,?,?)";
                connection.query(insertQuery,[newUserMysql.username,newUserMysql.password,newUserMysql.idaccountcategory,newUserMysql.hoten,
                    newUserMysql.email,newUserMysql.DOB],function(err, rows) {
                    if (err) return done(err);
                    newUser.ida = rows.insertId;
                    return done(null, newUser);
                });
            }
        });
    }
));

passport.use('local-login',new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) { // callback with email and password from our form
            connection.query("SELECT username,password,ida,idaccountcategory FROM account WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
  
                // if the user is found but the password is wrong
                if (!(password == rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user`
                

                return done(null, rows[0]);
            });
        }
        )
);

