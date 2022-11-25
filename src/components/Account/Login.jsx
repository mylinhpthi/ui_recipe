import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { AppContext } from "../../AppContext";
import Loading from "../Partial/Loading";
import Header from "../Partial/Header";
toast.configure();

function Login() {
  const notify = () => toast("");
  const { isLoading, setIsLoading, setCurrentUser, setIsAuth, setPrivilege, privilege } =
    React.useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (!!cookies.user || localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const [cookies, setCookie] = useCookies(["user"]);
  async function login() {
    console.log("login");
    // setIsLoading(true);
    let item = { username, password };
    let res = await fetch("http://localhost:8093/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(item),
    });
    res = await res.json();
    console.log(res);
    if (res.token != null) {
      setIsAuth(true);
      setCurrentUser({
        displayName: res.user.username,
        accessToken: res.token,
        uid: res.user.id,
      });
      setPrivilege(res.user.privilege);
      localStorage.setItem("user", res.user.username);
      setCookie("privilege", res.user.privilege, 3);
      
       // Kiểm tra xem có quyền admin không arr.some(el => el.id === id)
       if(res.user.privilege!=null)
          if(res.user.privilege.some(el => el.id === "6354cfc925489097bde657b3"))
            navigate("/admin");
          else
            navigate("/");
        else
        navigate("/");
        
       
      if (remember) setCookie("user", username, 3);
    } else {
      toast.error("Đăng nhập không thành công. Vui lòng thử lại!");
    }
    setIsLoading(false);console.log(privilege);
  }
  return (
    <div className="login">
      {isLoading && 
       <Loading />
      }
      {!isLoading && (
        <div>
             <Header />
             <section className="h-100 bg-dark">
          <div className="container 2 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src="/images/auth/logIn.svg"
                        alt="login form"
                        className="img-fluid ms-5 mt-3"
                      />
                      <div className="sub-login">
                        <Link to="recovery.html" className="small text-muted">
                          Quên mật khẩu?
                        </Link>
                        <p className="mb-5 pb-lg-2">
                          Bạn chưa có tài khoản?{" "}
                          <Link to="/register" className="underline">
                            Đăng ký ngay{" "}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <div>
                          <h5 className="fw-normal mb-3 pb-3">
                            Đăng nhập vào tài khoản
                          </h5>
                          <div className="mb-4">
                            <label htmlFor="username" className="form-label">
                              Username hoặc Email
                            </label>
                            <input
                              onChange={(e) => setUsername(e.target.value)}
                              type="text"
                              className="form-control"
                              id="username"
                              name="username"
                              require="true"
                            />
                          </div>

                          <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                              Mật khẩu
                            </label>
                            <input
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                              id="password"
                              name="password"
                              require="true"
                            />
                          </div>
                          <div className="form-check mb-4">
                            <input
                              onClick={(e) => setRemember(e.target.value)}
                              className="form-check-input"
                              type="checkbox"
                              name="remember_me"
                              id="remember_me"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remember_me"
                            >
                              Ghi nhớ đăng nhập
                            </label>
                          </div>
                          <div className="pt-1 mb-4">
                            <Button
                              onClick={login}
                              variant="contained"
                            >
                              <span className="p-custome">Đăng nhập</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
        
      )}
    </div>
  );
}

export default Login;
