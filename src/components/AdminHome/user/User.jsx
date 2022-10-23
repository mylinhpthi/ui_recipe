import "./User.css"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"
import Datatable from "../components/datatable/Datatable"
import useAxios from "axios-hooks"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { userColumns } from "../components/datatable/datatablesource"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

const User = () => {
   const [{ data, loading, error }] = useAxios(`user/list`, {});
   const navigate = useNavigate();
   async function handleDelete(id) {
    console.log(id);
    let res = await fetch("http://localhost:8093/user/delete/"+id, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
      if(res){
        toast.success("Xóa tài khoản thành công!");
      }
     window.location.reload();
  };
  async function handleClickPrivilege(id) {
    navigate("/admin/user/privilege/"+id);
  }
   const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button onClick={()=>handleClickPrivilege(params.id)}  style={{ textDecoration: "none" }}>
              <div className="viewButton">Phân quyền</div>
            </Button>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <Sidebar active="User"/>
      <div className="listContainer">
        <Navbar/>
        {/* <div className="div-btn container d-flex justify-content-end "  >
          <Link to="/admin/user/privilege+{}"  className="btn btn-new" >
            Phân quyền
          </Link>
        </div> */}
        <Datatable data={data} actionColumn={actionColumn} column={userColumns}/>
      </div>
    </div>
  )
}

export default User