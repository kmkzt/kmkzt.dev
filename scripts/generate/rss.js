#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  PATH_RSS,
  POSTS_DIRECTORY,
} = require('../../blog-info')

const getDate = (d) => {
  const da = new Date()
  da.setTime(Date.parse(d))
  return da.toUTCString()
}
const postLink = (sl) => `${SITE_URL}/posts/${sl}`
const RSSXml = (posts) => `<?xml version="1.0" ?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
<title>${SITE_NAME}</title>
<link>${SITE_URL}</link>
<description>${SITE_DESCRIPTION}</description>
<atom:link rel="self" href="${SITE_URL}${PATH_RSS}" type="application/rss+xml"/>
<language>ja</language>
<lastBuildDate>${getDate(posts[0].createdAt)}</lastBuildDate>
${posts.reduce(
  (xml, { title, slug, content, createdAt }) =>
    `${xml}<item>
  <title>${title}</title>
  <link>${postLink(slug)}</link>
  <guid isPermaLink="true">${postLink(slug)}</guid>
  <pubDate>${getDate(createdAt)}</pubDate>
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
  fs.writeFileSync(path.join(process.cwd(), 'public', PATH_RSS), RSSXml(posts))
  console.log('Generate Success: rss.xml')
}

generateRSS()
