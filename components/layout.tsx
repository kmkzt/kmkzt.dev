import Head from 'next/head'
import Link from 'next/link'
import { Global, css } from '@emotion/react'
import { Heading } from 'rebass'
import { GITHUB_ACCOUNT, BLOG_NAME } from '../config/info'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <meta
          name="description"
          content={`A statically generated blog example using Next.js and ${BLOG_NAME}.`}
        />
        {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
      </Head>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            min-height: 100%;
            min-height: 100vh;
            font-family: Helvetica, Arial, sans-serif;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          a {
            color: inherit;
            text-decoration: inherit;
          }
          img {
            max-width: 100%;
          }
        `}
      />
      <header>
        <Heading as="h2">
          <Link href="/">
            <a>{BLOG_NAME}</a>
          </Link>
        </Heading>
      </header>
      <main>{children}</main>
      <footer>
        <a href={`https://github.com/${GITHUB_ACCOUNT}`}>View on GitHub</a>
      </footer>
    </>
  )
}
