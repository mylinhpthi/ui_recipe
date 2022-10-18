import logo from "./logo.svg";
import "./App.css";
import "./firebase.config";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Partial/Header";
import Footer from "./components/Partial/Footer";

import Hero from "./components/Home/Hero";
import Example from "./components/Home/Example";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import AddAddress from "./components/Address/AddAddress";
import AddressDetail from "./components/Address/AddressDetail";
import EditAddress from "./components/Address/EditAddress";
import ListAddress from "./components/Address/ListAddress";
import { auth } from "./firebase.services";
import { onAuthStateChanged } from "@firebase/auth";
import { AppContext } from "./AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Partial/Map";
import ListRecipe from "./components/Recipe/RecipeList";
import RecipeDetail from "./components/Recipe/RecipeDetail";
import RecipeAdd from "./components/Recipe/RecipeAdd";
import RecipeEdit from "./components/Recipe/RecipeEdit";
import FavoriteRecipe from "./components/Recipe/FavoriteRecipe";
import ActiveAccount from "./components/Account/ActiveAccount";
import Template01 from "./components/Template/template01";

const theme = createTheme({
  palette: {
    primary: {
      light: "#B2FF59",
      main: "#54b902 ",
      dark: "#64DD17",
    },
    secondary: {
      light: "#FFD600",
      main: "#FFEA00",
      dark: "#FFFF00",
    },
  },
});

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser,  setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((t) => {
          setToken(t);
          setIsAuth(true);
          setCurrentUser(user);
        });
      } else {
        setIsAuth(false);
        setCurrentUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (!token) return;
    const authInterceptor = axios.interceptors.request.use(
      (config) => {
        config.headers = {
          authorization: `Bearer ${token}`,
        };
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{ isAuth, currentUser, isLoading, setIsLoading, setIsAuth,  setCurrentUser}}
        >
          
            <Router>
              <Routes>
                <Route exact path="/" element={<Hero />} />
                {/* <Route exact path="/" element={<Map />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recipe/list" element={<ListRecipe />} />
                <Route path="/recipe/add" element={<RecipeAdd />} />
                <Route path="/favoriteRecipe" element={<FavoriteRecipe />} />
                <Route path="/recipe/edit/:id" element={<RecipeEdit />} />
                <Route path="/blog/1" element={<Template01 />} />
                {/* Show detail recipe */}
                <Route path="/recipe/list/:id" element={<RecipeDetail />} />
                <Route path="/user/:name" element={<ActiveAccount />} />
              </Routes>
            </Router>
            <Footer />
          </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
