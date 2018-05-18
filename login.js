
function login (name) {
  sessionStorage.setItem('loginName', name);
  window.location.replace('todo.html');
}

window.onload = function () {
  var loginForm = document.getElementById("loginForm");
  var loginName = "";

  loginForm.onsubmit = function (e) {
    loginName = document.getElementById("loginName").value;
    login(loginName);
    return false;
  };
};
