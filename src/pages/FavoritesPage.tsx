import { useState, useEffect } from "react"
import classes from "./FavoritesPage.module.css"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { City } from "../types"
import { apiKey } from "../consts"
import { pink } from "@mui/material/colors"
import IconButton from "@mui/material/IconButton"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useSnackbar } from "notistack"

interface FavoritesPageProps {
  favoriteLocations: City[]
}

const END_POINT = "https://dataservice.accuweather.com/currentconditions/v1/"

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favoriteLocations }) => {
  const [weatherData, setWeatherData] = useState<any[]>([])
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [removingCardId, setRemovingCardId] = useState<string | null>(null)

  const removeFromFavorites = (cityKey: string) => {
    setRemovingCardId(cityKey)

    setTimeout(() => {
      const stored = localStorage.getItem("Favorites")
      const favorites = stored ? JSON.parse(stored) : []
      const updated = favorites.filter((city: City) => city.key !== cityKey)
      localStorage.setItem("Favorites", JSON.stringify(updated))

      const newWeatherData = weatherData.filter((item) => item.city.key !== cityKey)
      setWeatherData(newWeatherData)
      setRemovingCardId(null)

      const isLastItem = newWeatherData.length === 0
      enqueueSnackbar(
        isLastItem ? "No favorites left 💔" : "Removed from favorites",
        {
          variant: isLastItem ? "warning" : "info",
          className: "snackbar-content"
        }
      )
    }, 300)
  }

  const CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

  const fetchWeatherData = async (cityKey: string) => {
    const cacheKey = `weather-${cityKey}`
    const cached = localStorage.getItem(cacheKey)

    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_TTL) {
        console.log("✅ Using cached weather for:", cityKey)
        return data
      } else {
        console.log("⚠️ Cache expired for:", cityKey)
      }
    }

    const response = await fetch(
      `${END_POINT}/${cityKey}?apikey=${apiKey}`
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: data[0], timestamp: Date.now() })
    )

    return data[0]
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPromises = favoriteLocations.map(async (city) => {
          const weather = await fetchWeatherData(city.key)
          return { city, weather }
        })

        const weatherResults = await Promise.all(fetchPromises)
        setWeatherData(weatherResults)

        // ✅ Show toast only once for first-time users
        const hasSeenToast = localStorage.getItem("HasSeenDefaultToast")
        if (!hasSeenToast && (favoriteLocations.some(city => city.key === "349727" || city.key === "226396"))) {
          enqueueSnackbar("✨ Added New York & Tokyo to your favorites!", {
            variant: "success",
            className: "snackbar-content" 
          })
          localStorage.setItem("HasSeenDefaultToast", "true")
        }
      } catch (error) {
        console.error("Error fetching weather conditions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [favoriteLocations])

  return (
    <>
      <div className={classes.favoritesContainer}>
        {loading ? (
          <div className={classes.loading}>Loading favorites...</div>
        ) : weatherData.length === 0 ? (
          <div className={classes.noData}>
            No favorites yet 💔<br />
            Go back to the home page and add some!
          </div>
        ) : (
          <div className={classes.favoritesArray}>
            {weatherData.map((item, index) => (
              <Card
                className={`${classes.favoriteCard} ${removingCardId === item.city.key ? classes.fadeOut : ""}`}
                sx={{
                  minWidth: 275,
                  maxWidth: 300,
                  borderRadius: 3,
                  backgroundColor: "background.paper",
                  padding: 2,
                  transition: "opacity 0.3s ease"
                }}
                key={index}
              >
                <CardContent>
                  <div className={classes.weatherCardContent}>
                    <IconButton
                      onClick={() => removeFromFavorites(item.city.key)}
                      aria-label="remove from favorites"
                      size="small"
                    >
                      <FavoriteIcon sx={{ color: pink[500] }} />
                    </IconButton>

                    <div className={classes.cityName}>{item.city.name}</div>

                    <div className={classes.favoriteCurrentTemperature}>
                      {item.weather.Temperature.Metric.Value}°C
                    </div>

                    {item.weather?.WeatherIcon && (
                      <img
                        className={classes.weatherIconImg}
                        src={
                          item.weather.WeatherIcon < 10
                            ? `https://developer.accuweather.com/sites/default/files/0${item.weather.WeatherIcon}-s.png`
                            : `https://developer.accuweather.com/sites/default/files/${item.weather.WeatherIcon}-s.png`
                        }
                        alt="Weather icon"
                      />
                    )}

                    <div className={classes.weatherText}>{item.weather.WeatherText}</div>

                    <div className={classes.countryName}>{item.city.country}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default FavoritesPage
