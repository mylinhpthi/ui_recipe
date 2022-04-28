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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [{ data, loading, error }] = useAxios(`User`);
  function checkUsername(){
    data.some((item)=>{
      if(username == item.taikhoan_username){
        toast.error('Tên tài khoản đã tồn tại. Vui lòng thử lại!')
        errors["username"] = true;
        setUsername("");
        return true;
      }
    })
  }
const regex = {pass:/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/i};
  function checkPassword(){
    if(regex["pass"].test(password) == false){
      toast.error('Mật khẩu có ít nhất 8 ký tự bao gồm chữ số, chữ in hoa, chữ thường và ký tự đặc biệt.');
      setPassword("");
      errors["password"] = true;
    }
  }
  function checkConfirmPassword(){
    if(password !== confirmPassword){
      toast.error('Xác thực mật khẩu thất bại. Thử lại nhé');
      setconfirmPassword("");
      errors["confirmPassword"] = true;
    }
  }
  async function registers() {
    let item = { taikhoan_username: username, taikhoan_password: password, taikhoan_email: email };
    let res = await fetch("http://localhost:20175/api/user/register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    });
    res = await res.json();
     localStorage.setItem("userout", JSON.stringify(res));
      toast.success('Đăng ký thành công. Đăng nhập lại nhé!')
      navigate("/login");
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
                      <div className="mb-2">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={checkUsername} name="username" className="form-control" id="username" required />
                      </div>
                    </div>
                    <div className="col-md-12 ">
                      <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" className="form-control" id="email" required />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>  
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  onBlur={checkPassword} name="password" className="form-control" id="password" required />
                      </div>
                    </div>
                    <div className="col-md-12 mb-4">
                      <div className="mb-2">
                        <label htmlFor="confirm_password" className="form-label">Xác nhận mật khẩu</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} onBlur={checkConfirmPassword} name="confirm_password" className="form-control" id="confirm_password" required />
                      </div>
                    </div>
                    <div className=" d-flex justify-content-start ">
                      <Button onClick={registers} variant="contained" type="submit">Đăng ký</Button>
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