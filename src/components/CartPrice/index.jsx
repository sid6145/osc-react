import React from 'react'
import "./CartPrice.css"

const CartPrice = (props) => {
    const {totalCartPrice, increasedValue} = props
  return (
    <div className='cart-price-root'>
        <h4>Amount Details</h4>
        <div className='cart-price-data'>
            <p>Price (2 items)</p>
            <p>₹ {totalCartPrice}</p>
        </div>
        <div className='cart-price-data'>
            <p>Discount</p>
            <p>-₹{parseInt(increasedValue - totalCartPrice)}</p>
        </div>
        <div className='cart-price-data'>
            <p>Delivery Charges</p>
            <p>Free</p>
        </div>
        <div className='cart-price-data'>
            <p>Total</p>
            <p>{totalCartPrice}</p>
        </div>
    </div>
  )
}

export default CartPrice