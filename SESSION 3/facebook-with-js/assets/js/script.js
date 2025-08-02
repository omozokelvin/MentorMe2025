
const createAccountButton = document.getElementById('create-account-btn');

const loginButton = document.getElementById('login-btn');


loginButton.onclick = (e) => {
  e.preventDefault();

  console.log(e);
  alert('Hello World');
};