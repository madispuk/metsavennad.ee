var express = require("express");
var path = __dirname + '/';
var app = express();
var router = express.Router();
var hbs = require("express-handlebars");
var db = require('./db');

app.use(express.static(path + 'public'))

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main-layout',
	layoutsDir: path + 'views/layouts/'
}));

app.set('views', path + 'views');
app.set('view engine', 'hbs');

/////
/// MISSO
/////

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
router.get("/misso/isikud", function(req, res, next) {
	db.getPeople("misso", function(err, people) {
		if (err) return next(err);
		res.render('misso/isikud', {layout: 'misso-layout.hbs', people} );
	});
});
router.get("/misso/isik/:id_name", function(req, res, next) {
	db.getPersonById(req.params.id_name, function(err, person) {
		if (err) return next(err);
		res.render('misso/isik', {layout: 'misso-layout.hbs', person} );
	});
});
router.get("/misso/rjm",function(req,res){
	res.render('misso/rjm', {layout: 'misso-layout.hbs'});
});
router.get("/misso/agendid",function(req,res){
	res.render('misso/agendid', {layout: 'misso-layout.hbs'});
});
router.get("/misso/malestus",function(req,res){
	res.render('misso/malestus', {layout: 'misso-layout.hbs'});
});
router.get("/misso/lingid",function(req,res){
	res.render('misso/lingid', {layout: 'misso-layout.hbs'});
});
router.get("/misso/raudvassar",function(req,res){
	res.render('misso/raudvassar', {layout: 'misso-layout.hbs'});
});
/////
/// ROUGE
/////

router.get("/rouge",function(req,res){
	res.render('rouge');
});

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

// START WEB SERVER
app.use("/",router);

app.listen(4000,function(){
	console.log("Live at Port 4000");
});
