#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { SITE_NAME, SITE_URL, SITE_DESCRIPTION } = require('../../blog-info')
const { POSTS_DIRECTORY } = require('../../blog-info.js')
const RSSXml = (posts) => `<?xml version="1.0" ?>
<rss version="2.0">
<channel>
<title>${SITE_NAME}</title>
<link>${SITE_URL}</link>
<description>${SITE_DESCRIPTION}</description>
<language>ja</language>
<lastBuildDate>${Date.parse(posts[0].createdAt)}</lastBuildDate>
${posts.reduce(
  (xml, { title, slug, content, createdAt }) =>
    `${xml}<item>
  <title>${title}</title>
  <link>
    ${`${SITE_URL}/posts/${slug}`}
  </link>
  <pubDate>${createdAt}</pubDate>
  <description>
    <![CDATA[${
      // TODO: fix contennt. replace html string.
      // content
      ''
    }]]>
  </description>
</item>`,
  ''
)}
</channel>
</rss>`

const getPost = (slug) => {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}/index.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents, { excerpt: true })
  return {
    ...data,
    content,
    slug,
  }
}
const getAllPosts = () => {
  const slugs = fs.readdirSync(POSTS_DIRECTORY)
  return slugs.map(getPost)
}
const generateRSS = () => {
  const posts = getAllPosts()
  fs.writeFileSync(path.join(process.cwd(), 'public/rss.xml'), RSSXml(posts))
  console.log('Generate Success: rss.xml')
}

generateRSS()
