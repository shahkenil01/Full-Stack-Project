import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Typography, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";

import { fetchDataFromApi, putData } from '../../utils/api';
import { useParams } from 'react-router-dom';

const CategoryEdit = () => {
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
      [e.target.name]: arr
    }));
  };

  const addCategory = (e) => {
    e.preventDefault();

    putData(`/api/category/${id}`, formFields).then((res) => {
      console.log("Category updated!", res);
    });
  };

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchDataFromApi(`/api/category/${id}`).then((res) => {
        if (res) {
          setFormFields({
            name: res.name,
            images: res.images,
            color: res.color
          });
        }
      });
    }
  }, [id]);

  return (
    <div className="right-content w-100 product-upload">
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center justify-content-between mb-4 breadcrumbCard">
        <h5 className="mb-0">Edit Category</h5>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/" underline="hover" color="inherit" className="breadcrumb-link">
            <IoMdHome />Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/category" underline="hover" color="inherit" className="breadcrumb-link">
            Category
          </MuiLink>
          <Typography className="breadcrumb-current" component="span" sx={{ padding: '6px 10px', borderRadius: '16px' }}>
            Edit Category
          </Typography>
        </Breadcrumbs>
      </div>

      <form className='form' onSubmit={addCategory}>
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4 mt-0">
              <div className="form-group">
                <h6>Category Name</h6>
                <input type="text" name="name" value={formFields.name} onChange={changeInput} />
              </div>
              <div className="form-group">
                <h6>Image Url</h6>
                <input type="text" name="images" value={formFields.images[0]} onChange={addImgUrl} />
              </div>
              <div className="form-group">
                <h6>Color</h6>
                <input type="text" name="color" value={formFields.color} onChange={changeInput} />
              </div>
              <Button type='submit' className='btn-blue btn-lg btn-big w-100'><FaCloudUploadAlt/> &nbsp; PUBLISH AND VIEW </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryEdit;
