import logo from "./logo.svg";
import "./App.css";
import "./firebase.config";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/Partial/Footer";

import Hero from "./components/Home/Hero";
import Example from "./components/Home/Example";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import { auth } from "./services/firebase.services";
import { onAuthStateChanged } from "@firebase/auth";
import { AppContext } from "./AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import ListRecipe from "./components/Recipe/RecipeList";
import RecipeDetail from "./components/Recipe/RecipeDetail";
import RecipeEdit from "./components/Recipe/RecipeEdit";
import FavoriteRecipe from "./components/Recipe/FavoriteRecipe";
import ActiveAccount from "./components/Account/ActiveAccount";
import Template01 from "./components/Template/template01";
import Template02 from "./components/Template/template02";
import Template03 from "./components/Template/template03";
import Template04 from "./components/Template/template04";
import User from "./components/AdminHome/user/User";
import Home from "./components/AdminHome/Home";
import Recipe from "./components/AdminHome/recipe/Recipe";
import Category from "./components/AdminHome/category/Category";
import RecipeAdd from "./components/Recipe/RecipeAdd";
import RecipeAddAd from "./components/AdminHome/recipe/RecipeAdd";
import CategoryAdd from "./components/AdminHome/category/CategoryAdd";
import UserPrivilege from "./components/AdminHome/user/UserPrivilege";
import Error404 from "./components/Partial/Error404";
import Error403 from "./components/Partial/Error403";
import CategoryEdit from "./components/AdminHome/category/CategoryEdit";
import Feedback from "./components/Home/feedback";
import Aboutus from "./components/Home/aboutus";
import FilterRecipe from "./components/Recipe/FilterRecipe";

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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>    
            <Router>
              <Routes>
                <Route exact path="/" element={<Hero />} />
                <Route exact path="/admin/category/edit/:id" element={<CategoryEdit />} />
                <Route exact path="/admin" element={<Home />} />
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
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/filter" element={<FilterRecipe />} />
                {/* Show detail recipe */}
                <Route path="/recipe/list/:id" element={<RecipeDetail/>} />
                <Route path="/user/:name" element={<ActiveAccount />} />
                <Route exact path="/error/404" element={<Error404 />} />
                <Route exact path="/error/403" element={<Error403 />} />
                <Route exact path="/new/1st" element={<Template01 />} />
                <Route exact path="/new/2nd" element={<Template02 />} />
                <Route exact path="/new/3rd" element={<Template03 />} />
                <Route exact path="/new/4th" element={<Template04 />} />
              </Routes>
            </Router>
            <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
