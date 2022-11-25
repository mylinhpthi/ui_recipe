import { Splitscreen } from "@mui/icons-material";
import { Button } from "@mui/material";
import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../AppContext";
import Header from "../Partial/Header";
import Loading from "../Partial/Loading";
import { useCookies } from "react-cookie";
function RecipeDetail() {
let { id } = useParams();
const { currentUser } = React.useContext(AppContext);
const [isLoading, setIsLoading] = useState(false);
const [{ data, loading, error }] = useAxios(`recipe/list/${id}`);
const [tutorial, setTutorial] = useState([]);
const [cmt, setCmt] = useState("");
const [recipe_comment, setRecipe_comment] = useState([]);
let idCate = data && data.category.id;
const [{ data: category, loading: cLoading, error: CError }] = useAxios(
  `category/list/${idCate}`
);
const [dt, setDT] = useState(data);
const navigate = useNavigate();
async function addFavoriteRecipe() {
  if(!localStorage.getItem("user")){
    navigate("/login");
  }
  const item={
    "username":localStorage.getItem("user"),
    "recipe_id":id
  }
  console.log(item)
  await addFaRe({ data: item}).then((res) => {
    toast.success("Thêm món ăn yêu thích thành công!");

  });
}const [cookies, setCookie] = useCookies(["user"]);
const editRecipe = (event)=>{
  event.preventDefault();
  if((cookies.privilege !="null" && !cookies.privilege.some(el => el.id === "63512b7ecaf267316d40e330" && el.id === "6354cfc925489097bde657b3" )) || cookies.privilege =="null")
  {
    navigate("/error/403");
    return;
  } 
  else
  navigate("/recipe/edit/" + id);
}
var imageAvatar = [
  "https://th.bing.com/th/id/R.a3baf7f7b1d06e5b0d4ea35b6ad94175?rik=gutA%2fUDP8WXjjA&pid=ImgRaw&r=0",
  "https://cdn2.iconfinder.com/data/icons/munchicons/57/006_-_Orange-512.png",
  "https://cdn3.iconfinder.com/data/icons/chinese-new-year-filled-line/64/chinese__mandarin__new_year__orange__tangerine_orange_icon0-512.png",
  "https://th.bing.com/th/id/OIP.jSiJTxhZenUXhpzXk7pzfgHaGS?pid=ImgDet&rs=1",
  "https://th.bing.com/th/id/OIP.1WxjvPRqHsqx3CzOcc4t6wHaJW?pid=ImgDet&w=920&h=1161&rs=1",
  "https://cdn1.iconfinder.com/data/icons/fruit-cartoon-flat-cute-fruity/512/strawberry-512.png",
  "https://cdn1.iconfinder.com/data/icons/fruit-cartoon-flat-cute-fruity/512/watermelon-1024.png",
];
const [{}, DeleteData] = useAxios(
  {
    url: `Recipe/${id}`,
    method: "DELETE",
  },
  { manual: true }
);
const [{}, addFaRe] = useAxios(
  {
    url: `user/faRecipe/add`,
    method: "POST",
  },
  { manual: true }
);
async function deleteRecipe() {
  await DeleteData({ data: id }).then((res) => {
    toast.success("Xóa địa điểm thành công!");
  });
  window.location.href = "/";
}
function split_string(strOrigin, split) {
  let str = strOrigin;
  var myarray = str.split(split);
  return myarray;
}
const [{}, updateCmt] = useAxios(
  {
    url: `/recipe/edit/partial/${id}`,
    method: "POST",
  },
  { manual: true }
);
async function AddComment(){
  var obj={
      op:"add-comment",
      cmd:{
        content:cmt,
        user:{
          username:localStorage.getItem("user")
        }
      }
  }
  console.log(obj);
  await updateCmt({ data: obj }).then((res) => {
    toast.success("Cập nhật bình luận thành công!");
    window.location.reload();
  });


}
const [{}, deleteCmt] = useAxios(
  {
    url: `/recipe/delete/comment/${id}`,
    method: "POST",
  },
  { manual: true }
);
async function deleteComment(item){
  await deleteCmt({ data: item }).then((res) => {
    toast.success("Xóa bình luận thành công!");
    window.location.reload();
  });
}
const hasData = dt!=null;
useEffect(() => {
  setDT(data);
  if(dt){
    setRecipe_comment(data&&  data.comment)
  }
  
}, [data]);
var isUser = !!localStorage.getItem("user");
return (
  <div>
     {
      (!hasData) && <Loading />
    }
    {hasData &&(
      <div>
        <Header />
        <div className="container my-5">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Trang chủ</a>
        </li>
        <li className="breadcrumb-item">
          <a href="/recipe/list/63481eb9b07855c6fc8fa4c8">Món ăn</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {dt && dt.name}
        </li>
      </ol>
    </nav>
    {dt && (
      <section>
        <div className="px-4 px-lg-5 ">
          <div className="container row gx-4 gx-lg-5 align-items-center">
            <div className="container col-md-4 d-flex ">
              <img
                className=" my-3 card-img-top mb-5 mb-md-0"
                src={dt.images[0] && dt.images[0].url}
                alt="#"
              />
            </div>
            <div className="col-md-8">
              <Link to={dt.name}>
                <h3 className="display-6 fw-normal">{dt.name}</h3>
              </Link>
              <div className="d-flex justify-content-between">
                <div className=" fs-5 mb-4">
                  <small>Loại món ăn: </small>
                  <small>{dt.category && dt.category.name}</small>
                </div>
                <div className=" fs-5 mb-4">
                  <small>Thời gian thực hiện: </small>
                  <small>{dt.duration}</small>
                </div>
              </div>
              <div className="d-flex justify-content-start">
                <button
                  type="button"
                  className="btn btn-dark me-3 my-3"
                  onClick={addFavoriteRecipe}
                >
                  <i className="fa fa-location-arrow me-2" aria-hidden="true">
                    {" "}
                  </i>
                  Thêm vào món ăn ngon
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary me-3 my-3"
                  onClick={editRecipe}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger my-3"
                  onClick={deleteRecipe}
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            
          </div>
          <div className=" fs-5 mb-4 recipe-detail row ">
              <div className="col-4">
                <small className="fw-bold">Thành phần: </small>
                <small>
                  <ul>
                    {dt.ingredients &&
                      split_string(dt.ingredients,  /[.;]\s*/).map((item) => {
                        return (
                          <li>
                            <span>{item}</span>
                          </li>
                        );
                      })}
                  </ul>
                </small>
              </div>
              <div className="col-7">
                <small className="fw-bold">Phương pháp nấu ăn: </small>
                <small>
                  <ul>
                    {dt.tutorial &&
                      split_string(dt.tutorial, /[.;]\s*/).map((item) => {
                        return (
                          <li>
                            <span>{item}</span>
                          </li>
                        );
                      })}
                  </ul>
                </small>
              </div>
            </div>
        </div>
      </section>
    )}

    <div className="container my-2 ">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="text-dark">
            <div className="card-body p-4">
              <h4>Bình luận</h4>
              <div className="mt-3 d-flex flex-row align-items-center p-3 form-color">
                <img
                  src="https://static2.yan.vn/YanNews/202109/202109270129494778-4d2769b6-8466-4ec9-8fd8-aff6e3bbdb88.jpeg"
                  width="50"
                  className="rounded-circle me-2"
                />
                <div className="d-flex">
                <input
                  type="text"  onChange={(e) => setCmt(e.target.value)} 
                  className="form-control " style={{width:"50vw"}}
                  placeholder="Bình luận của bạn..."
                />
               <Button className="ms-3" onClick={AddComment}  variant="contained"><span className="p-custome" >Bình luận</span></Button>
                </div>
                



              </div>
              {dt &&
                dt.comment &&
                dt.comment.map((item) => {
                  return (
                    <div
                      className="d-flex flex-start mb-3"
                      style={{
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                        padding: "1rem",
                      }}
                    >
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={
                          imageAvatar[
                            Math.floor(Math.random() * imageAvatar.length)
                          ]
                        }
                        alt="avatar"
                        width="60"
                        height="60"
                      />
                      <div>
                        <h6 className="fw-bold mb-1">{item&& item.user?.username}</h6>
                        <div className="d-flex align-items-center mb-3">
                          <p className="mb-0">{item.createAt}</p>
                          {item.user && localStorage.getItem('user') ===  item.user.username && (
                            <div>
                              <a href="#!" onClick={()=>deleteComment(item)} style={{ color: "#aaa;" }}>
                                <i className="fa fa-trash ms-2"></i>
                              </a>
                            </div>
                          )}  
                        </div>
                        <p className="mb-0">{item.content}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
    )}
  </div>
  
);
}

export default RecipeDetail;
