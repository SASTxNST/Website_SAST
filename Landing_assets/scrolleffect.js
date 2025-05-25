import React, { useEffect } from 'react';
import {initializeAnimationsAndVideo} from './Landing';

const MyComponent = () => {
  useEffect(() => {
    initializeAnimationsAndVideo();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div>
      <div className="image-wrapper">
        <div className="image-rectangle">
          <img
            src="./assets/example-image.jpg"
            alt="Example"
            className="scroll-image"
          />
        </div>
      </div>

      <video id="myVideo" loop autoPlay muted playsInline>
        <source src="./assets/example-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <video id="hoverVideo" loop muted>
        <source src="./assets/example-hover-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MyComponent;
