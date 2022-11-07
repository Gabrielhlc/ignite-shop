import type { AppProps } from 'next/app'

import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app';

import Image from 'next/image';
import { Handbag } from 'phosphor-react';

globalStyles();

// "Layout"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <div>
          <a href="/">
            <Image src={logoImg} alt="" />
          </a>

          <button>
            <Handbag size={24} weight='bold' />
          </button>
        </div>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
