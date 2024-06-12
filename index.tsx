import React, { useState } from "react";
import Upload from "../components/Upload";
import Animation from "../components/Animation";

const Home = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  return (
    <main>
      <Upload onUploadComplete={(image, audio) => {
        setImageUrl(image);
        setAudioUrl(audio);
      }} />
      {imageUrl && audioUrl && <Animation imageUrl={imageUrl} audioUrl={audioUrl} />}
    </main>
  );
};

export default Home;
