

var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect('/login');
};


// middlewareObj.checkOwnership = function(req, res, next){
//     if()
// }

module.exports = middlewareObj;