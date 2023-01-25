import { useEffect, useState, useCallback, useContext } from "react";
import {
  connection,
  ws_connection
} from "../../utils/common.js";
import { ticks_request, active_symbols_request } from "../../utils/ticks.js";
import UserContext from "../../stores/user-context";
import Select from "../atomicComponents/Select";
import Loader from "../atomicComponents/Loader";
import TradeType from "../atomicComponents/TradeType.js";
import "../../styles/homepage.css";

const Homepage = () => {
  const userContext = useContext(UserContext);
  const [availableMarkets, setAvailableMarkets] = useState<any>([]);
  const [availableSymbols, setAvailableSymbols] = useState<any>([]);
  const [availableTradeTypes, setAvailableTradeTypes] = useState<any>([]);
  const [allTradeTypes, setAllTradeTypes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [serverResponse, setServerResponse] = useState<any>([]);
  const [tick, setTick] = useState(null);
  const [tickColor, setTickColor] = useState("#047553");
  const [buttonTitle, setButtonTitle] = useState<any>([]);

  const activeResponse = useCallback(async (res:any) => {
    setIsLoading(true);

    const data = await JSON.parse(res.data);

    if (data.error !== undefined) {
      setError(data.error?.message);
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

    if (data.msg_type === "tick") {
      setTick((prev) => {
        if (prev! > data.tick.bid) {
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
    setSelectedSymbol(null);
    setTick(null);

    if (e.target.value === "Select Market") {
      return;
    }

    setAvailableSymbols(
      serverResponse
        .filter((item) => item?.['market_display_name'] === e.target.value)
        .map((item) => item?.['display_name'])
    );
  };

  const selectTradeTypeHandler = (e) => {
    if (e.target.value === "Select trade symbol") {
      return;
    }
    setButtonTitle([
      ...new Set(
        allTradeTypes
          .filter((item) => item.contract_category_display === e.target.value)
          .map((item) => item.contract_display)
      ),
    ]);
  };

  const selectSymbolHandler = (e) => {
    setTick(null);
    setSelectedSymbol(null);
    setError(false);
    setAllTradeTypes([]);

    if (e.target.value === "Select trade symbol") {
      return;
    }
    setSelectedSymbol(
      serverResponse?.find((item) => item?.['display_name'] === e.target.value)?.symbol
    );
  };

  useEffect(() => {
    setIsLoading(true);
    ws_connection.send({
      forget_all: "ticks",
    }).catch((error) => {
      console.log(error?.error?.message)
    });

    if (selectedSymbol === null) {
      setIsLoading(false);
      return;
    }

    ticks_request.ticks_history = selectedSymbol;

    ws_connection.send(ticks_request);
    if (userContext.isAuthorized) {
      setAllTradeTypes([]);
      setAvailableTradeTypes([]);
      const contracts_for_symbol_request = {
          contracts_for: selectedSymbol,
          currency: userContext?.userData?.['authorize']?.currency
            ? userContext?.userData?.['authorize']?.currency
            : "USD",
          landing_company: "svg",
          product_type: "basic",
        };

        ws_connection
        .send(contracts_for_symbol_request)
        .catch((error) => {
          console.log(error?.error?.message)
        });
    }
    setIsLoading(false);
  }, [selectedSymbol, userContext, error]);

  useEffect(() => {
    setIsLoading(true);

    const getActiveSymbols = async () => {
      connection.addEventListener("message", activeResponse);
      await ws_connection
      .send(active_symbols_request)
      .catch((error) => {
        console.log(error?.error?.message)
      });
    };

    getActiveSymbols();

    return () => {
      connection.removeEventListener("message", activeResponse, false);
    };
  }, [activeResponse]);
  
  let tickValue ;
  let tradeType = 
  <>
    {tick && userContext.isAuthorized && (        
        <TradeType 
            selectedOptionHandler={selectTradeTypeHandler}
            defaultOption={"Select Trade type"}
            availableOptions={availableTradeTypes}
            buttonTitle={buttonTitle}
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

  return (
    <main className='main'>
      <section>
        <h3 className="heading">Select Market</h3>
        <Select
          selectedOptionHandler={selectMarketHandler}
          defaultOption={"Select Market"}
          availableOptions={availableMarkets}
        />
        <h3 className="heading">Select Active Pairs/Symbols</h3>
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
