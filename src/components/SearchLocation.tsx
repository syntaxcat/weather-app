import { useState, useEffect, useCallback } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { City } from "../types"
import { Box, Typography } from "@mui/material"
import { apiKey } from "../consts"
import Grid from '@mui/material/Grid';

import { useSnackbar } from "notistack"

const END_POINT =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"

interface SearchLocationProps {
  onSelectCity: (city: City | null) => void
  selectedCity: City | null
}

const SearchLocation = (props: SearchLocationProps) => {
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState<City[]>([])

  // const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

  const { enqueueSnackbar } = useSnackbar()

  const sendRequest = useCallback(function fetchLoctionsHandler(
    userInput: string
  ) {
    fetch(`${END_POINT}?apikey=${apiKey}&q=${userInput}`)
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
      })
      .catch(() => {
        enqueueSnackbar("Error fetching locations. Please try again.", {
          variant: "error"
        })
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
        sx={{ width: 300 }}
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
        // renderOption={(props, option) => {
        renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option: City) => {
          return (
            <li {...props} key={option.key}>
              <Grid container alignItems="center">
                <Grid
                  component="div"
                  sx={{ display: "flex", width: 44 }}
                  {...({ item: true } as any)} // 👈 force TS to allow 'item'
                >
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>

                <Grid
                  component="div"
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                  {...({ item: true } as any)} // 👈 same here
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
    </div>
  )
}

export default SearchLocation
