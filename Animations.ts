import React, { useEffect, useState } from "react";
import { getAudioData, createFlipbookAnimation } from "../utils/animationUtils";

const Animation = ({ imageUrl, audioUrl }) => {
  const [animationFrames, setAnimationFrames] = useState<string[] | null>(null);

  useEffect(() => {
    const generateAnimation = async () => {
      const audioData = await getAudioData(audioUrl);
      const animationResult = await createFlipbookAnimation(imageUrl, audioData);
      setAnimationFrames(animationResult);
    };

    generateAnimation();
  }, [imageUrl, audioUrl]);

  return (
    <div>
      {animationFrames ? (
        <div>
          {animationFrames.map((frame, index) => (
            <img key={index} src={frame} alt={`Frame ${index}`} />
          ))}
        </div>
      ) : (
        <p>Generating animation...</p>
      )}
    </div>
  );
};

export default Animation;
