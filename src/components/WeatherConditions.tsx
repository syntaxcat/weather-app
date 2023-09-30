import {useState, useEffect} from "react"
import {apiKey} from "../consts"
import {useSnackbar} from "notistack"
import {convertFahrenheitToCelsius} from "../utils"
import classes from "../components/WeatherConditions.module.css"
import {pink} from "@mui/material/colors"
import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Stack from "@mui/material/Stack"

import {City} from "../types"

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

interface WeatherConditionsProps {
  city: City
}

const END_POINT = "https://dataservice.accuweather.com/currentconditions/v1/"

const WeatherConditions = (props: WeatherConditionsProps) => {
  const [currentConditions, setCurrentConditions] =
    useState<CurrentWeatherConditions | null>(null)

  const [isFavorite, setIsFavorite] = useState(false)

  const {enqueueSnackbar} = useSnackbar()

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
      (favorite) => favorite.key === props.city.key
    )
    if (isLocationFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.key !== props.city.key
      )
      localStorage.setItem("Favorites", JSON.stringify(updatedFavorites))
    } else {
      const newFavorite = {
        key: props.city.key,
        name: props.city.name,
        country: props.city.country
      }
      const updatedFavorites = [newFavorite, ...favorites]
      localStorage.setItem("Favorites", JSON.stringify(updatedFavorites))
    }
    setIsFavorite(!isLocationFavorite)
  }

  useEffect(() => {
    fetch(`${END_POINT}/${props.city.key}?apikey=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        const foundWeatherConditions = data[0]
        setCurrentConditions(foundWeatherConditions)
      })
      .catch(() => {
        enqueueSnackbar(
          "Error fetching weather conditions. Please try again.",
          {
            variant: "error"
          }
        )
      })
  }, [props.city.key])

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
        return favorite.key === props.city.key
      })
    ) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [props.city.key])

  return (
    <>
      {currentConditions && (
        <div className={classes.weatherCurrentConditions}>
          <Stack direction="row" spacing={2}>
            <IconButton aria-label="favorite" onClick={favoriteHandler}>
              {isFavorite ? (
                <FavoriteIcon sx={{color: pink[500]}} />
              ) : (
                <FavoriteBorderIcon sx={{color: pink[500]}} />
              )}
            </IconButton>
          </Stack>
          <div className={classes.selectedCityName}>{props.city.name}</div>
          <div className={classes.temperature}>
            {convertFahrenheitToCelsius(
              currentConditions.Temperature.Imperial.Value
            ).toFixed(1)}
            °C
          </div>
          <div>
            <img
              className={classes.weatherIconImg}
              src={
                currentConditions.WeatherIcon < 10
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
    </>
  )
}

export default WeatherConditions
