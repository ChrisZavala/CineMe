//loginFormHandler()
  //This is the function that get the user to log in 
  async function loginFormHandler(event){
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the homepage. 
        document.location.replace('/');
        document.location.reload();
      } else {
        console.log(response);
        updateAlertBox('User Name or Password are incorrect!')
      }
    }
  };
//Event listener for Submit:
  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
