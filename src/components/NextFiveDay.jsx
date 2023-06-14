import React from "react";

const NextFiveDay = ({ list }) => {
  console.log("list in NextFive", list);
  let date = ["0000", "00", "00"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let flag = true;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        height: "max-content",
        margin: "20px",
        marginTop: "79px",
        backgroundColor: "black",
        padding: "10px 5px",
        borderRadius: "15px",
      }}
    >
      <h3>5-DAY FORECAST</h3>
      <div>
        {list &&
          list.map((item, index) => {
            const day = days[new Date(item.dt * 1000).getDay()];
            const tempDate = item.dt_txt.split(" ")[0].split("-");
            {
              /* console.log(date); */
            }
            console.log("tempDate", tempDate, "date", date);
            if (
              tempDate[0] > date[0] ||
              tempDate[1] > date[1] ||
              tempDate[2] > date[2]
            ) {
              flag = true;
              console.log("flag true");
              date = tempDate;
            } else {
              flag = false;
            }

            return flag ? (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <p>{day}</p>
                <div>
                  <img
                    style={{ marginTop: "-30px", marginBottom: "-35px" }}
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={`Weather Pic ${index}`}
                  />
                  <span>{item.weather[0].main}</span>
                </div>
                <h4>{Math.floor(item.main.temp - 272.15)} C</h4>
              </div>
            ) : (
              ""
            );
          })}
      </div>
    </div>
  );
};

export default NextFiveDay;
