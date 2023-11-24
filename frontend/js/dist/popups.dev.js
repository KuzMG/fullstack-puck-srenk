"use strict";

document.querySelector("#openNotes").addEventListener("click", function () {
  document.querySelector("#popupNotes").style.display = "flex";
});
document.querySelector("#openToDo").addEventListener("click", function () {
  document.querySelector("#popupToDo").style.display = "flex";
  document.querySelector("#deleteToDo").style.display = "none";
  document.querySelector("#archiveToDo").style.display = "none";
});
document.querySelector("#openPlanner").addEventListener("click", function () {
  document.querySelector("#popupPlanner").style.display = "flex";
  createPlanner();
  document.querySelector("#deletePopupPlanner").style.display = "none";
  document.querySelector("#archivePopupPlanner").style.display = "none";
});
document.querySelector("#openBrain").addEventListener("click", function () {
  document.querySelector("#popupBrain").style.display = "flex";
  document.querySelector("#deletePopupBrain").style.display = "none";
  document.querySelector("#archivePopupBrain").style.display = "none";
});
document.querySelector("#closePopupNotes").addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector("#popupNotes").style.display = "none";
  document.querySelector("#deletePopupNotes").style.display = "none";
  document.querySelector("#archivePopupNotes").style.display = "none";
  document.querySelector("#savePopupNotes").addEventListener("click", saveNote);
  document.querySelector("#savePopupNotes").removeEventListener("click", updateNote);
  document.querySelector("#savePopupNotes").textContent = "Сохранить заметку";
  document.querySelector("#notesHeader").value = '';
  document.querySelector("#note-text").value = '';
});
document.querySelector("#closePopupToDo").addEventListener("click", function () {
  document.querySelector("#popupToDo").style.display = "none";
  document.querySelector("#deleteToDo").style.display = "none";
  document.querySelector("#archiveToDo").style.display = "none";
  document.querySelector("#submitToDo").addEventListener("click", saveToDo);
  document.querySelector("#submitToDo").removeEventListener("click", updateToDo);
  document.querySelector("#submitToDo").textContent = "Сохранить заметку";
  document.querySelector("#todosHeader").value = '';
  document.getElementById("todo-list").outerHTML = '<ul id="todo-list"></ul>';
});
document.querySelector("#closePopupPlanner").addEventListener("click", function () {
  document.querySelector("#popupPlanner").style.display = "none";
  document.querySelector("#deletePopupPlanner").style.display = "none";
  document.querySelector("#archivePopupPlanner").style.display = "none";
  document.querySelector("#savePopupPlanner").addEventListener("click", savePlanner);
  document.querySelector("#savePopupPlanner").removeEventListener("click", updatePlanner);
  document.querySelector("#savePopupPlanner").textContent = "Сохранить заметку";
  document.querySelector("#plannerHeader").value = '';
});
document.querySelector("#closePopupBrain").addEventListener("click", function () {
  document.querySelector("#popupBrain").style.display = "none";
  document.querySelector("#deletePopupBrain").style.display = "none";
  document.querySelector("#archivePopupBrain").style.display = "none";
  document.querySelector("#savePopupBrain").textContent = "Сохранить заметку";
  document.querySelector("#brainHeader").value = '';
});

var saveNote = function saveNote(event) {
  event.preventDefault();
  var header = document.querySelector("#notesHeader").value;
  var noteText = document.querySelector("#note-text").value;

  if (header === '') {
    alert('Введите заголовок!');
  } else {
    var serverURL = "http://localhost:8080/api/note/create";
    fetch(serverURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: header,
        text: noteText,
        name_user: localStorage.getItem('username')
      })
    }).then(function (response) {
      if (response.status) {
        alert("Заметка создана!");
        window.location = "main_page.html";
      } else {
        alert("Заметка не создана?!");
      }
    })["catch"](function (error) {
      alert("Ошибочка: ", error);
    });
    var popup = document.querySelector("#popupNotes");
    popup.style.display = "none";
  }
};

document.querySelector("#savePopupNotes").addEventListener("click", saveNote);
document.getElementById("todoForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var todoInput = document.getElementById("todo-input");
  var todoText = todoInput.value.trim();

  if (todoText) {
    var todoItem = createTodoItem(todoText);
    document.getElementById("todo-list").appendChild(todoItem);
    todoInput.value = "";
  }
});

var saveToDo = function saveToDo() {
  var todoInput = document.getElementById("todo-list");
  var header = document.querySelector("#todosHeader").value;
  var todoText = todoInput.outerHTML;

  if (header === '') {
    alert('Введите заголовок!');
  } else {
    var serverURL = "http://localhost:8080/api/note/create";
    fetch(serverURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: header,
        text: todoText,
        name_user: localStorage.getItem('username')
      })
    }).then(function (response) {
      if (response.status) {
        alert("Заметка создана!");
        window.location = "main_page.html";
      } else {
        alert("Заметка не создана?!");
      }
    })["catch"](function (error) {
      alert("Ошибочка: ", error);
    });
    var popup = document.querySelector("#popupToDo");
    popup.style.display = "none";
  }
};

