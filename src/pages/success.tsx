import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Stripe from "stripe";
import { stripe } from "../lib/stripe";

import { SuccessContainer } from "../styles/pages/success";
import { ImageContainer } from "../styles/pages/success";

interface SuccessProps {
    customerName: string;
    products: {
        name: string;
        imageUrl: string;
    }[]
}

export default function Success({ customerName, products }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>

                <div>
                    {products.map(product => {
                        return (
                            <ImageContainer>
                                <Image src={product.imageUrl} width={130} height={142} alt="" />
                            </ImageContainer>
                        )
                    })}
                </div>
                <h1>Compra efetuada!</h1>

                <p>
                    Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camiseta(s) já está a caminho da sua casa!
                </p>

                <Link href='/'>
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const sessionId = String(query.session_id);


    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product'],
    });

    const customerName = session.customer_details.name;
    const products = session.line_items.data

    return {
        props: {
            customerName,
            products:
                products.map(item => {
                    const product = item.price.product as Stripe.Product
                    return {
                        name: product.name,
                        imageUrl: product.images[0]
                    }
                })
        }
    }
}