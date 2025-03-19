import React, { useContext } from 'react'
import { AppContext } from '@/context/AppContext'
import NewCartCard from '../NewCartCard/NewCartCard'

const NewOrderProductList = ({ setSuccessPromocode, successPromocode, deliveryCharge }) => {
    const { cart } = useContext(AppContext)
    return (
        <div className='cartItemsDiv'>
            {
                cart && cart.cartItems && cart.cartItems.map((product, index) =>
                    <div style={{ margin: "5px 10px" }}>
                        <NewCartCard key={index} product={product} isLast={index === cart.cartItems.length - 1} setSuccessPromocode={setSuccessPromocode} successPromocode={successPromocode} deliveryCharge={deliveryCharge} />
                        {index !== cart.cartItems.length - 1 && (
                            <div style={{
                                width: "100%",
                                height: "1px",
                                backgroundColor: "#E8E6E6"
                            }}></div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default NewOrderProductList