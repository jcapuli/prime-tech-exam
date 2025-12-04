async function test() {
  // First login
  const loginRes = await fetch('http://localhost:3001/v1/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com', password: 'password123' })
  });
  
  const loginData = await loginRes.json();
  console.log('Login response:', loginRes.status, loginRes.statusText);
  console.log('Token received:', loginData.access_token ? 'Yes' : 'No');
  
  if (loginData.access_token) {
    // Try to create a task
    const taskRes = await fetch('http://localhost:3001/v1/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.access_token}`
      },
      body: JSON.stringify({
        title: 'Test from Node',
        description: 'Testing auth',
        status: 'pending',
        due_date: '2025-12-31'
      })
    });
    
    console.log('Task creation response:', taskRes.status, taskRes.statusText);
    const taskData = await taskRes.json();
    console.log('Task data:', taskData);
  }
}

test().catch(console.error);
