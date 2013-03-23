
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req, res){
  res.render('login', { title: 'Express', error_message: req.flash('error') });
};

exports.checkUser = function(req, res){
  res.render('login', { title: 'Express' });
};
