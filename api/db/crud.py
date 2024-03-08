from sqlalchemy.orm import Session

from . import models, schemas

def get_story(db: Session,story_id:str,language_id:str):
    return db.query(models.Translations).filter(models.Translations.story_id == story_id).filter(models.Translations.language_id == language_id).all()

def save_story(db: Session, story_id:int,language_id:str,para_id:int, nllb_model_id:str,original_string:str,translated_string:str):
    db_story = models.Translations(story_id=story_id,language_id=language_id,para_id=para_id, nllb_model_id=nllb_model_id,original_string=original_string,translated_string=translated_string)
    db.add(db_story)
    db.commit()
    db.refresh(db_story)
    return db_story

def save_eng_obs_story(db: Session, story_id:int,para_id:int,url:str, text:str):
    db_obs_story = models.English_OBS(story_id=story_id,para_id=para_id,url=url,text=text)
    db.add(db_obs_story)
    db.commit()
    db.refresh(db_obs_story)
    return db_obs_story

def get_eng_story(db: Session,story_id:int):
    return db.query(models.English_OBS).filter(models.English_OBS.story_id == story_id).all()

def delete_story(db: Session,story_id:str,language_id:str):
    db_story = db.query(models.Translations).filter(models.Translations.story_id == story_id).filter(models.Translations.language_id == language_id)
    db_story.delete()
    db.commit()
    return db_story