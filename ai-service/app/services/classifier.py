import json
from functools import lru_cache
from pathlib import Path

from app.core.config import get_settings
from app.schemas.classification import ClassificationResult


class WasteClassifier:
    """Wraps the waste classification model.

    Currently a stub that returns the first known label with a fixed
    confidence. Swap in real inference (e.g. an ONNX/TF model loaded from
    ``settings.model_path``) once one is trained.
    """

    def __init__(self, labels: list[str]) -> None:
        self._labels = labels

    def classify(self, image_bytes: bytes) -> ClassificationResult:
        if not image_bytes:
            raise ValueError("image_bytes must not be empty")

        label = self._labels[0] if self._labels else "other"
        return ClassificationResult(category=label, confidence=0.5)


@lru_cache
def get_classifier() -> WasteClassifier:
    settings = get_settings()
    labels_path = Path(settings.labels_path)
    labels = json.loads(labels_path.read_text()) if labels_path.exists() else []
    return WasteClassifier(labels=labels)
