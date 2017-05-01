var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('metsavennad.sqlite');

fs.exists('metsavennad.sqlite', function (exists) {
	if (!exists) {
		console.info('Creating database.');
		fs.readFile('public/people.sql', 'utf8', function (err, data) {
			if (err) throw err;
			console.log(data);
			db.exec(data, function (err) {
				if (err) throw err;
				console.info('Done.');
			});
		});
	} else {
		console.info('Database already exists.');
	}
});

module.exports = {
	getPersonById: function (id_name, callback) {
		db.get("SELECT * FROM people WHERE id_name = $id_name",
			{ $id_name: id_name },
			callback
		);
	},
	getPeople: function(location, callback) {
		db.all("SELECT id_name, first_name, last_name FROM people WHERE location = $location",
			{ $location: location },
			callback
		);
	}
};


