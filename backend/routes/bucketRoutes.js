// routes/bucketRoutes.js
const express = require('express');
const BucketItem = require('../models/BucketItem');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { isChecked, date } = req.body;
    const update = { isChecked };

    if (req.file) {
      update.imageUrl = `/uploads/${req.file.filename}`;
      update.completedDate = date;
    }

    const updatedItem = await BucketItem.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item' });
  }
});

// Get all bucket items
router.get('/', async (req, res) => {
  try {
    const items = await BucketItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Add a new bucket item
router.post('/', async (req, res) => {
  try {
    const newItem = new BucketItem({ title: req.body.title });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding item' });
  }
});

// Update the 'isChecked' status
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await BucketItem.findByIdAndUpdate(
      req.params.id,
      { isChecked: req.body.isChecked },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item' });
  }
});

// Delete a bucket item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await BucketItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted', deletedItem });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

// Get a specific bucket item by ID
router.get('/bucket/:id', async (req, res) => {
  try {
    const bucketItem = await BucketItem.findById(req.params.id);
    if (!bucketItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(bucketItem);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item' });
  }
});



module.exports = router;
