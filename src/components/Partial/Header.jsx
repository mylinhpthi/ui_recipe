import React,{ useEffect, useState, useContext }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SignInButtons from '../Account/SignInButtons';
import { AppContext } from "../../AppContext";
function Header() {
	var items = !!(localStorage.getItem('user'));
	useEffect(() => {
	}, [])
	const logout =(e) =>{
		e.preventDefault();
		localStorage.removeItem('user');
		window.location.reload();
	}
	return (
			<section className="header ftco-section">
				<div className="header container-fluid px-md-5">
					<div className="row justify-content-between">
						<div className="col-md-8 order-md-last">
							<div className="row">
								<div className="col-md-6 text-center">
									<a className="navbar-brand" href="index.html">Chill Garden <span>Sẵn sàng phục vụ và giúp đỡ bạn</span></a>
								</div>
								<div className="col-md-6 d-md-flex justify-content-end mb-md-0">
									<div className="social-media">
										{(items==false )&&
										(
										<div className="mb-0 d-flex log-btn">  <b className=" my-2">Đăng nhập với: </b>
										<SignInButtons />
											{/* <a href="#" className="d-flex align-items-center justify-content-center"><span className="fa fa-facebook"><i className="sr-only">Facebook</i></span></a>
											<a href="#" className="d-flex align-items-center justify-content-center"><span className="fa fa-google"><i className="sr-only">Google</i></span></a> */}
											<a href="/login" className="d-flex align-items-center justify-content-center"><span className="fa fa-key"><i className="sr-only">Tài khoản account</i></span></a>
										</div>
										)

										}
										{(items==true )&&
										(
										<div className="mb-0 d-flex log-btn"> 
											<a href="#" className="d-flex align-items-center justify-content-center"><span className="fa fa-user-md"><i className="sr-only">Profile</i></span></a>
											<a href="/login" onClick={logout} className="d-flex align-items-center justify-content-center"><span className="fa fa-sign-out"><i className="sr-only">Đăng xuất</i></span></a>
											</div>
										)
										
										}
										
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-sm-10 d-flex">
							<form action="#" className="searchform order-lg-last">
								<div className="form-group d-flex">
									<input type="text" className="form-control pl-3" placeholder="Search" />
									<button type="submit" placeholder="" className="form-control search"><span className="fa fa-search"></span></button>
								</div>
							</form>

						</div>
					</div>
				</div>
				<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
					<div className="container-fluid">

						<button className="menu-navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="fa fa-bars"></span> Menu
						</button>
						<div className="collapse menu-navbar-collapse navbar-collapse" id="ftco-nav">
							<ul className="navbar-nav m-auto">
								<li className="nav-item active"><a href="/" className="nav-link">Trang chủ</a></li>
								<li className="nav-item dropdown category">
									<a className="nav-link dropdown-toggle category-dropdown-toggle" href="#" >Danh mục</a>
									<div className="dropdown-menu category-dropdown-menu" >
										<a className="dropdown-item" href="#">Địa điểm siêu HOT</a>
										<a className="dropdown-item" href="#">Danh lam thắng cảnh</a>
										<a className="dropdown-item" href="#">Di tích lịch sử</a>
										<a className="dropdown-item" href="#">Check in và phiêu lưu</a>
									</div>
								</li>
								<li className="nav-item"><a href="#" className="nav-link">Feedback</a></li>
								<li className="nav-item dropdown category">
									<a className="nav-link dropdown-toggle category-dropdown-toggle" href="#" >Dịch vụ</a>
									<div className="dropdown-menu category-dropdown-menu" >
										<a className="dropdown-item" href="#">Quản lý quỹ VFC</a>
										<a className="dropdown-item" href="#">Quản lý địa điểm</a>
										<a className="dropdown-item" href="#">Di tích lịch sử</a>
										<a className="dropdown-item" href="#">Check in và phiêu lưu</a>
									</div>
								</li>
								<li className="nav-item"><a href="#" className="nav-link">Về chúng tôi</a></li>
							</ul>
						</div>
					</div>
				</nav>
			</section>
	)
}

export default Header