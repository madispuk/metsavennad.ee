const yaml = require("js-yaml");
const esbuild = require("esbuild");
const postcss = require("postcss");
const tailwindcss = require("@tailwindcss/postcss");
const fs = require("fs");
const lightningcss = require("lightningcss");

module.exports = function (eleventyConfig) {
  // Add YAML support for data files
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Passthrough copy for static assets - copy contents of public/ to root of _site/
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // LightGallery vendor assets from node_modules
  eleventyConfig.addPassthroughCopy({
    "node_modules/lightgallery/css/lightgallery-bundle.min.css": "vendor/lightgallery/css/lightgallery-bundle.min.css",
    "node_modules/lightgallery/images": "vendor/lightgallery/images",
    "node_modules/lightgallery/fonts": "vendor/lightgallery/fonts",
  });

  // Also copy the video file from root
  eleventyConfig.addPassthroughCopy("metsavennad.mp4");

  // Watch source files for changes
  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addWatchTarget("./js/");

  // Build CSS and JS before Eleventy builds
  const isProd = process.env.NODE_ENV === "production";
  eleventyConfig.on("eleventy.before", async () => {
    // Bundle JS with esbuild
    await esbuild.build({
      entryPoints: {
        main: "js/main.js",
        timeline: "js/timeline-chart.js",
      },
      bundle: true,
      minify: isProd,
      outdir: "public/js",
      format: "iife",
    });

    // Process CSS with PostCSS/Tailwind
    const cssInput = fs.readFileSync("css/styles.css", "utf8");
    const result = await postcss([tailwindcss]).process(cssInput, {
      from: "css/styles.css",
      to: "public/css/styles.css",
    });
    let css = result.css;

    if (isProd) {
      const minified = lightningcss.transform({
        filename: "styles.css",
        code: Buffer.from(css),
        minify: true,
      });
      css = minified.code.toString();
    }

    fs.mkdirSync("public/css", { recursive: true });
    fs.writeFileSync("public/css/styles.css", css);
  });

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
