const Category = require('../models/category.js');
const { Product } = require('../models/products.js');
const express = require('express');
const router = express.Router();

const pLimit = require('p-limit').default;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get(`/`, async (req, res) => {
  const productList = await Product.find().populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.post(`/create`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(404).send("invalid Category!");
  }

  try {
    const limit = pLimit(2);

    if (!Array.isArray(req.body.images) || req.body.images.length === 0) {
      return res.status(400).json({ error: "No images provided", status: false });
    }

    const imagesToUpload = req.body.images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      });
    });

    const uploadStatus = await Promise.all(imagesToUpload);

    const imgurl = uploadStatus.map((item) => {
      return item.secure_url;
    });

    if (!uploadStatus) {
      return res.status(500).json({
        error: "images cannot upload!",
        status: false
      });
    }

    let product = new Product({
      name:req.body.name,
      description:req.body.description,
      images: imgurl,
      brand:req.body.brand,
      price:req.body.price,
      category:req.body.category,
      countInStock:req.body.countInStock,
      rating:req.body.rating,
      numReviews:req.body.numReviews,
      isFeatured:req.body.isFeatured
    });
    product = await product.save();

    if (!product) {
      return res.status(500).json({
        error: "Product save failed!",
        success: false
      });
    }

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);

      if (!product) {
          return res.status(404).json({ message: 'The product with the given ID was not found.' });
      }

      return res.status(200).send(product);
  } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
        status: false
      });
    }

    for (const url of product.images) {
      const parts = url.split('/');
      const publicIdWithExtension = parts[parts.length - 1];
      const publicId = publicIdWithExtension.split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({
      message: "The product and its images are deleted!",
      status: true
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const limit = pLimit(2);

    if (!Array.isArray(req.body.images) || req.body.images.length === 0) {
      return res.status(400).json({ error: "No images provided", status: false });
    }

    const imagesToUpload = req.body.images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      });
    });

    const uploadStatus = await Promise.all(imagesToUpload);

    const imgurl = uploadStatus.map((item) => {
      return item.secure_url;
    });

    if (!uploadStatus) {
      return res.status(500).json({
        error: "Images cannot be uploaded!",
        status: false
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        images: imgurl,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: 'The product cannot be updated!',
        status: false
      });
    }

    return res.status(200).json({
      message: 'The product is updated!',
      status: true
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
});



module.exports =router;