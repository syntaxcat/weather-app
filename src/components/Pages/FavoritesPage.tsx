import classes from "./FavoritesPage.module.css"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

// const bull = (
//   <Box
//     component="span"
//     sx={{display: "inline-block", mx: "2px", transform: "scale(0.8)"}}
//   >
//     •
//   </Box>
// )

interface FavoriteLocation {
  ID: string
  name: string
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
  currentWeather: string
}

interface FavoritesPageProps {
  favoriteLocations: FavoriteLocation[]
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({favoriteLocations}) => {
  console.log(favoriteLocations)

  return (
    <>
      <div className={classes.favoritesContainer}>
        <div className={classes.favoritesArray}>
          {/* </div> */}
          {favoriteLocations.map((location) => (
            <Card sx={{minWidth: 275}} key={location.ID}>
              <CardContent>
                {/* <Typography
                sx={{fontSize: 14}}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography> */}
                <Typography variant="h5" component="div">
                  <div className={classes.FavoriteLocationCard}>
                    <div>{location.name}</div>
                    <div>{location.Temperature?.Metric?.Value}</div>
                    <div>
                      {location.Temperature && location.Temperature.Metric && (
                        <div>{location.Temperature.Metric.Value}</div>
                      )}
                    </div>
                    <div>{location.currentWeather}</div>
                  </div>
                </Typography>
              </CardContent>
              {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default FavoritesPage
