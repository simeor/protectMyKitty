import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import meow from "./cat-meow.mp3";
import { drawRect } from "../../utils.js";
import emailjs from "@emailjs/browser";
import { useParams } from "react-router-dom";
import { updateImageAndPublish } from "../../services/graphcms";
import style from "./styles.module.css";

const Capture = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const { detectionInterval } = useParams();
  const detectionIntervalParam = detectionInterval || 10000;
  const milliseconds = 1000;

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    const net = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, detectionIntervalParam);
  };

  const postIamge = async (imageTaken) => {
    const variables = { imageTaken };
    updateImageAndPublish(variables);
  };
  const handleDetect = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    let audio = new Audio(meow);
    audio.play();
    postIamge(`${imageSrc}`);
    emailjs.send(
      process.env.REACT_APP_EMAIL_ID,
      "template_xbf393l",
      {},
      process.env.REACT_APP_EMAIL_KEY
    );
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
        handleDetect();
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
      <div className={style.captureWrapper}>
        <div>
          <h2>Moniter mode</h2>
          <p>
            Video will be checked every {detectionIntervalParam / milliseconds}s
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <Webcam ref={webcamRef} muted={true} className={style.webcam} />

          <canvas ref={canvasRef} className={style.canvas} />
        </div>
      </div>
    </div>
  );
};

export default Capture;
