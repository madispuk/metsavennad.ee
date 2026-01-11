var express = require("express");
var path = __dirname + "/";
var app = express();
var router = express.Router();
var hbs = require("express-handlebars");
var db = require("./js/db");

app.use(express.static(path + "public"));

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: path + "views/layouts/",
  }),
);

app.set("views", path + "views");
app.set("view engine", "hbs");

/////
/// MISSOO
/////

router.get("/", function (req, res) {
  res.render("index", { layout: false });
});
router.get("/misso", function (req, res) {
  res.render("misso/sissejuhatus", { layout: "misso-layout.hbs" });
});
router.get("/misso/sissejuhatus", function (req, res) {
  res.render("misso/sissejuhatus", { layout: "misso-layout.hbs" });
});
router.get("/misso/lugu", function (req, res) {
  res.render("misso/lugu", { layout: "misso-layout.hbs" });
});
router.get("/misso/pildid", function (req, res) {
  res.render("misso/pildid", { layout: "misso-layout.hbs" });
});
router.get("/misso/kaardid", function (req, res) {
  res.render("misso/kaardid", { layout: "misso-layout.hbs" });
});
router.get("/misso/isikud", function (req, res, next) {
  db.getPeople("misso", function (err, people) {
    if (err) return next(err);
    res.render("misso/isikud", { layout: "misso-layout.hbs", people });
  });
});
router.get("/misso/isik/:id_name", function (req, res, next) {
  db.getPersonById(req.params.id_name, function (err, person) {
    if (err) return next(err);
    res.render("misso/isik", { layout: "misso-layout.hbs", person });
  });
});
router.get("/misso/rjm", function (req, res) {
  res.render("misso/rjm", { layout: "misso-layout.hbs" });
});
router.get("/misso/agendid", function (req, res) {
  res.render("misso/agendid", { layout: "misso-layout.hbs" });
});
router.get("/misso/malestus", function (req, res) {
  res.render("misso/malestus", { layout: "misso-layout.hbs" });
});
router.get("/misso/lingid", function (req, res) {
  res.render("misso/lingid", { layout: "misso-layout.hbs" });
});
router.get("/misso/raudvassar", function (req, res) {
  res.render("misso/raudvassar", { layout: "misso-layout.hbs" });
});
router.get("/misso/arvo-pilt", function (req, res) {
  res.render("misso/arvo-pilt", { layout: "misso-layout.hbs" });
});
/////
/// ROUGE
/////

router.get("/rouge", function (req, res) {
  res.render("rouge/sissejuhatus", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/sissejuhatus", function (req, res) {
  res.render("rouge/sissejuhatus", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/metsavennad", function (req, res) {
  res.render("rouge/metsavennad", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/parteilased", function (req, res) {
  res.render("rouge/parteilased", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/elukaigud_metsaelu_alguseni", function (req, res) {
  res.render("rouge/elukaigud_metsaelu_alguseni", {
    layout: "rouge-layout.hbs",
  });
});
router.get("/rouge/sundmused_uurimistoimikutes", function (req, res) {
  res.render("rouge/sundmused_uurimistoimikutes", {
    layout: "rouge-layout.hbs",
  });
});
router.get("/rouge/elukaigud_metsaelu_lopuni", function (req, res) {
  res.render("rouge/elukaigud_metsaelu_lopuni", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/julgeoleku_tegutsemine", function (req, res) {
  res.render("rouge/julgeoleku_tegutsemine", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/propaganda_vs_toimikud", function (req, res) {
  res.render("rouge/propaganda_vs_toimikud", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/pildid", function (req, res) {
  res.render("rouge/pildid", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/kaardid", function (req, res) {
  res.render("rouge/kaardid", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/isikud", function (req, res, next) {
  db.getPeople("rouge", function (err, people) {
    if (err) return next(err);
    res.render("rouge/isikud", { layout: "rouge-layout.hbs", people });
  });
});
router.get("/rouge/isik/:id_name", function (req, res, next) {
  db.getPersonById(req.params.id_name, function (err, person) {
    if (err) return next(err);
    res.render("rouge/isik", { layout: "rouge-layout.hbs", person });
  });
});
router.get("/rouge/lingid", function (req, res) {
  res.render("rouge/lingid", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/aksel_sprenki_paevik", function (req, res) {
  res.render("rouge/aksel_sprenki_paevik", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/aksel_sprenki_paevik_umberkirjutis", function (req, res) {
  res.render("rouge/aksel_sprenki_paevik_umberkirjutis", {
    layout: "rouge-layout.hbs",
  });
});
router.get("/rouge/koemetsa_hukkumine", function (req, res) {
  res.render("rouge/koemetsa_hukkumine", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/toomase_rahatasku", function (req, res) {
  res.render("rouge/toomase_rahatasku", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/pallo_luule", function (req, res) {
  res.render("rouge/pallo_luule", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/haanjamaa_monumendid", function (req, res) {
  res.render("rouge/haanjamaa_monumendid", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/morv_metsateel", function (req, res) {
  res.render("rouge/morv_metsateel", { layout: "rouge-layout.hbs" });
});
router.get("/rouge/simo_pihlapuu_ulestahendused", function (req, res) {
  res.render("rouge/simo_pihlapuu_ulestahendused", {
    layout: "rouge-layout.hbs",
  });
});

/////
/// LINNAMÄE-URVASTE-SANGASTE
/////

router.get("/sangaste", function (req, res) {
  res.render("sangaste/sissejuhatus", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/sissejuhatus", function (req, res) {
  res.render("sangaste/sissejuhatus", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/olud", function (req, res) {
  res.render("sangaste/olud", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/elukaigud_enne_1944", function (req, res) {
  res.render("sangaste/elukaigud_enne_1944", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/elukaigud_1945_1946", function (req, res) {
  res.render("sangaste/elukaigud_1945_1946", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/elukaigud_1947_1948", function (req, res) {
  res.render("sangaste/elukaigud_1947_1948", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/elukaigud_1949_1953", function (req, res) {
  res.render("sangaste/elukaigud_1949_1953", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/elukaigud_1954_1959", function (req, res) {
  res.render("sangaste/elukaigud_1954_1959", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/rjm", function (req, res) {
  res.render("sangaste/rjm", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/pildid", function (req, res) {
  res.render("sangaste/pildid", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/kaardid", function (req, res) {
  res.render("sangaste/kaardid", { layout: "sangaste-layout.hbs" });
});
router.get("/sangaste/isikud", function (req, res, next) {
  db.getPeople("sangaste", function (err, people) {
    if (err) return next(err);
    res.render("sangaste/isikud", { layout: "sangaste-layout.hbs", people });
  });
});
router.get("/sangaste/isik/:id_name", function (req, res, next) {
  db.getPersonById(req.params.id_name, function (err, person) {
    if (err) return next(err);
    res.render("sangaste/isik", { layout: "sangaste-layout.hbs", person });
  });
});
router.get("/sangaste/lingid", function (req, res) {
  res.render("sangaste/lingid", { layout: "sangaste-layout.hbs" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// START WEB SERVER
app.use("/", router);

app.listen(4000, function () {
  console.log("Live at Port 4000");
});
