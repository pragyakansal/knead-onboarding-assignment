from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import UUID, uuid4

app = FastAPI()

origins = [ "*" ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Comment(BaseModel):
    message: str

class Strategy(BaseModel):
    id: UUID | None = None
    title: str
    # Changed to comment for now, will update if needed after clarification
    comment: str | None = None
    #description: str | None = None
    #comments: List[Comment] | None = None

strategies = []

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)

@app.get("/strategies")
def getStrategies():
    return { "strategies": strategies }

@app.post("/strategies")
def createStrategies(strategy : Strategy):
    if not strategy.title:
        raise HTTPException(status_code=400, detail = "Title cannot be empty")
    strategy_with_id = strategy.copy(update={"id": uuid4()})
    strategies.append(strategy_with_id)
    return strategy_with_id
