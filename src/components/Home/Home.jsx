import React from "react";
import Video from "./video.gif";
import Navbar from "../Navbar/Navbar";
import style from "./styles.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: 8 }}>
      <Navbar />
      <div style={{ padding: "4px 18px" }}>
        <section className={style.mainSectionWrapper}>
          <div style={{ textAlign: "center", maxWidth: 600 }}>
            <h1>Use your webcam to monitor your cats or home</h1>
            <h3 style={{ fontFamily: "Roboto" }}>
              We use AI to track want you want to monitor, choose to keep an eye
              on what your kitty's are up to, or watch out for naughty humans
              looking to steal your yarn
            </h3>
            <Link to="/demo">
              <div
                style={{
                  margin: "0 auto",
                  textDecoration: "none",
                  backgroundColor: "orange",
                  padding: "2px",
                  maxWidth: 200,
                  fontFamily: "Roboto",
                  borderRadius: 6,
                }}
              >
                <p>TRY NOW</p>
              </div>
            </Link>
          </div>

          <div style={{ maxWidth: 500 }}>
            <img src={Video} alt="main-banner" width={"100%"} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
