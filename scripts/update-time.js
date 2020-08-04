#!/usr/bin/env node
const matter = require('gray-matter')
const { join } = require('path')
const { readFile, writeFileSync } = require('fs')

const updateFile = join(process.cwd(), process.argv[2])

// TODO: Add error handling
readFile(updateFile, (err, md) => {
  const { content, data } = matter(md)
  writeFileSync(
    updateFile,
    matter.stringify(content, { ...data, updatedAt: new Date().toISOString() })
  )
})
