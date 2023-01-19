import { useEffect, useState, useCallback, useContext } from "react";
import {
  connection,
  api,
  active_symbols_request,
  ticks_request,
} from "../../utils/common.js";
import UserContext from "../../stores/user-context";
import Select from "../atomicComponents/Select";
import Loader from "../atomicComponents/Loader";
import Button from '../atomicComponents/Button';
import Btn from '../atomicComponents/Btn';
import RangeTicks from "../atomicComponents/RangeTicks";
import TradeType from "../atomicComponents/TradeType.js";
import "../../styles/homepage.css";

// TODO:
// 2) Trade type (options)
// 3) Buy / sell btn
// 6) TS

const Homepage = () => {
  const userContext = useContext(UserContext);
  const [availableMarkets, setAvailableMarkets] = useState([]);
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const [availableTradeTypes, setAvailableTradeTypes] = useState([]);
  const [allTradeTypes, setAllTradeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [choosenSymbol, setChoosenSymbol] = useState(null);
  const [serverResponse, setServerResponse] = useState([]);
  const [tick, setTick] = useState(null);
  const [tickColor, setTickColor] = useState("#047553");

  const activeResponse = useCallback(async (res) => {
    setIsLoading(true);

    const data = JSON.parse(res.data);

    if (data.error !== undefined) {
      setError(data.error?.message);
      console.log("Error: ", data.error?.message);
      setErrorMessage(data.error?.message);
      setIsLoading(false);
      return;
    }

    if (data.msg_type === "active_symbols") {
      setServerResponse(data.active_symbols);
      setAvailableMarkets([
        ...new Set(data.active_symbols.map((item) => item.market_display_name)),
      ]);
    }

    console.log(data,data.msg_type)

    if (data.msg_type === "tick") {
      setTick((prev) => {
        if (prev > data.tick.bid) {
          setTickColor("#b3242d");
        } else {
          setTickColor("#047553");
        }
        return data.tick.bid;
      });
    }

    if (data.msg_type === "contracts_for") {
      setAllTradeTypes(data.contracts_for.available);
      setAvailableTradeTypes([
        ...new Set(
          data.contracts_for.available.map(
            (item) => item.contract_category_display
          )
        ),
      ]);
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
    setError(null);
    setAllTradeTypes([]);

    if (e.target.value === "Select trade symbol") {
      return;
    }
    setChoosenSymbol(
      serverResponse.find((item) => item.display_name === e.target.value).symbol
    );
  };

  const selectTradeTypeHandler = (e) => {
    if (e.target.value === "Select trade symbol") {
      return;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    api.send({
      forget_all: "ticks",
    });

    if (choosenSymbol === null) {
      return;
    }

    ticks_request.ticks_history = choosenSymbol;

    api.subscribe(ticks_request);
    if (userContext.isAuthorized) {
      setAllTradeTypes([]);
      setAvailableTradeTypes([]);
      const contracts_for_symbol_request = {
        contracts_for: choosenSymbol,
        currency: userContext?.userData?.authorize?.currency
          ? userContext?.userData?.authorize?.currency
          : "USD",
        landing_company: "svg",
        product_type: "basic",
      };

      api.send(contracts_for_symbol_request);
    }
    setIsLoading(false);
  }, [choosenSymbol, userContext]);

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
console.log(userContext)
  let tickValue = null;
  let tradeType = 
  <>
    {tick && userContext.isAuthorized && (        
        <TradeType 
            selectedOptionHandler={selectTradeTypeHandler}
            defaultOption={"Select Trade type"}
            availableOptions={availableTradeTypes}
        />
      )}
    </>

  if (tick) {
    tickValue = (
      <div className="tick-container">
        <p className='tick' style={{  borderStyle: `${tick ? 'solid' : 'none'}`, backgroundColor: `${tickColor}` }}>
        {tick}
       </p>
      </div>
    );
    if (error)
    {
      tickValue = <>
      <h2 className='warning'>Oops...Something went wrong!</h2>
      {errorMessage && <h3 className='error-message'>{errorMessage}</h3>}
      </>;
    }
  }
  if (isLoading) {
    tickValue = <Loader />;
  }
  // if (error) {
  //   console.log("ooopp")
  //   tickValue = <>
  //   <h2 className='warning'>Oops...Something went wrong!</h2>
  //   {errorMessage && <h3 className='error-message'>{errorMessage}</h3>}
  //   </>;
  // }

  return (
    <main className='main'>
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
      <section>{tickValue}</section>
      <section>{tradeType}</section> 
    </main>
  );
};
export default Homepage;
