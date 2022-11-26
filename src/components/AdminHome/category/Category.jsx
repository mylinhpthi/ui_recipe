import "./category.css"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"
import Datatable from "../components/datatable/Datatable"
import useAxios from "axios-hooks"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import { categoryColumns } from "../components/datatable/datatablesource"
import CategoryDetail from "./CategoryDetail"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AppContext } from "../../../AppContext";
// import CategoryDetail from "./CategoryDetail"
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Category = () => {
   const [open, setOpen] = useState(false);
   const [category, setCategory] = useState({});
   const [{ data, loading, error }] = useAxios(`category/list`, {});
   const [categoriesData, setCategoriesData] = useState({});
   const notify = () => toast("");
   const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["privilege"]);
   async function handleDelete(id) {
    if((cookies.privilege.some(el => el.id === "6354cfc925489097bde657b3") && cookies.privilege.some(el => el.id === "63512b56caf267316d40e32a")) ){
      let res = await fetch("http://localhost:8093/category/delete/"+id, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
       
      if (res) {
        toast.success("Xóa danh mục thành công!");
      }
      window.location.reload();
    } 
    else{
      navigate("/error/403");
      return;
    }
    }
  function handleClickEdit(id){
  if((cookies.privilege.some(el => el.id === "6354cfc925489097bde657b3") && cookies.privilege.some(el => el.id === "63512b62caf267316d40e32c")) ){
    navigate("/admin/category/edit/"+id);
  } 
  else{
    navigate("/error/403");
    return;
  }
    
  }
  async function handleClickOpen(id){
    let res = await fetch("http://localhost:8093/category/list/"+id, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
      res = await res.json();
      console.log(res);
      if(res)
        setCategory(res);
    setOpen(true);
    console.log(id);
    console.log(res);
    // setId(id);
    
  }
  useEffect(()=> {
    if(data)
    setCategoriesData(data)
  }, [data])
  
const handleAddPrivilege = (event)=>{
  event.preventDefault();
  if((cookies.privilege.some(el => el.id === "6354cfc925489097bde657b3") && cookies.privilege.some(el => el.id === "63512b5ccaf267316d40e32b")) ){
    navigate("/admin/category/add");
  } 
  else{
    navigate("/error/403");
    return;
  }
  
}

  const handleClose = () => {
    setOpen(false);
  };
   const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button onClick={()=>handleClickOpen(params.id)}  style={{ textDecoration: "none" }}>
              <div className="viewButton">Chi tiết</div>
            </Button>
            <Button onClick={()=>handleClickEdit(params.id)}  style={{ textDecoration: "none" }}>
              <div className="viewButton">Chỉnh sửa</div>
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
        {Category&&(
      <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Chi tiết danh mục
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
          Quay lại
          </Button>
        </Toolbar>
      </AppBar>
      <CategoryDetail id={category.id} />
      {/* <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
      </List> */}
    </Dialog>
     )}
      <Sidebar active="Category"/>
      <div className="listContainer">
        <Navbar/>
        <div className="div-btn container d-flex justify-content-end "  >
          <Link to="/admin/category/add" onClick={handleAddPrivilege}  className="btn btn-new" >
            Thêm mới
          </Link>
        </div>
        <Datatable data={categoriesData} actionColumn={actionColumn} column={categoryColumns}/>
      </div>
    </div>
  )
}

export default Category