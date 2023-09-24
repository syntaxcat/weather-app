import {useState, useCallback} from "react"
import SearchLocation from "../Locations/SearchLocation"
import WeatherDetails from "../Weather/WeatherDetails"

const HomePage = () => {
  const cityKey = "215854"
  const [locationName, setLocationName] = useState("")

  const handleLocationChange = (newLocationName) => {
    setLocationName(newLocationName)
  }

  return (
    <>
      <SearchLocation onLocationChange={handleLocationChange} />
      <WeatherDetails cityKey={cityKey} locationName={locationName} />
    </>
  )
}

export default HomePage
