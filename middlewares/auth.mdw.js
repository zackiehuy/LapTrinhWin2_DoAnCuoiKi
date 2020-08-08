module.exports = function(req,res,next){
    if(!req.session.isAuthenticated){
         res.redirect(`/account/login?retUrl=${req.originalUrl}`);
         return;
    }
    next();
}