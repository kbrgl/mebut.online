require("dotenv").config()
const markdownIt = require("markdown-it")
const markdownItFootnote = require("markdown-it-footnote")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    public: "./",
  })

  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("posts/**/*.md")
  })

  const options = {
    html: true,
    typographer: true,
  }
  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItFootnote))
}
