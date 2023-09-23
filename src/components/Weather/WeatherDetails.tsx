import React, {useState, useEffect} from "react"
import {CURRENT_WEATHER} from "../../consts"

interface CurrentWeatherConditions {
  WeatherText: string
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
}

interface WeatherDetailsProps {
  cityKey: string
}

const apiKey = "ppmafVEHCWeRj5Ggxuo9BbYI2kBBZenq"
const END_POINT = "http://dataservice.accuweather.com/currentconditions/v1/"

const WeatherDetails = (props: WeatherDetailsProps) => {
  const [currentConditions, setCurrentConditions] =
    useState<CurrentWeatherConditions | null>(null)

  // const getData = () => {
  //   setCurrentConditions(() => {
  //     return CURRENT_WEATHER
  //   })
  // }

  useEffect(() => {
    // getData()
    fetch(`${END_POINT}/${props.cityKey}?apikey=${apiKey}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        const foundWeatherConditions = data[0]
        setCurrentConditions(foundWeatherConditions)
      })
      .catch((error) =>
        console.error("Error fetching weather conditions:", error)
      )
    console.log("FETCHING")
  }, [])

  return (
    <>
      {currentConditions && (
        <div>
          <div>Weather Text: {currentConditions.WeatherText}</div>
          <div>
            Temperature (Metric): {currentConditions.Temperature.Metric.Value}{" "}
            {currentConditions.Temperature.Metric.Unit}
          </div>
          <div>
            Temperature (Imperial):{" "}
            {currentConditions.Temperature.Imperial.Value}{" "}
            {currentConditions.Temperature.Imperial.Unit}
          </div>
        </div>
      )}
      <div>Weather details for cityKey: {props.cityKey} </div>
    </>
  )
}

export default WeatherDetails
