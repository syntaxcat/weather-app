import {useState, useEffect, useCallback} from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import {City} from "../../types"
import {Box, Typography} from "@mui/material"

const apiKey = "wGLKJz3uKaNi7H9VxZwD20UG8kJchLG1"
const END_POINT =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"

interface SearchLocationProps {
  onSelectCity: (city: City | null) => void
  selectedCity: City | null
}

const SearchLocation = (props: SearchLocationProps) => {
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState<City[]>([])

  const sendRequest = useCallback(function fetchLoctionsHandler(
    userInput: string
  ) {
    fetch(`${END_POINT}?apikey=${apiKey}&q=${userInput}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const foundLocations = data.map((locationData: any) => {
          return {
            key: locationData.Key,
            name: locationData.LocalizedName,
            country: locationData.Country.LocalizedName
          }
        })
        setOptions(foundLocations)
      })
      .catch((error) => console.error("Error fetching locations:", error))
  },
  [])

  useEffect(() => {
    const timer = setTimeout(() => {
      //   getData()

      sendRequest(inputValue)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])

  const locationChangeHandler = (_event: any, newValue: City | null) => {
    props.onSelectCity(newValue)
  }

  return (
    <Autocomplete
      sx={{width: 300}}
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={props.selectedCity}
      noOptionsText="No locations"
      isOptionEqualToValue={(option, value) => {
        return option.key === value.key
      }}
      onChange={locationChangeHandler}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.key}>
            <Grid container alignItems="center">
              <Grid item sx={{display: "flex", width: 44}}>
                <LocationOnIcon sx={{color: "text.secondary"}} />
              </Grid>

              <Grid
                item
                sx={{width: "calc(100% - 44px)", wordWrap: "break-word"}}
              >
                <Box component="span">{option.name}</Box>

                <Typography variant="body2" color="text.secondary">
                  {option.country}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}

export default SearchLocation
