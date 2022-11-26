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
// import { AppContext } from "../../AppContext";
import Loading from "D:/HK1 - 2022 - 2023/Java/Project/ui_recipe/src/components/Partial/Loading";
// import Header from "../Partial/Header";

function CategoryDetail({ id }) {
  const [{ data, loading, error }] = useAxios(`recipe/list`, {});
  const [dt, setDt] = useState(data);
  const [{ data: categories, loading: cLoading, error: cError }] = useAxios(
    `category/list/` + id,
    {}
  );
  const [cateItem, setCateItem] = useState([id, categories && categories.name]);
  useEffect(() => { 
    setDt(data);
  }, [data]);
  useEffect(() => {
    setDt(data);
    console.log(id);
  }, []);
  const hasData = dt != null && categories != null ;
  return (
    <div>
      {
        (!hasData) && <Loading />
      }
      {hasData && (
        <div>
          <div className="container">
            <div className="row justify-content-start ">
              <div className="col-lg-3 col-md-6 col-12  mt-4 ">
                <h5>Danh mục món ăn </h5>
                <Divider />
                <ListItem
                     disablePadding
                   >
                     <ListItemButton>
                       <ListItemIcon>
                         <AcUnitOutlinedIcon
                           color="primary"
                           fontSize="small"
                         />
                       </ListItemIcon>
                       <ListItemText primary={categories.name} />
                     </ListItemButton>
                   </ListItem>
              </div>
              <div className="col-lg-9 col-md-6 col-12  list-recipe">
                <section className="recipe section" id="diadiem">
                  <div className="container">
                    <div className="row mt-5">
                      {dt &&
                        dt.map(
                          ({
                            id,
                            name,
                            duration,
                            tutorial,
                            category,
                            ingredients,
                            images,
                            rate,
                            index,
                          }) => {
                            if (category && category.name == categories.name) {
                              return (
                                <div className="col-lg-3 col-md-6 col-12 ">
                                  <Link to={"/recipe/list/" + id}>
                                    <div
                                      key={index}
                                      className="single-address wow bounceInLeft "
                                    >
                                      <div className="address-image wow bounceInLeft">
                                        <img
                                          src={
                                            images[images.length - 1] &&
                                            images[images.length - 1].url
                                          }
                                          alt="#"
                                        />
                                      </div>
                                      <div className="address-info">
                                        <span className="category">
                                          {duration}
                                        </span>
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
                              );
                            }
                          }
                        )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryDetail;
