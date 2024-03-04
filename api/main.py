from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class MDFile(BaseModel):
    md: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/split/")
async def split_file(item: MDFile):
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
async def translate(story_id: str, language_id:str):
    # 1.split the english story in paragraphs and then lines 
    # 2. translate the lines 
    # 3. put it back into paragraphs 
    # 4. store paragraphs in database
    # 5. table - story_id, language_id, para_id, eng_string, translated_string
    # 6. translate the english story into the target language and save in the database and return story_id and language_id
    return {"story_id": story_id, "language_id": language_id}


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
