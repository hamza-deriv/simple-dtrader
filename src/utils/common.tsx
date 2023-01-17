import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";
// import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";

const app_id = 1089;

export const connection = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
  );

export const api = new DerivAPIBasic({ connection });

type TActive_symbols_request = { 
  active_symbols: string,
  product_type: string,
};

export const active_symbols_request:TActive_symbols_request = {
    active_symbols: "brief",
    product_type: "basic",
  };
  
type TTicks_request = {
  ticks_history: null | string,
  adjust_start_time: number,
  count: number,
  end: string,
  start: number,
  style: string,
  subscribe: number,
};

export const ticks_request:TTicks_request = {
ticks_history: null,
adjust_start_time: 1,
count: 10,
end: "latest",
start: 1,
style: "ticks",
subscribe: 1,
};
