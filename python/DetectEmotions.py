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
    try:
        EmotionsData = detector.detect_image(
            "image.jpg", batch_size=10).emotions.to_dict("dict")
        print("実行時間：" + str(time.time() - startTime))
    except:
        EmotionsData = {"anger": "nan", "disgust": "nan", "fear": "nan",
                        "happiness": "nan", "sadness": "nan", "surprise": "nan", "neutral": "nan"}
    return EmotionsData
