import useAxios from 'axios-hooks';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Partial/Loading';

function ActiveAccount() {
    let {name } = useParams();
    const navigate = useNavigate();
    const [{}, active] = useAxios(
        {
          url: `user/${name}`,
          method: "GET",
        },
        { manual: true }
      );
      async function checkActive(){
        await active().then((res) => {
            toast.success("Xác thực tài khoản thành công! Đăng nhập lại nhé");
            navigate("/login");
          });
      }
    useEffect(() => {
        
      checkActive();
    }, [])
    
 return(
    <div>
       <Loading />
    </div>
 )
}

export default ActiveAccount