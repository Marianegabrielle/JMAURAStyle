def test_register_success(client):
    response = client.post("/auth/register", json={
        "email": "test@jmaura.com",
        "password": "password123",
        "full_name": "Test User"
    })
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@jmaura.com"
    assert "id" in data

def test_register_duplicate_email(client):
    client.post("/auth/register", json={
        "email": "test@jmaura.com",
        "password": "password123",
        "full_name": "Test User"
    })
    response = client.post("/auth/register", json={
        "email": "test@jmaura.com",
        "password": "password456",
        "full_name": "Test User 2"
    })
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"]

def test_login_success(client):
    client.post("/auth/register", json={
        "email": "test@jmaura.com",
        "password": "password123",
        "full_name": "Test User"
    })
    response = client.post("/auth/login", json={
        "email": "test@jmaura.com",
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_wrong_password(client):
    client.post("/auth/register", json={
        "email": "test@jmaura.com",
        "password": "password123",
        "full_name": "Test User"
    })
    response = client.post("/auth/login", json={
        "email": "test@jmaura.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401

def test_login_nonexistent_user(client):
    response = client.post("/auth/login", json={
        "email": "nobody@jmaura.com",
        "password": "password123"
    })
    assert response.status_code == 401