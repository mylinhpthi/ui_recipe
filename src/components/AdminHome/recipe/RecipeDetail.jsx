import { Splitscreen } from "@mui/icons-material";
import { Button } from "@mui/material";
import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function RecipeDetail({id}) {
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
      toast.success("Add ");

    });
  }
  function editRecipe() {
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
      
      {hasData &&(
        <div>
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
              </div>
            </div>
            <div className=" fs-5 mb-4 recipe-detail row mt-4">
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
