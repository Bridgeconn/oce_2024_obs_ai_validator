from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Translations(Base):
    __tablename__ = "translations"

    id = Column(Integer, primary_key=True)
    story_id = Column(Integer, index=True)
    language_id = Column(String)
    para_id = Column(Integer)
    nllb_model_id = Column(String)
    original_string = Column(String)
    translated_string = Column(String)

# table - id, story_id, language_id, para_id, original_string, translated_string
class English_OBS(Base):
    __tablename__ = "english_obs"

    id = Column(Integer, primary_key=True)
    story_id = Column(Integer, index=True)
    para_id = Column(Integer)
    url=Column(String)
    text = Column(String)