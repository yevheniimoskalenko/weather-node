const express = require("express");
const cors = require("cors");
const axios = require("axios");
const moment = require("moment");
moment.locale("uk");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  const local = await axios({
    url: "http://api.openweathermap.org/data/2.5/weather",
    method: "GET",
    params: {
      q: "poltava",
      appid: "43d814a4b6b955e70bc41c04b7eb8671",
    },
  }).then((r) => r.data.coord);
  const result = await axios({
    url: "https://api.openweathermap.org/data/2.5/onecall",
    method: "GET",
    params: {
      lat: local.lat,
      lon: local.lon,
      exclude: "hourly",
      appid: "43d814a4b6b955e70bc41c04b7eb8671",
      units: "metric",
      cnt: 1,
    },
  }).then((r) => r.data);
  // console.log(result.hourly);
  // let arr = [];
  // for (let i = 0; i < 4; i++) {
  //   arr.push({
  //     date: moment(result.hourly[i].dt).format("h:mm:ss a"),
  //     temp: result.hourly[i].temp,
  //     weather: result.hourly[i].weather[0].icon,
  //   });
  // }
  return res.json(result);
  // return res.json({
  //   current: result.current,
  //   // hourly: result.hourly,
  //   sunset: result.current.sunset,
  //   // today: arr,
  //   today: arr,
  // });
});

app.listen(3000, () => console.log("server is started"));
