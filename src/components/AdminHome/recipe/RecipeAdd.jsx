import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import useAxios from "axios-hooks";
import UploadImages from "D:/HK1 - 2022 - 2023/Java/Practices/ui_recipe/src/components/Partial/UploadImages";
import Sidebar from "D:/HK1 - 2022 - 2023/Java/Practices/ui_recipe/src/components/AdminHome/components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

function RecipeAddAd() {
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

  const [{ data: category, loading: cLoading, error: CError }] =
    useAxios(`category/list`);
  async function getBase64(file) {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("Called", reader);
      baseURL = reader.result;
      imageRequest.push(baseURL);
    };
    setImageRequest(imageRequest);
  }
  const [{}, addRecipe] = useAxios(
    {
      url: `recipe/add`,
      method: "POST",
    },
    { manual: true }
  );
  async function add() {
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
      imageRespond[i] = { name: recipe_name, url: imageRequest[i] };
    }
    let item = {
        name:recipe_name,
        duration:recipe_duration,
        tutorial,
        category:danhmuc,
      ingredients:ingredient,
      images:imageRespond
    };
    await addRecipe({ data: item }).then((res) => {
      toast.success("Thêm món ăn thành công!");
      
    });
    navigate("/admin/recipe/");
    console.log(item);
  }
  function handleChange(files) {
    setImageRequest([]);
    for (let i = 0; i < files.length; i++) {
      getBase64(files[i]);
    }
  }

  return (
    <div className="list">
      <Sidebar active="Recipe" />
      <div className="listContainer">
        <Navbar />
        <section className="h-100 ">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card p-4">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <div className="mb-4 div-fluid">
                    <UploadImages handleChange={handleChange} />
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
                            <option selected disabled>
                              Chọn danh mục món ăn
                            </option>
                            {category &&
                              category.map(({ id, name }) => {
                                return <option value={id}>{name}</option>;
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
                      name="ingredient"
                      require="true"
                    />
                  </div>
                </div>

                <div className="pt-1 mb-2 d-flex justify-content-end px-5">
                  
                  <Button
                    onClick={add}
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
    </div>
   
    
  );
}

export default RecipeAddAd;
