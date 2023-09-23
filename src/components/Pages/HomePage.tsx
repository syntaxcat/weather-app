import SearchLocation from "../Locations/SearchLocation"
import WeatherDetails from "../Weather/WeatherDetails"

const HomePage = () => {
  const cityKey = "215854"
  return (
    <>
      <SearchLocation />
      <WeatherDetails cityKey={cityKey} />
    </>
  )
}

export default HomePage
