import {useState} from "react"
import SearchLocation from "../Locations/SearchLocation"
import WeatherDetails from "../Weather/WeatherDetails"
import {City} from "../../types"

const HomePage = () => {
  const TelAvivCityKey = "215854" // TEL AVIV - DEFAULT - for bonus
  const [selectedCity, setSelectedCity] = useState<City | null>(TelAvivCityKey)

  const handleSelectedCity = (city: City) => {
    setSelectedCity(city)
  }

  return (
    <>
      <SearchLocation onSelectCity={handleSelectedCity} />
      {selectedCity && <WeatherDetails selectedCity={selectedCity} />}
    </>
  )
}

export default HomePage
