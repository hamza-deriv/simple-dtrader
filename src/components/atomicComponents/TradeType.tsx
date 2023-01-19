import "../../styles/select.css";
import Select from "./Select";
import RangeTicks from "./RangeTicks";
import Button from "./Button";

type TTradeTypes ={
    selectedOptionHandler: () => void, 
    defaultOption:string, 
    availableOptions:string[],
}
const TradeType: React.FC<TTradeTypes> = ({ selectedOptionHandler, defaultOption, availableOptions}) => {
  return (
    <div className="trade-interface">
            <Select
              selectedOptionHandler={selectedOptionHandler}
              defaultOption={"Select Trade type"}
              availableOptions={availableOptions}
            />
            <RangeTicks />
            <section className="section-button">
              <Button className="button-atomic-buy" title="Buy" />
              <Button className="button-atomic-sell" title="Sell" />
          </section>
          </div>
  );
};

export default TradeType;