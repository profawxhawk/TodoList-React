from fastapi import FastAPI
from database import db
from schemas import Type,List
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/type')
async def get_all_type():
    ret=[]
    for i in db.type.find():
        temp=Type(**i).__dict__
        temp["id"]=str(i.get('_id'))
        ret.append(temp)
    print(ret)
    return {'all_type': ret}

@app.get('/list')
async def get_all_list():
    ret=[]
    for i in db.list.find():
        temp=List(**i).__dict__
        temp["id"]=str(i.get('_id'))
        ret.append(temp)
    print(ret)
    return {'all_list': ret}

@app.post('/list')
async def create_list(lists: List):
    ret = db.list.insert_one(lists.dict(by_alias=True))
    return {'list': lists}

@app.post('/type')
async def create_type(types: Type):
    ret = db.type.insert_one(types.dict(by_alias=True))
    return {'type': types}
