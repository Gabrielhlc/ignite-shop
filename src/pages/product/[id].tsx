import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";

import Stripe from "stripe";
import { stripe } from "../../lib/stripe"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { CartContext } from "../../contexts/cartContext";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        priceFormatted: string;
        description: string;
        defaultPriceId: string;
    }
}

export default function Product({ product }: ProductProps) {
    // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const { setCartProducts } = useContext(CartContext)

    function handleBuyProduct() {

        setCartProducts(product)
        // try {
        //     setIsCreatingCheckoutSession(true);
        //     const response = await axios.post('/api/checkout', {
        //         priceId: product.defaultPriceId,
        //     })

        //     const { checkoutUrl } = response.data;

        //     window.location.href = checkoutUrl
        // } catch (err) {
        //     //Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

        //     setIsCreatingCheckoutSession(false);

        //     alert('Falha ao redirecionar o checkout!')
        // }
    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.priceFormatted}</span>

                    <p>{product.description}</p>

                    <button onClick={handleBuyProduct}>
                        Colocar na sacola
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {

        // Produtos mais acessados / vendidos
        paths: [
            { params: { id: 'prod_MjbgRbUZphoBeu' } }
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount,
                priceFormatted: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount! / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}