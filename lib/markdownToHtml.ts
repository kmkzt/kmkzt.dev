import remark from 'remark'
import basepath from 'remark-basepath'
// @ts-expect-error
import highlight from 'remark-highlight.js'
// @ts-expect-error
import html from 'remark-html'

export default async function markdownToHtml(
  markdown: string,
  basePath: string
): Promise<string> {
  const result = await remark()
    .use(basepath, {
      basePath,
    })
    .use(html)
    .use(highlight)
    .process(markdown)
  return result.toString()
}
