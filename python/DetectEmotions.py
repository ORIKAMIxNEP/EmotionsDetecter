import time

from feat import Detector
from PIL import Image

detector = Detector(
    au_model="xgb",
    emotion_model="resmasknet",
    face_model="FaceBoxes",
    landmark_model="PFLD"
)


def DetectEmotions():
    startTime = time.time()
    image = Image.open("image.jpg").convert("RGB")
    image.save("image.jpg")
    EmotionsData = detector.detect_image(
        "image.jpg", batch_size=10).emotions.to_dict("dict")
    print("実行時間：" + str(time.time() - startTime))
    return EmotionsData
