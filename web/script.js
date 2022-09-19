let video = document.getElementById("camera");

window.onload = () => {
  let constraints = {
    audio: false,
    video: {
      width: 1280,
      height: 720,
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
    })
    .catch((error) => {
      console.log(error.name + ": " + error.message);
    });
};

async function test() {
  let canvas = document.getElementById("canvas");
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let response = await fetch("http://192.168.0.19:51400/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageBase64: canvas.toDataURL().replace(/^data:\w+\/\w+;base64,/, ""),
    }),
  });
  data = await response.json();
  document.getElementById("message").innerHTML = JSON.stringify(data);
}
