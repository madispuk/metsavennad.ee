var express = require("express");
var path = __dirname + "/";
var app = express();
var router = express.Router();
var hbs = require("express-handlebars");
var db = require("./js/db");

var isProd = process.env.NODE_ENV === "production";
app.locals.isProd = isProd;

app.use(express.static(path + "public"));

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: path + "views/layouts/",
  }),
);

app.set("views", path + "views");
app.set("view engine", "hbs");

// Route configuration - maps regions to their pages
const regionPages = {
  misso: [
    "lugu",
    "pildid",
    "kaardid",
    "rjm",
    "agendid",
    "malestus",
    "lingid",
    "raudvassar",
    "arvo-pilt",
  ],
  rouge: [
    "metsavennad",
    "parteilased",
    "elukaigud_metsaelu_alguseni",
    "sundmused_uurimistoimikutes",
    "elukaigud_metsaelu_lopuni",
    "julgeoleku_tegutsemine",
    "propaganda_vs_toimikud",
    "pildid",
    "kaardid",
    "lingid",
    "aksel_sprenki_paevik",
    "aksel_sprenki_paevik_umberkirjutis",
    "koemetsa_hukkumine",
    "toomase_rahatasku",
    "pallo_luule",
    "haanjamaa_monumendid",
    "morv_metsateel",
    "simo_pihlapuu_ulestahendused",
  ],
  sangaste: [
    "olud",
    "elukaigud_enne_1944",
    "elukaigud_1945_1946",
    "elukaigud_1947_1948",
    "elukaigud_1949_1953",
    "elukaigud_1954_1959",
    "kiri-hrustsovile",
    "rjm",
    "pildid",
    "kaardid",
    "lingid",
    "kiri-hrustsovile",
    "kiri-hrustsovile-kirjutis",
    "igor-gaspl",
  ],
};

// Homepage
router.get("/", function (req, res) {
  res.render("index", { layout: false });
});

// Generate routes for each region
Object.entries(regionPages).forEach(([region, pages]) => {
  const layout = `${region}-layout.hbs`;

  // Region root redirects to sissejuhatus
  router.get(`/${region}`, (req, res) => {
    res.render(`${region}/sissejuhatus`, { layout });
  });

  // Static pages
  pages.forEach((page) => {
    router.get(`/${region}/${page}`, (req, res) => {
      res.render(`${region}/${page}`, { layout });
    });
  });

  // People list page
  router.get(`/${region}/isikud`, async (req, res) => {
    const people = await db.getPeople(region);
    res.render(`common/isikud`, { region, layout, people });
  });

  // Individual person page
  router.get(`/${region}/isik/:id_name`, async (req, res) => {
    const person = await db.getPersonById(req.params.id_name);
    res.render(`common/isik`, { region, layout, person });
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// START WEB SERVER
app.use("/", router);

var server = app.listen(4000, function () {
  console.log("Live at Port 4000");
});

// Graceful shutdown
process.on("SIGINT", function () {
  console.log("\nShutting down...");
  server.close();
});

// Handle nodemon restarts
process.once("SIGUSR2", function () {
  server.close(function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
