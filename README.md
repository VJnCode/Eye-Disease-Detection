# 👁️ Eye Disease Detection using Deep Learning

This project uses a Convolutional Neural Network (ResNet-18) model to detect common retinal diseases from fundus images. It supports detection for the following categories:

- 🟢 Normal
- 🔴 Cataract
- 🟠 Diabetic Retinopathy
- 🔵 Glaucoma

The frontend is built using React and hosted on Vercel, while the backend model is served via FastAPI and Hugging Face Spaces.

---

## 🔍 Project Overview

This application assists in the early detection of retinal diseases using AI, which can be critical in preventing vision loss. Given an image of a retina, the model classifies it into one of the predefined disease categories.

### 👨‍⚕️ Target Users
- Ophthalmologists
- Healthcare screening assistants
- Medical students and researchers

---

## ⚙️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React + Tailwind CSS    |
| Backend   | FastAPI (Python)        |
| Model     | PyTorch (ResNet-18)     |
| Hosting   | Vercel (Frontend)       |
| Model API | Hugging Face Spaces     |

---

## 🧠 Model Details

- **Architecture**: ResNet-18
- **Input**: Fundus image (resized and normalized)
- **Output Classes**: Normal, Cataract, Diabetic Retinopathy, Glaucoma
- **Training Dataset**: Public dataset from Kaggle (Retinal Eye Disease)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/VJnCode/Eye-Disease-Detection.git
cd Eye-Disease-Detection
