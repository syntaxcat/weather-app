import {useState, useMemo, createContext, useContext} from "react"
import {Routes, Route, Outlet, Link, useLocation} from "react-router-dom"
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
import {City} from "./types"
import {Snackbar, SnackbarContent} from "@mui/material"

const FavoritesPageWrapper = () => {
  const favoriteFromStorage = localStorage.getItem("Favorites")
  let favorites: City[]
  if (favoriteFromStorage === null) {
    favorites = []
  } else {
    favorites = JSON.parse(favoriteFromStorage)
  }

  return <FavoritesPage favoriteLocations={favorites} />
}

const ColorModeContext = createContext({toggleColorMode: () => {}})

function App() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const location = useLocation()

  const [errorMessage, setErrorMessage] = useState<string | null>(null) // Added error state

  const routes = ["/Favorites", "/"]
  const currentTab = routes.find((route) => route === location.pathname)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        height: "100%",
        bgcolor: "background.default",
        color: "text.primary",
        overflowY: "scroll"
      }}
    >
      <Header>
        <div className={classes.taskName}>weather task</div>
        <div className={classes.navLinks}>
          <div className={classes.toggleDarkMode}>
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
          </div>
          <Box sx={{width: "100%", marginRight: "1rem"}}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
              <Tabs value={currentTab}>
                <Tab component={Link} value="/" to="/" label="Home" />
                <Tab
                  component={Link}
                  value="/Favorites"
                  to="/Favorites"
                  label="Favorites"
                />
              </Tabs>
            </Box>
          </Box>
        </div>
      </Header>
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Outlet />
      </Box>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <SnackbarContent message={errorMessage} />
      </Snackbar>
    </Box>
  )
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState<"light" | "dark">("dark")
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
          <Routes>
            <Route path="" element={<App />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/Favorites" element={<FavoritesPageWrapper />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}
