import "../../styles/select.css";

const Select = ({ selectedOptionHandler, defaultOption, availableOptions }) => {
  return (
    <div className='markets'>
      <select
        onChange={selectedOptionHandler}
        className={'markets__markets-list'}
      >
        <option value={defaultOption}>{defaultOption}</option>
        {availableOptions.length &&
          availableOptions.map((option, i) => (
            <option value={option} key={i}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;