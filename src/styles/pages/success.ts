import { styled } from "..";

export const SuccessContainer = styled('main', {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
        marginTop: '4rem',
    },

    p: {
        maxWidth: 560,
        marginTop: '2rem',

        color: '$gray300',
        fontSize: '$xl',
        textAlign: 'center',
        lineHeight: 1.4,
    },

    a: {
        display: 'block',
        marginTop: '5rem',

        color: '$green500',
        fontSize: '$lg',
        textDecoration: 'none',
        fontWeight: 'bold',

        '&:hover': {
            color: '$green300',
        }
    },

    div: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 140,
    height: 140,
    padding: '0.25rem',

    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 1000,

    '&:not(:first-child):not(:last-child)': {
        margin: '0 -52px',
    },

    img: {
        objectFit: 'cover',
    }
})