var express = require("express");
var path = __dirname + '/';
var app = express();
var router = express.Router();
var hbs = require("express-handlebars");
var db = require('./db');

// db.bar();

app.use(express.static(path + 'public'))

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main-layout',
	layoutsDir: path + 'views/layouts/'
}));

app.set('views', path + 'views');
app.set('view engine', 'hbs');

router.use(function (req,res,next) {
	console.log("/" + req.method);
	next();
});

// MISSO
router.get("/",function(req,res){
	res.render('index', {layout: false});
});
router.get("/misso",function(req,res){
	res.render('misso/sissejuhatus', {layout: 'misso-layout.hbs'});
});
router.get("/misso/sissejuhatus",function(req,res){
	res.render('misso/sissejuhatus', {layout: 'misso-layout.hbs'});
});
router.get("/misso/lugu",function(req,res){
	res.render('misso/lugu', {layout: 'misso-layout.hbs'});
});
router.get("/misso/pildid",function(req,res){
	res.render('misso/pildid', {layout: 'misso-layout.hbs'});
});
router.get("/misso/kaardid",function(req,res){
	res.render('misso/kaardid', {layout: 'misso-layout.hbs'});
});

// ROUGE
router.get("/rouge",function(req,res){
	res.render('rouge');
});

// START WEB SERVER
app.use("/",router);

app.listen(4000,function(){
	console.log("Live at Port 4000");
});
