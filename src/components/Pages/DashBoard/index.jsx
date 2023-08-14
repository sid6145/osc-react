import React from "react";
import ProductList from "../../Common/ProductList";
import ProductCard from "../../Common/ProductCard";
import { useEffect } from "react";
import { apiClient } from "../../../utils";
import { URLS } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../../redux/dashboardReducer";

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

  return (
    featuredProducts?.length && (
      <ProductList categoryTitle="Last viewed products">
        {featuredProducts.map((item, index) => (
            <ProductCard
              key={`featured-product-${index}`}
              price="₹31,499"
              discountedPrice="₹33,995"
              percentOff="7% off"
              title="Canon EOS 3000D"
            />
        ))}
      </ProductList>
    )

  )
};

export default Dashboard;
