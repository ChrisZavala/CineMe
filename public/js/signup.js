//signup()
async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Account created! Logging you in now.');
        document.location.replace('/');
      } else {
        console.log(response);
        updateAlertBox('Username, Email or Password is incorrect!');
      }
    }
  }
//Event Listener for submit
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
