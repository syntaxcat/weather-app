import React, {useState, useEffect} from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

const SearchLocation = () => {
  const [locations, setLocations] = useState([])

  //   useEffect(() => {
  //     fetchLoctionsHandler()
  //   }, [])

  async function fetchLoctionsHandler() {
    const apiKey = "KEY"
    const query = "Tel"

    await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`
    )
      .then((response) => {
        response.json()
      })
      .then((data) => {
        const foundLocations = data.map((locationData) => {
          return {
            name: locationData.LocalizedName
          }
        })
        setLocations(foundLocations)
      })
      .catch((error) => console.error("Error fetching locations:", error))
  }
  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={locations}
        sx={{width: 300}}
        // getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="" />}
      />
    </div>
  )
}

export default SearchLocation
