import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Error403() {
    return (
        <div>
            <Header />
            <div className="container" >
                <section className="page_404" style={{ padding: '40px 0', background: '#fff', fontFamily: '"Arvo", serif' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-12 col-sm-offset-1  text-center">
                                    <div className="four_zero_four_bg" style={{ height: '300px', backgroundPosition: 'center' }}>
                                        <h1 style={{ fontSize: '80px',fontStyle:'bold', position:'absolute',     marginLeft: "37%"}} className="text-center">403</h1>
                                        <img style={{  }} src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"  height="300px" alt="" />
                                    </div>
                                    <div className="contant_box_404" style={{ marginTop: '-40px' }}>
                                        <h3 className="h2">
                                            Truy cập không hợp lệ
                                        </h3>
                                        <p style={{ fontSize:'20px' }}>Bạn không đủ quyền truy cập vào trang web</p>
                                        <a href="/" style={{width:"150px", margin:'auto', color:"white"}}  className=" nav-link btn btn-success btn-lg">Quay lại </a>

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

export default Error403;