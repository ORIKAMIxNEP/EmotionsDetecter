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

function startInference() {
  setInterval(() => {
    let canvas = document.getElementById("canvas");
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    fetch("http://192.168.0.19:51400/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: canvas.toDataURL().replace(/^data:\w+\/\w+;base64,/, ""),
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data["happiness"] > 0.2) {
          document.getElementById("message").innerHTML = "笑顔";
        } else {
          document.getElementById("message").innerHTML = "笑顔じゃない";
        }
      });
  }, 2000);
}
