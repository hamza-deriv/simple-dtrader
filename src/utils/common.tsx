// Deriv Basic API Package npm
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";

// app_id from binarydevelopers
const app_id = 1089;

export const connection = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
  );

export const ws_connection = new DerivAPIBasic({ connection });
