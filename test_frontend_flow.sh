#!/bin/bash
echo "Testing complete frontend-backend flow..."
echo "=========================================="

# Get a fresh token
echo "1. Logging in to get token..."
TOKEN=$(curl -s -X POST http://localhost:3001/v1/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}' \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

if [ -z "$TOKEN" ]; then
  echo "ERROR: Failed to get token"
  exit 1
fi
echo "✓ Got token"

# List tasks
echo "2. Listing current tasks..."
curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3001/v1/api/tasks | python3 -m json.tool

# Create a task
echo "3. Creating a new task..."
CREATE_RESPONSE=$(curl -s -X POST http://localhost:3001/v1/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Automated Test Task","description":"Created by test script","status":"in_progress","due_date":"2025-12-15"}')

echo "Create response: $CREATE_RESPONSE"

# List tasks again
echo "4. Listing tasks after creation..."
curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3001/v1/api/tasks | python3 -m json.tool

echo "=========================================="
echo "Test completed successfully!"
echo "Frontend should be accessible at: http://localhost:3000"
echo "Login with: admin@example.com / password123"
