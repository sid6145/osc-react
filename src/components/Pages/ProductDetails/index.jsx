import { Grid, Button } from "@mui/material";
import React from "react";
import "./ProductDetails.css";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";

const InfoWrap = ({ title, children, className, style }) => {
  return (
    <div style={style || {}} className={`info-wrap-root ${className || ""}`}>
      <h4>{title}</h4>
      {children}
    </div>
  );
};

const ProductDetails = (props) => {
  // const {} = props
  return (
    <Grid container className="prod-root">
      <Grid item xs={3.5}>
        <div className="prod-img">
          <img
            src={require(`../../../assets/images/B01.jpg`)}
            alt="product-img"
          />
        </div>
        <Grid container spacing={3.3} gap={1.5}>
          {[...Array(5)].map((_, index) => (
            <Grid item md={2} key={index}>
              <div className="prod-img-small">
                <img
                  src={require(`../../../assets/images/B01.jpg`)}
                  alt={`product-${index + 1}`}
                />
              </div>
            </Grid>
          ))}
        </Grid>
        <div className="button-container">
          <Button
            startIcon={<AddShoppingCartOutlinedIcon />}
            className="cart-btn"
            variant="contained"
          >
            Add to Cart
          </Button>
          <Button
            startIcon={<LocalMallIcon />}
            className="buy-btn"
            variant="contained"
            color="secondary"
          >
            Buy Now
          </Button>
        </div>
      </Grid>
      <Grid item xs={8.5}>
        <div className="text-container">
          <h2>Canon EOS 3000D DSLR Camera Body, 18 - 55 mm Lens (Black)</h2>
          <div className="rating-container">
            <div className="star-tag">
              <StarIcon htmlColor="#013678" />
              <p>4.2</p>
            </div>
            <p>Rated by 1896 & 512 Reviewed</p>
          </div>
          <div className="price-info">
            <h4>₹31,000</h4>
            <h5>₹33,995</h5>
            <h6>7% off</h6>
          </div>
          <div className="pincode-input">
            <LocalShippingIcon className="truck-icon" htmlColor="#0149A3" />
            <input type="number" placeholder="Enter Pincode" />
            <button className="pincode-done-btn">
              <DoneIcon htmlColor="#fff" className="done-icon" />
            </button>
          </div>
          <InfoWrap style={{marginBottom: 20}} title={"Highlights"}>
            <ul>
              <li>
                Self-Timer | Type C and Mini HDMI | 9 Auto Focus Points | 35x
                Optical Zoom., Effective Pixels: 18 MP APS-C CMOS sensor-which
                is 25 times larger than a typical Smartphone sensor., Wi-Fi |
                Full HD | Video Recording at 1080 p on 30fps.
              </li>
              <li>Effective Pixels: 18 MP</li>
              <li>Sensor Type: CMOS</li>
            </ul>
          </InfoWrap>
          <InfoWrap title="Description">
            <p>
              If you are a photography enthusiast, then the Canon EOS 3000D DSLR
              Camera is a must-have gadget. Featuring an 18 MP (APS-C) CMOS
              sensor and the DIGIC 4+ imaging processor, you can capture amazing
              photos of your subject at all times, even in low-light conditions.
              Moreover, the remote Live View function lets you control this
              camera remotely using your smartphone so you can capture amazing
              photos even from a distance.
            </p>
          </InfoWrap>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
