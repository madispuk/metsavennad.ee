var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();


// db.each("SELECT * FROM people", function(err, row) {
// 	console.log(row);
// });

 
fs.exists('metsavennad', function (exists) {
  db = new sqlite3.Database('metsavennad');
 
  if (!exists) {
    console.info('Creating database. This may take a while...');

    fs.readFile('public/people.sql', 'utf8', function (err, data) {
      if (err) throw err;
      db.exec(data, function (err) {
        if (err) throw err;
        console.info('Done.');
      });
    });
  }
});

module.exports = {
  getPerson: function (name) {
	// db.serialize(function() {
	//   db.run("CREATE TABLE lorem (info TEXT)");
	 
	//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
	//   for (var i = 0; i < 10; i++) {
	// 	  stmt.run("Ipsum " + i);
	//   }
	//   stmt.finalize();
	 
	//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
	// 	  console.log(row.id + ": " + row.info);
	//   });
	// });
  },
  bar: function () {

	db.close();
  }
};

 
