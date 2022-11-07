import { GetStaticProps } from "next"
import Head from 'next/head'
import Link from 'next/link'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css';

import Image from "next/image"
import { HomeContainer, ProductContainer } from "../styles/pages/home"
import { Handbag } from "phosphor-react"
import { CartContext, Product } from "../contexts/cartContext"
import { useContext } from "react"


interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}



export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  const { setCartProducts } = useContext(CartContext);

  function handleAddProduct(product: Product) {
    setCartProducts(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">

        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id}>
              <ProductContainer className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button onClick={() => handleAddProduct(product)}>
                    <Handbag size={32} weight="bold" />
                  </button>
                </footer>
              </ProductContainer>
            </Link>
          )
        })}

      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}