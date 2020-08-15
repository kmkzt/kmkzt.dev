import { extractCritical } from '@emotion/server'
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { GA_TRACKING_ID, SITE_NAME } from '../blog-info'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = extractCritical(initialProps.html)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    }
  }

  render() {
    return (
      <html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                'window.dataLayer = window.dataLayer || [];' +
                'function gtag(){dataLayer.push(arguments);}' +
                "gtag('js', new Date());" +
                `gtag('config', '${GA_TRACKING_ID}', {` +
                'page_path: window.location.pathname,' +
                '});',
            }}
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title={SITE_NAME}
            href="/rss.xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
