const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // You can return your Config object (optional).
  return {
    dir: {
      input: "blog/",
      output: "public/build/"
    },
    passthroughFileCopy: true,
  };
};
