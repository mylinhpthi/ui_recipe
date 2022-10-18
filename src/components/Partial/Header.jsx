import React,{ useEffect, useState, useContext }  from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SignInButtons from '../Account/SignInButtons';
import { AppContext } from "../../AppContext";
import useAxios from 'axios-hooks';
import { signOut } from '../../firebase.services';

function Header() {
	const [dt, setDt] = useState([]);
	const [{ data, loading, error }] = useAxios(`category/list`, {});
	var items = !!(localStorage.getItem('user'));
	useEffect(() => {
		setDt(data);
	  }, [data]);
	const logout =(e) =>{
		e.preventDefault();
		localStorage.removeItem('user');
		signOut();
		window.location.reload();
	}
	// function monanngon(){
	// 	if(!localStorage.getItem("user")){
	// 		Navigate("/login");
	// 	else
	// 		Navigate("")
	// 	}
	// }
	return (
			<section className="header ftco-section">
				<div className="header container-fluid px-md-5">
					<div className="row justify-content-between">
						<div className="col-md-8 order-md-last">
							<div className="row">
								<div className="col-md-6 text-center">
									<a className="navbar-brand" href="index.html">HAPPY FOOD <span>Sẵn sàng bên cạnh và giúp đỡ bạn</span></a>
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
									{dt && dt.map(({ id, name, index }) => {
                                return (
									<a key={id} className="dropdown-item" href="/recipe/list">{name}</a>
								)})}
										<a className="dropdown-item" href="/recipe/list">Khác</a>
									</div>
								</li>
								<li className="nav-item"><a href="/favoriteRecipe" className="nav-link">Món ăn ngon</a></li>
								<li className="nav-item"><a href="#" className="nav-link">Feedback</a></li>
								<li className="nav-item dropdown category">
									<a className="nav-link dropdown-toggle category-dropdown-toggle" href="#" >Tin tức</a>
									<div className="dropdown-menu category-dropdown-menu" >
										<a className="dropdown-item" href="/bog/1">Hồn Việt trong ẩm thực Tết ở miền Bắc</a>
										<a className="dropdown-item" href="#">Ăn sáng ngon miệng bằng súp </a>
										<a className="dropdown-item" href="#">Top những mâm cơm gia đình hạnh phúc</a>
										<a className="dropdown-item" href="#">Bí quyết của hạnh phúc: "Yêu từ dạ dày"</a>
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