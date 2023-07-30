import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
// const CancelToken = axios.CancelToken;
// let cancel = null;
function App() {
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
  });
  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=settat&appid=97cf7823e95bd382310ceb7bc717e575"
        // {
        //   cancelToken: new CancelToken(function executor(c) {
        //     cancel = c;
        //   }),
        // }
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = response.data.main.temp_min;
        const max = response.data.main.temp_max;
        const description = response.data.main.weather[0].description;
        setTemp({
          number: responseTemp,
          description: description,
          min: min,
          max: max,
        });
        console.log(min, max, description);

        setTemp(responseTemp);
      })
      .catch(function (error) {
        // en cas d’échec de la requête
        console.log(error);
      });
    // return () => {
    //   console.log("conceling");
    //   cancel();
    // };
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
                    simohammed
                  </Typography>{" "}
                  <Typography variant="h4" style={{ margin: "20px" }}>
                    Monday 14/09/2023
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
                    <div>
                      <Typography variant="h1" style={{ textAlign: "left" }}>
                        {temp.number}
                      </Typography>
                      {/* TODO : TEMP IMAEG */}
                    </div>
                    {/* TEMP */}
                    <Typography variant="h4">browser cked</Typography>
                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "centre",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2>petite: 20</h2>
                      <h2>|</h2>
                      <h2>grand: 20</h2>
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
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              style={{ color: "white", width: "20%", height: "20%" }}
              variant="text"
            >
              Go To Arabic
            </Button>
          </div>
          {/* TRANSLATION CONTAINER */}
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
