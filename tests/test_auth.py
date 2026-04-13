import json

def test_signup(client):
    response = client.post('/auth/signup', json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123",
        "age": 25,
        "weight": 150
    })
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert 'id' in data
    assert data['email'] == 'test@example.com'

def test_signup_duplicate_email(client):
    # First user
    client.post('/auth/signup', json={"name": "A", "email": "dup@example.com", "password": "123"})
    
    # Second user same email
    response = client.post('/auth/signup', json={"name": "B", "email": "dup@example.com", "password": "123"})
    assert response.status_code == 400

def test_login(client):
    client.post('/auth/signup', json={
        "name": "Login User",
        "email": "login@example.com",
        "password": "password123"
    })
    
    response = client.post('/auth/login', json={
        "email": "login@example.com",
        "password": "password123"
    })
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'token' in data
    assert data['user']['email'] == 'login@example.com'
    
def test_login_invalid(client):
    response = client.post('/auth/login', json={
        "email": "wrong@example.com",
        "password": "wrong"
    })
    assert response.status_code == 404
