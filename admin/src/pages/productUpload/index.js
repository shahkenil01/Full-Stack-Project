import React, { useState } from 'react';
import { Breadcrumbs, Typography, Link as MuiLink, Button, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import FormControl from '@mui/material/FormControl';
import CustomDropdown from '../../components/CustomDropdown';
import { FaCloudUploadAlt } from "react-icons/fa";

import { IoCloseSharp } from 'react-icons/io5';
import { FaRegImage } from 'react-icons/fa';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductUpload =()=>{

  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [isFeatured, setIsFeatured] = useState('');
  const [ram, setRam] = useState(''); 
  const [weight, setWeight] = useState(''); 
  const [size, setSize] = useState(''); 
  
  const [value, setValue] = useState(0);

  return(
    <div className="right-content w-100 product-upload">

      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center justify-content-between mb-4 breadcrumbCard">
        <h5 className="mb-0">Product Upload</h5>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/" underline="hover" color="inherit" className="breadcrumb-link">
            <IoMdHome />Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/products" underline="hover" color="inherit" className="breadcrumb-link">
            Products
          </MuiLink>
          <Typography className="breadcrumb-current" component="span" sx={{ padding: '6px 10px', borderRadius: '16px' }}>
            Product Upload
          </Typography>
        </Breadcrumbs>
      </div>
      
      <form className='form'>

        <div className="row">
          <div className="col-md-12">
            <div className="card p-4 mt-0">
              <h5 className="mb-4">Basic Information</h5>
              <div className="form-group">
                <h6>PRODUCT NAME</h6>
                <input type="text" name="name" />
              </div>
              <div class="form-group">
                <h6>DESCRIPTION</h6>
                <textarea rows="5" cols="10"></textarea>
              </div>
              <div className="row">
                <div className="col">
                  <div className='form-group'>
                    <h6>CATEGORY</h6>
                    <FormControl size="small" className="w-100">
                      <CustomDropdown value={category} onChange={setCategory}
                        options={[
                          { value: '', label: 'None' },
                          { value: '10', label: 'Men' },
                          { value: '20', label: 'Women' },
                          { value: '30', label: 'Kids' }
                        ]} placeholder="None" />
                    </FormControl>
                  </div>
                </div>
                <div className="col">
                  <div className='form-group'>
                    <h6>SUB CATEGORY</h6>
                    <FormControl size="small" className="w-100">
                      <CustomDropdown value={subcategory} onChange={setSubcategory}
                        options={[
                          { value: '', label: 'None' },
                          { value: '10', label: 'Jeans' },
                          { value: '20', label: 'Shirts' }
                        ]} placeholder="None" />
                    </FormControl>
                  </div>
                </div>
                <div className="col">
                  <div className='form-group'>
                    <h6>PRICE</h6>
                    <input type="text" name="price"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="col">
                  <div class="form-group">
                    <h6>OLD PRICE</h6>
                    <input type="text" name="oldPrice"/>
                  </div>
                </div>
                <div className="col">
                  <div className='form-group'>
                    <h6>IS FEATURED</h6>
                    <FormControl size="small" className="w-100">
                      <CustomDropdown value={isFeatured} onChange={setIsFeatured}
                        options={[
                          { value: '', label: 'None' },
                          { value: '10', label: 'True' },
                          { value: '20', label: 'False' }
                        ]} placeholder="None" menuPortalTarget={document.body}/>
                    </FormControl>
                  </div>
                </div>
                <div className="col">
                  <div className='form-group'>
                    <h6>PRODUCT STOCK</h6>
                    <input type="text" name="price"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="col">
                  <div class="form-group">
                    <h6>BRAND</h6>
                    <input type="text" name="brand"/>
                  </div>
                </div>
                <div className="col">
                  <div className='form-group'>
                    <h6>DISCOUNT</h6>
                    <input type="text" name="discount"/>
                  </div>
                </div>
                <div className="col">
                  <div className='form-group'>
                    <h6>PRODUCT RAMS</h6>
                    <FormControl size="small" className="w-100">
                      <CustomDropdown value={ram} onChange={setRam}
                        options={[
                          { value: '', label: 'None' },
                          { value: '10', label: '4GB' },
                          { value: '20', label: '8GB' },
                          { value: '30', label: '10GB' },
                          { value: '40', label: '12GB' },
                        ]} placeholder="None" menuPortalTarget={document.body}/>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div class="row">
                <div className="col">
                  <div className='form-group'>
                    <h6>PRODUCT WEIGHT</h6>
                    <FormControl size="small" className="w-100">
                      <CustomDropdown value={weight} onChange={setWeight}
                        options={[
                          { value: '', label: 'None' },
                          { value: '10', label: '15KG' },
                          { value: '20', label: '5KG' },
                        ]} placeholder="None" menuPortalTarget={document.body}/>
                    </FormControl>
                  </div>
                </div>
                <div className="col">
                  <div className='form-group'>
                    <h6>PRODUCT SIZE</h6>
                    <FormControl size="small" className="w-100">
                      <CustomDropdown value={size} onChange={setSize}
                        options={[
                          { value: '', label: 'None' },
                          { value: '10', label: 'S' },
                          { value: '20', label: 'M' },
                          { value: '30', label: 'L' },
                          { value: '40', label: 'XL' },
                          { value: '50', label: 'XXL' },
                          { value: '60', label: 'XXXL' }
                        ]} placeholder="None" menuPortalTarget={document.body}/>
                    </FormControl>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <h6>RATINGS</h6>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='card p-4 mt-0'>
          <div className='imagesUploadSec'>
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
              <Button className='btn-blue btn-lg btn-big w-100'><FaCloudUploadAlt/> &nbsp; PUBLISH AND VIEW </Button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default ProductUpload;