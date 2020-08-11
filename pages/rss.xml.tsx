import { Component } from 'react'
import { NextPageContext } from 'next'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '../config/info'
import { Post, getAllPosts } from '../api/posts'

const POST_PARAMETER = ['title', 'slug', 'content', 'createdAt'] as const
type RSSPost = Pick<Post, typeof POST_PARAMETER[number]>
const POSTXml = (posts: RSSPost[]) =>
  posts.reduce(
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
  )
const RSSXml = (posts: RSSPost[]) => `<?xml version="1.0" ?>
<rss version="2.0">
<channel>
<title>${SITE_NAME}</title>
<link>${SITE_URL}</link>
<description>${SITE_DESCRIPTION}</description>
<language>ja</language>
<lastBuildDate>${Date.parse(posts[0].createdAt)}</lastBuildDate>
${POSTXml(posts)}
</channel>
</rss>`

export default class Rss extends Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (!res) {
      return
    }
    const posts = getAllPosts(POST_PARAMETER as any)
    res.setHeader('Content-Type', 'text/xml')
    res.write(RSSXml(posts))
    res.end()
  }
}
