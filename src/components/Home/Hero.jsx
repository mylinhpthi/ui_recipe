import { Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useAxios from 'axios-hooks';

function Hero() {
    const [dt, setDt] = useState([]);
    const [{ data, loading, error }] = useAxios(`Address`, {
    });
    useEffect(() => {
        setDt(data);
    }, [data])

    return (
        <div >
            <Grid container spacing={2} className="hero">
                <Grid item p xs={12} md={5} className="hero-left">
                    <img src="/images/hero_bg.svg" alt="" />

                </Grid>
                <Grid item xs={12} md={7} className="hero-right">
                    <div className="hero-caption">
                        <h3>Việt Nam - Rừng vàng, biển bạc</h3>
                        <p className="caption">Đất nước Việt Nam được mẹ thiên nhiên ưu ái, ban cho rất nhiều cảnh đẹp hùng vĩ, rộng lớn. Trải dài từ Bắc vào Nam, đâu đâu ở nước ta cũng sở hữu thắng cảnh, từ những ngọn núi rộng lớn, thung lũng bạc ngàn đến biển cả trữ tình...Không chỉ là một đất nước hiền hòa, người dân hiền lành thân thiện mà trên mảnh đất hình chữ S yêu thương này. Bạn đã sẵn sàng khám phá chưa? </p>
                        <Button variant="contained"><Link to="/" className='a-custom '>Khám phá ngay</Link> </Button>
                    </div>
                </Grid>
            </Grid>
            <div id="demo" className="carousel slide  " data-bs-ride="carousel">
                <div className="slide-title">
                    <h3>TOP NHỮNG ĐỊA ĐIỂM SIÊU HOT</h3>
                </div>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
                </div>


                <div className="carousel-inner">
                    <div className="carousel-item home-carousel-item active ">
                        <div className="carousel-caption home-caption">
                            <h3>Chợ nổi Cái Răng</h3>
                            <div className="caption">Chợ nổi Cái Răng là điểm đến mà bất kỳ du khách nào cũng muốn tới một lần tại
                                xứ Tây Đô. Bạn có thể đi tàu du lịch từ bến Ninh Kiều hoặc bến tàu Cái Răng để tới được chợ nổi
                                này. Thời điểm đẹp nhất để khám phá cảnh đẹp chợ nổi Cái Răng là buổi sáng từ 6 - 8h. Bạn sẽ
                                được chứng kiến những ghe thuyền bán đủ các loại trái cây đặc sản miền Tây như: Chôm chôm, dưa
                                hấu, xoài, măng cụt... Cùng với đó là những ghe thuyền bán đồ ăn sáng với đủ loại bún, cháo,
                                bánh mì, cafe. </div>
                            <button type="button" className="btn btn-secondary"><Link to="#">Khám phá ngay</Link> </button>
                        </div>
                    </div>
                    <div className="carousel-item home-carousel-item">
                        <div className="carousel-caption home-caption">
                            <h3>Nhà cổ Bình Thủy</h3>
                            <div className="caption">Ghé thăm nhà cổ du khách sẽ được chiêm ngưỡng kiến trúc độc đáo và các hiện vật
                                được trưng bày. Nhà cổ Bình Thủy cũng là điểm đến hấp dẫn du khách với những góc sống ảo tuyệt
                                đẹp. Trong đó, góc chụp đẹp nhất tại ngôi nhà cổ này đó là ngoài trời với khu vườn hoa nở rực rỡ
                                sắc màu.</div>
                                <button type="button" className="btn btn-secondary"><Link to="#">Khám phá ngay</Link> </button>
                        </div>
                    </div>
                    <div className="carousel-item home-carousel-item">
                        <div className="carousel-caption home-caption">
                            <h3>Chùa Ông</h3>
                            <div className="caption">Chùa Ông là địa điểm sống ảo đẹp ở Cần Thơ ấn tượng với lối thiết kế đậm chất
                                Trung Hoa. Tổng thể ngôi chùa có kiến trúc theo thuyết âm dương, với tượng vật linh thiêng, cá
                                chép hóa rồng, linh phụng...</div>
                                <button type="button" className="btn btn-secondary"><Link to="#">Khám phá ngay</Link> </button>
                        </div>
                    </div>
                    <div className="carousel-item home-carousel-item">
                        <div className="carousel-caption home-caption">
                            <h3>Miệt vườn trái cây </h3>
                            <p className="caption">Cần Thơ nổi tiếng với những miệt vườn trái cây xum xuê trĩu quả. Trong đó phải kể
                                tới vườn trái
                                cây Ba Cống, vườn trái cây 9 Hồng,... Bạn sẽ được đi dạo xung quanh miệt vườn ngắm đủ loại trái
                                cây miền Tây đặc sản như chôm chôm, nhãn, sầu riêng, măng cụt, mận.
                                .</p>
                                <button type="button" className="btn btn-secondary"><Link to="#">Khám phá ngay</Link> </button>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
            <section className="address section" id='diadiem'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Khu văn hóa & lịch sử</h2>
                                <Link to="/address/list"><span>Xem thêm</span> </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        {
                            dt && dt.slice(0,7).map(({ id_diadiem, diadiem_ten, danhgia, hinhanhs, index }) => {
                                return (

                                    <div className="col-lg-3 col-md-6 col-12 ">
                                        <Link to={'/Address/' + id_diadiem}>
                                            <div key={index} className="single-address wow bounceInLeft ">
                                                <div className="address-image wow bounceInLeft">
                                                    <img src={hinhanhs[0] && hinhanhs[0].hinhanh_url} alt="#" />
                                                </div>
                                                <div className="address-info">
                                                    <span className="category">Trong nước</span>
                                                    <h6 className="title">
                                                        {diadiem_ten}
                                                    </h6>
                                                        {danhgia && danhgia.map(({ danhgia_sao, key }) => {
                                                            return (<ul className="review" key={key}>{Array.from(Array(Number(danhgia_sao)), (e, i) => { return <li><i key={i} className="fa fa-star" aria-hidden="true"></i></li> })}{Array.from(Array(5 - Number(danhgia_sao)), (e, i) => { return <li><i key={i} className="fa fa-star-o" aria-hidden="true"></i></li> })}<li ><span>{danhgia_sao}.0 Review(s)</span></li></ul>)
                                                        })}
                                                        {!danhgia&&(
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
                                                            <li ><span>5.0 Review(s)</span></li>
                                                            </ul>
                                                        )}
                                                     

                                                </div>
                                            </div>
                                        </Link>
                                    </div>);
                            })
                        }
                        <div className="col-lg-3 col-md-6 col-12 ">
                                        <Link to="/Address/add">
                                            <div className="single-address wow bounceInLeft ">
                                                <div className="address-image wow bounceInLeft container">
                                                    <img className="mx-1 my-1 py-3 px-3" src="/images/address/add.png" alt="#" />
                                                </div>
                                                <div className="address-info">
                                                    <span className="category">**** nước</span>
                                                    <h6 className="title">
                                                         Địa điểm mới của bạn
                                                    </h6>
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
                                                    <li ><span>5.0 Review(s)</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Link>
                                    </div> 
                    </div>
                </div>
            </section >

        </div >

    )
}

export default Hero