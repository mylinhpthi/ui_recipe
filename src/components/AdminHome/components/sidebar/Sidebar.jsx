import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { signOut } from "../../../../services/firebase.services";
import { Cookies } from "react-cookie";

const Sidebar = ({active="TrangChu"}) => {
  const cookies = new Cookies();
useEffect(() => {
  console.log(active)
}, []);
const navigate = useNavigate();
const logout =(e) =>{
  e.preventDefault();
  localStorage.removeItem('user');
  cookies.remove('privilege', { path: '/' });
  cookies.remove('privilege', { path: '/admin' });
  signOut();
  navigate("/login");
}
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none", textAlign:"center" }}>
          <span className="logo">HAPPY FOOD</span>
          <p className="sub-icon"><small >Administrator</small></p>
        </Link>
      </div>
      <hr style={{marginTop:"0px"}}/>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin/" style={{ textDecoration: "none", }}>
          <li className={(active == "TrangChu") ?"active-sidebar":""}>
            <DashboardIcon className="icon" />
            <span>Trang ch???</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
            <Link to="/admin/user" style={{ textDecoration: "none", }}>
            <li className={(active == "User")?"active-sidebar":""}>
              <PersonOutlineIcon className="icon" />
              <span >Ng?????i d??ng</span>
            </li>
          </Link>
         
         
          <Link to="/admin/recipe" style={{ textDecoration: "none" }}>
            <li className={(active == "Recipe") ?"active-sidebar":""}>
              <StoreIcon className="icon" />
              <span>M??n ??n</span>
            </li>
          </Link>
          <Link to="/admin/category" style={{ textDecoration: "none" }}>
          <li className={(active == "Category") ?"active-sidebar":""}>
            <CreditCardIcon className="icon" />
            <span>Danh m???c</span>
          </li>
          </Link>
          <Link to="/admin/news" style={{ textDecoration: "none" }}>
          <li className={(active == "News") ?"active-sidebar":""}>
            <LocalShippingIcon className="icon" />
            <span>Tin t???c</span>
          </li></Link>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Feedback</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Th??ng b??o</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>B??o c??o</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>C??i ?????t</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>T??i kho???n</span>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>????ng xu???t</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
