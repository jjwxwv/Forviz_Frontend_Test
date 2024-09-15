"use strict";

(async function () {
  const url = "https://picsum.photos/v2/list";
  const res = await fetch(url);
  const data = await res.json();
  const container = document.getElementById("image-container");
  console.log(data);
  data.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.download_url;
    container.appendChild(img);
  });
})();
