# backend/tests/test_simulation.py
import sys
import os

from fastapi.testclient import TestClient


sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app

client = TestClient(app)


def test_simple_feed_rougher():
    """Simple 1-step flowsheet: Feed -> Rougher."""

    payload = {
        "metal": "Cu",
        "feed": {
            "throughput": 100.0,
            "grade": 1.0
        },
        "units": [
            {
                "id": "U_FEED",
                "type": "CU_FEED",
                "parameters": {
                    "recovery": 1.0,
                    "split_ratio": 1.0
                }
            },
            {
                "id": "U_ROUGHER",
                "type": "CU_FLOT_ROUGHER",
                "parameters": {
                    "recovery": 0.8,
                    "split_ratio": 0.5
                }
            }
        ],
        "streams": [
            {
                "id": "S1",
                "from_unit": "U_FEED",
                "to_unit": "U_ROUGHER"
            }
        ]
    }

    response = client.post("/simulate", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert "streams" in data
    assert "overall_recovery" in data

    # overall_recovery should be close to 0.8 (80%)
    overall = data["overall_recovery"]
    assert 0.79 <= overall <= 0.81


def test_invalid_no_streams():
    """If no streams are defined, simulation should fail gracefully."""

    payload = {
        "metal": "Cu",
        "feed": {
            "throughput": 100.0,
            "grade": 1.0
        },
        "units": [],
        "streams": []
    }

    response = client.post("/simulate", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert data["overall_recovery"] == 0.0
    assert len(data["streams"]) == 0
    assert any("No units" in msg or "No streams" in msg for msg in data["messages"])