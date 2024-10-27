const mongoose = require('mongoose');

const bucketItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isChecked: { type: Boolean, default: false },
  imageUrl: { type: String }, // Store the image path
  completedDate: { type: String }, // Store the date string
});

module.exports = mongoose.model('BucketItem', bucketItemSchema);
