import { Button } from "@mui/material";
import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function RecipeDetail() {
  let { id } = useParams();
  const [{ data, loading, error }] = useAxios(`recipe/list/${id}`);
  let idCate = data && data.category.id;
  const [{ data: category, loading: cLoading, error: CError }] = useAxios(
    `category/list/${idCate}`
  );
  const [dt, setDT] = useState(data);
  const navigate = useNavigate();
  function addFavoriteRecipe() {
    alert("add");
  }
  function editRecipe() {
    navigate("edit");
  }
  const [{}, DeleteData] = useAxios(
    {
      url: `Recipe/${id}`,
      method: "DELETE",
    },
    { manual: true }
  );
  async function deleteRecipe() {
    await DeleteData({ data: id }).then((res) => {
      toast.success("Xóa địa điểm thành công!");
    });
    window.location.href = "/";
  }
  useEffect(() => {
    setDT(data);
  }, [data]);

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Trang chủ</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/Recipe/list">Địa điểm</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {dt && dt.name}
          </li>
        </ol>
      </nav>
      {dt && (
        <section>
          <div className="px-4 px-lg-5 ">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="container col-md-6">
                <img
                  className=" my-3 card-img-top mb-5 mb-md-0"
                //   src={dt && dt.hinhanhs[0] && dt.hinhanhs[0].hinhanh_url}
                src="https://www.bing.com/images/search?view=detailV2&ccid=PuJiLAmr&id=E3614B885256C8B546AAD3D8FFF9455FFB4F9CFC&thid=OIP.PuJiLAmrEdyEQ4JwVU_d5AHaHa&mediaurl=https%3a%2f%2fwww.pngplay.com%2fwp-content%2fuploads%2f10%2fDoraemon-PNG-Photo-Image.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.3ee2622c09ab11dc84438270554fdde4%3frik%3d%252fJxP%252b19F%252bf%252fY0w%26pid%3dImgRaw%26r%3d0&exph=1600&expw=1600&q=png+doreamon&simid=608033173372173120&FORM=IRPRST&ck=3AAF124319542968ECF3568BDC011D69&selectedIndex=4"
                  alt="..."
                />
              </div>
              <div className="col-md-6">
                <div className="small mb-1"></div>
                <Link to={dt.name}>
                  <h3 className="display-5 fw-bolder">{dt.name}</h3>
                </Link>

                <div className=" fs-5 mb-4">
                  <small>Ngày cập nhập: </small>
                  {/* <small>{dt.diadiem_updated}</small> */}
                </div>
                {/* <p className="lead">{dt.diadiem_mota}</p> */}
                <div className="d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-dark me-3 my-3"
                    onClick={editRecipe}
                  >
                    <i
                      className="fa fa-location-arrow me-2"
                      aria-hidden="true"
                    > </i>Theo dõi vị trí
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger me-3 my-3"
                    onClick={addFavoriteRecipe}
                  >
                    <i className="fa fa-heart" aria-hidden="true"></i>
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
          </div>
        </section>
      )}
      {/* <section className="my-5 py-2 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Địa điểm liên quan</h2>
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-start">
            {category &&
              category
                .slice(0, 5)
                .map(({ hinhanhs, diadiem_ten, id_diadiem }) => {
                  if (id_diadiem != data.id_diadiem) {
                    return (
                      <div className="col mb-5" key={id_diadiem}>
                        <div className="card h-100">
                          <img
                            className="card-img-top"
                            src={hinhanhs[0].hinhanh_url}
                            alt={hinhanhs[0].hinhanh_mota}
                          />

                          <div className="card-body p-4">
                            <div className="text-center">
                              <h5 className="fw-bolder">{diadiem_ten}</h5>
                            </div>
                          </div>
                          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                              <Link
                                to={"/Recipe/" + id_diadiem}
                                className="btn btn-outline-dark mt-auto"
                              >
                                Xem chi tiết
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default RecipeDetail;
