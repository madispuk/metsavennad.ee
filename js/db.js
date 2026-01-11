const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const yamlPath = path.join(__dirname, "..", "db", "people.yaml");
const data = yaml.load(fs.readFileSync(yamlPath, "utf8"));
const people = data.people;

module.exports = {
  async getPersonById(id_name) {
    return people.find((p) => p.id_name === id_name) || null;
  },

  async getPeople(location) {
    return people
      .filter((p) => p.location === location)
      .map(({ id_name, first_name, last_name }) => ({
        id_name,
        first_name,
        last_name,
      }));
  },
};
