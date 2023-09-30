import {useState} from "react"
import SearchLocation from "../components/SearchLocation"
import {City} from "../types"
import WeatherConditions from "../components/WeatherConditions"
import DailyForecast from "../components/DailyForecasts"

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
      {selectedCity && (
        <>
          <WeatherConditions city={selectedCity} />
          <DailyForecast city={selectedCity} />
        </>
      )}
    </>
  )
}

export default HomePage
