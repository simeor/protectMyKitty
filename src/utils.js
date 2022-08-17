export const drawRect = (detections, ctx) => {
  // Loop through each prediction
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction["bbox"];
    const text = `${prediction["class"]} - detected`;

    if (prediction["class"] !== "cat" && prediction["class"] !== "person") {
      return;
    }

    // Set styling
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = "#" + color;
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = "#" + color;
    ctx.fillText(text, x + 30, y + 30);
    ctx.rect(x, y, width - 20, height - 20);
    ctx.stroke();
  });
};
