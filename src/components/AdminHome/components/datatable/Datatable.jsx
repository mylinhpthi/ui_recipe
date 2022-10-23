import "./datatable.css";
import { userColumns, userRows } from "./datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useAxios from "axios-hooks";
import * as React from 'react';
import { useEffect } from "react";
import { toast } from "react-toastify";
import Slide from '@mui/material/Slide';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Datatable = ({data, actionColumn, column}) => {
  
  // const [{ data, loading, error }] = useAxios(`user/list`, {});
  const [dt, setDt] = useState([]);
  // const [id, setId] = useState("");
  // const [user, setUser] = useState({});
  
  useEffect(() => {
    
    setDt(data);
  }, [data]);

 
  

 
  return (<div className="mt-3">
     {dt&&(<div className="datatable">     
        <DataGrid
        className="datagrid"
        style={{height:"90% !important"}}
        rows={dt}
        columns={column.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '.MuiDataGrid-cell': {
            outline:'solid #54b902 0px',
          },
          '.MuiDataGrid-cell:focus-within':{
            outline:'solid #54b902 0px',
          }
        }} 
      />
    </div>)}  
  </div>
    
  );
};

export default Datatable;
