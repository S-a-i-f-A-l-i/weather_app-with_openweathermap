import React from "react";

const AirConditions = ({
  wind = { speed: 0.5 },
  clouds = { all: 0 },
  temp = { feels_like: 30 },
  visibility = 10000,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px 20px",
        padding: "10px 10px",
        backgroundColor: "black",
        borderRadius: "10px",
      }}
    >
      <h3>AIR CONDITIONS</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ marginBottom: "-3px" }}>Real Feel</p>
          <span>{temp.feels_like - 273.15} C</span>
        </div>
        <div>
          <p style={{ marginBottom: "-3px" }}>Wind</p>
          <span>{wind.speed} m/s</span>
        </div>
        <div>
          <p style={{ marginBottom: "-3px" }}>Chance of rain</p>
          <span>{clouds.all} %</span>
        </div>
        <div>
          <p style={{ marginBottom: "-3px" }}>Visibility</p>
          <span>{visibility / 100}%</span>
        </div>
      </div>
    </div>
  );
};

export default AirConditions;
