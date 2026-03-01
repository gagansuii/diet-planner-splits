from datetime import datetime
from typing import Optional

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from nutrition_engine import analyze_image
from badge_system import compute_badges

app = FastAPI(title="AI Diet Planner API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DIET_PLANS = [
    {
        "id": "weight-loss",
        "title": "Weight Loss Diet",
        "summary": "Calorie deficit with high fiber and moderate protein.",
    },
    {
        "id": "mass-gaining",
        "title": "Mass Gaining Diet",
        "summary": "Calorie surplus with high carbs and high protein.",
    },
    {
        "id": "bodybuilding",
        "title": "Bodybuilding Diet",
        "summary": "High protein, timed carbs, and controlled fats.",
    },
    {
        "id": "athletic",
        "title": "Athletic Diet",
        "summary": "Balanced macros with hydration and carb cycling.",
    },
    {
        "id": "diabetic",
        "title": "Diabetic Diet",
        "summary": "Low GI foods with controlled carbs and high fiber.",
    },
    {
        "id": "cardiac",
        "title": "Cardiac Diet",
        "summary": "Low sodium, low saturated fats, high omega-3.",
    },
]

DIET_HISTORY = [
    {
        "id": 1,
        "user_id": 1,
        "diet_type": "Weight Loss",
        "total_calories": 1680,
        "date": "2026-02-25",
        "target_status": "On Track",
    },
    {
        "id": 2,
        "user_id": 1,
        "diet_type": "Bodybuilding",
        "total_calories": 2450,
        "date": "2026-02-26",
        "target_status": "Over",
    },
    {
        "id": 3,
        "user_id": 1,
        "diet_type": "Athletic",
        "total_calories": 2300,
        "date": "2026-02-27",
        "target_status": "On Track",
    },
]

BADGES = [
    {"level": "Wood", "condition": "First Diet Logged"},
    {"level": "Bronze", "condition": "7 Days Consistency"},
    {"level": "Silver", "condition": "30 Days"},
    {"level": "Gold", "condition": "Target Weight Achieved"},
    {"level": "Platinum", "condition": "90 Days Consistency"},
]


@app.get("/")
def home():
    return {"message": "Diet Planner API Running"}


@app.get("/diets")
def get_diets():
    return DIET_PLANS


@app.get("/diet-history")
def get_history(diet_type: Optional[str] = None, status: Optional[str] = None):
    items = DIET_HISTORY
    if diet_type and diet_type != "All":
        items = [item for item in items if item["diet_type"] == diet_type]
    if status and status != "All":
        items = [item for item in items if item["target_status"] == status]
    return items


@app.post("/diet-history")
def add_history(entry: dict):
    entry["id"] = len(DIET_HISTORY) + 1
    entry["date"] = entry.get("date") or datetime.utcnow().date().isoformat()
    DIET_HISTORY.append(entry)
    return entry


@app.get("/badges")
def get_badges():
    return BADGES


@app.post("/badges/evaluate")
def evaluate_badges(history: list):
    return compute_badges(history)


@app.post("/analyze-food/")
async def analyze_food(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        return analyze_image(contents)
    except Exception as exc:
        raise HTTPException(
            status_code=400, detail=f"Invalid image: {exc}") from exc
