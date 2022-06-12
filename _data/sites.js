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

  if (asset.isCacheValid("1w")) {
    return asset.getCachedValue()
  }

  let sites = await table
    .select({
      sort: [{ field: "Created", direction: "desc" }],
    })
    .all()

  const imageOptions = {
    outputDir: "_site/img",
    cacheOptions: {
      duration: "*",
    },
  }

  console.log(`Fetched ${sites.length} sites from Airtable`)

  sites = await Promise.all(
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

  await asset.save(sites, "json")

  return sites
}
