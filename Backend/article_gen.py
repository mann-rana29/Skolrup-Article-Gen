import os,re, base64
from openai import OpenAI
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
from cloudinary import CloudinaryImage


load_dotenv()
gemini_private_key = os.getenv("GEMINI_API_KEY")
openrouter_private_key = os.getenv("OPENROUTER_API_KEY")

cloudinary.config(
  cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
  api_key=os.getenv("CLOUDINARY_API_KEY"),
  api_secret=os.getenv("CLOUDINARY_API_SECRET"),
  secure=True
)

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=openrouter_private_key,
)

client2 = genai.Client(api_key=gemini_private_key)


def deepseek(text):
  completion = client.chat.completions.create(
      model="deepseek/deepseek-r1:free",
      messages=[
          {
            "role" : "system",
            "content" : "You are a article generator . You have to generatea a article on the given topic of about 500 to 700 words. You should only use english "
          },
          {
            "role" : "user",
            "content" : text
          }  
      ],
      temperature=0.5,
      max_tokens=1500,
      stream=False
  )
  return completion.choices[0].message.content

def chatgpt(text):
  completion = client.chat.completions.create(
    model="openai/gpt-4.1-nano",
    messages=[
        {
          "role":"system",
          "content" : "You are a article generator . You have to generatea a article on the given topic of about 500 to 700 words. You should only use english "
        },
        {
          "role" : "user",
          "content" : text
        }
    ],
    temperature= 0.5,
    max_tokens=1000,
    stream= False  
  )
  return completion.choices[0].message.content

def generatePrompt(query):
  completion = client.chat.completions.create(
    model= "openai/gpt-4o-mini",
    messages=[
      {
        "role" :"system", 
        "content":"You are a prompt generator. You have to create a suitable prompt to tell the ai model to generate a article on the query or text given by the user. The prompt limit is around 15 to 20 words only. The output should always be a well formed instruction"
      },
      {
        "role" :"user",
        "content": query
      }
    ],
    temperature=0.5,
    max_tokens=100,
    stream = False
  )
  return completion.choices[0].message.content

def clean_text(text):
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)  # remove non-ASCII
    text = re.sub(r'\s+', ' ', text).strip()    # collapse whitespace
    return text

def generateArticle(text1,text2):
  text1 = clean_text(text1)
  text2 = clean_text(text2)
  completion = client.chat.completions.create(
    model="openai/gpt-4.1-nano",
    messages=[
      {
        "role" :"system",
        "content": "You are an advanced Article Generator. Create a single, high-quality, unified article by combining the two articles provided. Extract only the most valuable insights and express them clearly and professionally. The final article should be between 1200–1300 words, formally written in English, and well-structured with HTML formatting. Use proper tags such as <h1>, <h2>, <p>, <ul>, <ol>, and <blockquote> to organize the content cleanly. Avoid gibberish, broken formatting, inline CSS, and any mention of original sources. Return only valid HTML content."
      },
      {
        "role" : "user",
        "content": f"First Article : \n{text1} \nSecond Article :\n{text2}"
      }
    ],
    temperature=0.5,
    max_tokens=1800,
    stream=False
  )
  return completion.choices[0].message.content.encode('ascii', 'ignore').decode()

def generateImage(text):
  response = client2.models.generate_content(
    model= "gemini-2.0-flash-preview-image-generation",
    contents=f"Can you create a visually appealing image of 930 x 500  size for a article banner on this topic : {text}",
    config=types.GenerateContentConfig(
      response_modalities=['TEXT', 'IMAGE']
    )
  )

  for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
      image_data = part.inline_data.data
      break
      
  if image_data is None:
    return None
  file_name = text.strip()

  upload_result = cloudinary.uploader.upload(
    image_data,
    public_id = f"article_banners/{file_name}",
    folder = "article_banners",
    resource_type = "image",
    format = "png",
    transformation =[
      {"width": 930, "height": 500}
    ]
  )
    
    
  return upload_result["secure_url"]
      

# prompt = generatePrompt("Gonzalo Garcia")
# print(prompt)

# article1 = deepseek(prompt)
# print("------------------------------------------------------")
# article2 =chatgpt(prompt)

# print(generateArticle(article1,article2))

# print(generateImage(prompt))

