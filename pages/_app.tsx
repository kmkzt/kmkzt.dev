// import App from 'next/app'
import { useEffect } from 'react'
import Router from 'next/router'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import theme from '../config/theme'
import { pageview } from '../lib/gtag'

// see: https://nextjs.org/docs/advanced-features/custom-app
function MyApp({ Component, pageProps }) {
  // GoogleAnalitics page view
  useEffect(() => {
    Router.events.on('routeChangeComplete', pageview)
    return () => {
      Router.events.off('routeChangeComplete', pageview)
    }
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </ThemeProvider>
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
