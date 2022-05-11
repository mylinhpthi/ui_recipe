import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from './components/Partial/Header';
import Footer from './components/Partial/Footer';
import Hero from './components/Home/Hero';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import AddAddress from './components/Address/AddAddress';
import AddressDetail from './components/Address/AddressDetail';
import EditAddress from './components/Address/EditAddress';
import ListAddress from './components/Address/ListAddress';
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
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<Hero />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/address/list" element={<ListAddress />}/>
            <Route path="/address/add" element={<AddAddress />}/>
            <Route path="/address/:id" element={<AddressDetail />}/>
            <Route path="/address/:id/edit" element={<EditAddress />}/>
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </div>
    
  );
}

export default App;
