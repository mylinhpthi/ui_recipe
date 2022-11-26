import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import useAxios from "axios-hooks";
import UploadImages from "D:/HK1 - 2022 - 2023/Java/Project/ui_recipe/src/components/Partial/UploadImages";
import Sidebar from "D:/HK1 - 2022 - 2023/Java/Project/ui_recipe/src/components/AdminHome/components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
function UserPrivilege() {
  let { id } = useParams();
  const notify = () => toast("");
  const [{ data, loading, error }] = useAxios(`user/detail/` + id, {});
  const [{ data: privilege, loading: PLoading, error: PError }] = useAxios(
    `privileges/list`,
    {}
  );
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();
  const [{}, addPrivileges] = useAxios(
    {
      url: `/privileges/add/${id}`,
      method: "POST",
    },
    { manual: true }
  );
  async function add() {
    let item = [];
    for (let i = 0; i < checked.length; i++) {
      let id = checked[i];
      for (let i = 0; i < privilege.length; i++) {
       if(id == privilege[i].id){
          item.push(privilege[i]);
       }
      }
    }
    console.log(item);
    await addPrivileges({ data: item }).then((res) => {
      toast.success("Phân quyền thành công!");
    });
    navigate("/admin/user/");
  }
  const hasData = data != null && privilege != null;
  const handleCheck = (event) => {
    console.log(checked)
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  // const checkedItems = checked.length
  //   ? checked.reduce((total, item) => {
  //       return total + ", " + item;
  //     })
  //   : "";

  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";
  const hasId = (arr, id) => arr.some(el => el.id === id);
  return (
    <div>
      {privilege && (
        <div className="list">
          <Sidebar active="User" />
          <div className="listContainer">
            <Navbar />
            <section className="mt-2">
              <div className="container ">
                <div className="row d-flex justify-content-center  ">
                  <div className="col col-xl-10">
                    <div className="card p-4">
                      <div className="g-0">
                        <div className="card-body pt-1 text-black">
                          <div>
                            <div
                              className="card align-left"
                              style={{
                                width: "50vw",
                                margin: "auto",
                                padding: "1rem 5px",
                              }}
                            >
                              <h4
                                style={{ fontSize: "1.3rem" }}
                                className="card-title text-center mb-3"
                              >
                                THÔNG TIN TÀI KHOẢN
                              </h4>
                              <p className="text-center">
                                Email: {data && data.email}
                              </p>
                              <p className="text-center">
                                Tên đăng nhập: {data && data.username}
                              </p>

                              <p className="text-center">
                                Trạng thái: {data && data.status}
                              </p>
                            </div>
                            <div
                              className="card mt-3"
                              style={{
                                width: "50vw",
                                margin: "auto",
                                padding: "1rem 5px",
                              }}
                            >
                              <div className="checkList">
                              <h4
                                style={{ fontSize: "1.3rem" }}
                                className="card-title text-center mb-3"
                              >
                                DANH SÁCH PHÂN QUYỀN
                              </h4>
                              <p>Bắt đầu phân quyền cho người dùng {data && data.username}</p>
                                <div className="list-container">
                                  {privilege && data &&
                                    privilege.map((item, index) => (
                                     
                                        <div key={index} >
                                        <input
                                          value={item.id}
                                          type="checkbox"
                                          onChange={handleCheck}
                                          className="mx-2 mb-3"
                                        />
                                        <span className={isChecked(item.id)}>
                                          {item.name}
                                        </span>
                                      </div>)
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-1 mb-2 d-flex justify-content-end px-5">
                          <Button
                            onClick={add}
                            className="btn-confirm"
                            variant="contained"
                            type="submit"
                          >
                            Xác nhận{" "}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* {!!imageRequest &&
        imageRequest.map((link, key) => <img src={link} alt="AAAA" key={key} />)} */}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPrivilege;
