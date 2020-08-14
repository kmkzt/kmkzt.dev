#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const canvas = require('canvas')
const matter = require('gray-matter')
const { POSTS_DIRECTORY } = require('../../blog-info')

const getPostTitle = (slug) => {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}/index.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents, { excerpt: true })
  return data.title
}
const getAllPostsTitle = () => {
  const slugs = fs.readdirSync(POSTS_DIRECTORY)
  return slugs.reduce(
    (tl, slug) => ({
      ...tl,
      [slug]: getPostTitle(slug),
    }),
    {}
  )
}

const W = 600
const H = 315
const LINE_HEIGHT = 30

function getRows(ctx, text) {
  const words = text.split(' ')

  let rows = []
  let currentRow = []
  let tokens = words.slice(0)
  let token
  while ((token = tokens.shift())) {
    const mText = [...currentRow, token].join(' ')
    const measure = ctx.measureText(mText)
    if (measure.width <= W) {
      currentRow.push(token)
    } else {
      rows.push(currentRow.slice())
      currentRow = [token]
    }
  }
  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return rows
}

function renderText(ctx, rows) {
  const rowCount = rows.length
  for (let i = 0; i < rowCount; i++) {
    const rowText = rows[i].join(' ')
    const m = ctx.measureText(rowText)

    const w = (W - m.width) / 2
    // const h = (LINE_HEIGHT + 12) * (i + 1)
    const h = 40 + 210 / 2 - (LINE_HEIGHT + 12) * (rowCount - i - 1)

    ctx.fillText(rowText, w, h)
  }
}

async function generateImage(text, outputPath) {
  const cvs = canvas.createCanvas(W, H)
  const ctx = cvs.getContext('2d')
  ctx.font = `${LINE_HEIGHT}px Impact`

  const rows = getRows(ctx, text)

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = 'black'
  renderText(ctx, rows)

  // const m = ctx.measureText('kmkzt.dev')
  // ctx.fillText('kmkzt.dev', (W - m.width) / 2, 250)
  const buf = cvs.toBuffer()
  fs.writeFileSync(outputPath, buf)
}

async function main() {
  const titleList = getAllPostsTitle()
  Object.entries(titleList).map(([slug, title]) => {
    const dir = path.join(process.cwd(), `public/posts/${slug}`)
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        console.error(`Generate Error: ${dir}/ogp.png ${title}.` + err)
        return
      }
      generateImage(title, `${dir}/ogp.png`)
      console.log(`Generate Success: ${dir}/ogp.png ${title}`)
    })
  })
}
main()
