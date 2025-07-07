from openai import OpenAI
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import re

API_KEY = "AIzaSyD_osl-7-KJJTIdQBuVZ2VQezD36ZbyA7c"

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="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",
)
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
    max_tokens=1500,
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
    max_tokens=500,
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
    model="openai/gpt-4o",
    messages=[
      {
        "role" :"system",
        "content": "You are an advanced Article Generator. Create a high-quality, unified article from the two articles provided. "
                    "Only extract the best ideas and express them clearly and professionally. The article must be 500–700 words, "
                    "well-structured, and formally written in English. Do not include any gibberish, broken formatting, or mention of the original sources."
      },
      {
        "role" : "user",
        "content": f"First Article : \n{text1} \nSecond Article :\n{text2}"
      }
    ],
    temperature=0.5,
    max_tokens=1500,
    stream=False
  )
  return completion.choices[0].message.content


client2 = genai.Client(api_key=API_KEY)
def generateImage(text):
  response = client2.models.generate_content(
    model= "gemini-2.0-flash-preview-image-generation",
    contents=f"Can you create a visually appealing image of landscape size for a article banner on this topic : {text}",
    config=types.GenerateContentConfig(
      response_modalities=['TEXT', 'IMAGE']
    )
  )

  for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
      image = Image.open(BytesIO((part.inline_data.data)))
      image.save('AI/article_banner.png')
      image.show()

prompt = generatePrompt("why real madrid owns barcelona")
print(prompt)

article1 = deepseek(prompt)
# print("------------------------------------------------------")
article2 =chatgpt(prompt)

print(generateArticle(article1,article2).encode('ascii', 'ignore').decode())

generateImage(prompt)