
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , models = require('./models') //add
  , passport = require('passport') //add
  , LocalStrategy = require('passport-local').Strategy//add
  , flash = require('connect-flash'); //add

passport.use(new LocalStrategy(
  function(username, password, done){
    models.User.findOne({username: username}, function(err, user){
      if(err){ return done(err)};
      if (!user){
        return done(null, false, {message: "ユーザーネームが間違ってる"})
      }
      if(! user.validPassword(password)){
        return done(null, false, {message: "パスワードが間違ってるよ"});
      };
      return done(null, user);
    })
  }

))

passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done){
  models.User.findById(id, function(err, user){
    done(err, user);
  })
})


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(flash());//add
  app.use(passport.initialize());//add
  app.use(passport.session());//add
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/login', routes.login);
app.post('/login', passport.authenticate('local', {successRedirect: '/',
                                                   failureRedirect: '/login',
                                                   failureFlash: true
                                                 }
                                        )
)

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
