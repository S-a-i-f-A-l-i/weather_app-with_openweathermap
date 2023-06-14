import React from "react";

const TodayForest = ({ list }) => {
  console.log("list in Today Forest", list);
  return (
    <div
      style={{ margin: "20px", backgroundColor: "black", padding: "5px 0px" }}
    >
      <h3 style={{ marginBottom: "-10px" }}>TODAY'S FORECAST</h3>
      <div
        style={{
          display: "flex",
          overflowY: "scroll",
          justifyContent: "flex-start",
        }}
      >
        {list &&
          list.map((item, index) => {
            const time = item.dt_txt.split(" ")[1].split(":").splice(0, 1);
            return (
              <div key={index}>
                <p>{time < 12 ? `${time} AM` : `0${time - 12} PM`}</p>
                <img
                  style={{ marginTop: "-30px", marginBottom: "-35px" }}
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={`Weather Pic ${index}`}
                />
                <h4>{Math.floor(item.main.temp - 272.15)} C</h4>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TodayForest;
