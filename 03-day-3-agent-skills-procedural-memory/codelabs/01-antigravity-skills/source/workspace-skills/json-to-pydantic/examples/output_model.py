from pydantic import BaseModel

class Preferences(BaseModel):
    theme: str

class Example(BaseModel):
    id: int
    name: str
    preferences: Preferences
