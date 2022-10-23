import useAxios from 'axios-hooks';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Partial/Header';
import Loading from '../Partial/Loading';

function FavoriteRecipe() {
    const [{ data, loading, error }] = useAxios(`user/faRecipe/list/`+localStorage.getItem("user"), {});
  const [dt, setDt] = useState(data);
  const hasData = dt != null;
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("user"))   navigate("/login");
    else
    setDt(data);
  }, [data]);
  return (
    <div>
        {!hasData && <Loading />}
      {hasData && (
        <div>
            <Header />
            <section className="address section" id="diadiem">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title1">
                    <h2>Món ăn yêu thích của bạn</h2>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-lg-3 col-md-6 col-12 ">
                  <Link to="#">
                    <div className="single-address wow bounceInLeft ">
                      <div className="address-image wow bounceInLeft">
                        <img src="/images/food/khoailangme.PNG" alt="#" />
                      </div>
                      <div className="address-info">
                        <span className="category">10 phút</span>
                        <h6 className="title">Khoai lang rán bơ mè</h6>
                        <ul className="review">
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                          </li>
                          <li>
                            <span>4.0 Review(s)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
                {dt &&
                  dt
                    .slice(0, 7)
                    .map(
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
                    )}
               
              </div>
            </div>
        </section>  
        </div>
        
      )}
    </div>
    
  )
}

export default FavoriteRecipe