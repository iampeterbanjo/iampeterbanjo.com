const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // You can return your Config object (optional).
  return {
    dir: {
      input: "blog/src",
      output: "blog/build"
    },
    passthroughFileCopy: true,
  };
};
