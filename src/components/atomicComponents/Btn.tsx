import React from "react";
import "../../styles/btn.css";

const Btn:React.FC<{btnName: string, isGreen?: boolean}> = ({btnName, isGreen = false}) => {
  const classStyle = `${'button'} ${isGreen ? 'green' : ''}`
  return (
    <button className={classStyle}>
      <span>{btnName}</span>
    </button>
  );
};

export default Btn;