document.querySelector("#submitToDo").addEventListener("click", saveToDo);

function createTodoItem(text) {
  var todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  todoItem.appendChild(checkbox);
  var todoText = document.createElement("span");
  todoText.textContent = text;
  todoItem.appendChild(todoText);
  checkbox.addEventListener("change", function () {
    todoText.classList.toggle("checked");
  });
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "×";
  todoItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", function () {
    todoItem.remove();
  });
  return todoItem;
}

function createPlanner() {
  var notesList = document.querySelector('.planner-list');
  notesList.innerHTML = '';

  for (var i = 0; i < 24; i++) {
    var listItem = document.createElement('li');
    var timeSpan = document.createElement('span');
    var noteInput = document.createElement('textarea');
    var divcontainer = document.createElement('div');
    timeSpan.classList.add('time');
    timeSpan.textContent = (i < 10 ? '0' + i : i) + ':00';
    noteInput.classList.add('planner-area');
    noteInput.type = 'text';
    noteInput.placeholder = 'Заметка';
    divcontainer.classList.add('container-planner-area');
    divcontainer.setAttribute('id', 'divPlannerId');
    divcontainer.appendChild(timeSpan);
    divcontainer.appendChild(noteInput);
    listItem.appendChild(divcontainer);
    notesList.appendChild(listItem);
  }
}

var savePlanner = function savePlanner(event) {
  event.preventDefault();
  var plannerInput = document.querySelectorAll("#divPlannerId");
  var plannerText = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = plannerInput[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;
      plannerText += '<li><p class="planner__text"><span id="plannerTime">' + elem.textContent + ':</span>    ' + elem.querySelector('.planner-area').value + '</p>' + '</li>';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var plannerHeader = document.querySelector("#plannerHeader").value;

  if (plannerHeader === '') {
    alert('Введите заголово!');
  } else {
    var serverURL = "http://localhost:8080/api/note/create";
    fetch(serverURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: plannerHeader,
        text: plannerText,
        name_user: localStorage.getItem('username')
      })
    }).then(function (response) {
      if (response.status) {
        alert("Заметка создана!");
        window.location = "main_page.html";
      } else {
        alert("Заметка не создана?!");
      }
    })["catch"](function (error) {
      alert("Ошибочка: ", error);
    });
    var popup = document.querySelector("#popupPlanner");
    popup.style.display = "none";
  }
};

document.querySelector("#savePopupPlanner").addEventListener("click", savePlanner);

var saveBrain = function saveBrain(event) {
  event.preventDefault();
  var brainHeader = document.querySelector("#brainHeader").value;
  var brainText = document.querySelector("#brain_notes").innerHTML;

  if (brainHeader === '') {
    alert('Введите заголовок!');
  } else {
    var serverURL = "http://localhost:8080/api/note/create";
    fetch(serverURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: brainHeader,
        text: brainText,
        name_user: localStorage.getItem('username')
      })
    }).then(function (response) {
      if (response.status) {
        alert("Заметка создана!");
        window.location = "main_page.html";
      } else {
        alert("Заметка не создана?!");
      }
    })["catch"](function (error) {
      alert("Ошибочка: ", error);
    });
    document.querySelector("#popupBrain").style.display = "none";
  }
};

document.querySelector("#savePopupBrain").addEventListener("click", saveBrain);
document.getElementById('add_brain_note').addEventListener('click', function (event) {
  event.preventDefault();
  var notes = document.getElementById('brain_notes');
  createAndAppendNoteItem(notes);
});

function createAndAppendNoteItem(parentNode) {
  var inputNote = document.getElementById('input_brain_note');
  var newNote = document.createElement('li');
  newNote.className = 'note_brain';
  newNote.innerText = inputNote.value;
  var noteControls = document.createElement('div');
  noteControls.className = 'note-controls-brain';
  var addChildButton = document.createElement('button');
  addChildButton.className = 'add-child-brain';
  addChildButton.innerText = 'Добавить потомка';

  addChildButton.onclick = function (event) {
    event.preventDefault();
    var childrenList = createAndAppendChildrenList(newNote);
    createAndAppendNoteItem(childrenList);
  };

  var deleteButton = document.createElement('button');
  deleteButton.className = 'delete-brain';
  deleteButton.innerText = 'Удалить';

  deleteButton.onclick = function (event) {
    event.preventDefault();
    parentNode.removeChild(newNote);
  };

  noteControls.appendChild(addChildButton);
  noteControls.appendChild(deleteButton);
  newNote.appendChild(noteControls);
  parentNode.appendChild(newNote);
  inputNote.value = '';
}

function createAndAppendChildrenList(parentNote) {
  var childrenList = parentNote.querySelector('ul');

  if (!childrenList) {
    childrenList = document.createElement('ul');
    childrenList.className = 'note-children-brain';
    parentNote.appendChild(childrenList);
  }

  return childrenList;
}