from pydantic import BaseModel

class MDFile(BaseModel):
    md: str