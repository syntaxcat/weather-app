import {useState, useEffect, useCallback} from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import {City} from "../../types"
import {Box, Snackbar, SnackbarContent, Typography} from "@mui/material"
import {apiKey} from "../../consts"
import useMediaQuery from "@mui/material/useMediaQuery"

import Stack from "@mui/material/Stack"

const END_POINT =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"

interface SearchLocationProps {
  onSelectCity: (city: City | null) => void
  selectedCity: City | null
}

const SearchLocation = (props: SearchLocationProps) => {
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState<City[]>([])

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  const sendRequest = useCallback(function fetchLoctionsHandler(
    userInput: string
  ) {
    fetch(`${END_POINT}?apikey=${apiKey}&q=${userInput}`)
      // fetch(`${END_POINT}_INVALID_URL?apikey=${apiKey}&q=${userInput}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
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
        setErrorMessage(null)
      })
      .catch((error) => {
        console.error("Error fetching locations:", error)
        setErrorMessage("Error fetching locations. Please try again.")
      })
  },
  [])

  useEffect(() => {
    const timer = setTimeout(() => {
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
    <div>
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

      <Stack spacing={0} sx={{position: "fixed", bottom: 16, left: 16}}>
        <Snackbar
          key="searchLocationSnackbar"
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: isMobile ? "left" : "center"
          }}
        >
          <SnackbarContent message={errorMessage} />
        </Snackbar>
      </Stack>
    </div>
  )
}

export default SearchLocation
