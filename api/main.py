from fastapi import Depends, FastAPI,HTTPException
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from db import crud,models, schemas
import json
from sqlalchemy.orm import Session
from db.database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from nltk.translate.bleu_score import sentence_bleu
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your allowed origins
    allow_credentials=True,  # Allow cookies if needed
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allow all headers
)
nllb_model = "facebook/nllb-200-distilled-1.3B"

models.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
    text = ""
    # lines =[item.md]
    lines = item.md.splitlines()
    for line in lines:
        if line.startswith("#"):
            story["header"]= line
        elif line.startswith("_"):
            story["footer"]= line
            s.append({ "text":text})
            text = ""
        elif line.strip() != "":
            if line.startswith("![OBS Image]"):
                if text !="":
                    s.append({ "text":text})
                    text = ""
            else:
                text = text+ line
    story["story"]=s
    return story

@app.get("/translate/{story_id}/{language_id}")
async def translate(story_id: int, language_id:str, db: Session = Depends(get_db)):
    json_file = open('OBSTextData.json', 'r', encoding='utf-8')
    data = json.load(json_file)
    # Get story from DB
    translation = crud.get_story(db,story_id,language_id)
    # Translate Story
    filtered_elements = [el for el in data if el['storyId'] == story_id]     
    
    if(len(filtered_elements)==0):
      raise HTTPException(status_code=404, detail="Story not found!!")
    
    # Setup Translator
    model = AutoModelForSeq2SeqLM.from_pretrained(nllb_model)
    tokenizer = AutoTokenizer.from_pretrained(nllb_model)
    translator = pipeline('translation', model=model, tokenizer=tokenizer, src_lang="eng_Latn", tgt_lang=language_id, max_length = 512)
        
    story = filtered_elements[0]    
    story_array = story['story']
    if len(translation)==len(story_array):
        return {"story_id": story_id, "language_id": language_id, "translation": translation}
    translation = []
    for story in story_array:
        split_lines = story['text']
        split_lines = split_lines.split('.')
        translated_string = ""
        for line in split_lines:
            if(len(line)>0):
                text=translator(line)
                translated_string += " " + text[0]['translation_text'].strip()
        translation.append({'original': story['text'], 'translated': translated_string})
        crud.save_story(db=db, story_id=story_id,language_id=language_id,para_id=story['id'], nllb_model_id=nllb_model,original_string=story['text'],translated_string=translated_string)
        # return db_user
    # Get the sentence from DB if exists
    # 1. Check if story_id and language_id combo exist then return saved data ## Done
    # Translate the english story into the target language and save in the database 
    # 2. split the english story in paragraphs and then lines  ## Done
    # 3. translate the lines ## Done
    # 4. put it back into paragraphs ## Done
    # 5. store paragraphs in database ## Done
    # return story_id and language_id
    # 6. return story_id, language_id, Translations ## Done
    # DB table - story_id, language_id, para_id, eng_string, translated_string
    return {"story_id": story_id, "language_id": language_id, "translation": translation}


@app.post("/compare/{story_id}/{language_id}")
async def compare(story_id: str, language_id:str, translated_strings: list[schemas.Translation], db: Session = Depends(get_db) ):
    mt_translation = crud.get_story(db,story_id,language_id)
    result = []
    for mt,manual in zip(mt_translation,translated_strings):
        score = sentence_bleu([mt.translated_string],manual.text)    
        if score < 0.60:
            com_score=[]
            for index,texts in enumerate(translated_strings):
                new_score = sentence_bleu([mt.translated_string],texts.text)    
                com_score.append({"score":new_score,"text":texts.text,"para_id":index+1})
            best_compare = max(com_score, key=lambda x: x['score'])           
            result.append({"best_text":best_compare["text"],"manual":manual.text,"mt":mt.translated_string,"score":score,"compare_score":best_compare["score"],"compare_para_id":best_compare["para_id"],"para_id":mt.para_id})
        else:
            result.append({"mt":mt.translated_string,"manual":manual.text,"score":score})
    # Calculate a comparison score based on string similarity (e.g., Levenshtein distance)  
    # 1. fetch the story from the database
    # 2. compare the translated string with the original string
    # 3. high score - > positive
    # 4. medium or low score 
    # 5. Do Steps 2 
    # 6. Compare the translated string with all the story strings 
    # 7. if the max score is the same as the para number sent in url -> positive
    # 8. else negative,  give score with the maximum similarity and return para no and corresponding string
    return {"story_id": story_id, "language_id": language_id, "result":result}

@app.delete("/delete/{story_id}/{language_id}")
async def delete_story(story_id: int, language_id:str, db: Session = Depends(get_db)):
    translation = crud.get_story(db,story_id,language_id)
    if len(translation) == 0:
              raise HTTPException(status_code=404, detail="Story not found!!")
    delete_translation = crud.delete_story(db,story_id,language_id)
    return {"message":"Translation Deleted"}