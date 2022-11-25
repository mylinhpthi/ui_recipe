import React from 'react'
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./home.css";
import Widget from "./components/widget/Widget";
import Featured from "./components/featured/Featured";
import Chart from "./components/chart/Chart";
import Table from "./components/table/Table";
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["privilege"]);
  const { isLoading, setIsLoading, setCurrentUser, setIsAuth, setPrivilege, privilege } =
  React.useContext(AppContext);
  useEffect(() => {
   console.log(cookies.privilege)
   console.log(cookies.privilege.some(el => el.id === "6354cfc925489097bde657b3"));
   if((cookies.privilege !="null" && !cookies.privilege.some(el => el.id === "6354cfc925489097bde657b3")) || cookies.privilege =="null")
    {toast.error("Truy cập không hợp lệ");
      navigate("/error/403");}
  }, [cookies])
  
  return (
<div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Biểu đồ 6 tháng gần đây" aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
    
  )
}

export default Home
