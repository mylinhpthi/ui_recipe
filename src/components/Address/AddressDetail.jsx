import { Button } from '@mui/material';
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function AddressDetail() {
    let { id } = useParams();
    const [{ data, loading, error }] = useAxios(`Address/${id}`);
    let idCate = data && data.danhmuc.id_danhmuc;
    const [{ data: category, loading: cLoading, error: CError }] = useAxios(`Category/${idCate}`);
    const [dt, setDT] = useState(data);
    const navigate = useNavigate();
    function addFavoriteAddress() {
        alert("add")
    }
    function editAddress() {
        navigate("edit")
    }
    const [{}, DeleteData] = useAxios(
        {
          url: `Address/${id}`,
          method: "DELETE",
        },
        { manual: true }
      );
    async function deleteAddress() {
       await DeleteData({ data:id }).then((res)=>{
            toast.success('Xóa địa điểm thành công!')
      });
      window.location.href="/"

    }
    useEffect(() => {
        setDT(data);
    }, [data])

    return (

        <div className='container my-5'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                    <li className="breadcrumb-item"><a href="/address/list">Địa điểm</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{dt&& dt.diadiem_ten}</li>
                </ol>
            </nav>
            {dt&& (
                <section >
                    <div className="px-4 px-lg-5 ">
                        <div className="row gx-4 gx-lg-5 align-items-center">
                            <div className="container col-md-6"><img className=" my-3 card-img-top mb-5 mb-md-0" src={dt && dt.hinhanhs[0] && dt.hinhanhs[0].hinhanh_url} alt="..." /></div>
                            <div className="col-md-6">
                                <div className="small mb-1"></div>
                                <Link to={dt.diadiem_url}><h3 className="display-5 fw-bolder">{dt.diadiem_ten}</h3></Link>

                                <div className=" fs-5 mb-4"><small>Ngày cập nhập: </small>
                                    <small>{dt.diadiem_updated}</small>
                                </div>
                                <p className="lead">{dt.diadiem_mota}</p>
                                <div className="d-flex justify-content-center">
                                    <Button type="button" className=" my-3 me-3" variant="contained" onClick={addFavoriteAddress} >
                                        <i className="fa fa-heart me-2" aria-hidden="true"></i>
                                        Lưu địa điểm yêu thích
                                    </Button>
                                    <button type="button" className="btn btn-outline-primary me-3 my-3" onClick={editAddress} >
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" className="btn btn-outline-danger my-3" onClick={deleteAddress} >
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <section className="my-5 py-2 bg-light">
                <div className="container px-4 px-lg-5 mt-5">
                    <h2 className="fw-bolder mb-4">Địa điểm liên quan</h2>
                    <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-start">
                        {category && category.slice(0,5).map(({hinhanhs, diadiem_ten, id_diadiem})=>{
                            if(id_diadiem != data.id_diadiem){
                                return(
                                    <div className="col mb-5" key={id_diadiem}>
                                    <div className="card h-100">
        
                                        <img className="card-img-top" src={hinhanhs[0].hinhanh_url} alt={hinhanhs[0].hinhanh_mota} />
        
                                        <div className="card-body p-4">
                                            <div className="text-center">
        
                                                <h5 className="fw-bolder">{diadiem_ten}</h5>
        
                                                
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center"><Link to={'/Address/' + id_diadiem} className="btn btn-outline-dark mt-auto">Xem chi tiết</Link></div>
                                        </div>
                                    </div>
                                </div> 
                                )
                            }
                            
                        })}
                    </div>
                </div>
            </section>
        </div>

    )
}

export default AddressDetail