def get_auth_token(client):
    client.post("/auth/register", json={
        "email": "test@jmaura.com",
        "password": "password123",
        "full_name": "Test User"
    })
    response = client.post("/auth/login", json={
        "email": "test@jmaura.com",
        "password": "password123"
    })
    return response.json()["access_token"]

def test_add_clothing(client):
    token = get_auth_token(client)
    response = client.post("/clothes/",
        data={"name": "Robe noire", "category": "top", "color": "Noir"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Robe noire"
    assert data["color"] == "Noir"

def test_get_clothes(client):
    token = get_auth_token(client)
    client.post("/clothes/",
        data={"name": "Robe noire", "category": "top", "color": "Noir"},
        headers={"Authorization": f"Bearer {token}"}
    )
    response = client.get("/clothes/",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert len(response.json()) == 1

def test_get_clothes_unauthenticated(client):
    response = client.get("/clothes/")
    assert response.status_code == 401

def test_delete_clothing(client):
    token = get_auth_token(client)
    add_response = client.post("/clothes/",
        data={"name": "Robe noire", "category": "top", "color": "Noir"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert add_response.status_code == 201
    clothing_id = add_response.json()["id"]
    response = client.delete(f"/clothes/{clothing_id}",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code in [204, 404]

def test_delete_nonexistent_clothing(client):
    token = get_auth_token(client)
    response = client.delete("/clothes/nonexistent-id",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code in [404, 422]