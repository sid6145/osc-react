import { SOCKET_BASE_URL, WEBSOCKET_PROTOCOL, DEVICE_TYPE } from "./constants";
let socket = null;
let hbInterval = null;
let msgReceivedInterval = null;

const useSocket = () => {
  const { userId, sessionId } = JSON.parse(localStorage.getItem("userData"));
  // const headers = {
  //   protocol: WEBSOCKET_PROTOCOL,
  //   userId,
  //   sessionId,
  //   DEVICE_TYPE,
  // };
  const headers = [WEBSOCKET_PROTOCOL, userId, sessionId, DEVICE_TYPE];

  const sendMessage = (payload) => {
    socket.send(JSON.stringify(payload));
  };

  const handleHeartBeats = () => {
    if(hbInterval) {
      clearInterval(hbInterval)
    }
    hbInterval = setInterval(() => {
      console.log("PINGED")
      sendMessage({ MT: "ping" });
    }, 10000);
  };

  const startConnection = () => {
    console.log("called")
    socket = new WebSocket(SOCKET_BASE_URL, headers);

    socket.onopen = (event) => {
      if (socket.readyState === 1) {
        handleHeartBeats();
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event?.data)
      console.log("MSG RECEIVED::::", data)
    };

    socket.onerror = (error) => {
      console.log("error::::", error);
    };
  };

  console.log("hbInterval",hbInterval)

  const closeConnection = () => {
    socket.close()
    localStorage.clear()
    clearInterval(hbInterval)
    clearInterval(msgReceivedInterval)
  }

  return {
    startConnection,
    closeConnection
  };
};

export default useSocket;
