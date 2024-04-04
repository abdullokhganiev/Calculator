// Name : Tokhirjon Vokhidov, Hidoyat Ruzmetov, Javokhir Kakhkhorov, Abdullokh Ganiev
// Description: This JavaScript code is designed for user authentication in a web 
// application. It includes functions for retrieving user information from cookies, 
// redirecting authenticated users to a dashboard, and handling the login process
//  with server communication for user verification.

function getUserInfo() {
  //The function retrieves user information from a cookie. If the 'user' cookie is present, 
  //it parses and returns the user data; otherwise, returns null.
  const userCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('user='));
  
  if (userCookie) {
    const userJson = userCookie.substring(5); // Remove 'username=' prefix
    const user = JSON.parse(decodeURIComponent(userJson));
    return user;
  } else {
    return null;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  // Checks if the user is already logged in when the document is loaded. 
  // If so, redirects to the dashboard page.
  let user = getUserInfo();
  if(user){
    window.location.href = '../dashboard/dashboard.html';
  }

})


document.getElementById('login-form').addEventListener('submit', function(e) {
  //Handles the login form submission. Prevents default form submission, captures user input, 
  // and sends it to the server for verification. Based on the response, it displays messages 
  // and redirects to the dashboard on successful login.
    e.preventDefault(); 
  
    let email = document.getElementById('email');
    let password = document.getElementById('password');
  
    const loginData = {
      email: email.value,
      password: password.value
    };
  
    fetch('http://localhost/check/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {

      if(data.message === 'Matched') {
        let message = document.getElementById("message")
        message.style.color = "green";
        message.innerText = 'Welcome back!';
        message.style.opacity = 1;
        message.style.height = "max-content";
        setTimeout(() => { 
          email.value = ""
          password.value = ""
          window.location.href = '../dashboard/dashboard.html';
          message.innerHTML = ""
          sessionStorage.setItem('isLoggedIn', true);
        }, 1500);
        
      }else if(data.error === 'NoUser'){
  
        let message = document.getElementById("message")
        message.style.color = "#FFD700";
        message.innerText = 'No user is associated with email address!';
        message.style.opacity = 1;
        message.style.height = "max-content";
  
      } else if(data.error === "Password"){
        let message = document.getElementById("message")
        message.style.color = "red";
        message.innerText = 'Password is incorrect!';
        message.style.opacity = 1;
        message.style.height = "max-content";
      }
    })
    .catch((error) => {
      //Handle different responses: successful login, no user found, or incorrect password
      console.error('Error:', error);
      alert('An error occurred during login.');
    });
  });

