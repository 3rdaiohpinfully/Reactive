const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const { storage } = require('../config/firebase');
const AnimationModel = require('../models/AnimationModel');

const uploadFile = async (req, res) => {
  try {
    const imageFile = req.files.image[0];
    const audioFile = req.files.audio[0];

    const imageRef = ref(storage, `images/${imageFile.originalname}`);
    const audioRef = ref(storage, `audio/${audioFile.originalname}`);

    const imageUploadTask = uploadBytesResumable(imageRef, imageFile.buffer);
    const audioUploadTask = uploadBytesResumable(audioRef, audioFile.buffer);

    const [imageURL, audioURL] = await Promise.all([
      new Promise((resolve, reject) => {
        imageUploadTask.on(
          'state_changed',
          null,
          reject,
          async () => {
            const imageURL = await getDownloadURL(imageUploadTask.snapshot.ref);
            resolve(imageURL);
          }
        );
      }),
      new Promise((resolve, reject) => {
        audioUploadTask.on(
          'state_changed',
          null,
          reject,
          async () => {
            const audioURL = await getDownloadURL(audioUploadTask.snapshot.ref);
            resolve(audioURL);
          }
        );
      })
    ]);

    const newAnimation = new AnimationModel({ imageUrl: imageURL, audioUrl: audioURL });
    await newAnimation.save();
    res.status(200).json(newAnimation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadFile };
