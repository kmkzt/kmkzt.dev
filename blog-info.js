const { join } = require('path')

const POSTS_DIRECTORY_NAME = !process.env.IS_PREVIEW ? '_posts' : '_preview'
module.exports.SITE_URL = process.env.VERCEL_URL || 'https://localhost:3000'
module.exports.SITE_NAME = 'kmkzt.dev'
module.exports.SITE_DESCRIPTION = '個人学習の内容を書くブログ。'
module.exports.POSTS_DIRECTORY = join(process.cwd(), POSTS_DIRECTORY_NAME)
module.exports.POSTS_DIRECTORY_NAME = POSTS_DIRECTORY_NAME
module.exports.GITHUB_ACCOUNT = 'kmkzt'
module.exports.TWITTER_ACCOUNT = 'kameikazuto'
module.exports.GA_TRACKING_ID = 'UA-91428067-5'
