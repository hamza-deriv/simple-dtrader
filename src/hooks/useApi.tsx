import { MutableRefObject, useCallback, useEffect } from "react";
// import PaymentMethodStore from "../store/PaymentMethod.store";
// import useStore from "./useStore";

interface IUseApi {
  websocket: MutableRefObject<WebSocket | undefined>;
}

const useApi = ({ websocket }: IUseApi) => {
  const store = useStore();
  useEffect(() => {
    websocket?.current?.addEventListener("open", () => {
      send({ residence_list: 1 });
    });

    websocket.current?.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);
      store.toggleLoading();
      switch (data.msg_type) {
        case "residence_list":
          store.updateCountryList(data?.residence_list);
          break;
        case "payment_methods":
          store.updatePaymentMethods(data?.payment_methods);
          break;
      }
    });

    return () => {
      if ([0, 1].includes(websocket?.current?.readyState || 3)) {
        websocket?.current?.close();
      }
    };
  }, []);
  const send = useCallback(
    (message: object) => {
      store.toggleLoading();
      if (websocket?.current?.readyState === 1) {
        websocket?.current?.send(JSON.stringify(message));
      }
    },
    [websocket]
  );
  return { send };
};

export default useApi;
