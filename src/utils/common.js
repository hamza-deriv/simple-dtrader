import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";
// import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";

const app_id = 1089;

export const connection = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
  );

export const api = new DerivAPIBasic({ connection });

export const active_symbols_request = {
    active_symbols: "brief",
    product_type: "basic",
  };
  
export const ticks_request = {
ticks_history: null,
adjust_start_time: 1,
count: 10,
end: "latest",
start: 1,
style: "ticks",
subscribe: 1,
};
