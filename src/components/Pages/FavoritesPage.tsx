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
  return (
    <>
      <div>Favorite Locations:</div>
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
                    {/* <div>
                    {location.Temperature && location.Temperature.Metric && (
                      <div>{location.Temperature.Metric.Value}</div>
                    )}
                  </div> */}
                    <div>{location.currentWeather}</div>
                  </div>
                </Typography>
                {/* <Typography sx={{mb: 1.5}} color="text.secondary">
                adjective
              </Typography> */}
                {/* <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography> */}
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

// const updatedFavoritesHandler = (caption, postId) => {
//   const newFavorites = favorites.map((post) => {
//     if (post.id === postId) {
//       return {...post, caption}
//     } else {
//       return post
//     }
//   })
//   setPosts(newPosts)
//   const profiles = JSON.parse(localStorage.getItem("Profiles"))
//   const profile = profiles.filter(
//     (profile) => profile.id === foundProfile.id
//   )[0]
//   profile.posts = newPosts
//   localStorage.setItem("Profiles", JSON.stringify(profiles))
// }
