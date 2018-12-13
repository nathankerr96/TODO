window.onload = function () {
  //redirect to login if session variable not set
  if (sessionStorage.getItem('loginName') === null) {
    window.location.replace('login.html');
  }
};

$(document).ready(populate);

function populate() {
  update_list();
}

function addPages(id) {
  var ulId = "book" + id;
  var ul = document.getElementById(ulId);
  var numPagesRead = ul.getElementsByClassName("pagesReadInput")[0].value;

  var currentPageItem = ul.getElementsByClassName("currentPage")[0];
  var currentPageValue = currentPageItem.getElementsByClassName("value")[0];
  var oldPage = currentPageValue.textContent;
  var newPage = parseInt(oldPage) + parseInt(numPagesRead);

  currentPageValue.textContent = newPage;
}

function update_list() {
  var loginName = sessionStorage.getItem('loginName');
  var url = 'api/reading?mode=select&user=' + loginName;
  $.getJSON(url, function(data){
    $.each( data, function( key, val ) {
      addBookToList(val);
    });
  });
}

function addBookToList(val) {
  var title = val.title;
  var pages = val.pages;
  var dailyGoal = val.daily_goal;
  var currentPage = val.current_page;

  var row = document.createElement("tr");
  //title
  var titleDiv = document.createElement("td");
  titleDiv.appendChild(document.createTextNode(title));
  row.appendChild(titleDiv);
  //num pages
  var pagesDiv = document.createElement("td");
  pagesDiv.appendChild(document.createTextNode(pages));
  row.appendChild(pagesDiv);
  //daily goal
  var dailyGoalDiv = document.createElement("td");
  dailyGoalDiv.appendChild(document.createTextNode(dailyGoal));
  row.appendChild(dailyGoalDiv);
  //current page
  var currentPageDiv = document.createElement("td");
  pagesDiv.appendChild(document.createTextNode(pages));
  row.appendChild(currentPageDiv);

  var currentBooksTable = document.getElementById("currentBooksTable");
  currentBooksTable.appendChild(row);
}

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
