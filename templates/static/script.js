let video = document.getElementById("camera");

navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: {
      width: 1280,
      height: 720,
    },
  })
  .then((stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  })
  .catch((error) => {
    console.log(error.name + ": " + error.message);
  });
