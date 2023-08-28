import Swal from "sweetalert2";

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