import {useState, useEffect} from "react"
import classes from "./DailyForecasts.module.css"
import {apiKey} from "../consts"
import {City} from "../types"
import {useSnackbar} from "notistack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import {convertFahrenheitToCelsius} from "../utils"

interface DailyForecastsProps {
  city: City
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

const END_POINT_5 =
  "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"

const DailyForecast = (props: DailyForecastsProps) => {
  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([])

  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    fetch(`${END_POINT_5}/${props.city.key}?apikey=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data: DailyForecastsResponse) => {
        setDailyForecasts(data.DailyForecasts)
      })
      .catch(() => {
        enqueueSnackbar("Error fetching daily forecasts. Please try again.", {
          variant: "error"
        })
      })
  }, [props.city.key])

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    const options: {weekday: "long"} = {weekday: "long"}
    return new Intl.DateTimeFormat("en-US", options).format(date)
  }

  return (
    <>
      <div className={classes.dailyFiveForecasts}>
        {dailyForecasts.length > 0 ? (
          dailyForecasts.map((forecast, index) => (
            <Card sx={{minWidth: 150}} key={index}>
              <div className={classes.daily}>
                <CardContent>
                  <Typography
                    component="span"
                    sx={{fontSize: 14}}
                    color="text.secondary"
                    gutterBottom
                  >
                    <div>{getDayOfWeek(forecast.Date)}</div>
                  </Typography>
                  <Typography
                    component="span"
                    sx={{mb: 1.5}}
                    color="text.secondary"
                  >
                    <div>
                      {Math.round(
                        convertFahrenheitToCelsius(
                          forecast.Temperature.Maximum.Value
                        )
                      )}
                      °C
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
    </>
  )
}

export default DailyForecast
