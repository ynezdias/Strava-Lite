#!/bin/bash

# Configuration
BASE_URL="http://localhost:5000"
EMAIL="recruiter_demo@example.com"
PASSWORD="fast"

echo "=== 1. Signup ==="
curl -s -X POST "$BASE_URL/auth/signup" \
     -H "Content-Type: application/json" \
     -d "{\"name\": \"Interviewer\", \"email\": \"$EMAIL\", \"password\": \"$PASSWORD\", \"age\": 25, \"weight\": 140}" | jq .

echo -e "\n\n=== 2. Login ==="
LOGIN_RES=$(curl -s -X POST "$BASE_URL/auth/login" \
     -H "Content-Type: application/json" \
     -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

echo $LOGIN_RES | jq .

# Extract values using Python parsing since not everyone has JQ natively in bash on windows, 
# But JQ is standard for terminal demo. We assume JQ is installed.
TOKEN=$(echo $LOGIN_RES | jq -r '.token')
USER_ID=$(echo $LOGIN_RES | jq -r '.user.id')

echo -e "\n\n=== 3. Add Run ==="
curl -s -X POST "$BASE_URL/runs/$USER_ID" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d "{\"duration\": 2100, \"distance\": 5.5}" | jq .

echo -e "\n\n=== 4. Fetch Analytics ==="
curl -s -X GET "$BASE_URL/analytics/$USER_ID" \
     -H "Authorization: Bearer $TOKEN" | jq .
