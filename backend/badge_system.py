from typing import List, Dict


def compute_badges(history: List[Dict]) -> Dict:
    streak = len(history)
    awards = []
    if streak >= 1:
        awards.append("Wood")
    if streak >= 7:
        awards.append("Bronze")
    if streak >= 30:
        awards.append("Silver")
    if any(item.get("target_achieved") for item in history):
        awards.append("Gold")
    if streak >= 90:
        awards.append("Platinum")
    return {"streak_days": streak, "awards": awards}
