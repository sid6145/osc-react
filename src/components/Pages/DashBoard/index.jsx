import React from "react";
import ProductList from "../../Common/ProductList";
import { useEffect } from "react";
import { apiClient } from "../../../utils";
import { URLS } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../../redux/dashboardReducer";
import "./DashBoard.css";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const getDashboardData = async () => {
    const payload = {
      userId: userData.userId,
      sessionId: userData.sessionId,
    };
    const response = await apiClient.post(URLS.DASHBOARD, payload);
    console.log("response", response);
    if (response?.code === 200) {
      dispatch(
        fetchDashboardData(
          response?.dataObject?.data.length ? response.dataObject.data : []
        )
      );
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const {
    featuredProducts,
    categories,
    recentlyViewedProducts,
    similarProducts,
  } = useSelector((state) => state.dashboardReducer);

  console.log("categories", categories);
  return (
    <div className="dashboar-root">
      <h2>{userData.sessionId}</h2>
      {!recentlyViewedProducts && categories && ( 
        <ProductList categoryTitle="Categories" productData={categories} />
      )}
      {featuredProducts && (
        <ProductList categoryTitle="Featured" productData={featuredProducts} />
      )}
      {recentlyViewedProducts && (
        <ProductList
          categoryTitle="Last viewed products"
          productData={recentlyViewedProducts}
        />
      )}
      {similarProducts && (
        <ProductList categoryTitle="Similar" productData={similarProducts} />
      )}
      {recentlyViewedProducts && categories && (
        <ProductList categoryTitle="Categories" productData={categories} />
      )}
    </div>
  );
};

export default Dashboard;
