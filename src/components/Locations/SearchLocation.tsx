import {useState, useEffect, useCallback} from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import {CITIES} from "../../consts"
import {City} from "../../types"
import {Box, Typography} from "@mui/material"

const apiKey = "eRNLNGG3oeGxTSnzYHanKaG1SVSwOqvU"
const END_POINT =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"

interface SearchLocationProps {
  onSelectCity: (city: City) => void
}

const SearchLocation = (props: SearchLocationProps) => {
  const [value, setValue] = useState<City | null>(null)
  const [inputValue, setInputValue] = useState(" ")
  const [options, setOptions] = useState<readonly City[]>([])

  const sendRequest = useCallback(function fetchLoctionsHandler(
    userInput: string
  ) {
    setOptions(
      CITIES.map((city) => {
        return {
          key: city.Key,
          name: city.LocalizedName,
          country: city.Country.LocalizedName
        }
      })
    )
    return
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
      if (inputValue === "") {
        setOptions(value ? [value] : [])
        return
      }
      sendRequest(inputValue)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])

  const locationChangeHandler = (_event: any, newValue: City | null) => {
    setValue(newValue)
    if (newValue) {
      props.onSelectCity(newValue)
    }
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
      value={value}
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
