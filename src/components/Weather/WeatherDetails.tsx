import React, {useState, useEffect} from "react"
import {fiveForecastsDaily} from "../../consts"
import classes from "./WeatherDetails.module.css"

// import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

// const bull = (
//   <Box
//     component="span"
//     sx={{display: "inline-block", mx: "2px", transform: "scale(0.8)"}}
//   >
//     •
//   </Box>
// )

interface CurrentWeatherConditions {
  WeatherText: string
  Temperature: {
    Metric: {
      Value: number
      Unit: string
    }
    Imperial: {
      Value: number
      Unit: string
    }
  }
}

interface WeatherDetailsProps {
  selectedCityKey: string
  locationName: string
}

interface DailyForecast {
  Date: string
  Temperature: {
    Minimum: {
      Value: number
      Unit: string
    }
    Maximum: {
      Value: number
      Unit: string
    }
  }
}

interface DailyForecastsResponse {
  DailyForecasts: DailyForecast[]
}

const apiKey = "c9NAp7OEipx15gTXOkkGVNn0usKsUsLA"
const END_POINT = "http://dataservice.accuweather.com/currentconditions/v1/"

const END_POINT_5 =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"

const WeatherDetails = (props: WeatherDetailsProps) => {
  const [currentConditions, setCurrentConditions] =
    useState<CurrentWeatherConditions | null>(null)

  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([])

  useEffect(() => {
    // getData()
    // if (!props.locationName) {
    //   return
    // }
    fetch(`${END_POINT_5}/${props.selectedCityKey}?apikey=${apiKey}`)
      .then((response) => {
        return response.json()
      })
      .then((data: DailyForecastsResponse) => {
        console.log("myData", data)
        const relatedLocationForecasts = data[0]
        // setDailyForecasts(relatedLocationForecasts)
        setDailyForecasts(data.DailyForecasts)
        // if (Array.isArray(data) && data.length > 0 && data[0].DailyForecasts) {
        //   const relatedLocationForecasts = data[0].DailyForecasts
        //   setDailyForecasts(relatedLocationForecasts)
        // } else {
        //   console.error("Invalid data format for daily forecasts.")
        // }
      })
      .catch((error) => console.error("Error fetching daily forecasts:", error))
    // console.log("FETCHING")
  }, [props.selectedCityKey, props.locationName])

  //CURRENT_WEATHER -
  // const getData = () => {
  //   setCurrentConditions(() => {
  //     return CURRENT_WEATHER
  //   })
  // }

  // 5 day forecast daily-
  // const getData = () => {
  //   setDailyForecasts(fiveForecastsDaily.DailyForecasts)
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  useEffect(() => {
    // getData()
    if (!props.locationName) {
      return
    }
    fetch(
      `${END_POINT}/${props.selectedCityKey}?apikey=${apiKey}&q=${props.locationName}`
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log(data)
        const foundWeatherConditions = data[0]
        setCurrentConditions(foundWeatherConditions)
      })
      .catch((error) =>
        console.error("Error fetching weather conditions:", error)
      )
    // console.log("FETCHING")
  }, [props.selectedCityKey, props.locationName])

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    const options = {weekday: "long"}
    return new Intl.DateTimeFormat("en-US", options).format(date)

    //Check again for type (options)
  }

  return (
    <>
      {currentConditions && (
        <div>
          <div className={classes.weatherCurrentConditions}>
            <div>Weather details for : {props.locationName} </div>
            <div>Weather Text: {currentConditions.WeatherText}</div>
            <div>
              Temperature (Metric): {currentConditions.Temperature.Metric.Value}{" "}
              {currentConditions.Temperature.Metric.Unit}
            </div>
            <div>
              Temperature (Imperial):{" "}
              {currentConditions.Temperature.Imperial.Value}{" "}
              {currentConditions.Temperature.Imperial.Unit}
            </div>
          </div>

          <div className={classes.dailyFiveForecasts}>
            {dailyForecasts.length > 0 ? (
              dailyForecasts.map((forecast, index) => (
                // <div key={index} className={classes.daily}>
                //   <div>Date: {forecast.Date}</div>
                //   <div>
                //     Temperature (Minimum): {forecast.Temperature.Minimum.Value}{" "}
                //     {forecast.Temperature.Minimum.Unit}
                //   </div>
                //   <div>
                //     Temperature (Maximum): {forecast.Temperature.Maximum.Value}{" "}
                //     {forecast.Temperature.Maximum.Unit}
                //   </div>
                // </div>
                <Card sx={{minWidth: 275}} key={index}>
                  <div className={classes.daily}>
                    <CardContent>
                      <Typography
                        component="span"
                        sx={{fontSize: 14}}
                        color="text.secondary"
                        gutterBottom
                      >
                        <div>Date: {getDayOfWeek(forecast.Date)}</div>
                      </Typography>
                      {/* <Typography variant="h5" component="div">
                      <div>
                        Temperature (Minimum):{" "}
                        {forecast.Temperature.Minimum.Value}{" "}
                        {forecast.Temperature.Minimum.Unit}
                      </div>
                    </Typography> */}
                      <Typography
                        component="span"
                        sx={{mb: 1.5}}
                        color="text.secondary"
                      >
                        <div>
                          Temperature (Maximum):{" "}
                          {forecast.Temperature.Maximum.Value}{" "}
                          {forecast.Temperature.Maximum.Unit}
                        </div>
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <p>Loading daily forecasts...</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default WeatherDetails
