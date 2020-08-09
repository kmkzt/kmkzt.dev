import Head from 'next/head'
import Link from 'next/link'
import { Global, css } from '@emotion/react'
import { Github } from '@emotion-icons/simple-icons/Github'
import { Twitter } from '@emotion-icons/simple-icons/Twitter'
import { Heading, Flex } from 'rebass'
import { GITHUB_ACCOUNT, TWITTER_ACCOUNT, BLOG_NAME } from '../config/info'

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
      <Flex as="header" justifyContent="space-between" px="8px" py="4px">
        <Heading as="h2">
          <Link href="/">
            <a>{BLOG_NAME}</a>
          </Link>
        </Heading>
        <Flex>
          <a href={`https://github.com/${GITHUB_ACCOUNT}`}>
            <Github size={30} />
          </a>
          <a href={`https://twitter.com/${TWITTER_ACCOUNT}`}>
            <Twitter size={30} />
          </a>
        </Flex>
      </Flex>
      <main>{children}</main>
    </>
  )
}
