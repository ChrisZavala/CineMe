//logout()
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      updateAlertbox();
    }
  }
  //Same ole Same ole. 
  document.querySelector('#nav-logout').addEventListener('click', logout);
  