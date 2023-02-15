async function updateUserInfo(event) {
    event.preventDefault();
    const newUsername = $('input#username').val().trim();
    const currentPassword = $('input#current-password').val().trim();
    const newPassword = $('input#new-password').val().trim();
    const newEmail = $('input#email').val().trim();
    const newPFP = $('input#pfp_path').val().trim();
    let body = {};
   
    if (currentPassword) {
      body.current_password = currentPassword;
    } else {
      updateAlertBox('Must enter your current password.');
      return;
    }
    if (!(newUsername || newPassword || newEmail || newPFP)) {
      updateAlertBox('Must provide a new username or password.');
      return;
    }
    if (newUsername) {
      body.username = newUsername;
    }
    if (newPassword) {
      body.password = newPassword;
    }
    if (newEmail) {
      body.email = newEmail;
    }
    if (newPFP) {
      body.pfp_path = newPFP;
    }
    const response = await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      updateAlertBox();
    }
  }
function test() {
  const source = document.getElementById("test-input").value
  document.getElementById("img").src = source
}

document.getElementById("test-input").addEventListener("change", test)
  //event listener 
  $('.update-user-form').on('submit', updateUserInfo);