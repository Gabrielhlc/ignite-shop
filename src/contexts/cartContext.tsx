import { createContext, ReactNode, useState } from "react";

export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceFormatted: string;
    defaultPriceId: string;
}

interface CartContextType {
    products: Product[]
    setCartProducts: (product: Product) => void;
    cartPrice: number;
    removeCartProduct: (product: Product) => void;
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
    children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {

    const [products, setProducts] = useState<Product[]>([]);
    const [cartPrice, setCartPrice] = useState(0)

    function setCartProducts(product: Product) {
        if (!products.includes(product)) {
            setProducts((state) => {
                return [...state, product]
            })
            setCartPrice((state) => {
                return state + parseInt(product.price)
            })
        }
    }

    function removeCartProduct(product: Product) {
        setProducts(state => {
            return [...state.filter(productOnCart => {
                return productOnCart.id !== product.id
            })]
        })
        setCartPrice(state => {
            return state - parseInt(product.price)
        })
    }

    return (
        <CartContext.Provider
            value={{
                products,
                cartPrice,
                setCartProducts,
                removeCartProduct
            }}
        >
            {children}
        </CartContext.Provider>
    )
} 