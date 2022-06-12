const Airtable = require("airtable")
const MarkdownIt = require("markdown-it")
const Image = require("@11ty/eleventy-img")

const md = new MarkdownIt()

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID)
const table = base("Websites")

module.exports = async function () {
  const sites = await table.select().all()

  const imageOptions = {
    outputDir: "_site/img",
    cacheOptions: {
      duration: "*",
    },
  }

  return Promise.all(
    sites.map(async ({ fields }) => {
      const preview = fields.Attachments[0].url
      const thumbnail = fields.Attachments[0].thumbnails.large.url
      const notes = md.render(fields.Notes)

      const [previewStats, thumbnailStats] = await Promise.all([
        Image(preview, imageOptions),
        Image(thumbnail, imageOptions),
      ])

      return {
        link: fields.Link,
        name: fields.Name,
        preview: previewStats,
        thumbnail: thumbnailStats,
        notes,
      }
    })
  )
}
