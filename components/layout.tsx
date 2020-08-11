import { Github } from '@emotion-icons/simple-icons/Github'
import { Twitter } from '@emotion-icons/simple-icons/Twitter'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import { FC } from 'react'
import { Heading, Flex, Box, Link as RELink } from 'rebass'
import { GITHUB_ACCOUNT, TWITTER_ACCOUNT, SITE_NAME } from '../config/info'

const SNSLink = styled(RELink)`
  & > * {
    display: inline-block;
    padding: 0 2px;
  }
`

const Layout: FC = ({ children }) => (
  <>
    <Head>
      {/* <meta
          name="description"
          content={`A statically generated blog example using Next.js and ${SITE_NAME}.`}
        /> */}
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
    <Box width={['100%', '100%', '800px']} mx="auto" minHeight="100vh">
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        px="8px"
        py="4px"
      >
        <Heading as="h1" style={{ textAlign: 'center' }}>
          <Link href="/">
            <a>{SITE_NAME}</a>
          </Link>
        </Heading>
        <Flex justifyContent="center">
          <SNSLink href={`https://twitter.com/${TWITTER_ACCOUNT}`}>
            <Twitter size={24} />
          </SNSLink>
          <SNSLink mr="4px" href={`https://github.com/${GITHUB_ACCOUNT}`}>
            <Github size={24} />
          </SNSLink>
        </Flex>
      </Flex>
      <Box as="main" p="16px">
        {children}
      </Box>
    </Box>
  </>
)

export default Layout
