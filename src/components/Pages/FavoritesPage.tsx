import classes from "./FavoritesPage.module.css"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import {City} from "../../types"

interface FavoritesPageProps {
  favoriteLocations: City[]
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({favoriteLocations}) => {
  return (
    <>
      <div className={classes.favoritesContainer}>
        <div className={classes.favoritesArray}>
          {favoriteLocations.map((city: City) => (
            <Card sx={{minWidth: 275}} key={city.key}>
              <CardContent>
                <Typography variant="h5" component="div">
                  <div className={classes.FavoriteLocationCard}>
                    <div>{city.name}</div>
                    <div>{city.country}</div>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default FavoritesPage
