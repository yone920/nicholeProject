import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'


export const client = Client.buildClient({
    domain: "rooted-in-culture-test.myshopify.com",
    storefrontAccessToken: "56092a7ec1c498c4830dfb5b558badc9",
})

const defaultValues = {
    isCartOpen: false,
    toggleCartOpen: () => {},
    removeProductFromCart: () => {},
    cart: [],
    addProductToCart: () => {},
    addCoupon: () => {},
    client,
    checkout: {
        lineItems: [],
    }
}

export const StoreContext = React.createContext(defaultValues)

// Check if it's a browser
const isBrowser = typeof window !== 'undefined'



export const StoreProvider = ({ children }) => {
    const [checkout, setCheckout] = useState(defaultValues.checkout)
    const [isCartOpen, setCartOpen] = useState(false)

    
    
    const toggleCartOpen = () => {
        setCartOpen(!isCartOpen)
    }
    

    /// Create new Checkout and Return it
    const getNewId = async () => {
        try {
            const newCheckout = await client.checkout.create()
            if (isBrowser) {
                localStorage.setItem('checkout_id', newCheckout.id)
            }
            return newCheckout;
        } catch (e) {
            console.error(e)
        }
    }
    
    /// Initialize the checkout and set the sate with the new checkoutId
    const initializeCheckout = async () => {
        try {
            // Check if id exists
            const currentCheckoutId = isBrowser 
            ? localStorage.getItem('checkout_id')
                : null
                
                let newCheckout = null
                if (currentCheckoutId) {
                    // If id exists, fetch checkout from Shopify
                    newCheckout = await client.checkout.fetch(currentCheckoutId)
                    if (newCheckout.completedAt) {
                        newCheckout = await getNewId()
                    }
                } else {
                    // If id does not, create new checkout
                    newCheckout = await getNewId()
                }
                setCheckout(newCheckout)
            } catch (e) {
                console.error(e)
            }
        }
        
        useEffect(() => {
            initializeCheckout()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const addProductToCart = async (variantId) => {
            try {
                const lineItems = [{
                variantId,
                quantity: 1
            }]
            const newCheckout= await client.checkout.addLineItems(
                checkout.id,
                lineItems
            )

            setCheckout(newCheckout)
            // console.log(addItems.webUrl)
            // window.open(addItems.webUrl)
            
        } catch (e) {
            console.error(e)
        }        
    }

    const removeProductFromCart = async (lineItemId) => {
        try {
            const newCheckout= await client.checkout.removeLineItems(
                checkout.id,
                lineItemId
            )

        setCheckout(newCheckout)

        } catch (e) {
            console.error(e)
        }    
    }

    const addCoupon = async (coupon)  => {
        try {
            const newCheckout = await client.checkout.addDiscount(checkout.id, coupon)
            setCheckout(newCheckout)
        } catch (e) {
            console.error(e)
        }
    }

  

    return (
        <StoreContext.Provider value={{
            ...defaultValues,
            checkout,
            addProductToCart,
            removeProductFromCart,
            toggleCartOpen,
            isCartOpen,
            addCoupon
            }}>
            {children}
        </StoreContext.Provider>
    )
}