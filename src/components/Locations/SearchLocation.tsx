import React, {useState, useEffect, useCallback} from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import {Key} from "@mui/icons-material"
// import Typography from "@mui/material/Typography"

interface City {
  key: string
  name: string
  country: string
}

const defaultCity = {
  key: "215854",
  name: "Tel Aviv",
  country: "Israel"
}

const apiKey = "NGr9R9zfGKqH34BGjghe04D0Dt3rCrj4"
const END_POINT =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"

interface SearchLocationProps {
  onLocationChange: (locationName: string) => void
  onSelectCityKey: (cityKey: string) => void
}

const SearchLocation = (props: SearchLocationProps) => {
  const [value, setValue] = useState<City | null>(defaultCity)
  const [inputValue, setInputValue] = useState(defaultCity.name)
  const [options, setOptions] = useState<readonly City[]>([defaultCity])

  //   const getData = () => {
  //     setOptions(
  //       CITIES.map((city) => {
  //         return {
  //           key: city.Key,
  //           name: city.LocalizedName,
  //           country: city.Country.LocalizedName
  //         }
  //       })
  //     )
  //   }

  //Check - fix types

  const sendRequest = useCallback(function fetchLoctionsHandler(userInput) {
    fetch(`${END_POINT}?apikey=${apiKey}&q=${userInput}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const foundLocations = data.map((locationData) => {
          return {
            key: locationData.Key,
            name: locationData.LocalizedName,
            country: locationData.Country.LocalizedName
          }
        })
        setOptions(foundLocations)
      })
      .catch((error) => console.error("Error fetching locations:", error))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      //   getData()
      if (inputValue === "") {
        setOptions(value ? [value] : [])
        return
      }
      //   fetchLoctionsHandler()
      sendRequest(inputValue)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])

  const locationChangeHandler = (event: any, newValue: City | null) => {
    setValue(newValue)
    if (newValue) {
      props.onLocationChange(newValue.name)
      props.onSelectCityKey(newValue.key)
    }
  }

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{width: 300}}
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      isOptionEqualToValue={(option, value) => {
        return option.key === value.key
      }}
      onChange={locationChangeHandler}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        // console.log("PROPS", props) // key: "Tokyo" == name , but we need *Key*
        // console.log("OPTION", option) // only name
        return (
          <li {...props} key={option.key}>
            <Grid container alignItems="center">
              <Grid item sx={{display: "flex", width: 44}}>
                <LocationOnIcon sx={{color: "text.secondary"}} />
              </Grid>
              {option.name}
              {/* <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {option.country}
              </Typography> */}
            </Grid>
          </li>
        )
      }}
    />
  )
}

export default SearchLocation
