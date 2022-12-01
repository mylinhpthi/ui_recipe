import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Error404() {
    return (
        <div>
            <Header />
            <div className="container" >
                <section className="page_404" style={{ padding: '40px 0', background: '#fff', fontFamily: '"Arvo", serif' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-12 col-sm-offset-1  text-center">
                                    <div className="four_zero_four_bg" style={{ height: '400px', backgroundPosition: 'center' }}>
                                        <h1 style={{ fontSize: '80px' }} className="text-center">404</h1>
                                        <img style={{ marginTop: '-25px' }} src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" width="70%" height="400px" alt="" />
                                    </div>
                                    <div className="contant_box_404" style={{ marginTop: '30px' }}>
                                        <h3 className="h2 ">
                                            Lỗi truy cập mất rồi...
                                        </h3>
                                        <p>Bạn thử lại ở một URL hợp lệ nhé</p>
                                        <a href="/" classname="nav-link" className="btn btn-success btn-lg">Quay lại </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Error404;