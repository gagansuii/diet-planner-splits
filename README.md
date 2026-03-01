# AI Diet Planner

Black-and-gold diet planner with a React + Vite frontend and a FastAPI backend.

## Run Locally

### 1) Frontend
```powershell
cd "C:\Users\gagan\OneDrive\Desktop\diet planner\frontend"
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### 2) Backend
```powershell
cd "C:\Users\gagan\OneDrive\Desktop\diet planner\backend"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`.

## Notes
- The backend uses MobileNetV3 and will download model weights on first run.
- To point the frontend at a different API URL, set:
```powershell
$env:VITE_API_URL="http://127.0.0.1:8000"
```
