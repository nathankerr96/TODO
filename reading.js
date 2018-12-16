window.onload = function () {
  //redirect to login if session variable not set
  if (sessionStorage.getItem('loginName') === null) {
    window.location.replace('login.html');
  }
};

$(document).ready(populate);

//Take in the id of the book and add the onclick listner to the title title card
//that expands the expandedCard div with the same id
function addTitleCardClickListener(titleCard, expandedCard) {
    titleCard.addEventListener("click", function() {
      if (expandedCard.style.display == "block") {
          expandedCard.style.display = "none";
          titleCard.style.borderRadius = "20px";
      } else {
          expandedCard.style.display = "block";
          titleCard.style.borderRadius = "20px 20px 0px 0px";
      }
    }
  );
}

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
      addBookTitleCard(val);
    });
  });
  url = 'api/readingHistory?mode=select&user='+loginName;
  $.getJSON(url, function(data) {
    $.each(data, function(key, val) {
      addHistoryToList(val);
    });
  });
}

function createExpandedCard(id) {
    var expandedCardDiv = document.createElement("div");
    expandedCardDiv.className = "expandedCard";
    expandedCardDiv.id = "expandedCard" + id;

    var addPagesForm = document.createElement("form");
    addPagesForm.className = "addPagesForm";

    var pagesReadLabel = document.createElement("label");
    pagesReadLabel.appendChild(document.createTextNode("Pages Read Today: "));
    addPagesForm.appendChild(pagesReadLabel);

    var addPagesInput = document.createElement("input");
    addPagesInput.type = "number";
    addPagesInput.min = "0";
    addPagesInput.className = "addPagesInput";
    addPagesForm.appendChild(addPagesInput);

    var addPagesButton = document.createElement("input");
    addPagesButton.type = "button";
    addPagesButton.value = "Add Pages";
    addPagesButton.className = "addPagesButton";
    addPagesForm.appendChild(addPagesButton);

    expandedCardDiv.appendChild(addPagesForm);

    var readingHistoryList = document.createElement("ul");
    readingHistoryList.className = "readingHistory";
    readingHistoryList.id = "readingHistory" + id;
    expandedCardDiv.appendChild(readingHistoryList);

    return expandedCardDiv;
}

//TODO: Only retrive needed values from table
function addHistoryToList(val) {
    var id = val.bookId;
    var day = val.day;
    var pagesRead = val.pagesRead;


    var dayHistory = document.createElement("li");
    dayHistory.className = "day";

    var dayDetailsList = document.createElement("ul");
    dayDetailsList.className = "dayDetails";

    var dateListItem = document.createElement("li");
    dateListItem.appendChild(document.createTextNode(day));
    dayDetailsList.appendChild(dateListItem);

    var pagesReadListItem = document.createElement("li");
    pagesReadListItem.appendChild(document.createTextNode(pagesRead + " Pages Read"));
    dayDetailsList.appendChild(pagesReadListItem);

    var dailyGoalListItem = document.createElement("li");
    //TODO: need daily goal
    var dailyGoalText = "Daily Goal: +10";
    dailyGoalListItem.appendChild(document.createTextNode(dailyGoalText));
    dayDetailsList.appendChild(dailyGoalListItem);

    var overallGoalListItem = document.createElement("li");
    //TODO: need overall goal
    var overallGoalText = "Overall: -10";
    overallGoalListItem.appendChild(document.createTextNode(overallGoalText));
    dayDetailsList.appendChild(overallGoalListItem);

    dayHistory.appendChild(dayDetailsList);

    readingHistoryList = document.getElementById("readingHistory" + id);
    readingHistoryList.appendChild(dayHistory);
}

function addBookTitleCard(val) {
  var id = val.bookId;
  var title = val.title;
  var pages = val.pages;
  var dailyGoal = val.daily_goal;
  var currentPage = val.current_page;

  var currentBooksDiv = document.getElementById("currentBooksDiv");

  var titleCardDiv = document.createElement("div");
  titleCardDiv.className = "titleCard";
  titleCardDiv.id = "titleCard" + id;

  var titleCardList = document.createElement("ul");
  titleCardList.className = "titleCardList";

  var titleCardTitle = document.createElement("li");
  titleCardTitle.className = "titleCardTitle";
  titleCardTitle.appendChild(document.createTextNode(title));
  titleCardList.appendChild(titleCardTitle);

  var titleCardPercent = document.createElement("li");
  titleCardPercent.className = "titleCardPercent";
  var percentValue = Math.floor(currentPage*100 / pages);
  titleCardPercent.appendChild(document.createTextNode(percentValue+"% Done"));
  titleCardList.appendChild(titleCardPercent);

  var titleCardDailyGoal = document.createElement("li");
  titleCardDailyGoal.className = "titleCardDailyGoal";
  titleCardDailyGoal.appendChild(document.createTextNode(dailyGoal + " pages left today"));
  titleCardList.appendChild(titleCardDailyGoal);

  var titleCardExpandButton = document.createElement("li");
  titleCardExpandButton.className = "expandButton";
  titleCardExpandButton.appendChild(document.createTextNode("+"));
  titleCardList.appendChild(titleCardExpandButton);

  titleCardDiv.appendChild(titleCardList);

  currentBooksDiv.appendChild(titleCardDiv);

  expandedCardDiv = createExpandedCard(id);
  currentBooksDiv.appendChild(expandedCardDiv);

  addTitleCardClickListener(titleCardDiv, expandedCardDiv);
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
