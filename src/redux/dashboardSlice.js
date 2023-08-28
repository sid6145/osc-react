import { createSlice } from "@reduxjs/toolkit";
import {
  CATEGORIES,
  FEATURED,
  SIMILAR,
  RECENTLYVIEWED,
  CART,
} from "../constants";

const initialState = {
  isLoggedIn: false,
  featuredProducts: null,
  categories: null,
  similarProducts: null,
  recentlyViewedProducts: null,
  productDetails: null,
  productCategories: null,
  cart: [],
  cartCount: 0,
};

const deleteCartItem = (state, prodId) => {
  state.cart = state.cart.filter((item) => item.productId !== prodId);
};

export const dashboardSlice = createSlice({
  name: "dasboard",
  initialState,
  reducers: {
    fetchDashboardData: (state, action) => {
      action.payload.forEach((item) => {
        if (item.TYPE === FEATURED) {
          state.featuredProducts = item[FEATURED]?.length
            ? item[FEATURED]
            : null;
        } else if (item.TYPE === CATEGORIES) {
          state.categories = item[CATEGORIES]?.length ? item[CATEGORIES] : null;
        } else if (item.TYPE === RECENTLYVIEWED) {
          state.recentlyViewedProducts = item[RECENTLYVIEWED]?.length
            ? item[RECENTLYVIEWED]
            : null;
        } else if (item.TYPE === SIMILAR) {
          state.similarProducts = item[SIMILAR]?.length ? item[SIMILAR] : null;
        } else if (item.TYPE === CART) {
          state.cart = item[CART]?.length ? item[CART] : [];
          state.cartCount = item[CART]?.length;
        }
      });
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setCategories: (state, action) => {
      state.productCategories = action.payload;
    },
    addToCart: (state, action) => {
      const prodIndex = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (prodIndex > 0) {
        state.cart[prodIndex].cartQty += 1;
      } else {
        const newCartItem = { ...action.payload, cartQty: 1 };
        state.cart = [...state.cart, newCartItem];
      }
    },
    setCartData: (state, action) => {
      state.cart = action.payload
    },
    handleProdQuantityUpdate: (state, action) => {
      const { prodId, shouldIncrease } = action.payload;
      state.cart = state.cart.map((item) => {
        if (item?.productId === prodId) {
          if (item.cartQty < 1) {
            return item;
          } else {
            return {
              ...item,
              cartQty: shouldIncrease ? item.cartQty + 1 : item.cartQty - 1,
            };
          }
        }
        return item;
      });
    },
    handleDeleteCartItem: (state, action) => {
      deleteCartItem(state, action.payload);
    },
    handleCartCountChange: (state, action) => {
      state.cartCount = state.cart.length;
    },
    handleIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  fetchDashboardData,
  setProductDetails,
  setCategories,
  addToCart,
  handleProdQuantityUpdate,
  handleDeleteCartItem,
  handleCartCountChange,
  handleIsLoggedIn,
  setCartData
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
