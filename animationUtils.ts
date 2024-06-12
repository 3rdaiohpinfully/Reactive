import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import * as Tone from "tone";

export const getAudioData = async (audioUrl: string) => {
  const response = await axios.get(audioUrl, { responseType: "arraybuffer" });
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(response.data);
  const channelData = audioBuffer.getChannelData(0);
  return channelData;
};

export const createFlipbookAnimation = async (imageUrl: string, audioData: Float32Array) => {
  // Load the input image
  const img = new Image();
  img.src = imageUrl;
  await img.decode();

  const inputTensor = tf.browser.fromPixels(img);

  // Perform audio analysis using Tone.js
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(audioData.buffer);
  const waveform = new Tone.Waveform();
  const player = new Tone.Player(audioBuffer).connect(waveform).toDestination();
  player.start();

  // Generate flipbook animation frames
  const animationFrames = [];
  for (let i = 0; i < waveform.size; i += 1024) {
    const modifiedFrame = inputTensor.add(tf.scalar(waveform.getValue(i) * 50)).clipByValue(0, 255);
    animationFrames.push(modifiedFrame);
  }

  // Convert animation frames to data URLs
  const animationDataUrls = await Promise.all(animationFrames.map(async frame => {
    const canvas = document.createElement('canvas');
    await tf.browser.toPixels(frame, canvas);
    return canvas.toDataURL();
  }));

  return animationDataUrls;
};
