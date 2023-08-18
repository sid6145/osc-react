import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES, FEATURED, SIMILAR, RECENTLYVIEWED } from "../constants";

const initialState = {
  featuredProducts: null,
  categories: null,
  similarProducts: null,
  recentlyViewedProducts: null,
};

export const dashboardReducer = createSlice({
  name: "dasboard",
  initialState,
  reducers: {
    fetchDashboardData: (state, action) => {
      action.payload.forEach((item) => {
        if (item.TYPE === FEATURED) {
          state.featuredProducts = item[FEATURED]?.length ? item[FEATURED] : null;
        } else if (item.TYPE === CATEGORIES) {
          state.categories = item[CATEGORIES]?.length ? item[CATEGORIES] : null;
        } else if (item.TYPE === RECENTLYVIEWED) {
          state.recentlyViewedProducts = item[RECENTLYVIEWED]?.length
            ? item[RECENTLYVIEWED]
            : null;
        } else if (item.TYPE === SIMILAR) {
          state.similarProducts = item[SIMILAR]?.length ? item[SIMILAR] : null;
        }
      });
    },
  },
});

export const { fetchDashboardData } = dashboardReducer.actions;

export default dashboardReducer.reducer;
