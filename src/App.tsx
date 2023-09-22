import {React, useState, useMemo, createContext, useContext} from "react"
import {Routes, Route, Outlet, Link} from "react-router-dom"
import {ThemeProvider, createTheme, useTheme} from "@mui/material/styles"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

import classes from "./App.module.css"
import Header from "./components/Layout/Header"
import HomePage from "./components/Pages/HomePage"
import FavoritesPage from "./components/Pages/FavoritesPage"

const ColorModeContext = createContext({toggleColorMode: () => {}})

function App() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3
      }}
    >
      <Header>
        <div className={classes.taskName}>weather task</div>
        <div className={classes.navLinks}>
          <Box sx={{width: "100%"}}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
              <Tabs value={value} onChange={handleChange}>
                <Tab component={Link} to="/Home" label="Home" />
                <Tab component={Link} to="/Favorites" label="Favorites" />
              </Tabs>
            </Box>
          </Box>
        </div>
      </Header>
      {value === 0 && <HomePage />}
      {value === 1 && <FavoritesPage />}
      <Outlet />
      {theme.palette.mode} mode
      <IconButton
        sx={{ml: 1}}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  )
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState<"light" | "dark">("light")
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      }
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <App />
          <Routes>
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Favorites" element={<FavoritesPage />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}
