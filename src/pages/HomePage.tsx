import {useState} from "react"
import SearchLocation from "../components/SearchLocation"
import WeatherDetails from "../components/WeatherDetails"
import {City} from "../types"

const defaultCity = {
  key: "215854",
  name: "Tel Aviv",
  country: "Israel"
}

const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(defaultCity)

  const handleSelectedCity = (city: City | null) => {
    setSelectedCity(city)
  }

  return (
    <>
      <SearchLocation
        onSelectCity={handleSelectedCity}
        selectedCity={selectedCity}
      />
      {selectedCity && <WeatherDetails selectedCity={selectedCity} />}
    </>
  )
}

export default HomePage
