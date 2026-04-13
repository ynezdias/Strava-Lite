import uuid
import random
from locust import HttpUser, task, between

class StravaRunner(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        """ Register and login before starting tasks """
        self.email = f"loadtest_{uuid.uuid4()}@example.com"
        self.password = "pass123"
        
        # 1. Signup
        self.client.post("/auth/signup", json={
            "name": "Load Tester",
            "email": self.email,
            "password": self.password,
            "age": 30,
            "weight": 160
        })
        
        # 2. Login
        response = self.client.post("/auth/login", json={
            "email": self.email,
            "password": self.password
        })
        
        if response.status_code == 200:
            data = response.json()
            self.token = data['token']
            self.user_id = data['user']['id']
            self.headers = {'Authorization': f'Bearer {self.token}'}
        else:
            self.headers = {}

    @task(3)
    def post_run(self):
        if hasattr(self, 'headers') and self.headers:
            self.client.post(f"/runs/{self.user_id}", json={
                "duration": random.randint(1500, 4200),
                "distance": round(random.uniform(3.0, 15.0), 2)
            }, headers=self.headers)

    @task(2)
    def check_analytics(self):
        if hasattr(self, 'headers') and self.headers:
            self.client.get(f"/analytics/{self.user_id}", headers=self.headers)

    @task(1)
    def check_leaderboard(self):
        self.client.get("/leaderboard")
