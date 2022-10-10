import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import useAxios from "axios-hooks";
import UploadImages from "../Partial/UploadImages";
import Map from "../Partial/Map";

function EditAddress() {
  let { id } = useParams();
  const [{ data: dataC, loading, error }] = useAxios(`Address/${id}`);
  const notify = () => toast("");
  const [diadiem_ten, setDiadiem_ten] = useState("");
  const [diadiem_url, setDiadiem_url] = useState("");
  const [diadiem_kinhdo, setDiadiem_kinhdo] = useState(0);
  const [diadiem_toado, setDiadiem_toado] = useState([]);
  const [diadiem_vido, setDiadiem_vido] = useState(0);
  const [diadiem_mota, setDiadiem_mota] = useState("");
  const [danhmucId, setDanhmucId] = useState(dataC && dataC.danhmuc.danhmucId);
  const navigate = useNavigate();
  const [hinhanhURL, setHinhanhURL] = useState("");
  const [{ data: category, loading: cLoading, error: CError }] =
    useAxios(`Category`);
  const [hinhanh, setHinhanh] = useState(dataC&&dataC.hinhanhs);
  const [image, setImage] = useState({});
  var today = new Date();
  const [{}, updateData] = useAxios(
    {
      url: `Address/${id}`,
      method: "PUT",
    },
    { manual: true }
  );
  function handleChange(files) {
    setHinhanh(files);
    setHinhanhURL([]);
    for (let i = 0; i < files.length; i++) {
      getBase64(files[i]);
    }
    setHinhanh(hinhanh);
    console.log(hinhanh)
  }
  async function getBase64(file) {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("Called", reader);
      baseURL = reader.result;
      hinhanh.push(baseURL);
    };
    setHinhanh(hinhanh);
    setHinhanhURL(hinhanh)
  }
  async function update() {
    let danhmuc = {};
    for (let i = 0; i < category.length; i++) {
      if (category[i].id_danhmuc == danhmucId) {
        danhmuc = {
          id_danhmuc: danhmucId,
          danhmuc_ten: category[i].danhmuc_ten,
        };
      }
    }
    //

    for (let i = 0; i < hinhanh.length; i++) {
      hinhanh[i] = { hinhanh_mota: diadiem_ten, hinhanh_url: hinhanh[i] };
    }
    let item = {
      danhmuc,
      diadiem_ten,
      diadiem_url,
      diadiem_kinhdo,
      diadiem_vido,
      diadiem_mota,
      diadiem_created: today,
      diadiem_updated: today,
      hinhanhs: hinhanh,
    };
    await updateData({ data: item }).then((res) => {
      toast.success("Cập nhật địa điểm thành công!");
    });
    window.location.href = `/address/${id}`;
  }
  function setLocation(coord) {
    setDiadiem_toado(coord);
    console.log(hinhanh);
  }
  function confirmLocation() {
    setDiadiem_kinhdo(diadiem_toado.lat);
    setDiadiem_vido(diadiem_toado.lng);
  }
  
  useEffect(() => {
    if (dataC) {
      setDiadiem_ten(dataC.diadiem_ten);
      setDiadiem_url(dataC.diadiem_url);
      setDiadiem_kinhdo(dataC.diadiem_kinhdo);
      setDiadiem_vido(dataC.diadiem_vido);
      setDiadiem_mota(dataC.diadiem_mota);
      setHinhanh(dataC.hinhanhs);
    }
  }, [dataC]);
  return (
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
                        <a href="/address/list">Địa điểm</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Chỉnh sửa địa điểm
                      </li>
                    </ol>
                  </nav>
                  <div className="mb-4 div-fluid">
                    <UploadImages
                      handleChange={handleChange}
                      data={dataC }
                    />
                    {/* {dataC && hinhanh &&
                    hinhanh.map(item => {
                      return (
                        <img
                        src={item.hinhanh_url}
                        className="hinhanh_url"
                        alt="image"
                      ></img>
                      )
                     
                     })} 
                    <img src={hinhanhURL} className="hinhanh_url" alt="image"></img> */}
                  </div>
                  
                  <div className="mt-5 d-flex justify-content-between">
                    <label htmlFor="vitri" className="form-label">
                      Vị trí:
                    </label>
                    <div>
                      <span>
                        [{diadiem_kinhdo.toFixed(2)},{diadiem_vido.toFixed(2)}]
                      </span>
                      <button
                        className="btn btn-outline-darks underline"
                        data-bs-target="#exampleModalToggle2"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                      >
                        Thay đổi
                      </button>
                    </div>

                    <div
                      className="modal fade"
                      id="exampleModalToggle2"
                      aria-hidden="true"
                      aria-labelledby="exampleModalToggleLabel2"
                      tabIndex="-1"
                    >
                      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="exampleModalToggleLabel2"
                            >
                              Bản đồ Việt Nam
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <Map setLocation={setLocation} />
                          </div>
                          <div className="modal-footer">
                            <button
                              className="btn btn-outlined-dark"
                              data-bs-target="#exampleModalToggle"
                              onClick={confirmLocation}
                              data-bs-toggle="modal"
                              data-bs-dismiss="modal"
                            >
                              Xác nhận vị trí
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body pt-5 text-black">
                    <div>
                      <div className="mb-2">
                        <label htmlFor="username" className="form-label">
                          Danh mục địa điểm:
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) => setDanhmucId(e.target.value)}
                        >
                          {category &&
                            dataC &&
                            category.map(({ Id, id_danhmuc, danhmuc_ten }) => {
                              if (id_danhmuc == dataC.danhmuc.id_danhmuc) {
                                return (
                                  <option selected value={id_danhmuc}>
                                    {danhmuc_ten}
                                  </option>
                                );
                              } else
                                return (
                                  <option value={id_danhmuc}>
                                    {danhmuc_ten}
                                  </option>
                                );
                            })}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="username" className="form-label">
                          Tên địa điểm:
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setDiadiem_ten(e.target.value)}
                          className="form-control"
                          id="username"
                          name="username"
                          require="true"
                          value={diadiem_ten}
                        />
                      </div>

                      <div>
                        <label htmlFor="url" className="form-label">
                          Url:
                        </label>
                        <input
                          type="url"
                          onChange={(e) => setDiadiem_url(e.target.value)}
                          className="form-control"
                          id="url"
                          name="url"
                          require="true"
                          value={diadiem_url}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="mota" className="form-label">
                    Vui lòng nhập thông chi tiết về địa điểm của bạn:
                  </label>
                  <textarea
                    rows="8"
                    onChange={(e) => setDiadiem_mota(e.target.value)}
                    className="form-control"
                    id="mota"
                    name="mota"
                    require="true"
                    value={diadiem_mota}
                  />
                </div>
                <div className="pt-1 mb-2 d-flex justify-content-between">
                  <Button onClick={update} variant="contained" type="submit">
                    Xác nhận{" "}
                  </Button>
                  <p className=" pb-lg-2">
                    Hủy bỏ thao tác?{" "}
                    <Link to="/" className="underline">
                      Quay về trang chủ{" "}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!!hinhanh &&
        hinhanh.map((link, key) => <img src={link} alt="AAAA" key={key} />)}
    </section>
    // <section className="h-100 bg-dark">
    //     {dataC && (<div className="container 2 h-100">
    //         <div className="row d-flex justify-content-center align-items-center h-100">
    //             <div className="col col-xl-10">
    //                 <div className="card" >
    //                     <div className="row g-0">

    //                         <div className="col-md-6 col-lg-5 d-none d-md-block">
    //                         <nav aria-label="breadcrumb" className='mt-4 mx-3'>
    //                                 <ol className="breadcrumb">
    //                                     <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
    //                                     <li className="breadcrumb-item"><a href="/address/list">Địa điểm</a></li>
    //                                     <li className="breadcrumb-item active" aria-current="page">Sửa địa điểm</li>
    //                                 </ol>
    //                             </nav>
    //                             <img src="/images/address/EditAddress.svg" alt="login form" className="img-fluid ms-5 mt-3" />
    //                             <div className="sub-login">
    //                                 <p className="mb-5 pb-lg-2" >Hủy bỏ thao tác? <Link to="/" className='underline' >Quay về trang chủ </Link></p>
    //                             </div>
    //                         </div>
    //                         <div className="col-md-6 col-lg-7 d-flex align-items-center">
    //                             <div className="card-body p-4 p-lg-5 text-black">
    //                                 <div>
    //                                     <div className="mb-2">
    //                                         <label htmlFor="username" className="form-label">Danh mục địa điểm:</label>
    //                                         <select className="form-select" onChange={(e) => setDanhmucId(e.target.value)} >
    //                                             {category && category.map(({ Id, id_danhmuc, danhmuc_ten }) => {
    //                                                 if (id_danhmuc == dataC.danhmuc.id_danhmuc) {
    //                                                     return (
    //                                                         <option selected value={id_danhmuc}>{danhmuc_ten}</option>
    //                                                     )
    //                                                 }
    //                                                 else
    //                                                     return (
    //                                                         <option value={id_danhmuc}>{danhmuc_ten}</option>
    //                                                     )
    //                                             })}
    //                                         </select>
    //                                     </div>
    //                                     <div className="mb-2">
    //                                         <label htmlFor="username" className="form-label">Tên địa điểm:</label>
    //                                         <input type="text" value={diadiem_ten} onChange={(e) => setDiadiem_ten(e.target.value)} className="form-control" id="username" name="username" require="true" />
    //                                     </div>

    //                                     <div className="mb-2">
    //                                         <label htmlFor="url" className="form-label">Url:</label>
    //                                         <input type="url" value={diadiem_url} onChange={(e) => setDiadiem_url(e.target.value)} className="form-control" id="url" name="url" require="true" />
    //                                     </div>
    //                                     <div className="mb-2">
    //                                         <label htmlFor="vitri" className="form-label">Vị trí:</label>
    //                                         <div className="input-group mb-3" id="vitri">
    //                                             <input value={diadiem_kinhdo} type="number" onChange={(e) => setDiadiem_kinhdo(e.target.value)} placeholder='Kinh độ' className="form-control me-2" id="kinhdo" name="kinhdo" require="true" />
    //                                             <input value={diadiem_vido} type="number" placeholder='Vĩ độ' onChange={(e) => setDiadiem_vido(e.target.value)} className="form-control" id="vido" name="vido" require="true" />
    //                                         </div>

    //                                     </div>
    //                                     <div className="mb-2">
    //                                         <label htmlFor="mota" className="form-label">Mô tả:</label>
    //                                         <input value={diadiem_mota} type="text" onChange={(e) => setDiadiem_mota(e.target.value)} className="form-control" id="mota" name="mota" require="true" />
    //                                     </div>
    //                                     <div className="mb-2">
    //                                         <label htmlFor="hinhanh" className="form-label">Ảnh:</label>
    //                                         <input value={hinhanhURL} type="text" className="form-control" onChange={(e) => setHinhanhURL(e.target.value)} id="hinhanh" name="hinhanh" require="true" />
    //                                     </div>
    //                                     <div className="pt-1 mb-2">
    //                                         <Button onClick={update} variant="contained" type="submit">Xác nhận  </Button>
    //                                     </div>
    //                                 </div>

    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>)}
    // </section>
  );
}

export default EditAddress;
