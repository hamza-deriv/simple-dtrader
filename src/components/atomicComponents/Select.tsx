import "../../styles/select.css";

const Select: React.FC<{selectedOptionHandler: () => void, defaultOption:string, availableOptions:string[]}> = ({ selectedOptionHandler, defaultOption, availableOptions }) => {
  return (
    <div className='select-wrapper'>
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