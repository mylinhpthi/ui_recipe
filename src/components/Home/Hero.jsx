import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";
import { AppContext } from "../../AppContext";
import Loading from "../Partial/Loading";
import Header from "../Partial/Header";
import { useCookies } from "react-cookie";

function Hero() {
  const [dt, setDt] = useState([]);
  const [privilege, setPrivilege] = useState([]);
  const { isLoading, setIsLoading, setCurrentUser, isAuth } =
  React.useContext(AppContext);
  const [cookies, setCookie, removeCookie] = useCookies(["privilege"]);
  const [{ data, loading, error }] = useAxios(`recipe/list`, {});
  const hasData = dt != null;
  const [hasAddRecipe, setHasAddRecipe] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setDt(data);
    if(cookies.privilege?.some((el) => el.id == "63512b7acaf267316d40e32f")){
      setHasAddRecipe(true);
    }
      
}, [data,]);
  const handleAddPrivilege = (event)=>{
    event.preventDefault();
    navigate("/recipe/add");
  }
  // useEffect(() => {
  //   if (cookies.privilege != "null") {
  //     if (cookies.privilege.some((el) => el.id == "63512b7acaf267316d40e32f"))
  //       hasAddRecipe = true;
  //   }
  // }, [data]);

  return (
    <div>
      {!hasData && <Loading />}
      {hasData && (
        <div>
          <Header />
          <Grid container spacing={2} className="hero">
            <Grid item p xs={12} md={5} className="hero-left">
              <img src="/images/banner/banner_logo.PNG" alt="" />
            </Grid>
            <Grid item xs={12} md={7} className="hero-right">
              <div className="hero-caption">
                <h3>HappyFood có gì?</h3>
                <p className="caption">
                  Bạn có biết không? Một bữa ăn đủ chất không chỉ giúp cơ thể
                  luôn khỏe khoắn mà còn "bật mood" cho tinh thần vui vẻ, từ đó
                  góp phần đẩy lùi bệnh tật. Thế nhưng, làm thế nào để có một
                  bữa ăn vừa ngon miệng vừa đầy đủ chất dinh dưỡng? Đừng băn
                  khoăn, HappyFood sẽ giúp bạn làm việc đó!
                </p>
                <Button variant="contained">
                  <Link to="/new/1st" className="a-custom ">
                    Khám phá ngay
                  </Link>{" "}
                </Button>
              </div>
            </Grid>
          </Grid>
          <div id="demo" className="carousel slide  " data-bs-ride="carousel">
            <div className="slide-title">
              <h3>BẢN TIN MỚI NHẤT</h3>
            </div>
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="0"
                className="active"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="1"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="2"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="3"
              ></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item home-carousel-item active ">
                <div className="carousel-caption home-caption">
                  <h3>Granola - Bạn có biết</h3>
                  <div className="caption">
                    Granola là một hỗn hợp bao gồm yến mạch, các loại hạt, mật
                    ong và các chất làm ngọt khác như mật ong, đường nâu, các
                    loại quả sấy khô, sô cô la, … được nướng cho đến khi có màu
                    vàng nâu tạo thành một hỗn hợp ngũ cốc bảo quản dùng dần
                  </div>
                  <button type="button" className="btn btn-secondary">
                    <Link to="/new/1st">Tìm hiểu ngay</Link>{" "}
                  </button>
                </div>
              </div>
              <div className="carousel-item home-carousel-item">
                <div className="carousel-caption home-caption">
                  <h3>Bữa ăn sáng với súp</h3>
                  <div className="caption">
                    Bữa ăn sáng với súp giúp bổ sung năng lượng cho hoạt động
                    thể chất của cả ngày. Bữa sáng lành mạnh cung cấp năng lượng
                    và bổ sung lượng glycogen dự trữ cung cấp năng lượng tức thì
                    cho cơ bắp của bạn. Các nghiên cứu đã chỉ ra ăn sáng lành
                    mạnh cải thiện khả năng tập trung
                  </div>
                  <button type="button" className="btn btn-secondary">
                    <Link to="/new/2nd">Khám phá ngay</Link>{" "}
                  </button>
                </div>
              </div>
              <div className="carousel-item home-carousel-item">
                <div className="carousel-caption home-caption">
                  <h3>Mâm cơm gia đình hạnh phúc</h3>
                  <div className="caption">
                    Bữa ăn gia đình là biểu tượng nổi bật cho văn hóa ẩm thực
                    Việt Nam. Mỗi vùng miền tuy có điểm đặc trưng riêng, nhưng
                    những món ăn trong bữa cơm gia đình đều thể hiện rõ nét
                    phong cách ẩm thực Việt Nam đã truyền qua nhiều thế hệ
                  </div>
                  <button type="button" className="btn btn-secondary">
                    <Link to="/new/3rd">Khám phá ngay</Link>{" "}
                  </button>
                </div>
              </div>
              <div className="carousel-item home-carousel-item">
                <div className="carousel-caption home-caption">
                  <h3>Tình yêu từ "dạ dày" </h3>
                  <p className="caption">
                    Việt Nam là một trong những quốc gia có chỉ số hạnh phúc cao
                    so với mặt bằng thế giới, là quốc gia giàu truyền thống,
                    giàu tình yêu Gia đình, Quê hương, Tổ quốc, yêu đồng loại.
                    Và một trong những điều làm nên ý nghĩa sâu đậm đó là những
                    bữa ăn gia đình. Bữa ăn gia đình là cả niềm yêu thương tâm
                    huyết mà những người bà, người mẹ, người nội trợ giành trọn
                    và muốn chuyển tải cho những người thân yêu của mình.{" "}
                  </p>
                  <button type="button" className="btn btn-secondary">
                    <Link to="/new/4th">Khám phá ngay</Link>{" "}
                  </button>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
          <section className="address section" id="diadiem">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h2>Đồ ăn vặt</h2>
                    <Link to="/recipe/list">
                      <span>Xem thêm</span>{" "}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row ">
                
                {dt &&
                  dt
                    .slice(0, 6)
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
                                    src={
                                      images[images.length - 1] &&
                                      images[images.length - 1].url
                                    }
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
                {hasAddRecipe && (
                  <div className="col-lg-3 col-md-6 col-12 ">
                    <Link to="/recipe/add" onClick={handleAddPrivilege}>
                      <div className="single-address wow bounceInLeft ">
                        <div className="address-image wow bounceInLeft container">
                          <img
                            style={{ objectFit: "contain" }}
                            className="mx-1 my-1 py-3 px-3"
                            src="/images/address/add.png"
                            alt="#"
                          />
                        </div>
                        <div className="address-info">
                          <span className="category">**** phút</span>
                          <h6 className="title">Thêm món ăn mới</h6>
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
                              <span>5.0 Review(s)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Hero;
