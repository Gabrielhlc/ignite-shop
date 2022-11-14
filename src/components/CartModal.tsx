import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useContext } from 'react'
import axios from 'axios';

import { CartContext, Product } from '../contexts/cartContext'

import { X } from 'phosphor-react'
import { CartDetails, CartItems, CartModalContainer, CartPage } from '../styles/components/cartModal'

export default function CartModal() {
    const { products, cartPrice, removeCartProduct } = useContext(CartContext)

    const totalPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(cartPrice / 100)

    async function handleBuyCart() {
        try {
            const response = await axios.post('/api/checkout', {
                products,
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl
        } catch (err) {
            //Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

            console.log(err)
            alert('Falha ao redirecionar o checkout!')
        }
    }

    function handleRemoveProduct(product: Product) {
        removeCartProduct(product)
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
                <h1>Sacola de compras</h1>
                <CartModalContainer>
                    <Dialog.Close asChild>
                        <button className="close">
                            <X size={24} weight='bold' color='#8d8d99' />
                        </button>
                    </Dialog.Close>
                    <CartPage>
                        <div>
                            <h1>Sacola de compras</h1>
                            {products.map(product => {
                                return (
                                    <CartItems key={product.id}>
                                        <div className="image">
                                            <Image src={product.imageUrl} width={102} height={93} alt="" />
                                        </div>
                                        <div>
                                            <span>{product.name}</span>
                                            <strong>{product.priceFormatted}</strong>
                                            <button onClick={() => handleRemoveProduct(product)}>Remover</button>
                                        </div>
                                    </CartItems>
                                )
                            })}
                        </div>
                        <CartDetails>
                            <div>
                                <p>Quantidade</p>
                                <span>{products.length} itens</span>
                            </div>
                            <div>
                                <strong>Valor total</strong>
                                <strong>{totalPrice}</strong>
                            </div>
                        </CartDetails>
                        <button
                            onClick={handleBuyCart}
                            className="buyButton"
                        >Finalizar Compra</button>
                    </CartPage>
                </CartModalContainer>
            </Dialog.Content>
        </Dialog.Portal>
    )
}