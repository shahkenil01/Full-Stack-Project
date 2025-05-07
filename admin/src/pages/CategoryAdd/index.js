import React, { useState } from 'react';
import { Breadcrumbs, Typography, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";

import { IoCloseSharp } from 'react-icons/io5';
import { FaRegImage } from 'react-icons/fa';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { postData } from '../../utils/api';

import Toast from "../../components/Toast";

const CategoryAdd =()=>{

  const [toast, setToast] = useState(null);

  const [formFields, setFormFields] = useState({
    name: '',
    images: [],
    color: ''
  });

  const changeInput = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addImgUrl = (e) => {
    const arr = [];
    arr.push(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      images: arr
    }));
  };

  const addCategory = async (e) => {
    e.preventDefault();

    const res = await postData('/api/category/create', formFields);

    if (res?.success) {
      setToast({ type: "success", message: "Category created successfully!" });
      setFormFields({ name: '', images: [], color: '' });
    } else {
      setToast({ type: "error", message: res?.message || "Failed to create category." });
    }
    console.log("Post response:", res);
  };

  return(
    <div className="right-content w-100 product-upload">

    {toast && ( <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)}/>)}

      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center justify-content-between mb-4 breadcrumbCard">
        <h5 className="mb-0">Add Category</h5>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/" underline="hover" color="inherit" className="breadcrumb-link">
            <IoMdHome />Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/category" underline="hover" color="inherit" className="breadcrumb-link">
            Category
          </MuiLink>
          <Typography className="breadcrumb-current" component="span" sx={{ padding: '6px 10px', borderRadius: '16px' }}>
            Add Category
          </Typography>
        </Breadcrumbs>
      </div>
      
      <form className='form' onSubmit={addCategory}>

        <div className="row">
          <div className="col-md-12">
            <div className="card p-4 mt-0">
              <div className="form-group">
                <h6>Category Name</h6>
                <input type="text" name="name" onChange={changeInput}/>
              </div>
              <div className="form-group">
                <h6>Image Url</h6>
                <input type="text" name="images" onChange={addImgUrl}/>
              </div>
              <div className="form-group">
                <h6>Color</h6>
                <input type="text" name="color" onChange={changeInput}/>
              </div>
              <Button type='submit' className='btn-blue btn-lg btn-big w-100'><FaCloudUploadAlt/> &nbsp; PUBLISH AND VIEW </Button>

              {/**<div className='imagesUploadSec'>
                <h5 class="mb-4">Media And Published</h5>
                <div className="imgUploadBox d-flex align-items-center">
                  <div className="uploadBox">
                    <span className="remove">
                      <IoCloseSharp/>
                    </span>
                    <div className="box">
                      <span
                        className="lazy-load-image-background blur lazy-load-image-loaded"
                        style={{ color: 'transparent', display: 'inline-block' }}>
                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp" alt="Product" className="w-100"/>
                      </span>
                    </div>
                  </div>
                  <div className="uploadBox">
                    <input type="file" multiple name="images" />
                    <div className="info">
                      <FaRegImage/>
                      <h5>image upload</h5>
                    </div>
                  </div>
                </div>
                <br/>
                  <Button type='submit' className='btn-blue btn-lg btn-big w-100'><FaCloudUploadAlt/> &nbsp; PUBLISH AND VIEW </Button>
              </div>**/}

            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default CategoryAdd;