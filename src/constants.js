// const BASE_URL_ONE = "http://192.168.99.141:8080/user"; //AYUSH
// const BASE_URL_TWO = "http://192.168.99.141:8088/user"; //AYUSH

// api urls -

// const BASE_URL_ONE = "http://192.168.99.141:8080"
// const BASE_URL_TWO = "http://192.168.99.141:8088"
// const BASE_URL_ONE = "http://localhost:8000";
// const BASE_URL_TWO = "http://localhost:8000";


// SAURABH
const BASE_URL_ONE = "http://localhost:8085"
const BASE_URL_TWO = "http://localhost:8085"
const BASE_URL_THREE = "http://localhost:8085"


// export const SOCKET_BASE_URL = "ws://192.168.99.141:8888";
export const SOCKET_BASE_URL = "ws://192.168.99.110:8888";

export const URLS = {
  SIGN_UP: `${BASE_URL_ONE}/user/signup`,
  VERIFY_OTP: `${BASE_URL_ONE}/user/validateotp`,
  ADD_PASSWORD: `${BASE_URL_ONE}/user/addUserDetails`,
  LOGIN: `${BASE_URL_THREE}/user/login`,
  LOGOUT: `${BASE_URL_THREE}/user/logout`,
  FORGOT_PASSWORD: `${BASE_URL_THREE}/user/forgotPassword`,
  OTP_FORGOT_PASS: `${BASE_URL_THREE}/user/validateOTPForForgotPassword`,
  CHANGE_PASSOWRD: `${BASE_URL_THREE}/user/changePassword`,
  RESEND_OTP: `${BASE_URL_TWO}/user/resendotp`,
  DASHBOARD: `${BASE_URL_TWO}/user/dashboard`
};

// common value contants
export const WEBSOCKET_PROTOCOL = "OSC-WebSocket-Protocol";
export const DEVICE_TYPE = "web";

// Product Types
export const FEATURED = "Featured Products";
export const CATEGORIES = "Categories";
export const SIMILAR = "Similar Products";
export const RECENTLYVIEWED = "Recently Viewed Products";
export const CART = "Cart"