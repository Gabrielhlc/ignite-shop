import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useContext } from 'react'

import { CartContext } from '../contexts/cartContext'

import { X } from 'phosphor-react'
import { CartDetails, CartItems, CartModalContainer, CartPage } from '../styles/components/cartModal'

export default function CartModal() {
    const { products, cartPrice } = useContext(CartContext)

    const totalPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(cartPrice / 100)

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
                                    <CartItems>
                                        <div className="image">
                                            <Image src={product.imageUrl} width={102} height={93} alt="" />
                                        </div>
                                        <div>
                                            <span>{product.name}</span>
                                            <strong>{product.priceFormatted}</strong>
                                            <button>Remover</button>
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
                        <button className="buyButton">Finalizar Compra</button>
                    </CartPage>
                </CartModalContainer>
            </Dialog.Content>
        </Dialog.Portal>
    )
}