import { useState, useEffect } from "react"
import classes from "./FavoritesPage.module.css"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
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
          ContentProps: { className: "snackbar-content" }
        }
      )
    }, 300) 
  }


  const fetchWeatherData = async (cityKey: string) => {
    const response = await fetch(`${END_POINT}/${cityKey}?apikey=${apiKey}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
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
              <Card className={removingCardId === item.city.key ? classes.fadeOut : ""}
                sx={{
                  minWidth: 275,
                  maxWidth: 300,
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: "background.paper",
                  padding: 2,
                  transition: "opacity 0.3s ease"
                }} key={index}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <div className={classes.FavoriteLocationCard}>
                      <div className={classes.cityHeader}>
                        <div className={classes.cityName}>{item.city.name}</div>
                        <IconButton
                          onClick={() => removeFromFavorites(item.city.key)}
                          aria-label="remove from favorites"
                          size="small"
                        >
                          <FavoriteIcon sx={{ color: pink[500] }} />
                        </IconButton>
                      </div>

                      {item.weather ? (
                        <div className={classes.favoriteCurrentTemperature}>
                          {item.weather.Temperature.Metric.Value}°C
                        </div>
                      ) : (
                        <div className={classes.favoriteCurrentTemperature}>N/A</div>
                      )}

                      <div className={classes.countryName}>{item.city.country}</div>
                    </div>
                  </Typography>
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
