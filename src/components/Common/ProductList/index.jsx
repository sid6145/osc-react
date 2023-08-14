import React from "react";
import "./ProductList.css";
import CustomButton from "../CustomButton";

const ProductList = (props) => {
  const { categoryTitle, onClickViewAll, children } = props;
  return (
    <>
      <div className="product-list-header">
        <h4>{categoryTitle}</h4>
        <CustomButton>View All</CustomButton>
      </div>
      <div className="product-list-root">{children}</div>
    </>
  );
};

export default ProductList;
