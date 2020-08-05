const express = require('express');
require('express-async-error');
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({
    entended : true
}));
app.use('/public', express.static('public'));
app.use(flash());
app.use(cookieParser());
require('./middlewares/local.mdw')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/passport.mdw')(app);
//require('./middlewares/locals.mdw')(app);
//

app.use('/admin/writter', require('./routes/writters.routes'));
app.use('', require('./routes/newspaper.routes'));
app.use('/admin/editor',require('./routes/editor.routes'));
app.use('/admin/Administrator',require('./routes/administrator.routes'));
app.use('/account',require('./routes/account.routes'));

app.get('/', function(req,res){
    res.render('home')
})



app.use(function (req, res) {
    res.render('404', { layout: false });
  })
  
  /*app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('500', { layout: false });
  })*/
  const PORT = 3000;
  app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
  })