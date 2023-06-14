import React from "react";
const NotFound = ({ input = "" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 20px",
        padding: "40px 10px",
        backgroundColor: "black",
        borderRadius: "10px",
      }}
    >
      {input} NOT FOUND
    </div>
  );
};

export default NotFound;
