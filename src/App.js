import logo from "./logo.svg";
import "./App.css";
import "./firebase.config";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Partial/Header";
import Footer from "./components/Partial/Footer";
import Hero from "./components/Home/Hero";
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
const theme = createTheme({
  palette: {
    primary: {
      light: "#ff5131",
      main: "#d50000",
      dark: "#9b0000",
    },
    secondary: {
      light: "#ffffff",
      main: "#e0f2f1",
      dark: "#aebfbe",
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
              <Header />
            </Router>
            <Router>
              <Routes>
                {/* <Route exact path="/" element={<Hero />} /> */}
                <Route exact path="/" element={<Map />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/address/list" element={<ListAddress />} />
                <Route path="/address/add" element={<AddAddress />} />
                <Route path="/address/:id" element={<AddressDetail />} />
                <Route path="/address/:id/edit" element={<EditAddress />} />
              </Routes>
            </Router>
            <Footer />
          </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
