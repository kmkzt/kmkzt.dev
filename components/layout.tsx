import Head from 'next/head'
import Link from 'next/link'
import { Global, css } from '@emotion/react'
import { MarkGithub } from '@emotion-icons/octicons/MarkGithub'
import { Heading } from 'rebass'
import { GITHUB_ACCOUNT, BLOG_NAME } from '../config/info'

export default function Layout({ children }) {
  return (
    <>
      <Head>
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
        <a href={`https://github.com/${GITHUB_ACCOUNT}`}>
          <MarkGithub size={30} />
        </a>
      </footer>
    </>
  )
}
