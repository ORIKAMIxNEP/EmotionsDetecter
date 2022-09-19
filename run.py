from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import uvicorn
import base64
from python.DetectEmotions import DetectEmotions
from python.FormatDictionary import FormatDictionary

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class Image(BaseModel):
    imageBase64: str


@app.post("/")
async def API(image: Image):
    with open("image.png", "wb") as file:
        file.write(base64.b64decode(image.imageBase64))
    return JSONResponse(content=FormatDictionary(DetectEmotions()))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=51400)
