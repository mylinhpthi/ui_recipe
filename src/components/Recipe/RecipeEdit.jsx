import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import useAxios from "axios-hooks";
import Map from "../Partial/Map";
import UploadImages from "../Partial/UploadImages";
import Header from "../Partial/Header";

function RecipeEdit() {
  let { id } = useParams();
  const [{ data: dataC, loading, error }] = useAxios(`recipe/list/${id}`);
  const notify = () => toast("");
  const [recipe_name, setRecipe_name] = useState("");
  const [recipe_duration, setRecipe_duration] = useState("");
  const [tutorial, setTutorial] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [categories, setCategories] = useState({});
  const [imageRequest, setImageRequest] = useState([]);
  const [imageRespond, setImageRespond] = useState([]);
  const navigate = useNavigate();
  var today = new Date();
  var i = 0;
  useEffect(() => {
    if (dataC) {
      console.log(dataC)
      setRecipe_name(dataC.name);
      setCategories(dataC.categories && dataC.categories.id);
      setRecipe_duration(dataC.duration);
      setTutorial(dataC.tutorial);
      setIngredient(dataC.ingredients);
      setImageRequest(dataC.images);
    }
  }, [dataC]);
  const [{ data: category, loading: cLoading, error: CError }] =
    useAxios(`category/list`);
  async function getBase64(file) {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("Called", reader);
      baseURL = reader.result;
      imageRequest.push({url:baseURL});
    };
    setImageRequest(imageRequest);
  }
  const [{}, updateData] = useAxios(
    {
      url: `recipe/edit/${id}`,
      method: "POST",
    },
    { manual: true }
  );
  async function updateRecipe() {
    let danhmuc = {};
    for (let i = 0; i < category.length; i++) {
      if (category[i].id == categories) {
        danhmuc = {
          id: categories,
          name: category[i].name,
        };
      }
    }
    for (let i = 0; i < imageRequest.length; i++) {
      imageRespond[i] = { "id": "63469da71dd81fdfdfdb348",name: recipe_name, url: imageRequest[i].url };
    }
    let item = {
        id:id,
        name:recipe_name,
        duration:recipe_duration,
        status: "active",
        tutorial: tutorial,
        category:danhmuc??{"id":"", name:"Nướng"},
        ingredients:ingredient,
        images:imageRespond
    };
    console.log(item);
    await updateData({ data: item }).then((res) => {
      toast.success("Cập nhật món ăn thành công!");
      navigate("/recipe/list/");
    });
  }
  function handleChange(files) {
    setImageRequest([]);
    for (let i = 0; i < files.length; i++) {
      getBase64(files[i]);
    }
  }

  return (
   <div>
    <Header />
    <section className="h-100 bg-dark">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card p-4">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <nav aria-label="breadcrumb" className="mt-2 mx-3">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Trang chủ</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="/recipe/list">Món ăn</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Chỉnh sửa món ăn
                      </li>
                    </ol>
                  </nav>
                  <div className="mb-4 div-fluid">
                    <UploadImages handleChange={handleChange} />
                     {dataC && imageRequest &&
                    imageRequest.map(item => {
                      return (
                        <img
                        src={item.url}
                        className="hinhanh_url"
                        alt="image" />
                      )
                     
                     })} 
                    
                  </div>
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body pt-5 text-black">
                    <div>
                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <label htmlFor="username" className="form-label">
                            Danh mục món ăn:
                          </label>
                          
                          <select
                            className="form-select"
                            onChange={(e) => setCategories(e.target.value)}
                          >
                            {category &&
                            dataC &&
                            category.map(({ id, name }) => {
                              if (id == dataC.category.id) {
                                return (
                                  <option selected value={id}>
                                    {name}
                                  </option>
                                );
                              } else
                                return (
                                  <option value={id}>
                                    {name}
                                  </option>
                                );
                            })}
                           
                          </select>
                        </div>
                        <div className="col-md-6 mb-2">
                          <label htmlFor="duration" className="form-label">
                            Thời gian thực hiện (phút):
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setRecipe_duration(e.target.value)}
                            className="form-control"
                            id="duration"
                            name="duration"
                            placeholder=""
                            value={recipe_duration}
                            require="true"
                          />
                        </div>
                      </div>

                      <div className="mb-2">
                        <label htmlFor="recipe_name" className="form-label">
                          Tên món ăn:
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setRecipe_name(e.target.value)}
                          className="form-control"
                          id="recipe_name"
                          name="recipe_name"
                          placeholder=""
                          value={recipe_name}
                          require="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-0 d-flex justify-content-center ">
                  <div className="col-md-6  d-none d-md-block mb-2 mx-4 ">
                    <label htmlFor="tutorial" className="form-label">
                      Hướng dẫn chi tiết:
                    </label>
                    <textarea
                      rows="6"
                      onChange={(e) => setTutorial(e.target.value)}
                      className="form-control"
                      id="tutorial"
                      value={tutorial}
                      name="tutorial"
                      require="true"
                    />
                  </div>
                  <div className=" col-md-5 d-none d-md-block mb-2">
                    <label htmlFor="ingredient" className="form-label">
                      Thành phần món ăn:
                    </label>
                    <textarea
                      rows="6"
                      onChange={(e) => setIngredient(e.target.value)}
                      className="form-control"
                      id="ingredient"
                      value={ingredient}
                      name="ingredient"
                      require="true"
                    />
                  </div>
                </div>

                <div className="pt-1 mb-2 d-flex justify-content-between px-5">
                  <p className=" pb-lg-2">
                    Hủy bỏ thao tác?{" "}
                    <Link to="/" className="underline">
                      Quay về trang chủ{" "}
                    </Link>
                  </p>
                  <Button
                    onClick={updateRecipe}
                    className="btn-confirm"
                    variant="contained"
                    type="submit"
                  >
                    Xác nhận{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {!!imageRequest &&
        imageRequest.map((link, key) => <img src={link} alt="AAAA" key={key} />)} */}
    </section>
   </div>
  );
}

export default RecipeEdit;
