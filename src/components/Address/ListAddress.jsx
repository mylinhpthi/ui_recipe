import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';

function ListAddress({id_category}) {
    const [dt, setDt] = useState([]);
    const [{ data, loading, error }] = useAxios(`Address`, {});
  
    const [{ data: category, loading: cLoading, error: cError }] = useAxios(`category`, {
    });
    const [cateItem, setCateItem] = useState(["1","Địa điểm siêu hot"]);
    
    useEffect(() => {
        setDt(data);
        console.log(cateItem)
    }, [cateItem])
    return (
        <div className="container">
            <div className="row justify-content-start ">
                <div className="col-lg-3 col-md-6 col-12  mt-4 ">
                    <h5>Danh mục địa điểm</h5>
                    <Divider />
                    <nav aria-label="main mailbox folders">
                        <List>
                            {category && category.map(({ danhmuc_ten,id_danhmuc, id }) => {
                                if(danhmuc_ten == cateItem[1]){
                                    return (
                                        <Link to="#" className="category-item category-item-active" key={id}>
                                        <ListItem disablePadding  onClick={()=>setCateItem([id_danhmuc, danhmuc_ten])}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <AcUnitOutlinedIcon color='primary' fontSize='small' />
                                                </ListItemIcon>
                                                <ListItemText primary={danhmuc_ten} />
                                            </ListItemButton>
                                        </ListItem></Link>
                                    )
                                }
                                else
                               return (
                                    <Link to="#" className="category-item" key={id}>
                                    <ListItem disablePadding   onClick={()=>setCateItem([id_danhmuc, danhmuc_ten])}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AcUnitOutlinedIcon color='primary' fontSize='small' />
                                            </ListItemIcon>
                                            <ListItemText primary={danhmuc_ten} />
                                        </ListItemButton>
                                    </ListItem></Link>
                               )
                            })}
                        </List>
                    </nav>

                </div>
                <div className="col-lg-9 col-md-6 col-12  list-address">
                    <section className="address section" id='diadiem'>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title">
                                        <h5>{cateItem && cateItem[1]}</h5>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    dt && dt.slice(0, 19).map(({ id_diadiem, diadiem_ten, danhgia, hinhanhs,danhmuc, index }) => {
                                        if(danhmuc&&danhmuc.id_danhmuc == cateItem[0]){
                                            return (
                                                <div>
                                                    <Link to={'/Address/' + id_diadiem}>
                                                        <div key={index} className="row single-address wow bounceInLeft ">
                                                            <div className="col-lg-4 col-md-2 col-xs-12  address-image wow bounceInLeft">
                                                                <img src={hinhanhs[0] && hinhanhs[0].hinhanh_url} alt="#" />
                                                            </div>
                                                            <div className="col-lg-6 col-md-8 col-xs-12  address-info">
                                                                <span className="category">Trong nước</span>
                                                                <h6 className="title">
                                                                    {diadiem_ten}
                                                                </h6>
                                                                {danhgia && danhgia.map(({ danhgia_sao, key }) => {
                                                                    return (<ul className="review" key={key}>{Array.from(Array(Number(danhgia_sao)), (e, i) => { return <li><i key={i} className="fa fa-star" aria-hidden="true"></i></li> })}{Array.from(Array(5 - Number(danhgia_sao)), (e, i) => { return <li><i key={i} className="fa fa-star-o" aria-hidden="true"></i></li> })}<li ><span>{danhgia_sao}.0 Review(s)</span></li></ul>)
                                                                })}
                                                                {!danhgia && (
                                                                    <ul className="review">
                                                                        <li>
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                        </li>
                                                                        <li ><span>5.0 Review(s)</span></li>
                                                                    </ul>
                                                                )}
    
    
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>);
                                        }
                                        
                                    })
                                }


                            </div>
                        </div>
                    </section >

                </div>
            </div>
        </div>
    )
}

export default ListAddress