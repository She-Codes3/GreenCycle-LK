from pydantic import BaseModel, Field


class ClassificationResult(BaseModel):
    category: str = Field(description="Predicted waste category")
    confidence: float = Field(ge=0.0, le=1.0, description="Model confidence, 0-1")
