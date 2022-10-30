let canvas = document.getElementById("canvas");
let emotionsTypeEnglish = [
  "anger",
  "disgust",
  "fear",
  "happiness",
  "sadness",
  "surprise",
];
let emotionsTypeJapanese = ["怒り", "嫌悪", "恐怖", "喜び", "悲しみ", "驚き"];
let maxEmotion = { emotion: null, value: 0 };

function DetectEmotions() {
  startButton = document.getElementById("start");
  startButton.innerHTML = "推論中...";
  startButton.disabled = true;
  setInterval(() => {
    canvas
      .getContext("2d")
      .drawImage(
        video,
        (video.width - canvas.width) / 2,
        (video.height - canvas.height) / 2,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    fetch("http://127.0.0.1/api", {
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
        if (data[emotionsTypeEnglish[0]] === "nan") {
          maxEmotion.emotion = "顔を中心にしてください";
        } else {
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
        }
        document.getElementById("message").innerHTML = maxEmotion.emotion;
      });
  }, 2000);
}
