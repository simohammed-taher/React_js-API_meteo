import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import axios from "axios";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locales("ar");
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
const CancelToken = axios.CancelToken;
let cancel = null;
function App() {
  const { t, i18n } = useTranslation();
  // const dateAndTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  // console.log(dateAndTime);
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    name: "",
    icon: "null",
  });
  const [locale, setlocale] = useState("ar");
  const derection = locale == "ar" ? "rtl" : "ltr";
  // EVENT HADLRE
  function handleLanguageClick() {
    if (locale == "en") {
      setlocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setlocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("MMMM Do YYYY,h:mm:ss a"));
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
    setDateAndTime(moment().format("MMMM Do YYYY,h:mm:ss a"));
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=casablanca&appid=97cf7823e95bd382310ceb7bc717e575",
        {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        }
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        // const min = response.data.main.temp_min;
        // const max = response.data.main.temp_max;
        const description = response.data.weather[0].description;
        const name = response.data.name;
        const responseIcons = response.data.weather[0].icon;

        // const desc = response.data.main.weather[0].description;
        // const min = response.data.main.temp_min;
        // const max = response.data.main.temp_max;
        // const description = response.data.main.weather[0].description;
        // console.log(min);
        setTemp({
          number: responseTemp,
          description: description,
          min: min,
          max: max,
          name: name,
          icon: `https://openweathermap.org/img/wn/${responseIcons}@2x.png`,
        });
        console.log(min, max, description);
      })
      .catch(function (error) {
        // en cas d’échec de la requête
        console.log(error);
      })
      .finally(function () {
        // dans tous les cas
      });
    return () => {
      console.log("conceling");
      cancel();
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <div>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" style={{ textAlign: "center" }}>
            {/* CARD */}
            <div
              dir={derection}
              style={{
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
                width: "100%",
              }}
            >
              {/* CONTENT */}
              <div
              // style={{
              //   display: "flex",
              // }}
              >
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                >
                  <Typography variant="h1" style={{ margin: "20px" }}>
                    {t(temp.name)}
                  </Typography>{" "}
                  <Typography variant="h4" style={{ margin: "20px" }}>
                    {/* {dateAndTime} */}
                    {t(dateAndTime)}
                  </Typography>
                </div>
                {/* CITY & TIME */}
                <hr />
                {/* CONTAINER + CLOUD ICONS */}
                {/* DEGREE & DESCRIPTION */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "left" }}>
                        {temp.number}
                      </Typography>
                      {/* TODO : TEMP IMAEG */}
                      <img src={temp.icon} />
                    </div>
                    {/* TEMP */}
                    <Typography variant="h4">{t(temp.description)}</Typography>
                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "centre",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2>
                        {t("petite")}: {temp.min}
                      </h2>
                      <h2>|</h2>
                      <h2>
                        {t("grand")}:{temp.max}
                      </h2>
                    </div>
                    {/* MIN & MAX */}
                  </div>
                  {/* DEGREE & DESCRIPTION */}

                  <CloudIcon
                    style={{ fontSize: "200px", color: "white" }}
                  ></CloudIcon>
                  {/* CONTENT */}
                </div>
              </div>
            </div>
            {/* CARD */}
          </Container>
          {/* TRANSLATION CONTAINER */}
          <div
            dir={derection}
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              style={
                {
                  // color: "white",
                  // width: "100%",
                  // height: "20%",
                  // padding: "10px",
                }
              }
              variant="contained"
              color="success"
              onClick={handleLanguageClick}
            >
              {locale == "en" ? " Go To Arabic" : "Go To English"}
            </Button>
          </div>
          {/* TRANSLATION CONTAINER */}
        </ThemeProvider>
      </div>
    </div>
  );
}
export default App;
