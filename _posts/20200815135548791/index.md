---
title: Next.jsとVercelを利用してMarkdownで気軽に記事を書けるブログを作る。
tags: 'Next.js, Markdown'
createdAt: '2020-08-15T13:55:48.791Z'
updatedAt: '2020-10-13T08:06:23.646Z'
---

## なぜ、Markdown でブログを作りたいか？

少し前に Wordpress を利用してブログを作っていたが、CMS のサービスだとログインしたり、wysiwyg エディタで書くのが手間になり、面倒になってやめたことがありました。

メモ書き程度の内容を綺麗にまとめて公開できるようなブログが欲しかったので作りました。

## どんなブログを作りたいか？

マークダウンで記事を作成する場合、下記のような点が便利だと思っています。

- マークダウンで書ける。
- コード(GitHub)と連動して更新される。

逆にマークダウンで管理する場合に下記は手間だと思ってました。

- 更新日時が自動更新されない。
- 画像のアップロードシステムがないため、画像管理が難しそう。

この辺りが解決できるブログを作りました。

## どうやって作ったか？

基本的には Vercel と next.js を利用すれば簡単に作れることが分かったので下記の [Next.js の examples](https://github.com/Vercel/next.js/tree/canary/examples) の内容から拝借して作成しました。
これを利用すると\_posts というディレクトリにマークダウンを追加すると記事が公開されるブログが作れます。Vercel と連携すると URL で公開できます。

https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript

### 日時を更新するコマンドラインの作成

examples の実装で利用していた[`gray-matter`](https://github.com/jonschlinkert/gray-matter)というライブラリを活用して cli で日時更新できるようにしました。
下記のような設定を追加して新規作成と記事更新時に日時を反映するイメージです。

下記は新規作成のスクリプトで、`create-post.js hello-world`のような感じで実行するとテンプレートが書き出されます。

```js
// create-post.js
#!/usr/bin/env node
const matter = require('gray-matter')
const { join } = require('path')
const { writeFileSync, mkdir } = require('fs')

// タイトル情報の取得
const title = process.argv[2]

// 日時情報
const time = new Date().toISOString()
const yyyyMMdd = time.replace(/[^0-9]/g, '')

// 記事のテンプレートの情報
const { content, ...info } = {
  content: 'TODO: write contents.',
  title: title || 'TODO: write title',
  tags: '',
  createdAt: time,
  updatedAt: time,
}

// mdファイルの書き出し
/**
このような内容が書き出されます
---
title: hello-world
tags: ''
createdAt: '2020-08-15T16:13:34.405Z'
updatedAt: '2020-08-15T16:13:34.405Z'
---
TODO: write contents.
*/
const writeDir = join(process.cwd(), '_posts', yyyyMMdd)
const mdContent = matter.stringify(content, info)
mkdir(writeDir, { recursive: true }, (err) => {
  if (err) throw err
  writeFileSync(join(writeDir, 'index.md'), mdContent, {
    encoding: 'utf-8',
  })
})
```

日時更新は`update-post.js ./_posts/hello-world/index.md`のようにマークダウンファイルを指定すると今の日時に更新されるようにしました。

```js
// update-post.js
#!/usr/bin/env node
const matter = require('gray-matter')
const { join } = require('path')
const { readFile, writeFileSync } = require('fs')


const updateFile = join(process.cwd(), process.argv[2])

readFile(updateFile, (err, md) => {
  const { content, data } = matter(md)
  writeFileSync(
    updateFile,
    // 日時を更新して上書き
    matter.stringify(content, { ...data, updatedAt: new Date().toISOString() })
  )
})

```

#### コミット前に日時を自動で更新される設定の追加

これだけだと手動での手間が多いのでコミット前に日時を更新してくれるように設定を追加しました。[`husky`](https://github.com/typicode/husky)と[`lint-staged`](https://github.com/okonet/lint-staged)を利用して下記のようなシェルをコミット前に実行するようにしました。


```sh
git diff --name-only --staged --diff-filter=M | \ 
grep -E "_posts/.*.md$" | \ 
xargs -L 1 scripts/update-time.js
```

### 一つのディレクトリに画像を含めて記事をまとめる。

既存のコードでは\_posts/ 内で記事、public/ 内で画像を管理していたためパスの呼び出しが長く管理しづらいと思っていました。
一つのディレクトリに画像を含めて記事をまとめて相対パスで呼び出せるように変更しました。

```md
// 現状のディレクトリ構成。'/assets/blog/hello-world/cover.jpg'と書いて呼び出す。
./
├── \_posts/hello-world.md
└── public/posts/hello-world/cover.jpg

// 変更したい内容。'./cover.jpg'で記事を書けるようにしたい。
\_posts/hello-world
├── cover.jpg
└── index.md
```

そのために下記の二つの設定を追加しました。

- ビルド時に\_posts にある画像を public ディレクトリにコピーする。
- html レンダリング時に相対パスをベースのパスに書き換える

#### \_posts にある画像を public ディレクトリにコピーする。

webpack に plugin の設定 を追加することで\_posts ディレクトリ内の画像をコピーできます。
下記で必要なライブラリをインストールします。
`yarn add -D copy-webpack-plugin write-file-webpack-plugin`

```js
// next.config.js
const { resolve } = require('path')
const CopyFilePlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  webpack(config, { dev, isServer }) {
    config.plugins.push(
      new CopyFilePlugin({
        patterns: [
          {
            context: '_posts',
            from: '**/*.{jpg,png}',
            to: resolve(__dirname, 'public/posts'),
          },
        ],
      }),
      // 開発時に必要なplugin
      new WriteFilePlugin()
    )
    return config
  },
}
```

#### html レンダリング時に相対パスをベースのパスに書き換える

remark というライブラリでマークダウンの相対パスをベースのパスに書き換える設定を追加しました。

例えば、`./cover.jpg`のベースパスを`/posts/hello-world`に設定すると`/posts/hello-world/cover.jpg`に変換する設定です。

```js
import visit from 'unist-util-visit-parents'

// イメージのURLを判定してつなぎ合わせるパスを抽出
const isRelativeImage = (str) => str.match(/\.\/(.*?.(svg|png|jpg|jpeg|gif)$)/)

const convertToBasePath = ({ basePath }) => (tree) =>
  // Markdownの画像表示部分を抽出して形式を変換する。
  visit(tree, 'image', (node, parents) => {
    const image = isRelativeImage(node.url)
    if (image) {
      const siblings = parents[parents.length - 1].children
      siblings[siblings.indexOf(node)] = {
        ...node,
        url: `${basePath}/${image[1]}`,
      }
      return
    }
  })

export default async function markdownToHtml(markdown, basePath) {
  const result = await remark()
    .use(convertToBasePath, {
      basePath,
    })
    .use(html)
    .use(highlight)
    .process(markdown)
  return result.toString()
}
```

ページコンポーネントから呼び出す場合は下記のように設定します。

```js
export async function getStaticProps({ params }) {
  const info = getPostBySlug(params.slug, [
    'title',
    'createdAt',
    'updatedAt',
    'slug',
    'content',
  ])
  const content = await markdownToHtml(
    info.content || '',
    // ここに画像のベースとなるパスを設定する。
    `/posts/${params.slug}`
  )

  return {
    props: {
      ...info,
      content,
    },
  }
}
```

実際のコード差分を一応載せときます。

https://github.com/kmkzt/kmkzt.dev/commit/0b16c3a14ab0614575061208c495a33b3207bdfa

マークダウンのベースのパス設定をいろんなとこで使い回したかったのでこちらに npm に公開しました。
使ってみた方いたら感想などを教えてください。

[remark-basepath](https://github.com/kmkzt/remark-basepath)

## 今後やっていきたいこと

### amp 対応

Next.js で amp が簡単に対応できそうなのでその辺りを作っていきたいです。
記事の本体は Amp のスタイルの制限などを気にせずに開発して、Amp ページは別でスタイルを管理できるかみたいなことを試したいです。

### Vercel を利用したプレビュー環境、リリースフロー

Vercel はこまめデプロイされるので PR 毎にプレビュー環境を簡単に作れそうと感じたのその辺り試したいです。環境変数が production, development,preview に分けることができるのですが設定間違えると本番環境や情報がアクセスしてしまいそうなのでどのように管理すると良いかまとめたいです。
