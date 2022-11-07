import { createContext, ReactNode, useState } from "react";

export interface Product {
    name: string;
    imageUrl: string;
    price: string;
}

interface CartContextType {
    products: Product[]
    setCartProducts: (product: Product) => void;
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
    children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {

    const [products, setProducts] = useState<Product[]>([]);

    function setCartProducts(product: Product) {
        var contains = false
        products.map(productOnCart => {
            if (productOnCart.name === product.name) {
                contains = true
            }
        })
        if (!contains) {
            setProducts((state) => {
                return [...state, product]
            })
        }
    }

    return (
        <CartContext.Provider
            value={{
                products,
                setCartProducts
            }}
        >
            {children}
        </CartContext.Provider>
    )
} 