interface FavoriteLocation {
  ID: string
  name: string
  currentWeather: string
}

interface FavoritesPageProps {
  favoriteLocations: FavoriteLocation[]
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({favoriteLocations}) => {
  return (
    <>
      <div>
        <div>Favorite Locations:</div>
        {favoriteLocations.map((location) => (
          <div key={location.ID}>
            ID: {location.ID}, Name: {location.name}, Current Weather:{" "}
            {location.currentWeather}
          </div>
        ))}
      </div>
    </>
  )
}

// const FavoritesPage = (props: FavoritesPageProps) => {
//   return (
//     <>
//       <div>
//         <div>coming from favorites.</div>
//         {props.ID}
//         {props.name}
//         {props.currentWeather}
//       </div>
//     </>
//   )
// }

export default FavoritesPage
