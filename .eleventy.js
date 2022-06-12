require("dotenv").config()

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    public: "./",
  })

  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("posts/**/*.md")
  })
}
