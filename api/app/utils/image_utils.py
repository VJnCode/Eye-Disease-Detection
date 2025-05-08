import torch
from torchvision import transforms, models
from PIL import Image
import io
import os
import torch.nn as nn

# Model path
MODEL_PATH = r"E:\Eye-Disease-Detection\api\app\model\eye_disease_model.pth"

# Load model
def load_model(model_path=MODEL_PATH):
    if not os.path.exists(model_path):  # Check if model path exists
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    
    # Define the model (with custom layers as per your training)
    model = models.resnet18(pretrained=False)
    
    # Freeze the layers and modify the final layers
    for param in model.parameters():
        param.requires_grad = False
        
    num_ftrs = model.fc.in_features
    model.fc = nn.Sequential(
        nn.Linear(num_ftrs, 512),
        nn.ReLU(),
        nn.Dropout(0.5),
        nn.Linear(512, 4)  # Assuming 4 output classes for your eye disease model
    )

    # Load the trained weights into the model
    model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
    
    # Set the model to evaluation mode
    model.eval()
    
    return model

# Define image transformation (should match test-time transforms)
def get_transform():
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

# Process the incoming image
def process_image(contents):
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    transform = get_transform()
    image = transform(image).unsqueeze(0)  # Add batch dimension
    return image
