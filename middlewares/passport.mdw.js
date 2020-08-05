const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
const mysql = require('mysql');
const dbconfig = require('../config/default.json');
var connection = mysql.createConnection(dbconfig.news);
connection.connect();
connection.query('USE news');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    connection.query("SELECT username,password FROM ida = ? ",[id], function(err, rows){
        done(err, rows[0]);
    });
});

passport.use('local-login',new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) { // callback with email and password from our form
            connection.query("SELECT username,password,ida FROM account WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
  
                // if the user is found but the password is wrong
                if (!(password == rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        }
        )
);

module.exports = function(app){
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
}