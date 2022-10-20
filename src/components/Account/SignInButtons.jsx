import { logEvent } from "@firebase/analytics";
import useAxios from "axios-hooks";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AppContext } from "../../AppContext";
import {
  analytics,
  signInWithFacebook,
  signInWithGoogle,
  db,
  handleAuthError
} from "../../firebase.services";
function SignInButtons() {
  const { isAuth, setIsAuth, setCurrentUser } =
    useContext(AppContext);
    const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [{ data, loading, error:UError }] = useAxios(`User`);
  const [DT, setDT] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      setDT(data);
    }
  }, [isAuth]);
  async function checkEmail(user){
    await setDT(data);
    DT.some((item)=>{
      if(user?.email == item.taikhoan_email){
        return false;
      }
    })
    return true;
  }
  const handleSignInSuccess = async(user) => {
      
    var test = checkEmail(user);
    if(!test){
      let item = { taikhoan_password: user?.uid, taikhoan_email: user?.email };
      let res = await fetch("http://localhost:8093/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });
    }
    setIsAuth(true);
    console.log(user?.email);
    console.log("uid",user?.uid)
    setCurrentUser(user);
    logEvent(analytics, "login");
    localStorage.setItem("user", JSON.stringify(user.email));
    navigate("/");
    
    // window.location.reload();
  };

  const handleSignInWithGoogle = async () => {
    try {
      setError("");
      const user = await signInWithGoogle();
      handleSignInSuccess(user);
      await setEmail(user?.email);
      await setPassword(user?.uid);
      
    } catch (e) {
      handleAuthError(e);
      setError(e.message);
      console.log(error);
      logEvent(analytics, "error", { message: e.message });
    }
  };

  const handleSignInWithFacebook = async () => {
    try {
      setError("");
      const user = await signInWithFacebook();
      console.log(user)
      handleSignInSuccess(user);
      await setEmail(user?.email);
      await setPassword(user?.uid);
    } catch (e) {
      // if (e.email && e.credential && e.message.code=== 'auth/account-exists-with-different-credential') {
      console.log(e.message)
      // }
      const user = await handleAuthError(e);
      console.log(user)
      handleSignInSuccess(user);

      setError(e.message);
      console.log(e)
      logEvent(analytics, "error", { message: e.message });
    }
  };

  return (
    <div className="signIn d-flex" >
        <div
          onClick={handleSignInWithGoogle}
          className="d-flex align-items-center justify-content-center"
        >
          <span className="fa fa-google">
            <i className="sr-only">Google</i>
          </span>
        </div>
        <div
          onClick={handleSignInWithFacebook}
          className="d-flex align-items-center justify-content-center"
        >
          <span className="fa fa-facebook">
            <i className="sr-only">Facebook</i>
          </span>
        </div>
      </div>
  );
}

export default SignInButtons;
