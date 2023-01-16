import { useEffect, useRef } from "react";

const useWebsocket = () => {
  const websocket = useRef<WebSocket>();
  useEffect(() => {
    if (
      !websocket?.current &&
      ![0, 1].includes(websocket?.current?.readyState || 3)
    ) {
      websocket.current = new WebSocket(
        "wss://ws.binaryws.com/websockets/v3?app_id=1089"
      );
    }
  }, []);
  return websocket;
};

export default useWebsocket;