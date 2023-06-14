import React, { useEffect, useState } from "react";
import axios from "axios";
const CurrentWeather = ({
  place = "No Place",
  country = { country: "No Country" },
  clouds = { all: 0 },
  temp = { temp: 30 },
  weather = [{ main: "Rain", description: "light rain", icon: "02d" }],
}) => {
  // console.log(weather);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 20px",
        padding: "10px 10px",
        backgroundColor: "black",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexDirection: "column",
          textAlign: "left",
        }}
      >
        <div>
          <h3>
            {place}, {country.country}
          </h3>
          <p style={{ marginTop: "-18px" }}>
            {weather[0].main}, {weather[0].description}
          </p>
          <p style={{ marginTop: "-18px" }}>Chance of rain: {clouds.all}%</p>
        </div>
        <h2 style={{ marginTop: "-20px" }}>
          {Math.floor(temp.temp - 273.15)} C
        </h2>
      </div>
      <div style={{ display: "flex" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="Weather Pic"
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
