const Airtable = require("airtable")
const MarkdownIt = require("markdown-it")
const Image = require("@11ty/eleventy-img")
const { AssetCache } = require("@11ty/eleventy-fetch")

const md = new MarkdownIt()

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID)
const table = base("Websites")

module.exports = async function () {
  const asset = new AssetCache("airtable_sites")

  let sites
  if (asset.isCacheValid("2h")) {
    sites = await asset.getCachedValue()
    console.log(`Using ${sites.length} cached sites from Airtable`)
  } else {
    sites = await table
      .select({
        sort: [{ field: "Created", direction: "desc" }],
      })
      .all()
    await asset.save(sites, "json")
    console.log(`Fetched ${sites.length} sites from Airtable`)
  }

  const imageOptions = {
    outputDir: "_site/img",
    cacheOptions: {
      duration: "*",
    },
  }

  sites = await Promise.all(
    sites.map(async ({ fields }) => {
      const preview = fields.Attachments[0].url
      const thumbnail = fields.Attachments[0].thumbnails.large.url

      const [previewStats, thumbnailStats] = await Promise.all([
        Image(preview, imageOptions),
        Image(thumbnail, imageOptions),
      ])

      return {
        link: fields.Link,
        name: fields.Name,
        preview: previewStats,
        thumbnail: thumbnailStats,
        notes: fields.Notes,
        date: fields.Created,
      }
    })
  )

  return sites
}
