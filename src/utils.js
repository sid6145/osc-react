import Swal from "sweetalert2";
import axios from "axios"

export const handleAlerts = (title, message, icon, callBack = () => {}) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: icon,
  }).then((result) => callBack(result));
};

export const handleHideEmail = (email) => {
    return `${email.slice(0, 3)}*****${email.slice(
      email.indexOf("@"),
      email.length
    )}`;
}

export const apiClient = {
  post: async (url, payload) => {
    try {
      const response = await axios.post(url, payload);
      return response.data;
    } catch (error) {
      console.log("error in catch", error);
    }
  },
};