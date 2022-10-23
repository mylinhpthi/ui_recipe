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

function CategoryAdd() {
  const notify = () => toast("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [{}, addCategory] = useAxios(
    {
      url: `category/add`,
      method: "POST",
    },
    { manual: true }
  );
  async function add() {
      let item = {
        name:name
    };
    await addCategory({ data: item }).then((res) => {
      toast.success("Thêm danh mục thành công!");
      navigate("/admin/category/");
    });
    console.log(item);
  }
  return (
    <div className="list">
      <Sidebar active="Category" />
      <div className="listContainer">
        <Navbar />
        <section className="mt-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card px-4 pb-2">
              <div className="row g-0">
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body pt-5 text-black">
                    <div>
                      <div className="">
                        <label htmlFor="recipe_name" className="form-label">
                          Tên danh mục:
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setName(e.target.value)}
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
                <div className=" mb-2 d-flex justify-content-end px-5">
                  
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
    </section>
      </div>
    </div>
   
    
  );
}

export default CategoryAdd;
