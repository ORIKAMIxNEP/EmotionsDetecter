import time

from feat import Detector

detector = Detector(
    au_model="JAANET",
    emotion_model="fer",
    face_model="FaceBoxes",
    landmark_model="PFLD"
)


def DetectEmotions():
    startTime = time.time()
    EmotionsData = detector.detect_image(
        "image.png", batch_size=100).emotions.to_dict("dict")
    print("実行時間：" + str(time.time() - startTime))
    return EmotionsData
