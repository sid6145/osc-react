import moment from "moment/moment";
import { SOCKET_BASE_URL, WEBSOCKET_PROTOCOL, DEVICE_TYPE } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setProductDetails,
  setCategories,
  fetchDashboardData,
  handleIsSocketConnected,
} from "../redux/dashboardSlice";
import { setCartData } from "../redux/dashboardSlice";
let socket = null;
let hbInterval = null;
let msgReceivedInterval = null;
let setTimeStamp = null;
let currentTime = null;

const useSocket = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const headers = [
    WEBSOCKET_PROTOCOL,
    userData.userId,
    userData.sessionId,
    DEVICE_TYPE,
  ];
  const dispatch = useDispatch();

  const sendMessage = (payload) => {
    console.log("payload::", payload);
    socket.send(JSON.stringify(payload));
  };

  const connectWebsocket = () => {
    console.log("CALLED::::");
    socket = new WebSocket(SOCKET_BASE_URL, headers);
  };

  const handleHeartBeats = () => {
    if (hbInterval) {
      clearInterval(hbInterval);
    }
    hbInterval = setInterval(() => {
      console.log("PINGED");
      sendMessage({ MT: "ping" });
    }, 10000);
  };

  const closeConnection = async () => {
    socket.close();
    localStorage.clear();
    clearInterval(hbInterval);
    clearInterval(msgReceivedInterval);
    window.location.reload();
    navigate("/");
  };

  const handleReconnect = () => {
    if (socket.readyState === WebSocket.CLOSED) {
      clearInterval(hbInterval);
      connectWebsocket();
    }
  };

  const startConnection = () => {
    connectWebsocket();
    socket.onopen = (event) => {
      if (socket.readyState === socket.OPEN) {
        dispatch(handleIsSocketConnected(true))
        handleHeartBeats();
        msgReceivedInterval = setInterval(() => {
          currentTime = moment().format();
          const diff = moment(currentTime).diff(setTimeStamp) / 1000;
          if (diff > 30) {
            dispatch(handleIsSocketConnected(false))
            handleReconnect();
          }
          if (diff > 120) {
            closeConnection();
          }
        }, 5000);
      }
    };

    socket.onmessage = (event) => {
      setTimeStamp = moment().format();
      const data = JSON.parse(event.data);
      console.log("event-data", data);
      // if(data?.BCM) {
      //   dispatch(handleIsSocketConnected(true))
      // }
      switch (data.MT) {
        case "2":
          dispatch(setProductDetails(data));
          break;
        case "3":
          dispatch(setCategories(data.products));
          break;
        case "6":
          dispatch(
            setCartData(data?.cartProducts?.length ? data.cartProducts : [])
          );
          break;
        case "11":
          dispatch(
            fetchDashboardData(
              data?.dataObject?.data?.length ? data.dataObject.data : []
            )
          );
          break;
        default:
          break;
      }
    };

    socket.onerror = (error) => {
      console.log("error::::", error);
    };

    socket.onclose = () => {
      console.log("SOCKET CLOSED:::");
    };
  };

  return {
    startConnection,
    closeConnection,
    sendMessage,
    socket,
  };
};

export default useSocket;
