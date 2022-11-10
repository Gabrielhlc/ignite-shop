import { styled } from ".."

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    div: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    button: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem',

        position: 'relative',

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

export const CartCounter = styled('strong', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    width: '1.5rem',
    height: '1.5rem',
    right: -7,
    top: -7,

    backgroundColor: '$green500',
    color: '$white',
    fontSize: 14,
    fontWeight: 'bold',
    border: '3px solid $gray900',
    borderRadius: 1000,
})