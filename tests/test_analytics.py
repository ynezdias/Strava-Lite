import json

def get_token(client):
    client.post('/auth/signup', json={"email": "analytics@example.com", "password": "pass"})
    rv = client.post('/auth/login', json={"email": "analytics@example.com", "password": "pass"})
    return json.loads(rv.data)['token'], json.loads(rv.data)['user']['id']

def test_user_analytics(client):
    token, user_id = get_token(client)
    headers = {'Authorization': f'Bearer {token}'}
    
    # Add runs
    client.post(f'/runs/{user_id}', json={"duration": 3600, "distance": 10.0}, headers=headers)
    client.post(f'/runs/{user_id}', json={"duration": 1800, "distance": 5.0}, headers=headers)
    
    # Check analytics
    response = client.get(f'/analytics/{user_id}', headers=headers)
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # 5400 / 15.0 = 360 seconds per unit
    assert data['average_pace_sec_per_unit'] == 360.0
    
    assert data['personal_best']['max_distance'] == 10.0
    assert data['personal_best']['min_duration'] == 1800.0
    
    # Rolling totals validation
    assert len(data['rolling_7_day_totals']) == 2
    # The exact sum depends on timestamp order, but highest should be 15.0
    assert data['rolling_7_day_totals'][0]['rolling_7_day_distance'] == 15.0 or data['rolling_7_day_totals'][1]['rolling_7_day_distance'] == 15.0

def test_leaderboard(client):
    token, user_id = get_token(client)
    headers = {'Authorization': f'Bearer {token}'}
    
    client.post(f'/runs/{user_id}', json={"duration": 3600, "distance": 42.0}, headers=headers)
    
    response = client.get('/leaderboard')
    assert response.status_code == 200
    data = json.loads(response.data)
    
    assert len(data) == 1
    assert data[0]['total_distance'] == 42.0
