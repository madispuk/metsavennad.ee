#!/usr/bin/env node

const sqlite3 = require("sqlite3").verbose();
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db", "metsavennad.sqlite");
const outputPath = path.join(__dirname, "..", "db", "people.yaml");

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    process.exit(1);
  }
});

db.all("SELECT * FROM people ORDER BY user_id ASC", (err, rows) => {
  if (err) {
    console.error("Error querying database:", err.message);
    db.close();
    process.exit(1);
  }

  const people = rows.map((row) => {
    const person = {};
    for (const [key, value] of Object.entries(row)) {
      if (value !== null && value !== "") {
        person[key] = value;
      }
    }
    return person;
  });

  const output = yaml.dump(
    { people },
    {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
      quotingType: '"',
      forceQuotes: false,
    },
  );

  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`Exported ${people.length} people to ${outputPath}`);

  db.close();
});
