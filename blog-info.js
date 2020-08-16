const { join } = require('path')

const POSTS_DIRECTORY_NAME = !process.env.IS_PREVIEW ? '_posts' : '_preview'
exports.SITE_URL = `https://${
  process.env.SITE_URL || process.env.VERCEL_URL || 'localhost:3000'
}`
exports.SITE_NAME = 'kmkzt.dev'
exports.SITE_DESCRIPTION = 'WEBサイト制作者の個人学習内容を書くブログ。'
exports.POSTS_DIRECTORY = join(process.cwd(), POSTS_DIRECTORY_NAME)
exports.POSTS_DIRECTORY_NAME = POSTS_DIRECTORY_NAME
exports.GITHUB_ACCOUNT = 'kmkzt'
exports.TWITTER_ACCOUNT = 'kameikazuto'
exports.GA_TRACKING_ID = 'UA-91428067-5'
