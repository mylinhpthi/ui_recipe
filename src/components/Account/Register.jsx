import { Button } from '@mui/material'
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./style.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Register() {
  const notify = () => toast('');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [{ data, loading, error }] = useAxios(`User`);
  async function checkEmail(){
    let res = await fetch("http://localhost:8093/User", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
      }});
      
    data = await res.json();
    setData(data);
    data.some((item)=>{
      if(email == item.username){
        errors["email"] = "Địa chỉ Email đã tồn tại. Vui lòng thử lại!";
        return true;
      }
      else errors["email"] = null;
    })
  }
const regex = {pass:/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/i};
  function checkPassword(){
    if(regex["pass"].test(password) == false){
      setPassword("");
      errors["password"] = 'Mật khẩu có ít nhất 8 ký tự bao gồm chữ số, chữ in hoa, chữ thường và ký tự đặc biệt.';
    }
  }
  function checkConfirmPassword(){
    if(password !== confirmPassword){
      setconfirmPassword("");
      errors["confirmPassword"] = "Xác thực mật khẩu thất bại. Thử lại nhé";
    }
  }
  function reset(){
    errors["email"] = null;
    errors["password"] = null;
    errors["confirmPassword"] = null;
  }
  async function registers() {
    await checkPassword();
    await checkConfirmPassword();
    if(errors["email"]==null && errors["password"]==null && errors["confirmPassword"]==null){
      let item = { password: password, username: email, email:email, privilege:[
        {
          "id": "63512b83caf267316d40e331",
          "name": "Xóa món ăn"
      },
      {
          "id": "63512b7ecaf267316d40e330",
          "name": "Chỉnh sửa món ăn"
      },
      {
          "id": "63512b7acaf267316d40e32f",
          "name": "Thêm món ăn"
      },
      ] };
      console.log(item)
      let res = await fetch("http://localhost:8093/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });
      if(res.status == 400){
          toast.error("Đã tồn tại tên đăng nhập tài khoản!");
      }
      else{
        // res = await res.json();
        // if(res.status==400){
        //   toast.error("Đã tồn tại tên đăng nhập tài khoản!");
          
        // }else{
          toast.success('Đăng ký thành công. Đăng nhập lại nhé!')
          navigate("/login");
        // }
      }
      
       
    }

    
  }
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
                  <div className="card-body p-md-4 text-black">
                    <div className="col-md-12 ">
                      <div className="mb-3">
                      <h5 className="fw-normal ">Đăng ký tài khoản</h5>
                      <small>Cung cấp thông tin của bạn để đăng ký tài khoản ngay nhé</small>
                      </div>
                    
                      <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} onFocus={reset} name="email" className={!errors["email"]?"form-control":"is-invalid form-control"}  id="email" required />
                        <div id="validationServer03Feedback" className="invalid-feedback">
                         { errors["email"]}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>  
                        <input type="password" onChange={(e) => setPassword(e.target.value)}  onFocus={reset} name="password" className={!errors["password"]?"form-control":"is-invalid form-control"} id="password" required />
                        <div id="validationServer03Feedback" className="invalid-feedback">
                         { errors["password"]}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-4">
                      <div className="mb-2">
                        <label htmlFor="confirm_password" className="form-label">Xác nhận mật khẩu</label>
                        <input type="password" onChange={(e) => setconfirmPassword(e.target.value)} onFocus={reset} name="confirm_password" className={!errors["confirmPassword"]?"form-control":"is-invalid form-control"} id="confirm_password" required />
                        <div id="validationServer03Feedback" className="invalid-feedback">
                         { errors["confirmPassword"]}
                        </div>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-start ">
                      <Button onClick={registers} variant="contained" type="submit"><span class="p-custome" >Đăng ký</span></Button>
                    </div>

                  </div>
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