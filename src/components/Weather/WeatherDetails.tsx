import {useState, useEffect} from "react"
import classes from "./WeatherDetails.module.css"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import {apiKey} from "../../consts"
import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Stack from "@mui/material/Stack"
import {City} from "../../types"
import {pink} from "@mui/material/colors"

interface CurrentWeatherConditions {
  WeatherText: string
  WeatherIcon: number
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
  selectedCity: City
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

const END_POINT = "https://dataservice.accuweather.com/currentconditions/v1/"

const END_POINT_5 =
  "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"

const WeatherDetails = (props: WeatherDetailsProps) => {
  const [currentConditions, setCurrentConditions] =
    useState<CurrentWeatherConditions | null>(null)

  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([])

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favoriteFromStorage = localStorage.getItem("Favorites")
    let favorites: City[]
    if (favoriteFromStorage === null) {
      favorites = []
    } else {
      favorites = JSON.parse(favoriteFromStorage)
    }
    if (
      favorites.find((favorite) => {
        return favorite.key === props.selectedCity.key
      })
    ) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [props.selectedCity])

  useEffect(() => {
    fetch(`${END_POINT_5}/${props.selectedCity.key}?apikey=${apiKey}`)
      .then((response) => {
        return response.json()
      })
      .then((data: DailyForecastsResponse) => {
        setDailyForecasts(data.DailyForecasts)
      })
      .catch((error) => console.error("Error fetching daily forecasts:", error))
  }, [props.selectedCity.key])

  useEffect(() => {
    fetch(`${END_POINT}/${props.selectedCity.key}?apikey=${apiKey}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const foundWeatherConditions = data[0]
        setCurrentConditions(foundWeatherConditions)
      })
      .catch((error) =>
        console.error("Error fetching weather conditions:", error)
      )
  }, [props.selectedCity.key])

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    // typescript - use specific type to match function parameter type
    const options: {weekday: "long"} = {weekday: "long"}
    return new Intl.DateTimeFormat("en-US", options).format(date)
  }

  const favoriteHandler = () => {
    setIsFavorite(!isFavorite)
    const favoriteFromStorage = localStorage.getItem("Favorites")
    let favorites: City[]
    if (favoriteFromStorage === null) {
      favorites = []
    } else {
      favorites = JSON.parse(favoriteFromStorage)
    }

    const isLocationFavorite = favorites.some(
      (favorite) => favorite.key === props.selectedCity.key
    )
    if (isLocationFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.key !== props.selectedCity.key
      )
      localStorage.setItem("Favorites", JSON.stringify(updatedFavorites))
    } else {
      const newFavorite = {
        key: props.selectedCity.key,
        name: props.selectedCity.name,
        country: props.selectedCity.country
      }
      const updatedFavorites = [newFavorite, ...favorites]
      localStorage.setItem("Favorites", JSON.stringify(updatedFavorites))
    }
    setIsFavorite(!isLocationFavorite)
  }

  function isNumberSmallerTHan10(num: number) {
    if (num < 10) {
      return true
    } else {
      return null
    }
  }

  return (
    <>
      {currentConditions && (
        <div className={classes.weatherCurrentConditions}>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="favorite" onClick={favoriteHandler}>
              {isFavorite ? (
                <FavoriteIcon sx={{color: pink[500]}} />
              ) : (
                <FavoriteBorderIcon sx={{color: pink[500]}} />
              )}
            </IconButton>
          </Stack>
          <div className={classes.selectedCityName}>
            {props.selectedCity.name}
          </div>
          <div className={classes.temperature}>
            {currentConditions.Temperature.Metric.Value}{" "}
            {currentConditions.Temperature.Metric.Unit}
          </div>
          <div>
            <img
              className={classes.weatherIconImg}
              src={
                isNumberSmallerTHan10(currentConditions.WeatherIcon)
                  ? `https://developer.accuweather.com/sites/default/files/0${currentConditions.WeatherIcon}-s.png`
                  : `https://developer.accuweather.com/sites/default/files/${currentConditions.WeatherIcon}-s.png`
              }
            />
            <div className={classes.weatherText}>
              {currentConditions.WeatherText}
            </div>
          </div>
        </div>
      )}

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
    </>
  )
}

export default WeatherDetails
