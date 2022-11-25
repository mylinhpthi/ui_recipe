import "./recipe.css";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Datatable from "../components/datatable/Datatable";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { recipeColumns } from "../components/datatable/datatablesource";
import RecipeDetail from "./RecipeDetail";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Recipe = () => {
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [{ data, loading, error }] = useAxios(`recipe/list`, {});
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["privilege"]);
  async function handleDelete(id) {
    if((cookies.privilege !="null" && !cookies.privilege.some(el => el.id === "63512b7acaf267316d40e32f" && el.id === "6354cfc925489097bde657b3" )) || cookies.privilege =="null")
    {
      navigate("/error/403");
      return;
    } 
    console.log(id);
    let res = await fetch("http://localhost:8093/recipe/delete/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res) {
      toast.success("Xóa món ăn thành công!");
    }
    window.location.reload();
  }
  async function handleClickOpen(id) {
    let res = await fetch("http://localhost:8093/recipe/list/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    res = await res.json();
    console.log(res);
    if (res) setRecipe(res);
    setOpen(true);
    // console.log(id);
    // setId(id);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button
              onClick={() => handleClickOpen(params.id)}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Chi tiết</div>
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
      {recipe && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
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
                Chi tiết món ăn
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Quay lại
              </Button>
            </Toolbar>
          </AppBar>
          <RecipeDetail id={recipe.id} />
        </Dialog>
      )}
      <Sidebar active="Recipe" />
      <div className="listContainer">
        <Navbar />
        <Datatable
          data={data}
          actionColumn={actionColumn}
          column={recipeColumns}
        />
      </div>
    </div>
  );
};

export default Recipe;
