import {useState} from "react"
import SearchLocation from "../Locations/SearchLocation"
import WeatherDetails from "../Weather/WeatherDetails"

const HomePage = () => {
  const TelAvivCityKey = "215854" // TEL AVIV - DEFAULT - for bonus
  const [selectedCityKey, setSelectedCityKey] = useState<string | null>(
    TelAvivCityKey
  )

  const handleSelectedCityKey = (cityKey: string) => {
    setSelectedCityKey(cityKey)
  }

  return (
    <>
      <SearchLocation onSelectCityKey={handleSelectedCityKey} />
      {selectedCityKey && <WeatherDetails selectedCityKey={selectedCityKey} />}
    </>
  )
}

export default HomePage
