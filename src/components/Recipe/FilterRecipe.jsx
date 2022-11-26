import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import { AppContext } from "../../AppContext";
import Loading from "../Partial/Loading";
import Header from "../Partial/Header";
import { useDispatch, useSelector } from "react-redux";

function FilterRecipe() {
    const keyword = useSelector(state => state.keyword);
    const dispatch = useDispatch();
    const [key, setKey] = useState("");
  const [{ data, loading, error }] = useAxios(`recipe/list`, {});
  const [dt, setDt] = useState(data);
  const { currentUser, isLoading, setIsLoading, setCurrentUser,setIsAuth } = React.useContext(AppContext);
  const [{ data: categories, loading: cLoading, error: cError }] = useAxios(
    `category/list`,
    {}
  );
  function filterRecipe(event){
    event.preventDefault();
    dispatch({
        type: 'SEARCH',
        payload: key,
        });
  }
  useEffect(() => {
    setDt(data);
  }, [data]);
  useEffect(() => {
    setDt(data);
  }, []);
  const hasData = dt!=null;
  return (
    <div>
      {
        (!hasData || loading) && <Loading />
      }
      {hasData &&(
        <div>
          <Header />
          <div className="container">
 <div className="row justify-content-start ">
     <section className="recipe section" id="diadiem">
       <div className="container">
       <form action="#" className="search-form order-lg-last mt-4" style={
        {margin:"auto"}
       }>
            <div className="form-group d-flex ">
                <input type="text" className="form-control pl-3" value={keyword} placeholder="Tìm kiếm món ăn " onChange={(e) => dispatch({ type: 'SEARCH', payload: e.target.value, })}  />
              
            </div>
        </form>
         <div className="row mt-3">
          
           {dt &&
             dt.map(
                 ({id,name, duration,images,rate,index,}) => {
                   if ( name.toLowerCase().includes(keyword.toLowerCase())) {
                   return (
                     <div className="col-lg-3 col-md-6 col-12 ">
                       <Link to={"/recipe/list/" + id}>
                         <div
                           key={index}
                           className="single-address wow bounceInLeft "
                         >
                           <div className="address-image wow bounceInLeft">
                             <img
                               src={images[images.length-1] && images[images.length-1].url}
                               alt="#"
                             />
                           </div>
                           <div className="address-info">
                             <span className="category">{duration}</span>
                             <h6 className="title">{name}</h6>
                             <ul className="review">
                               <li>
                                 <i
                                   className="fa fa-star"
                                   aria-hidden="true"
                                 ></i>
                               </li>
                               <li>
                                 <i
                                   className="fa fa-star"
                                   aria-hidden="true"
                                 ></i>
                               </li>
                               <li>
                                 <i
                                   className="fa fa-star"
                                   aria-hidden="true"
                                 ></i>
                               </li>
                               <li>
                                 <i
                                   className="fa fa-star"
                                   aria-hidden="true"
                                 ></i>
                               </li>
                               <li>
                                 <i
                                   className="fa fa-star"
                                   aria-hidden="true"
                                 ></i>
                               </li>
                               <li>
                                 <i
                                   className="fa fa-star-o"
                                   aria-hidden="true"
                                 ></i>
                               </li>
                               <li>
                                 <span>4.0 Review(s)</span>
                               </li>
                             </ul>
                           </div>
                         </div>
                       </Link>
                     </div>
                   );}
                 }
               )}
         </div>
       </div>
     </section>
 </div>
</div>
        </div>
      )}
    </div>
  );
}

export default FilterRecipe;
