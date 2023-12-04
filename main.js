const container = selectElementById("container");

const gridLayoutSelect = selectElementById("gridLayout");
const imageExtensionSelect = selectElementById("imageExtension");

let size = 8;
let extension = "png";
const color = selectElementById("colorInput");
const resetBtn = selectElementById("resetBtn");
const downloadBtn = selectElementById("downloadBtn");

let draw = false;
let pixels = [];

function populate(size) {
  container.style.setProperty("--size", size);
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("pixel");
    pixels[i] = div;

    div.addEventListener("mouseover", function () {
      if (!draw) return;
      div.style.backgroundColor = color.value;
      div.style.borderColor = color.value;
    });
    div.addEventListener("mousedown", function () {
      div.style.backgroundColor = color.value;
      div.style.borderColor = color.value;
    });

    container.appendChild(div);
  }
}

window.addEventListener("mousedown", function () {
  draw = true;
});
window.addEventListener("mouseup", function () {
  draw = false;
});

function reset() {
  container.innerHTML = "";
  populate(size);
}

downloadBtn.addEventListener("click", downloadImage);

gridLayoutSelect.addEventListener("change", function (event) {
  console.log(event.target.value);
  size = parseInt(event.target.value);
  reset();
});

imageExtensionSelect.addEventListener("change", function (event) {
  extension = event.target.value;
});

resetBtn.addEventListener("click", reset);

function downloadImage() {
  draw = true;
  domtoimage
    .toPng(container)
    .then(function (dataUrl) {
      downloadDataUrl(dataUrl, "." + extension);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

function downloadDataUrl(dataUrl, extension) {
  const link = document.createElement("a");
  link.download = new Date().getTime() + extension;
  link.href = dataUrl;
  link.click();
}

function selectElementById(id) {
  return document.getElementById(id);
}

populate(size);
