import type { AppProps } from 'next/app'

import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app';
import { CartContextProvider } from '../contexts/cartContext';
import Header from '../components/header';
import NProgress from 'nprogress'
import Router from 'next/router'


Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

globalStyles();

// "Layout"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
