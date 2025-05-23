import { useState, useMemo, createContext, useContext, useEffect } from "react"
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom"
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import HomeIcon from "@mui/icons-material/Home"
import FavoriteIcon from "@mui/icons-material/Favorite"

import classes from "./App.module.css"
import HomePage from "./pages/WeatherDetails"
import FavoritesPage from "./pages/FavoritesPage"
import { City } from "./types"
import { Snackbar, SnackbarContent, useMediaQuery } from "@mui/material"
import { useSnackbar } from "notistack"
import ApiLimitMessage from './components/ApiLimitMessage'
import Footer from './components/Footer'; // Import Footer





const DEFAULT_FAVORITES: City[] = [
  { key: "349727", name: "New York", country: "USA" },
  { key: "226396", name: "Tokyo", country: "Japan" }
]

const FavoritesPageWrapper = () => {
  const [favorites, setFavorites] = useState<City[]>([])

  useEffect(() => {
    const favoriteFromStorage = localStorage.getItem("Favorites")

    if (!favoriteFromStorage) {
      localStorage.setItem("Favorites", JSON.stringify(DEFAULT_FAVORITES))
      setFavorites(DEFAULT_FAVORITES)
    } else {
      setFavorites(JSON.parse(favoriteFromStorage))
    }
  }, [])

  return <FavoritesPage favoriteLocations={favorites} />
}

const ColorModeContext = createContext({ toggleColorMode: () => { } })

function App() {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const handler = (e: any) => {
      enqueueSnackbar(e.detail.text, {
        variant: e.detail.type || "default"
      })
    }

    window.addEventListener("show-msg", handler)
    return () => window.removeEventListener("show-msg", handler)
  }, [])

  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const location = useLocation()
  const isMobile = useMediaQuery("(max-width: 600px)")

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const routes = ["/Favorites", "/"]
  const currentTab = routes.find((route) => route === location.pathname)

  const tabSx = {
    minWidth: { xs: "48px", sm: "90px" },
    paddingX: { xs: 0.5, sm: 2 },
    paddingY: { xs: 0.5, sm: 1 },
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
        height: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary"
      }}
    >
      <ApiLimitMessage />

      <header>
        <nav className={classes.headerNav}>
          <div className={classes.taskName}>Weather or Not ☁️</div>
          <div className={classes.navLinks}>
            <Tabs value={currentTab} variant={isMobile ? "standard" : "fullWidth"}>
              <Tab
                icon={isMobile ? <HomeIcon /> : undefined}
                label={isMobile ? undefined : "Home"}
                component={Link}
                sx={tabSx}
                value="/"
                to="/"
              />
              <Tab
                icon={isMobile ? <FavoriteIcon /> : undefined}
                label={isMobile ? undefined : "Favorites"}
                component={Link}
                sx={tabSx}
                value="/Favorites"
                to="/Favorites"
              />
            </Tabs>
            <IconButton
              onClick={colorMode.toggleColorMode}
              color="inherit"
              sx={{ ml: 1 }}
            >
              {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
        </nav>
      </header>

      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flexGrow: 1,
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
      <Footer />
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
          mode,
          ...(mode === "light"
            ? {
              background: {
                default: "#f7f7f7",
                paper: "#ffffff"
              },
              text: {
                primary: "#222",
                secondary: "#555"
              }
            }
            : {})
        }
      }),
    [mode]
  )

  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="Favorites" element={<FavoritesPageWrapper />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
