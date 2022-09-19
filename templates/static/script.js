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

let canvas = document.getElementById("canvas");
let emotionsTypeEnglish = [
  "anger",
  "disgust",
  "fear",
  "happiness",
  "sadness",
  "surprise",
];
let emotionsTypeJapanese = ["怒り", "嫌悪", "恐怖", "笑顔", "悲しみ", "驚き"];
let maxEmotion = { emotion: null, value: 0 };

function startInference() {
  setInterval(() => {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    fetch("http://192.168.0.19/api", {
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
        maxEmotion.value = 0;
        for (let i = 0; i < emotionsTypeEnglish.length; i++) {
          if (data[emotionsTypeEnglish[i]] > maxEmotion.value) {
            maxEmotion.emotion = emotionsTypeJapanese[i];
            maxEmotion.value = data[emotionsTypeEnglish[i]];
          }
        }
        if (data.neutral - 0.4 > maxEmotion.value) {
          maxEmotion.emotion = "真顔";
        }
        document.getElementById("message").innerHTML = maxEmotion.emotion;
      });
  }, 2000);
}
