import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Input from "./components/Input";
import CurrentWeather from "./components/CurrentWeather";
import NextFiveDay from "./components/NextFiveDay";
import TodayForest from "./components/TodayForest";
import AirConditions from "./components/AirConditions";
import Loading from "./components/Loading";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherNext, setWeatherNext] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [latLon, setLatLon] = useState({
    lat: 0,
    lon: 0,
  });
  const handleSearch = (value) => {
    console.log("App", value);
    setInput(() => value);
  };
  const getCurrWeather = async () => {
    setLoading(true);
    const city = input.length !== 0 ? input : "delhi";
    console.log(
      "WHAT TYPE DATA: ",
      city === "delhi"
        ? latLon.lat && latLon.lon
          ? `lat=${latLon.lat}&lon=${latLon.lon}`
          : `q=${city}`
        : city
    );
    const api = `https://api.openweathermap.org/data/2.5/weather?${
      city === "delhi"
        ? latLon.lat && latLon.lon
          ? `lat=${latLon.lat}&lon=${latLon.lon}`
          : `q=${city}`
        : `q=${city}`
    }&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;

    try {
      const resp = await axios.get(
        api
        // `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
      );
      // console.log(resp);
      await setWeather(() => resp.data);
      console.log("In setWeather", weather);
      setLoading(() => false);
    } catch (error) {
      console.log("ERROR", error);
      setLoading(false);
      if (+error.response.data.cod === 404) console.log("NOT Found");
    }
  };
  const getNextWeather = async () => {
    setLoadingNext(true);
    const city = input.length !== 0 ? input : "delhi";
    const api = `https://api.openweathermap.org/data/2.5/forecast?${
      city === "delhi"
        ? latLon.lat && latLon.lon
          ? `lat=${latLon.lat}&lon=${latLon.lon}`
          : `q=${city}`
        : `q=${city}`
    }&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;

    try {
      const resp = await axios.get(api);
      console.log("Next Res", resp.data);
      await setWeatherNext(() => resp.data);
      setLoadingNext(() => false);
    } catch (error) {
      console.log("ERROR NEXT", error);
      setLoadingNext(false);
      if (+error.response.data.cod === 404) console.log("NOT Found");
    }
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const success = async (pos) => {
    let crd = pos.coords;
    console.log(pos);
    console.log("lat", crd.latitude, "lon", crd.longitude);
    // setLatLon((crd)=>{
    //   lat: crd.latitude,
    //   lot: crd.longitude,
    // });
    await setLatLon((prev) => {
      return {
        ...prev,
        lat: crd.latitude,
        lon: crd.longitude,
      };
    });
  };
  const errors = (err) => {
    console.log("err", err);
  };
  useEffect(() => {
    if (latLon.lat === 0) {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            // console.log(result);
            if (result.state === "granted") {
              console.log("Your current position is");
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
            }
          });
      } else {
        console.log("Geolocation is not Supported");
      }
    }
    getCurrWeather();
    getNextWeather();
  }, [input, latLon]);
  return (
    <div className="App">
      <div style={{ flex: "6" }}>
        <Input handleSearch={handleSearch} />
        {loading ? (
          <Loading />
        ) : (
          <CurrentWeather
            place={weather.name}
            country={weather.sys}
            clouds={weather.clouds}
            temp={weather.main}
            weather={weather.weather}
            weatherDes={weather.main}
            icon={weather.main}
          />
        )}
        {loading ? (
          <Loading />
        ) : (
          <AirConditions
            wind={weather.wind}
            visibility={weather.visibility}
            clouds={weather.clouds}
            temp={weather.main}
          />
        )}
        {loadingNext ? (
          <Loading />
        ) : (
          <TodayForest list={weatherNext.list.splice(0, 8)} />
        )}
      </div>
      <div style={{ flex: "4" }}>
        {loadingNext ? <Loading /> : <NextFiveDay list={weatherNext.list} />}
      </div>
      {/* <Loading /> */}
    </div>
  );
}

export default App;
