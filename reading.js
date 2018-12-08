window.onload = function () {
  //redirect to login if session variable not set
  if (sessionStorage.getItem('loginName') === null) {
    window.location.replace('login.html');
  }
};

function addBook() {
  var addBookDiv = document.getElementById("addBookDiv");
  if (addBookDiv.style.display == "block") {
    addBookDiv.style.display = "none";
  } else {
    addBookDiv.style.display = "block";
  }
}

function submitBook() {
  var title = document.getElementById("titleInput").value;
  var pages = document.getElementById("pagesInput").value;
  var goal = document.getElementById("goalInput").value;
  alert(title + ", " + pages + ", " + goal);
}
