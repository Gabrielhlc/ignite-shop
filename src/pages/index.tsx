import { GetStaticProps } from "next"
import Head from 'next/head'
import Link from 'next/link'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { CartContext, Product } from "../contexts/cartContext"
import { useContext } from "react"


import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css';

import Image from "next/image"
import { Handbag } from "phosphor-react"
import { HomeContainer, ProductContainer } from "../styles/pages/home"


interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceFormatted: string;
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
            <ProductContainer className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormatted}</span>
                </div>

                <button onClick={() => handleAddProduct(product)}>
                  <Handbag size={32} weight="bold" />
                </button>
              </footer>
            </ProductContainer>

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
      price: price.unit_amount,
      priceFormatted: new Intl.NumberFormat('pt-BR', {
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