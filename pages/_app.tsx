// import App from 'next/app'
import { cache } from '@emotion/css'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { pageview } from '../lib/gtag'
import theme from '../lib/theme'

// see: https://nextjs.org/docs/advanced-features/custom-app
function MyApp({ Component, pageProps }: AppProps) {
  // GoogleAnalitics page view
  useEffect(() => {
    Router.events.on('routeChangeComplete', pageview)
    return () => {
      Router.events.off('routeChangeComplete', pageview)
    }
  }, [])
  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <Component {...pageProps} />
        </CacheProvider>
      </ThemeProvider>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async appContext => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)

//   return { ...appProps }
// }

export default MyApp
