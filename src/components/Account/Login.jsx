import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

function Login() {
    return (
        <div className="login">
            <section className="h-100 bg-dark">
                <div className="container 2 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" >
                                <div className="row g-0">

                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="/images/auth/logIn.svg" alt="login form" className="img-fluid ms-5 mt-3" />
                                        <div className="sub-login">
                                            <Link to="recovery.html" className="small text-muted" >Quên mật khẩu?</Link>
                                            <p className="mb-5 pb-lg-2" >Bạn chưa có tài khoản? <Link to="/register" className='underline' >Đăng ký ngay </Link></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form method="post" action="/login">
                                                <h5 className="fw-normal mb-3 pb-3">Đăng nhập vào tài khoản</h5>
                                                <div className="mb-4">
                                                    <label htmlFor="username" className="form-label">Username hoặc Email</label>
                                                    <input type="text" className="form-control" id="username" name="username" require="true" />
                                                </div>

                                                <div className="mb-4">
                                                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                                                    <input type="password" className="form-control" id="password" name="password" require="true" />
                                                </div>
                                                <div className="form-check mb-4">
                                                    <input className="form-check-input" type="checkbox" name="remember_me" id="remember_me" />
                                                    <label className="form-check-label" htmlFor="remember_me">
                                                        Ghi nhớ đăng nhập
                                                    </label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <Button variant="contained" type="submit">Đăng nhập</Button>
                                                </div>

                                                

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login