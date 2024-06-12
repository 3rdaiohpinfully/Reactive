"use client";

import React, { useState } from "react";
import axios from "axios";

const Upload = ({ onUploadComplete }) => {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleUpload = async () => {
    if (!image || !audio) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("audio", audio);

    const response = await axios.post("http://localhost:8080/api/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      },
    });

    const { imageUrl, audioUrl } = response.data;
    onUploadComplete(imageUrl, audioUrl);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
      <input type="file" onChange={(e) => setAudio(e.target.files ? e.target.files[0] : null)} />
      <button onClick={handleUpload}>Upload Files</button>
      {progress > 0 && <p>Upload Progress: {progress}%</p>}
    </div>
  );
};

export default Upload;
