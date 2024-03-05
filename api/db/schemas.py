from pydantic import BaseModel

class MDFile(BaseModel):
    md: str

class CreateTranslation(BaseModel):
    story_id: int
    language_id: str
    para_id: int
    nllb_model_id: str
    original_string: str
    translated_string: str