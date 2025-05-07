const Category = require('../models/category');
const express = require('express');
const router = express.Router();

const pLimit = require('p-limit').default;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/create', async (req, res) => {
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
    return item.secure_url
  })

  if (!uploadStatus) {
    return res.status(500).json({
    error: "images cannot upload!",
    status: false
    });
  }

  let category = new Category({
    name: req.body.name,
    images: imgurl,
    color: req.body.color
  });

  if (!category) {
    return res.status(500).json({
      error: err,
      success: false
    });
  }

  category = await category.save();

  res.status(201).json(category);

  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: error.message, success: false });
  }
});

router.get('/', async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false })
  }
  
  res.send(categoryList);
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'The category with the given ID was not found.' });
    }

    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found!',
        success: false
      });
    }

    if (category.images && category.images.length > 0) {
      for (const img of category.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    await Category.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Category and images deleted!'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong.',
      error: error.message
    });
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

    const imgurl = uploadStatus.map((item) => item.secure_url);

    if (imgurl.length === 0) {
      return res.status(500).json({
        error: "Images cannot be uploaded!",
        status: false
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name:req.body.name,
        icon: req.body.icon,
        color: req.body.color
      },
      { new: true }
    );

    if (!category) {
      return res.status(500).json({
        message: 'Category cannot be updated!',
        success: false
      });
    }

    res.send(category);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong.',
      error: error.message
    });
  }
});


module.exports = router;
