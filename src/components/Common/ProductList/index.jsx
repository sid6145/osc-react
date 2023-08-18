import React from "react";
import "./ProductList.css";
import CustomButton from "../CustomButton";
import ProductCard from "../ProductCard";
import { Grid } from "@mui/material";

const ProductList = (props) => {
  const { categoryTitle, onClickViewAll, productData } = props;
  return (
    <div className="product-list-root">
      <div className="product-list-header">
        <h4>{categoryTitle}</h4>
        <CustomButton>View All</CustomButton>
      </div>
      <Grid container spacing={3} className="product-list">
        {productData.map((item, index) => (
          <Grid className="product-list-item" item md={2}>
            <ProductCard
              key={`featured-product-${index}`}
              price={item?.prodMarketPrice}
              percentOff={item?.prodMarketPrice && "%7 off"}
              title={item?.prodName || item?.categoryName}
              image={item?.productId || item?.categoryId ? require(`../../../assets/images/${item.productId || item.categoryId}.jpg`) : null}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
