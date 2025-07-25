from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import UUID, uuid4

app = FastAPI()

# allow CORS for all origins
origins = [ "*" ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# can be changed as per requirements
# class Comment(BaseModel):
#     message: str

# used pydantic model to define input structure for a strategy
class Strategy(BaseModel):
    id: UUID | None = None
    title: str
    # Changed to comment for now, will update if needed after clarification
    comment: str | None = None
    # description: str | None = None
    # comments: List[Comment] | None = None

# in-memory storage
strategies = []

# handle input validation failures
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)

@app.get("/strategies")
def getStrategies():
    return { "strategies": strategies }

@app.post("/strategies")
def createStrategies(strategy : Strategy):
    # validation to check that title should not be empty
    if not strategy.title:
        raise HTTPException(status_code=400, detail = "Title cannot be empty")
    strategy_with_id = strategy.copy(update={"id": uuid4()})            # unique ID for strategy
    strategies.append(strategy_with_id)             # adding strategy to in-memory list
    return strategy_with_id
