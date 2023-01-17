import { useEffect, useState, useCallback } from "react";
import {
  connection,
  api,
  active_symbols_request,
  ticks_request,
} from "../../utils/common.js";
import Select from "../atomicComponnents/Select";
import Loader from "../atomicComponnents/Loader";
// import MainSummary from "./main-summary";
import "../../styles/homepage.css";

// TODO:
// 2) Trade type (options)
// 3) Buy / sell btn
// 6) TS

const Homepage = () => {
  const [availableMarkets, setAvailableMarkets] = useState([]);
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [choosenSymbol, setChoosenSymbol] = useState(null);
  const [serverResponse, setServerResponse] = useState([]);
  const [tick, setTick] = useState(null);
  const [tickColor, setTickColor] = useState("#047553");

  const activeResponse = useCallback(async (res) => {
    setIsLoading(true);

    const data = JSON.parse(res.data);

    if (data.error !== undefined) {
      setError(true);
      console.log("Error : ", data.error?.message);
      //connection.removeEventListener("message", activeResponse, false);
      setIsLoading(false);
      return;
      //await api.disconnect();
    }

    if (data.msg_type === "active_symbols") {
      setServerResponse(data.active_symbols);
      setAvailableMarkets([
        ...new Set(data.active_symbols.map((item) => item.market_display_name)),
      ]);
    }

    if (data.msg_type === "tick") {
      setTick((prev) => {
        if (prev > data.tick.bid) {
          setTickColor("#8a2b06");
        } else {
          setTickColor("#047553");
        }
        return data.tick.bid;
      });
    }

    setError(false);
    setIsLoading(false);
  }, []);

  const selectMarketHandler = (e) => {
    setChoosenSymbol(null);
    setTick(null);

    if (e.target.value === "Select Market") {
      return;
    }

    setAvailableSymbols(
      serverResponse
        .filter((item) => item.market_display_name === e.target.value)
        .map((item) => item.display_name)
    );
  };

  const selectSymbolHandler = (e) => {
    setTick(null);
    setChoosenSymbol(null);

    if (e.target.value === "Select trade symbol") {
      return;
    }
    setChoosenSymbol(
      serverResponse.find((item) => item.display_name === e.target.value).symbol
    );
  };

  useEffect(() => {
    api.send({
      forget_all: "ticks",
    });

    if (choosenSymbol === null) {
      return;
    }

    ticks_request.ticks_history = choosenSymbol;

    api.subscribe(ticks_request);
  }, [choosenSymbol]);

  useEffect(() => {
    setIsLoading(true);

    const getActiveSymbols = async () => {
      connection.addEventListener("message", activeResponse);
      await api.send(active_symbols_request);
    };

    getActiveSymbols();

    return () => {
      connection.removeEventListener("message", activeResponse, false);
    };
  }, [activeResponse]);

  let tickValue = (
    <div className='tick' style={{ color: tickColor, boxShadow: `5px 10px ${tickColor}` }}>
      {tick}
    </div>
  );
  if (isLoading) {
    tickValue = <Loader />;
  }
  if (error) {
    tickValue = <h2 className='warning'>Oops...Something went wrong!</h2>;
  }

  return (
    <main className='main'>
      {/* <MainSummary /> */}
      <section>
        <Select
          selectedOptionHandler={selectMarketHandler}
          defaultOption={"Select Market"}
          availableOptions={availableMarkets}
        />

        <Select
          selectedOptionHandler={selectSymbolHandler}
          defaultOption={"Select trade symbol"}
          availableOptions={availableSymbols}
        />
      </section>
      {tickValue}
    </main>
  );
};
export default Homepage;
