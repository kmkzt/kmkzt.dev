import remark from 'remark'
import html from 'remark-html'
// @ts-expect-error
import highlight from 'remark-highlight.js'

export default async function markdownToHtml(markdown) {
  // @ts-ignore
  const result = await remark().use(html).use(highlight).process(markdown)
  return result.toString()
}
