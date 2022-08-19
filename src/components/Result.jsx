import React, { useEffect, useState } from "react";
import { getImageUrl } from "../services/graphcms";
import Loader from "../components/Loader/Loader";

const Result = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    getImageUrl().then((data) => {
      setImageUrl(data.detection.imageString);
      setUpdatedAt(data.detection.updatedAt);
    });
  }, []);

  if (!updatedAt) {
    return <Loader />;
  }

  return (
    <div>
      <h3>{updatedAt ? `${new Date(updatedAt)}` : ""}</h3>
      <img
        alt="results"
        src={imageUrl}
        width={600}
        height={500}
        className="cover"
      />
    </div>
  );
};

export default Result;
