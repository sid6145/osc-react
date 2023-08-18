import React from 'react'
import prodImg from "../../../assets/images/B03.jpg"
import DeleteIcon from '@mui/icons-material/Delete';
import "./CartItem.css"
import { IconButton } from '@mui/material';

const CartItem = () => {
  return (
    <div className='cart-item-root'>
        <div className='prod-image-container'>
            <img src={prodImg} alt='product-data' />
        </div>
        <div className='prod-text-container'>
            <p>Sigma 50mm f/1.8</p>
            <div className='prod-price'>
                <h4>₹9,500</h4>
                <h5>₹8450</h5>
                <h6>16% off</h6>
            </div>
        </div>
            <IconButton>
                <DeleteIcon />
            </IconButton>
    </div>
  )
}

export default CartItem