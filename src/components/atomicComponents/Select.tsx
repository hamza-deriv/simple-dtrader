import "../../styles/select.css";

type TSelectProps = {
  selectedOptionHandler:() => void, 
  defaultOption:string, 
  availableOptions:string[] 
}

const Select: React.FC<TSelectProps> = (props:TSelectProps) => {
  const {selectedOptionHandler, defaultOption, availableOptions} = props;
  return (
    <div className='select'>
      <select
        onChange={selectedOptionHandler}
        className={'select-list'}
      >
        <option value={defaultOption}>{defaultOption}</option>
        {availableOptions?.length &&
          availableOptions?.map((option:string, i:number) => (
            <option value={option} key={i}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;