from fastapi import FastAPI,HTTPException
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from db import models, schemas
import json

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/split/")
async def split_file(item: schemas.MDFile):
    """
    Split a given MDFile into header, footer, and story, and return the structured story.
    
    Parameters:
    - item: MDFile - the MDFile object to be split
    
    Returns:
    - dict: a dictionary containing the header, footer, and story of the MDFile
    """
    story = { "header":"", "footer":"","story":[]}
    s=[]

    # lines =[item.md]
    lines = item.md.splitlines()
    for line in lines:
        if line.startswith("#"):
            story["header"]= line
        elif line.startswith("_"):
            story["footer"]= line
        elif line.strip() != "":
            if line.startswith("![OBS Image]"):
                url = line
            else:
                obj = { "text":line}
                s.append(obj)
    story["story"]=s
    return story

@app.get("/translate/{story_id}/{language_id}")
async def translate(story_id: int, language_id:str):
  
    json_file = open('OBSTextData.json')
    
    data = json.load(json_file)
    
    filtered_elements = [el for el in data if el['storyId'] == story_id]     
    
    if(len(filtered_elements)==0):
      raise HTTPException(status_code=404, detail="Story not found!!")
    
    # Setup Translater
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-1.3B")
    tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-1.3B")
    translator = pipeline('translation', model=model, tokenizer=tokenizer, src_lang="eng_Latn", tgt_lang='hin_Deva', max_length = 512)
        
    story = filtered_elements[0]    
    story_array = story['story']
    translation = []
    
    for story in story_array:
        split_lines = story['text']
        split_lines = split_lines.split('.')
        translated_string = ""
        for line in split_lines:
            if(len(line)>0):
                text=translator(line)
                translated_string += text[0]['translation_text']
        translation.append({'original': story['text'], 'translated': translated_string})

    # Get the sentence from DB
    # Check if story_id and language_id combo exist then return saved data
    # 1.split the english story in paragraphs and then lines  (done)
    # 2. translate the lines (done)
    # 3. put it back into paragraphs (done)
    # 4. store paragraphs in database
    # 5. table - story_id, language_id, para_id, eng_string, translated_string
    # 6. translate the english story into the target language and save in the database and return story_id and language_id
    return {"story_id": story_id, "language_id": language_id, "translation": translation}


@app.get("/compare/{story_id}/{language_id}/{para_id}")
async def compare(story_id: str, language_id:str, para_id:str, translated_string: str ):
    # 1. fetch the story from the database
    # 2. compare the translated string with the original string
    # 3. high score - > positive
    # 4. medium or low score 
    # 5. Do Steps 2 
    # 6. Compare the translated string with all the story strings 
    # 7. if the max score is the same as the para number sent in url -> positive
    # 8. else negative,  give score with the maximum similarity and return para no and corresponding string
    return {"story_id": story_id, "language_id": language_id, "para_id": para_id, "translated_string": translated_string}