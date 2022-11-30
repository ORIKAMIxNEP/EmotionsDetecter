import base64

import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.templating import Jinja2Templates

from python.DetectEmotions import DetectEmotions
from python.FormatDictionary import FormatDictionary

app = FastAPI()
app.mount(
    "/templates/static",
    StaticFiles(directory="templates/static"),
    name="static"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
templates = Jinja2Templates(directory="templates")


class Image(BaseModel):
    imageBase64: str


@ app.get("/")
def IndexHTML(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@ app.post("/api")
async def API(image: Image):
    with open("image.png", "wb") as file:
        file.write(base64.b64decode(image.imageBase64))
    return JSONResponse(content=FormatDictionary(DetectEmotions()))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
