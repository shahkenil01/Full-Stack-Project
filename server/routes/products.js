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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
        status: false
      });
    }

    if (product.images && product.images.length > 0) {
      for (const url of product.images) {
        const parts = url.split('/');
        const publicIdWithExtension = parts[parts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

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

    const existing = await Product.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    const newData = {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
    };

    let imageChanged = false;
    let newImages = existing.images;

    if (Array.isArray(req.body.images) && req.body.images.length > 0) {
      const newUrls = req.body.images;
      const oldUrls = existing.images;

      const areSame =
        newUrls.length === oldUrls.length &&
        newUrls.every((url, i) => url === oldUrls[i]);

      if (!areSame) {
        imageChanged = true;

        for (const url of oldUrls) {
          if (typeof url === 'string' && url.includes("res.cloudinary.com")) {
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            const publicId = lastPart.split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          }
        }

        const imagesToUpload = newUrls.map((image) => {
          return limit(() => cloudinary.uploader.upload(image));
        });

        const uploadStatus = await Promise.all(imagesToUpload);
        newImages = uploadStatus.map((item) => item.secure_url);
      }
    }

    const noTextChange = Object.entries(newData).every(
      ([key, val]) => existing[key] == val
    );

    if (!imageChanged && noTextChange) {
      return res.status(200).json({ message: "Nothing to update", status: false });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...newData,
        images: newImages
      },
      { new: true }
    );

    return res.status(200).json({ message: "Product updated", data: updatedProduct });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});



module.exports =router;