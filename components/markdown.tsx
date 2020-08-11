import Head from 'next/head'
import styled from '@emotion/styled'
import { ThemeProps } from '../config/theme'

const MarkdownWrap = styled.div<ThemeProps>`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 24px 0 8px;
  }
  pre {
    margin: 8px 0;
  }
  code {
    background: #ccc;
  }
  code.hljs {
    background: #272822;
    padding: 12px 16px;
  }
  table {
    border-collapse: collapse;
  }
  th {
    background: #999;
  }
  td {
    background: #eee;
  }
  th,
  td {
    border: 1px solid #fff;
    padding: 4px 8px;
  }
  a:link,
  a:visited {
    color: ${({ theme }) => theme?.colors?.primary || '#16f'};
  }
  img {
    max-width: 100%;
  }
`
export default function Markdown({ content }: { content: string }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/monokai.min.css"
        />
      </Head>
      <MarkdownWrap>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </MarkdownWrap>
    </>
  )
}
