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
import RecipeEdit from "./components/Recipe/RecipeEdit";
import FavoriteRecipe from "./components/Recipe/FavoriteRecipe";
import ActiveAccount from "./components/Account/ActiveAccount";
import Template01 from "./components/Template/template01";
import User from "./components/AdminHome/user/User";
import Home from "./components/AdminHome/Home";
import Recipe from "./components/AdminHome/recipe/Recipe";
import Category from "./components/AdminHome/category/Category";
import RecipeAdd from "./components/Recipe/RecipeAdd";
import RecipeAddAd from "./components/AdminHome/recipe/RecipeAdd";
import CategoryAdd from "./components/AdminHome/category/CategoryAdd";
import UserPrivilege from "./components/AdminHome/user/UserPrivilege";

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
                {/* <Route exact path="/" element={<Hero />} /> */}
                <Route exact path="/" element={<Home />} />
                <Route exact path="/admin/user" element={<User />} />
                <Route exact path="/admin/user/privilege/:id" element={<UserPrivilege />} />
                <Route exact path="/admin/recipe" element={<Recipe />} />
                <Route exact path="/admin/recipe/add" element={<RecipeAddAd />} />
                <Route exact path="/admin/category/add" element={<CategoryAdd />} />
                <Route exact path="/admin/category" element={<Category />} />
                <Route exact path="/admin/news" element={<Recipe />} />
                <Route exact path="/admin" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recipe/list" element={<ListRecipe />} />
                <Route path="/recipe/add" element={<RecipeAdd />} />
                <Route path="/favoriteRecipe" element={<FavoriteRecipe />} />
                <Route path="/recipe/edit/:id" element={<RecipeEdit />} />
                <Route path="/blog/1" element={<Template01 />} />
                {/* Show detail recipe */}
                <Route path="/recipe/list/:id" element={<RecipeDetail/>} />
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
