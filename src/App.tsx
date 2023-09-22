import {Routes, Route, Link} from "react-router-dom"

import classes from "./App.module.css"
import Header from "./components/Layout/Header"
import HomePage from "./components/Pages/HomePage"
import FavoritesPage from "./components/Pages/FavoritesPage"

function App() {
  return (
    <>
      <Header>
        <div className={classes.taskName}>weather task</div>
        <div className={classes.navLinks}>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Favorites">Favorites</Link>
          </li>
        </div>
      </Header>

      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  )
}

export default App
