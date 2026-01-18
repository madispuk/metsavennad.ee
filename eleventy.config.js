const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // Add YAML support for data files
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Passthrough copy for static assets - copy contents of public/ to root of _site/
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // Also copy the video file from root
  eleventyConfig.addPassthroughCopy("metsavennad.mp4");

  // Watch CSS for changes
  eleventyConfig.addWatchTarget("./public/css/");
  eleventyConfig.addWatchTarget("./public/js/");

  // Add a filter to get people by location
  eleventyConfig.addFilter("byLocation", function (people, location) {
    if (!people || !Array.isArray(people)) return [];
    return people.filter((person) => person.location === location);
  });

  // Add global data for isProd
  eleventyConfig.addGlobalData("isProd", process.env.NODE_ENV === "production");

  // Dev server configuration
  eleventyConfig.setServerOptions({
    port: 4000,
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["liquid", "html"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
};
