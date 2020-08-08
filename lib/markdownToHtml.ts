import remark from 'remark'
import basepath from 'remark-basepath'
// @ts-expect-error
import html from 'remark-html'
// @ts-expect-error
import highlight from 'remark-highlight.js'

const isRelativeImage = (str: string) =>
  str.match(/\.\/(.*?.(svg|png|jpg|jpeg|gif)$)/)

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
