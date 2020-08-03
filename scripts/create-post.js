#!/usr/bin/env node
const matter = require('gray-matter')
const { join } = require('path')
const { writeFileSync, mkdir } = require('fs')
// parse argv
const title = process.argv[2]

// Set Time
const time = new Date().toISOString()
const yyyyMMdd = time.replace(/[^0-9]/g, '')

/**
 * Markdown Meta
 * @type {Omit<import("../api/posts").Post, 'slug'>}
 */
const { content, ...info } = {
  content: 'TODO: write contents.',
  title: title || 'TODO: write title',
  tags: '',
  excerpt: '',
  createdAt: time,
  updatedAt: time,
  coverImage: '',
  ogImage: '',
}

/**
 * Write markdown
 */
const writeDir = join(process.cwd(), '_posts', yyyyMMdd)
const mdContent = matter.stringify(content, info)
mkdir(writeDir, { recursive: true }, (err) => {
  if (err) throw err
  writeFileSync(join(writeDir, 'index.md'), mdContent, {
    encoding: 'utf-8',
  })
})
