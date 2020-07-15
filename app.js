const express = require('express');
require('express-async-error')

const app = express();

app.use(express.urlencoded({
    entended : true
}));
app.use('/public', express.static('public'));

require('./middlewares/session.mdw')(app);
require('./middlewares/view.mdw')(app);
//require('./middlewares/locals.mdw')(app);

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