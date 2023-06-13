import React, { useState, useMemo, useRef } from "react";

const Input = ({ handleSearch }) => {
  const [input, setInput] = useState("");
  const timerId = useRef();
  const debounce = () => {
    return (e) => {
      setInput(() => e.target.value);
      console.log(e.target.value);
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        handleSearch(e.target.value);
      }, 2000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);
  const style = {
    backgroundColor: "black",
    color: "white",
    width: "100%",
    border: "2px solid white",
    padding: "8px 5px",
    borderRadius: "5px",
  };
  return (
    <div style={{ display: "flex", margin: "20px 20px" }}>
      <input
        style={style}
        placeholder="Enter your city name"
        value={input}
        onChange={optimizedDebounce}
      />
      {/* <div>int: {input}</div> */}
    </div>
  );
};

export default Input;
