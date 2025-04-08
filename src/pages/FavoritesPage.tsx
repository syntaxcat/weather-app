import { useState, useEffect } from "react"
import classes from "./FavoritesPage.module.css"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { City } from "../types"
import { apiKey } from "../consts"

interface FavoritesPageProps {
  favoriteLocations: City[]
}

const END_POINT = "https://dataservice.accuweather.com/currentconditions/v1/"

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favoriteLocations }) => {

  console.log("📦 FavoritesPage mounted");
  const [weatherData, setWeatherData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


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
        //TODO - snackBar
      } finally {
        setLoading(false) // <- stop loading after API or error
      }
    }

    fetchData()
  }, [favoriteLocations])

  console.log("loading:", loading)
  console.log("📊 weatherData:", weatherData)

  return (
    <>
      <div className={classes.favoritesContainer}>
        {loading ? (
          <div className={classes.loading}>Loading favorites...</div>
        ) : weatherData.length === 0 ? (
          <div>✅ FavoritesPage loaded — no data yet</div>
          // <div className={classes.noData}>No data available</div>
        ) : (
          <div className={classes.favoritesArray}>
            {weatherData.map((item, index) => (
              <Card sx={{ minWidth: 275 }} key={index}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <div className={classes.FavoriteLocationCard}>
                      <div className={classes.cityName}>{item.city.name}</div>
  
                      {item.weather ? (
                        <div className={classes.favoriteCurrentTemperature}>
                          {item.weather.Temperature.Metric.Value}°C
                        </div>
                      ) : (
                        <div className={classes.favoriteCurrentTemperature}>
                          N/A
                        </div>
                      )}
  
                      <div className={classes.countryName}>
                        {item.city.country}
                      </div>
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
