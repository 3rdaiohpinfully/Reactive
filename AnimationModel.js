const mongoose = require('mongoose');

const AnimationSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  audioUrl: { type: String, required: true },
  animationUrl: { type: String }
});

const AnimationModel = mongoose.model('Animation', AnimationSchema);

module.exports = AnimationModel;
