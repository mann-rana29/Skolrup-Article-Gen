from article_gen import chatgpt, deepseek,generatePrompt,generateArticle,generateImage
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins =["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

class ArticleRequest(BaseModel):
    query: str

@app.get("/")
def root():
    return {"message" : "Welcome to the Skolrup Article Gen"}

@app.post("/generate-article")
def generate(req : ArticleRequest):
    try:
        prompt = generatePrompt(req.query)
        art1 = deepseek(prompt)
        art2 = chatgpt(prompt)
        final_art = generateArticle(art1,art2)
        # image_base64 = generateImage(prompt)

        return{
            "article" : final_art,
            # "image" : f"data:image/png;base64,{image_base64}" if image_base64 else None
        }
    except Exception as e:
        return {"error": str(e)}

