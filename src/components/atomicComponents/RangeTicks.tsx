import React, { useState } from "react"
import "../../styles/rangeticks.css"

const RangeTicks:React.FC<{}> = () => {
const [currentTickValue, setCurrentTickValue] = useState('5');

const tickValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
  setCurrentTickValue(e.target.value);
}

  return (
    <>
      <input
        type="range"
        id="ticks"
        className="range-ticks"
        name="ticks"
        min="1"
        max="10"
        value={currentTickValue}
        step="1"
        onChange={tickValueHandler}
      />
      <label
        htmlFor="ticks"
        style={{
          color: "black",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        {`${currentTickValue} Ticks`}
      </label>
    </>);
}

export default RangeTicks;