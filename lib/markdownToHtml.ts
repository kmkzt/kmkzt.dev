import remark from 'remark'
import { Plugin } from 'unified'
import { Node } from 'unist'
import visit from 'unist-util-visit-parents'
// @ts-expect-error
import html from 'remark-html'
// @ts-expect-error
import highlight from 'remark-highlight.js'

const isRelativeImage = (str: string) =>
  str.match(/\.\/(.*?.(svg|png|jpg|jpeg|gif)$)/)

interface ImageNode extends Node {
  type: 'image'
  title: any
  url: string
  alt: string
  position: any
}
const baseImagePath: Plugin<[string], Partial<remark.RemarkOptions>> = (
  base
) => (tree) =>
  visit(tree, 'image', (node: ImageNode, parents) => {
    // console.log('node: ', node)
    // console.log('parents: ', parents)
    const image = isRelativeImage(node.url)
    if (image) {
      const siblings: any = parents[parents.length - 1].children
      siblings[siblings.indexOf(node)] = {
        ...node,
        url: `${base}/${image[1]}`,
      }
    }
  })

export default async function markdownToHtml(
  markdown: string,
  basePath: string
): Promise<string> {
  const result = await remark()
    .use(baseImagePath, basePath)
    .use(html)
    .use(highlight)
    .process(markdown)
  return result.toString()
}
