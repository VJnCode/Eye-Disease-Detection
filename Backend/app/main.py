# app/main.py

import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.utils.image_utils import load_model, process_image
import torch

# Initialize FastAPI app
app = FastAPI()

# CORS settings for frontend communication
# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://eye-disease-detection-frontend.vercel.app/"],  # Set your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Model and label setup
MODEL_PATH = r"D:\College Works\ML_project\Web\api\app\model\eye_disease_model.pth"
categories = ["cataract", "diabetic_retinopathy", "glaucoma", "normal"]

try:
    model = load_model(MODEL_PATH)
except FileNotFoundError as e:
    print(e)
    model = None

# Prediction endpoint
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    contents = await file.read()
    
    try:
        image = process_image(contents)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image: {e}")
    
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        prediction = categories[predicted.item()]

    return JSONResponse(content={"prediction": prediction})
