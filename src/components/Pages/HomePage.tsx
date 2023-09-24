import {useState} from "react"
import SearchLocation from "../Locations/SearchLocation"
import WeatherDetails from "../Weather/WeatherDetails"

const HomePage = () => {
  // const TelAvivCityKey = "215854" // TEL AVIV - DEFAULT - for bonus
  const [locationName, setLocationName] = useState("")
  const [selectedCityKey, setSelectedCityKey] = useState<string | null>(null)

  const handleLocationChange = (newLocationName: string) => {
    setLocationName(newLocationName)
  }

  const handleSelectedCityKey = (cityKey: string) => {
    // console.log("HOMEPAGE -cityKey", cityKey)
    setSelectedCityKey(cityKey)
  }

  return (
    <>
      <SearchLocation
        onLocationChange={handleLocationChange}
        onSelectCityKey={handleSelectedCityKey}
      />
      {selectedCityKey && (
        <WeatherDetails
          locationName={locationName}
          selectedCityKey={selectedCityKey}
        />
      )}
    </>
  )
}

export default HomePage
