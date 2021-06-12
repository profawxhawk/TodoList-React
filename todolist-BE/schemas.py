from datetime import date
from typing import List
from pydantic import BaseModel

class Type(BaseModel):
    name: str
    color:str
    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
    
class List(BaseModel):
    createdAt: str
    dueBy: str
    title: str
    text: str
    done: bool
    partOf: List[str]

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True

