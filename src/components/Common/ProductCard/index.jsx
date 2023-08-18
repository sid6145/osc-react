import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ProductCard.css";
import { useState } from "react";

const ProductCard = (props) => {
  const { image, title, price, discountedPrice, percentOff } = props;
  const [favorites, setFavorites] = useState(false);
  return (
    <div className="product-card-root">
      <div className="product-image-root">
        <img src={image} alt="product-img" />
      </div>
      <div className="product-details">
        <div className="product-title">
          <h4>{title}</h4>
          {price && (
            <button
              onClick={() => setFavorites(!favorites)}
              className="favorite-btn"
            >
              <FavoriteIcon htmlColor={favorites ? "#DC0D0D" : "#E6E6E6"} />
            </button>
          )}
        </div>
        <div className="product-price">
          <h4>{price}</h4>
          <h5>{discountedPrice}</h5>
          <h6>{percentOff}</h6>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
