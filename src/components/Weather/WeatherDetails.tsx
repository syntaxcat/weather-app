import React, {useState, useEffect} from "react"
import {fiveForecastsDaily} from "../../consts"
import classes from "./WeatherDetails.module.css"

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
  locationName: string
}

interface dailyForecast {
  Date: string
  Temperature: {
    Minimum: {
      Value: number
      Unit: string
    }
    Maximum: {
      Value: number
      Unit: string
    }
  }
}

const apiKey = "wRman2opJL9iXtkGMrF7VHfLtrPfGayV"
const END_POINT = "http://dataservice.accuweather.com/currentconditions/v1/"

const WeatherDetails = (props: WeatherDetailsProps) => {
  const [currentConditions, setCurrentConditions] =
    useState<CurrentWeatherConditions | null>(null)

  // const [options, setOptions] = useState<readonly dailyForecast[]>([])
  const [dailyForecasts, setDailyForecasts] = useState<dailyForecast[]>([])

  //CURRENT_WEATHER -
  // const getData = () => {
  //   setCurrentConditions(() => {
  //     return CURRENT_WEATHER
  //   })
  // }

  // 5 day forecast daily-
  const getData = () => {
    setDailyForecasts(fiveForecastsDaily.DailyForecasts)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    // getData()
    if (!props.locationName) {
      return
    }
    fetch(
      `${END_POINT}/${props.cityKey}?apikey=${apiKey}&q=${props.locationName}`
    )
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
  }, [props.cityKey, props.locationName])

  // let dateObj = new Date()
  // let month = dateObj.getUTCMonth() + 1 //months from 1-12
  // let day = dateObj.getUTCDate()
  // let year = dateObj.getUTCFullYear()

  // newdate = year + "/" + month + "/" + day

  return (
    <>
      {currentConditions && (
        <div>
          <div>Weather details for : {props.locationName} </div>
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
          <div className={classes.dailyFiveForecasts}>
            {dailyForecasts.map((forecast, index) => (
              <div key={index} className={classes.daily}>
                <div>Date: {forecast.Date}</div>
                <div>
                  Temperature (Minimum): {forecast.Temperature.Minimum.Value}{" "}
                  {forecast.Temperature.Minimum.Unit}
                </div>
                <div>
                  Temperature (Maximum): {forecast.Temperature.Maximum.Value}{" "}
                  {forecast.Temperature.Maximum.Unit}
                </div>
                {/* <div>Day Icon Phrase: {forecast.Day.IconPhrase}</div>
                <div>Night Icon Phrase: {forecast.Night.IconPhrase}</div> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default WeatherDetails
