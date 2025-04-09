import { BrowserRouter } from "react-router-dom"
import { StyledEngineProvider } from "@mui/material/styles"
import { SnackbarProvider } from "notistack"


import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ApiLimitProvider } from './context/ApiLimitContext'; 


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
          <SnackbarProvider
            maxSnack={4}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={3000}
            className="my-snackbar"
          >
            <ApiLimitProvider>
            <App />
            </ ApiLimitProvider>

          </SnackbarProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
)
