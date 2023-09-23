import React, {useState, useEffect, useCallback} from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

interface City {
  key: string
  name: string
  country: string
}

const apiKey = "Rstic0VBtv4jrY9KbUe2o4TzgybGMMlG"
const END_POINT =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"

const SearchLocation = () => {
  const [value, setValue] = useState<City | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState<readonly City[]>([])

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

  const sendRequest = useCallback(function fetchLoctionsHandler(userInput) {
    fetch(`${END_POINT}?apikey=${apiKey}&q=${userInput}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const foundLocations = data.map((locationData) => {
          return {
            name: locationData.LocalizedName
          }
        })
        setOptions(foundLocations)
        console.log(userInput)
      })
      .catch((error) => console.error("Error fetching locations:", error))
    console.log("FETCHING")
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
      onChange={(event: any, newValue: City | null) => {
        setValue(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={props.key}>
            <Grid container alignItems="center">
              <Grid item sx={{display: "flex", width: 44}}>
                <LocationOnIcon sx={{color: "text.secondary"}} />
              </Grid>
              {option.name}
              <Typography variant="body2" color="text.secondary">
                {option.country}
              </Typography>
            </Grid>
          </li>
        )
      }}
    />
  )
}

export default SearchLocation
