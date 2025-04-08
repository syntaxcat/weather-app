import { BrowserRouter } from "react-router-dom"
import { StyledEngineProvider } from "@mui/material/styles"
import { SnackbarProvider } from "notistack"


import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
          <SnackbarProvider
            maxSnack={4}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={3000}
            classes={{ containerRoot: 'my-snackbar' }}
          >
            <App />
          </SnackbarProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
)
