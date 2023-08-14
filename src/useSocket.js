import moment from "moment/moment";
import { SOCKET_BASE_URL, WEBSOCKET_PROTOCOL, DEVICE_TYPE, URLS } from "./constants";
import { useNavigate } from "react-router-dom";
import { apiClient } from "./utils";
let socket = null;
let hbInterval = null;
let msgReceivedInterval = null;
let setTimeStamp = null;
let currentTime = null;

const useSocket = () => {
  const { userId, sessionId } = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const headers = [WEBSOCKET_PROTOCOL, userId, sessionId, DEVICE_TYPE];

  const sendMessage = (payload) => {
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
    const response = await apiClient.post(URLS.LOGOUT, {
      userId: userId,
      sessionId: sessionId,
    });
    if(response.code === 200) {
      navigate("/");
    }
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
      if (socket.readyState === 1) {
        handleHeartBeats();
        msgReceivedInterval = setInterval(() => {
          currentTime = moment().format();
          const diff = moment(currentTime).diff(setTimeStamp) / 1000;
          if (diff > 30) {
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
      console.log("on-message:::", setTimeStamp);
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
  };
};

export default useSocket;
