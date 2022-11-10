import Image from "next/image";
import Link from "next/link";
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from "react";

import { CartContext } from "../contexts/cartContext";
import CartModal from "./CartModal";

import logoImg from '../assets/logo.svg'
import { Handbag } from "phosphor-react";
import { CartCounter, HeaderContainer } from "../styles/components/header";

export default function Header() {

    const [modalOpen, setModalOpen] = useState(false);

    const { products } = useContext(CartContext)
    return (
        <HeaderContainer>
            <div>
                <Link href="/">
                    <Image src={logoImg} alt="" />
                </Link>

                <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
                    <Dialog.Trigger asChild>
                        <button onClick={() => setModalOpen(true)}>
                            {products.length > 0 ? (
                                <CartCounter>
                                    {products.length}
                                </CartCounter>
                            ) : null}
                            <Handbag size={24} weight='bold' />
                        </button>
                    </Dialog.Trigger>
                    <CartModal />
                </Dialog.Root>

            </div>
        </HeaderContainer>
    )
}