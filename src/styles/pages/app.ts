import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: 'center',
    minHeight: '100vh',

    div: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    button: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem',

        position: 'relative',
        right: -136,

        backgroundColor: '$gray800',
        color: '$gray400',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',

        '&:hover': {
            color: '$gray100',
        }
    }
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
})