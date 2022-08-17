import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../utils.js";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Demo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    const net = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 1500);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Detections
      const obj = await net.detect(video);

      if (
        obj.some(
          (item) =>
            item.class === "person" ||
            (obj.some((item) => item.class === "cat") && item.score > 0.5)
        )
      ) {
      }

      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div style={{ margin: "0 100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <h2>Demo mode</h2>
          <p>1. Allow webcam access and wait for video to load</p>
          <p>2. Use the live feed to position the webcam</p>
          <p>3. Start the moniter</p>
          {!isLoading && <Link to="/monitor/10000">Start</Link>}
        </div>

        <div style={{ position: "relative" }}>
          {isLoading && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader />
            </div>
          )}

          <Webcam
            onUserMedia={() => setIsLoading(false)}
            onUserMediaError={() => alert("Error getting video")}
            ref={webcamRef}
            muted={true}
            style={{
              left: 0,
              right: 0,
              zindex: 5,
              top: 0,
              textAlign: "center",
              width: 550,
              height: !isLoading ? 480 : 0,
              opacity: 0.8,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              textAlign: "center",
              zindex: 8,
              width: 550,
              height: 480,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
