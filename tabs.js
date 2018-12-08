function switchTab(callerId) {
  if (callerId == "todoListButton") {
    document.getElementById("mainContentFrame").src = "./todo.html";
  } else if (callerId == "readingButton") {
    document.getElementById("mainContentFrame").src = "./reading.html";
  }
}

function logout () {
  sessionStorage.removeItem('loginName');
  window.location.replace('login.html');
}
