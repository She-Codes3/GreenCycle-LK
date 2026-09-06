from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

KNOWN_CATEGORIES = {
    "plastic", "paper", "glass", "metal", "organic", "e-waste", "hazardous", "other",
}


def test_classify_rejects_empty_file():
    response = client.post(
        "/api/classify",
        files={"file": ("empty.png", b"", "image/png")},
    )
    assert response.status_code == 400


def test_classify_returns_a_known_category():
    response = client.post(
        "/api/classify",
        files={"file": ("sample.png", b"fake-image-bytes", "image/png")},
    )
    assert response.status_code == 200

    body = response.json()
    assert body["category"] in KNOWN_CATEGORIES
    assert 0.0 <= body["confidence"] <= 1.0
