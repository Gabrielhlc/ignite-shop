import { styled } from "..";

export const CartModalContainer = styled('main', {
    position: "absolute",
    width: 480,
    right: 0,
    top: 0,
    bottom: 0,

    backgroundColor: "$gray800",
    boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

    '.close': {
        position: 'absolute',
        width: 24,
        height: 24,
        left: 432,
        top: 24,

        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
})

export const CartPage = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    maxWidth: '24rem',
    margin: '4.5rem auto 1.5rem',

    '.image': {
        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
        borderRadius: 8,
    },

    img: {
        objectFit: 'cover',
    },

    h1: {
        fontSize: '$lg',
        marginBottom: '2rem',
    },

    '.buyButton': {
        position: 'absolute',
        width: '80%',
        top: 783,

        display: 'flex',
        justifyContent: 'center',
        padding: '1.5rem 2rem',

        background: '$green500',
        color: '$white',
        borderRadius: 8,
        border: 'none',

        fontSize: '$md',
        fontWeight: 'bold',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: '$green300',
        }
    }
})

export const CartItems = styled('div', {
    display: "flex",
    gap: '1.25rem',

    marginBottom: '1.5rem',

    div: {
        display: "flex",
        flexDirection: 'column',
        gap: '0.25rem',
        fontSize: '$md',

        span: {
            fontSize: '$md',
            fontWeight: 400,
        },

        strong: {
            fontSize: '$md',
            fontWeight: 'bold',
        },

        button: {
            maxWidth: '4rem',
            marginTop: 'auto',

            background: 'none',
            color: '$green500',
            border: 'none',

            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
        }
    }
})

export const CartDetails = styled('div', {

    position: 'absolute',
    top: 670,
    // 100% = 480, the parent width
    width: '80%',
    div: {
        display: 'flex',
        justifyContent: 'space-between',

        marginBottom: '0.25rem',

        p: {
            color: '$gray100',
        },

        span: {
            fontSize: '$md',
            color: '$gray300',
        },

        strong: {
            fontSize: '$md',
            color: '$gray100',

            '&:last-child': {
                fontSize: '$lg',
                lineHeight: 1.4,
            }
        }
    }
})