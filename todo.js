window.onload = function () {
  //redirect to login if session variable not set
  if (sessionStorage.getItem('loginName') === null) {
    window.location.replace('login.html');
  }

  var createTaskForm = document.getElementById("createTaskForm");
  createTaskForm.onsubmit = addTask;
};

$(document).ready(populate);

function populate() {
    update_list();
}

function update_list() {
  var loginName = sessionStorage.getItem('loginName');
  var url = 'api/tasks?mode=select&user=' + loginName;
  $.getJSON(url, function(data){
    $.each( data, function( key, val ) {
      addTaskToTable(val);
    });
  });
}

function finishTask (user, dateTime) {
  var loginName = sessionStorage.getItem('loginName');
  var requestUri = 'api/tasks?mode=markComplete&user=' + loginName + '&insertTime=' + dateTime;
  $.get(encodeURI(requestUri));
}

function addTaskToTable (val) {
  var tableName;
  if (val.complete === 0) {
    tableName = 'todoTable';
  } else {
    tableName = 'completedTable';
  }
  var table = document.getElementById(tableName);

  var table_row = document.createElement('tr');
  table_row.className = 'todoTasks';

  var table_div1 = document.createElement('td');
  table_div1.className = 'todoTasks taskName';
  table_div1.appendChild(document.createTextNode(val.task));
  table_row.appendChild(table_div1);

  if (val.complete === 0) {
    //maybe add a delete button here if complete
    var table_div2 = document.createElement('td');
    var finishButton = document.createElement('button');
    finishButton.className = "todoTasks completeButton";
    finishButton.onclick = function (){
      finishTask(sessionStorage.getItem('loginName'), val.insertTime);
      this.parentNode.parentNode.remove();
      val.complete = 1;
      addTaskToTable(val);
    };
    finishButton.appendChild(document.createTextNode('Finish'));
    table_div2.appendChild(finishButton);
    table_row.appendChild(table_div2);
  }

  table.appendChild(table_row);
}

function addTask () {
  var taskDescriptionInput = document.getElementById("taskDescription");
  var newTask = taskDescriptionInput.value;
  var dateTime = new Date().toISOString().slice(0,19).replace('T', ' ');
  var loginName = sessionStorage.getItem('loginName');
  var taskValues = {
    user: loginName,
    insertTime: dateTime,
    task: newTask,
    complete: 0
  };
  addTaskToTable(taskValues);
  //send data to server
  var requestUri = 'api/tasks?mode=insert&user=' + loginName + '&insertTime=' +
      dateTime + '&task=' + newTask;
  $.get(encodeURI(requestUri));
  //clear input
  taskDescriptionInput.value = "";
  taskDescription.focus();
  return false;
}
