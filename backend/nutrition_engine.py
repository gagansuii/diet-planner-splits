from typing import Dict, List
import io
import threading

from PIL import Image
import torch
from torchvision.models import mobilenet_v3_small, MobileNet_V3_Small_Weights

_MODEL = None
_PREPROCESS = None
_LABELS: List[str] = []
_MODEL_LOCK = threading.Lock()

FOOD_DB = [
    {
        "tokens": ["banana"],
        "food": "Banana",
        "nutrition": {"calories": 105, "protein": 1.3, "carbs": 27, "fats": 0.3, "fiber": 3.1},
    },
    {
        "tokens": ["apple"],
        "food": "Apple",
        "nutrition": {"calories": 95, "protein": 0.5, "carbs": 25, "fats": 0.3, "fiber": 4.4},
    },
    {
        "tokens": ["orange"],
        "food": "Orange",
        "nutrition": {"calories": 62, "protein": 1.2, "carbs": 15, "fats": 0.2, "fiber": 3.1},
    },
    {
        "tokens": ["strawberry"],
        "food": "Strawberries",
        "nutrition": {"calories": 49, "protein": 1.0, "carbs": 12, "fats": 0.5, "fiber": 3.0},
    },
    {
        "tokens": ["pineapple"],
        "food": "Pineapple",
        "nutrition": {"calories": 82, "protein": 0.9, "carbs": 22, "fats": 0.2, "fiber": 2.3},
    },
    {
        "tokens": ["broccoli"],
        "food": "Broccoli",
        "nutrition": {"calories": 55, "protein": 3.7, "carbs": 11, "fats": 0.6, "fiber": 5.1},
    },
    {
        "tokens": ["carrot"],
        "food": "Carrots",
        "nutrition": {"calories": 41, "protein": 0.9, "carbs": 10, "fats": 0.2, "fiber": 2.8},
    },
    {
        "tokens": ["salad"],
        "food": "Salad",
        "nutrition": {"calories": 80, "protein": 2.0, "carbs": 10, "fats": 4.0, "fiber": 3.0},
    },
    {
        "tokens": ["pizza"],
        "food": "Pizza",
        "nutrition": {"calories": 285, "protein": 12, "carbs": 36, "fats": 10, "fiber": 2.5},
    },
    {
        "tokens": ["cheeseburger", "hamburger"],
        "food": "Burger",
        "nutrition": {"calories": 303, "protein": 17, "carbs": 30, "fats": 14, "fiber": 1.5},
    },
    {
        "tokens": ["hotdog", "hot dog"],
        "food": "Hot Dog",
        "nutrition": {"calories": 151, "protein": 5, "carbs": 2, "fats": 13, "fiber": 0.0},
    },
    {
        "tokens": ["spaghetti", "pasta"],
        "food": "Pasta",
        "nutrition": {"calories": 221, "protein": 8, "carbs": 43, "fats": 1.3, "fiber": 2.5},
    },
    {
        "tokens": ["rice"],
        "food": "Rice",
        "nutrition": {"calories": 205, "protein": 4.3, "carbs": 45, "fats": 0.4, "fiber": 0.6},
    },
    {
        "tokens": ["steak"],
        "food": "Steak",
        "nutrition": {"calories": 271, "protein": 26, "carbs": 0, "fats": 18, "fiber": 0},
    },
    {
        "tokens": ["chicken"],
        "food": "Chicken",
        "nutrition": {"calories": 239, "protein": 27, "carbs": 0, "fats": 14, "fiber": 0},
    },
    {
        "tokens": ["sushi"],
        "food": "Sushi",
        "nutrition": {"calories": 200, "protein": 9, "carbs": 30, "fats": 6, "fiber": 2},
    },
    {
        "tokens": ["ice cream", "icecream"],
        "food": "Ice Cream",
        "nutrition": {"calories": 137, "protein": 2.3, "carbs": 16, "fats": 7, "fiber": 0},
    },
]

DEFAULT_NUTRITION = {"calories": 180, "protein": 8, "carbs": 20, "fats": 8, "fiber": 2}


def _load_model() -> None:
    global _MODEL, _PREPROCESS, _LABELS
    if _MODEL is not None:
        return
    with _MODEL_LOCK:
        if _MODEL is not None:
            return
        weights = MobileNet_V3_Small_Weights.DEFAULT
        _MODEL = mobilenet_v3_small(weights=weights)
        _MODEL.eval()
        _PREPROCESS = weights.transforms()
        _LABELS = list(weights.meta.get("categories", []))


def _match_nutrition(labels: List[str]) -> Dict:
    for label in labels:
        label_lower = label.lower()
        for entry in FOOD_DB:
            if any(token in label_lower for token in entry["tokens"]):
                return entry
    return {}


def analyze_image(contents: bytes) -> Dict:
    if not contents:
        return {
            "food": "Unknown",
            "nutrition": DEFAULT_NUTRITION,
            "nutrition_source": "fallback",
            "model": "none",
        }

    _load_model()

    image = Image.open(io.BytesIO(contents)).convert("RGB")
    tensor = _PREPROCESS(image).unsqueeze(0)

    with torch.no_grad():
        logits = _MODEL(tensor)
        probs = torch.nn.functional.softmax(logits, dim=1)
        top_probs, top_indices = torch.topk(probs, k=5)

    top_indices_list = top_indices[0].tolist()
    top_labels = [
        _LABELS[idx] if idx < len(_LABELS) else f"class_{idx}" for idx in top_indices_list
    ]

    matched = _match_nutrition(top_labels)

    if matched:
        food_name = matched["food"]
        nutrition = matched["nutrition"]
        source = "lookup"
    else:
        food_name = top_labels[0] if top_labels else "Unknown"
        nutrition = DEFAULT_NUTRITION
        source = "fallback"

    return {
        "food": food_name,
        "nutrition": nutrition,
        "nutrition_source": source,
        "model": "mobilenet_v3_small_imagenet",
        "candidates": top_labels,
    }
