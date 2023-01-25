import "../../styles/select.css";
import Select from "./Select";
// import RangeTicks from "./RangeTicks";
import Button from "./Button";

type TTradeTypesProps ={
    selectedOptionHandler: (e) => void, 
    defaultOption?:string, 
    availableOptions:string[],
    buttonTitle:string[],
}
const TradeType: React.FC<TTradeTypesProps> = (props:TTradeTypesProps) => {

    const { selectedOptionHandler, defaultOption, availableOptions,buttonTitle} = props;
  return (
    <div className="trade-interface">
        <h3 className="heading">Select Trade Type</h3>
            <Select
              selectedOptionHandler={selectedOptionHandler}
              defaultOption={"Select Trade type"}
              availableOptions={availableOptions}
            />
            {/* <RangeTicks ticks="5"/> */}
            <section className="section-button">
              <Button className="button-atomic-buy" title={buttonTitle[0] ? buttonTitle[0] : "Up"} />
              <Button className="button-atomic-sell" title={buttonTitle[1] ? buttonTitle[1] : "Down"} />
          </section>
          </div>
  );
};

export default TradeType;