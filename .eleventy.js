require("dotenv").config()
const markdownIt = require("markdown-it")
const markdownItFootnote = require("markdown-it-footnote")
const { EleventyRenderPlugin } = require("@11ty/eleventy")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin)

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
