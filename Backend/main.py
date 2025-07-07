from article_gen import chatgpt, deepseek,generatePrompt,generateArticle,generateImage
from fastapi import FastAPI , Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins =["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
def root():
    return {"message" : "Welcome to the Skolrup Article Gen"}

@app.get("/generate")
def generate(query : str = Query(..., description="The topic to write about")):
    try:
        prompt = generatePrompt(query)
        art1 = deepseek(prompt)
        art2 = chatgpt(prompt)
        final_art = generateArticle(art1,art2)
        # image_path = generateImage(prompt)

        return{
            "prompt" : prompt,
            "article" : final_art,
            # "image_url" : image_path
        }
    except Exception as e:
        return {"error": str(e)}

