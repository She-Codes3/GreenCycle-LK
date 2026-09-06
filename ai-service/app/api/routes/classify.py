from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas.classification import ClassificationResult
from app.services.classifier import get_classifier

router = APIRouter()


@router.post("/classify", response_model=ClassificationResult)
async def classify_image(file: UploadFile = File(...)) -> ClassificationResult:
    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    classifier = get_classifier()
    return classifier.classify(image_bytes)
