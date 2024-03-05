from fastapi import FastAPI
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from . import models, schemas

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
async def translate(story_id: str, language_id:str):

    text = {
        "header": "# 1. The Creation",
        "footer": "_A Bible story from: Genesis 1-2_",
        "story": [
          {
            "text": "This is how God made everything in the beginning. He created the universe and everything in it in six days. After God created the earth it was dark and empty because he had not yet formed anything in it. But God’s Spirit was there over the water."
          },
          {
            "text": "Then God said, “Let there be light!” And there was light. God saw that the light was good and called it “day.” He separated it from the darkness, which he called “night.” God created the light on the first day of creation."
          },
          {
            "text": "On the second day of creation, God said, “Let there be an expanse above the waters.” And there was an expanse. God called this expanse “sky.”"
          },
          {
            "text": "On the third day, God said, “Let the water come together in one place and the dry land appear.” He called the dry land “earth,” and he called the water “seas.” God saw that what he had created was good."
          },
          {
            "text": "Then God said, “Let the earth produce all kinds of trees and plants.” And that is what happened. God saw that what he had created was good."
          },
          {
            "text": "On the fourth day of creation, God said, “Let there be lights in the sky.” And the sun, the moon, and the stars appeared. God made them to give light to the earth and to mark day and night, seasons and years. God saw that what he had created was good."
          },
          {
            "text": "On the fifth day, God said, “Let living things fill the waters, and birds fly in the sky.” This is how he made everything that swims in the water and all the birds. God saw that it was good, and he blessed them."
          },
          {
            "text": "On the sixth day of creation, God said, “Let there be all kinds of land animals!” And it happened just like God said. Some were farm animals, some crawled on the ground, and some were wild. And God saw that it was good."
          },
          {
            "text": "Then God said, “Let us make human beings in our image to be like us. They will rule over the earth and all the animals.”"
          },
          {
            "text": "So God took some soil, formed it into a man, and breathed life into him. This man’s name was Adam. God planted a large garden where Adam could live, and put him there to care for it."
          },
          {
            "text": "In the middle of the garden, God planted two special trees—the tree of life and the tree of the knowledge of good and evil. God told Adam that he could eat from any tree in the garden except from the tree of the knowledge of good and evil. If he ate from this tree, he would die."
          },
          {
            "text": "Then God said, “It is not good for man to be alone.” But none of the animals could be Adam’s helper."
          },
          {
            "text": "So God made Adam fall into a deep sleep. Then God took one of Adam’s ribs and made it into a woman and brought her to him."
          },
          {
            "text": "When Adam saw her, he said, “At last! This one is like me! Let her be called ‘Woman,’ for she was made from Man.” This is why a man leaves his father and mother and becomes one with his wife."
          },
          {
            "text": "God made man and woman in his own image. He blessed them and told them, “Have many children and grandchildren and fill the earth!” And God saw that everything he had made was very good, and he was very pleased with all of it. This all happened on the sixth day of creation."
          },
          {
            "text": "When the seventh day came, God had finished all the work that he had been doing. He blessed the seventh day and made it holy because on this day he stopped creating things. This is how God created the universe and everything in it."
          }
        ]
    }               

    # Setup Translater
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-1.3B")
    tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-1.3B")
    translator = pipeline('translation', model=model, tokenizer=tokenizer, src_lang="eng_Latn", tgt_lang='hin_Deva', max_length = 512)
        
    story_array = text['story']
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
