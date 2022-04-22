import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <section className="h-100 bg-dark">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card card-registration my-4">
            <div className="row g-0">
              <div className="col-xl-6 d-none d-xl-block">
                <img src="/images/auth/register.svg" alt="Sample photo" className="img-fluid ms-5 mt-3" />
                <div className="sub-login">
                  <p className="mt-4 pb-lg-2" >Bạn đã có tài khoản? <Link to="/login" className='underline' >Đăng nhập ngay</Link></p>
                </div>
              </div>
              <div className="col-xl-6 mt-2">
                <form className="card-body p-md-4 text-black" method="post" action="/register">
                  <div className="col-md-12 ">
                    <div className="mb-2">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input type="text" name="username" className="form-control" id="username" require="true" />
                    </div>
                  </div>
                  <div className="col-md-12 ">
                    <div className="mb-2">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" name="email" className="form-control" id="email" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-2">
                      <label htmlFor="password" className="form-label">Mật khẩu</label>
                      <input type="password" name="password" className="form-control" id="password"  />
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <div className="mb-2">
                      <label htmlFor="confirm_password" className="form-label">Xác nhận mật khẩu</label>
                      <input type="password" name="confirm_password" className="form-control" id="confirm_password"  />
                    </div>
                  </div>
                  <div className=" d-flex justify-content-start ">
                  <Button variant="contained" type="submit">Đăng ký</Button>
                  </div>
  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Register