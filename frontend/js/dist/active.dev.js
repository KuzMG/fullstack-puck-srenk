"use strict";

function getData() {
  var url, response, data;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          url = "http://localhost:8080/api/note/active?name=" + localStorage.getItem('username');
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(url));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function getDataSort(field, trend) {
  var url, response, data;
  return regeneratorRuntime.async(function getDataSort$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          url = "http://localhost:8080/api/note/active/sortered?name=" + localStorage.getItem('username');
          url += "&field=" + field + "&trend=" + trend;
          _context2.next = 5;
          return regeneratorRuntime.awrap(fetch(url));

        case 5:
          response = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context2.sent;
          return _context2.abrupt("return", data);

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function createNotesTable(notes) {
  var tableBody = document.querySelector(".active__container");
  notes.forEach(function (note) {
    var nameCell = document.createElement("div");
    nameCell.classList.add("grid-item");
    var aButton = document.createElement("div");
    aButton.classList.add("button-item");
    aButton.innerHTML = note.name;
    aButton.addEventListener("click", function () {
      return openNote(note.name, note.id, note.txt);
    });
    nameCell.appendChild(aButton);
    var createdAtCell = document.createElement("div");
    createdAtCell.classList.add("grid-item");
    createdAtCell.innerText = note.first_date.split('T')[0];
    tableBody.appendChild(nameCell);
    tableBody.appendChild(createdAtCell);
  });
}

function openNote(name, id, txt) {
  if (txt) {
    if (txt.includes('<ul id="todo-list">')) {
      document.querySelector("#todosHeader").value = name;
      createTodoOldItem(txt.slice(19, -5));
      document.querySelector("#deleteToDo").value = id;
      document.querySelector("#archiveToDo").value = id;
      document.querySelector("#submitToDo").value = id;
      document.querySelector("#submitToDo").textContent = "Обновить заметку";
      document.querySelector("#submitToDo").removeEventListener("click", saveToDo);
      document.querySelector("#submitToDo").addEventListener("click", updateToDo);
      document.querySelector("#popupToDo").style.display = "flex";
      document.querySelector("#deleteToDo").style.display = "flex";
      document.querySelector("#archiveToDo").style.display = "flex";
    } else if (txt.includes('<p class="planner__text">')) {
      document.querySelector("#plannerHeader").value = name;
      createPlannerOldItem(txt);
      document.querySelector("#deletePopupPlanner").value = id;
      document.querySelector("#archivePopupPlanner").value = id;
      document.querySelector("#savePopupPlanner").value = id;
      document.querySelector("#savePopupPlanner").textContent = "Обновить заметку";
      document.querySelector("#savePopupPlanner").removeEventListener("click", savePlanner);
      document.querySelector("#savePopupPlanner").addEventListener("click", updatePlanner);
      document.querySelector("#popupPlanner").style.display = "flex";
      document.querySelector("#deletePopupPlanner").style.display = "flex";
      document.querySelector("#archivePopupPlanner").style.display = "flex";
    } else if (txt.includes('<li class="note_brain">')) {
      document.querySelector("#brainHeader").value = name;
      document.querySelector("#brain_notes").innerHTML = txt;
      createBrainOldItem();
      document.querySelector("#deletePopupBrain").value = id;
      document.querySelector("#archivePopupBrain").value = id;
      document.querySelector("#savePopupBrain").value = id;
      document.querySelector("#savePopupBrain").textContent = "Обновить заметку";
      document.querySelector("#savePopupBrain").removeEventListener("click", saveBrain);
      document.querySelector("#savePopupBrain").addEventListener("click", updateBrain);
      document.querySelector("#popupBrain").style.display = "flex";
      document.querySelector("#deletePopupBrain").style.display = "flex";
      document.querySelector("#archivePopupBrain").style.display = "flex";
    } else {
      document.querySelector("#notesHeader").value = name;
      document.querySelector("#note-text").value = txt;
      document.querySelector("#deletePopupNotes").value = id;
      document.querySelector("#archivePopupNotes").value = id;
      document.querySelector("#savePopupNotes").value = id;
      document.querySelector("#savePopupNotes").removeEventListener("click", saveNote);
      document.querySelector("#savePopupNotes").addEventListener("click", updateNote);
      document.querySelector("#savePopupNotes").textContent = "Обновить заметку";
      document.querySelector("#popupNotes").style.display = "flex";
      document.querySelector("#deletePopupNotes").style.display = "flex";
      document.querySelector("#archivePopupNotes").style.display = "flex";
    }
  } else {
    document.querySelector("#notesHeader").value = name;
    document.querySelector("#note-text").value = txt;
    document.querySelector("#deletePopupNotes").value = id;
    document.querySelector("#archivePopupNotes").value = id;
    document.querySelector("#savePopupNotes").value = id;
    document.querySelector("#savePopupNotes").removeEventListener("click", saveNote);
    document.querySelector("#savePopupNotes").addEventListener("click", updateNote);
    document.querySelector("#savePopupNotes").textContent = "Обновить заметку";
    document.querySelector("#popupNotes").style.display = "flex";
    document.querySelector("#deletePopupNotes").style.display = "flex";
    document.querySelector("#archivePopupNotes").style.display = "flex";
  }
}

document.querySelector("#closePopup").addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector("#popupTask").classList.add("hidden");
});

function myFunction() {
  var input = document.getElementById("text-to-find");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('grid-item');

  for (i = 4; i < nodes.length; i += 2) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "block";
      nodes[i + 1].style.display = "block";
    } else {
      nodes[i].style.display = "none";
      nodes[i + 1].style.display = "none";
    }
  }
}

document.querySelector("#button_for_sort_name").addEventListener("click", function _callee(event) {
  var notes, nodes, _notes;

  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          event.preventDefault();

          if (!(document.querySelector("#button_for_sort_name").value == "1")) {
            _context3.next = 10;
            break;
          }

          document.querySelector("#button_for_sort_name").value = "2";
          document.querySelector("#button_for_sort_name").innerText = "имя↓";
          _context3.next = 6;
          return regeneratorRuntime.awrap(getDataSort("name", "ASC"));

        case 6:
          notes = _context3.sent;

          if (notes) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 3; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(notes);
          } else {
            alert("Не удалось загрузить заметки");
          }

          _context3.next = 16;
          break;

        case 10:
          document.querySelector("#button_for_sort_name").value = "1";
          document.querySelector("#button_for_sort_name").innerText = "имя↑";
          _context3.next = 14;
          return regeneratorRuntime.awrap(getDataSort("name", "DESC"));

        case 14:
          _notes = _context3.sent;

          if (_notes) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 3; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(_notes);
          } else {
            alert("Не удалось загрузить заметки");
          }

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  });
});
document.querySelector("#button_for_sort_date").addEventListener("click", function _callee2(event) {
  var notes, nodes, _notes2;

  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          event.preventDefault();

          if (!(document.querySelector("#button_for_sort_date").value == "1")) {
            _context4.next = 10;
            break;
          }

          document.querySelector("#button_for_sort_date").value = "2";
          document.querySelector("#button_for_sort_date").innerText = "дата↓";
          _context4.next = 6;
          return regeneratorRuntime.awrap(getDataSort("id", "ASC"));

        case 6:
          notes = _context4.sent;

          if (notes) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 3; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(notes);
          } else {
            alert("Не удалось загрузить заметки");
          }

          _context4.next = 16;
          break;

        case 10:
          document.querySelector("#button_for_sort_date").value = "1";
          document.querySelector("#button_for_sort_date").innerText = "дата↑";
          _context4.next = 14;
          return regeneratorRuntime.awrap(getDataSort("id", "DESC"));

        case 14:
          _notes2 = _context4.sent;

          if (_notes2) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 3; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(_notes2);
          } else {
            alert("Не удалось загрузить заметки");
          }

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
});

function init() {
  var notes;
  return regeneratorRuntime.async(function init$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (localStorage.getItem('theme') == 'dark') {
            document.querySelector('body').classList.add('dark-theme');
          }

          _context5.next = 3;
          return regeneratorRuntime.awrap(getData());

        case 3:
          notes = _context5.sent;

          if (notes) {
            createNotesTable(notes);
          } else {
            alert("Не удалось загрузить заметки");
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function createTodoOldItem(text) {
  var tags = text.split('>');

  var _loop = function _loop(_i) {
    var todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    var flag = false;

    for (var j = 0; j < 7; j++) {
      var _item = tags[_i * 7 + j];

      if (_item.includes('class="checked"')) {
        flag = true;
      } else if (_item.includes('<span')) {}
    }

    var item = tags[_i * 7 + 3];

    if (flag) {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.addEventListener("change", function () {
        todoText.classList.toggle("checked");
      });
      todoItem.appendChild(checkbox);
      var todoText = document.createElement("span");
      todoText.classList.add("checked");
      todoText.textContent = item.slice(0, -6);
      todoItem.appendChild(todoText);
    } else {
      var _checkbox = document.createElement("input");

      _checkbox.type = "checkbox";

      _checkbox.addEventListener("change", function () {
        _todoText.classList.toggle("checked");
      });

      todoItem.appendChild(_checkbox);

      var _todoText = document.createElement("span");

      _todoText.textContent = item.slice(0, -6);
      todoItem.appendChild(_todoText);
    }

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "×";
    todoItem.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
      todoItem.remove();
    });
    document.getElementById("todo-list").appendChild(todoItem);
  };

  for (var _i = 0; _i < (tags.length - 1) / 7; _i++) {
    _loop(_i);
  }
}

function createBrainOldItem() {
  var add_btns = document.querySelectorAll('.add-child-brain');
  var del_btns = document.querySelectorAll('.delete-brain');
  alert(add_btns.length);
  add_btns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      var childrenList = createAndAppendChildrenList(btn.parentNode.parentNode);
      createAndAppendNoteItem(childrenList);
    });
  });
  del_btns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
    });
  });
}

function createPlannerOldItem(text) {
  var notesList = document.querySelector('.planner-list');
  notesList.innerHTML = '';
  var text_data = text.split('</p>').slice(0, 24);
  text_data = text_data.map(function (data) {
    return data.split('</span>').slice(1);
  });

  for (var _i2 = 0; _i2 < 24; _i2++) {
    var listItem = document.createElement('li');
    var timeSpan = document.createElement('span');
    var noteInput = document.createElement('textarea');
    var divcontainer = document.createElement('div');
    timeSpan.classList.add('time');
    timeSpan.textContent = (_i2 < 10 ? '0' + _i2 : _i2) + ':00';
    noteInput.classList.add('planner-area');
    noteInput.type = 'text';
    noteInput.value = text_data[_i2];
    noteInput.placeholder = 'Заметка';
    divcontainer.classList.add('container-planner-area');
    divcontainer.setAttribute('id', 'divPlannerId');
    divcontainer.appendChild(timeSpan);
    divcontainer.appendChild(noteInput);
    listItem.appendChild(divcontainer);
    notesList.appendChild(listItem);
  }
}

document.querySelector("#deletePopupNotes").addEventListener("click", function (event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/delete";
  serverURL += "?note=" + document.querySelector("#deletePopupNotes").value;
  fetch(serverURL, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка удалена!");
      location.reload();
    } else {
      alert("Заметка не удалена?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupNotes").display = "none";
});
document.querySelector("#deletePopupPlanner").addEventListener("click", function (event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/delete";
  serverURL += "?note=" + document.querySelector("#deletePopupPlanner").value;
  fetch(serverURL, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка удалена!");
      location.reload();
    } else {
      alert("Заметка не удалена?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupPlanner").display = "none";
});
document.querySelector("#archiveToDo").addEventListener("click", function (event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/change/status";
  serverURL += "?note=" + document.querySelector("#archiveToDo").value;
  fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка архивирована!");
      location.reload();
    } else {
      alert("Заметка не архивирована?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupToDo").display = "none";
});
document.querySelector("#deletePopupBrain").addEventListener("click", function (event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/delete";
  serverURL += "?note=" + document.querySelector("#deletePopupBrain").value;
  fetch(serverURL, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка удалена!");
      location.reload();
    } else {
      alert("Заметка не удалена?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupBrain").display = "none";
});
document.querySelector("#deleteToDo").addEventListener("click", function (event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/delete";
  serverURL += "?note=" + document.querySelector("#deleteToDo").value;
  fetch(serverURL, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка удалена!");
      location.reload();
    } else {
      alert("Заметка не удалена?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupToDo").display = "none";
});
document.querySelector("#archivePopupBrain").addEventListener("click", function (event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/change/status";
  serverURL += "?note=" + document.querySelector("#archivePopupBrain").value;
  fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка архивирована!");
      location.reload();
    } else {
      alert("Заметка не архивирована?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupBrain").display = "none";
});
document.querySelector("#archivePopupNotes").addEventListener("click", function (event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/change/status";
  serverURL += "?note=" + document.querySelector("#archivePopupNotes").value;
  fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка архивирована!");
      location.reload();
    } else {
      alert("Заметка не архивирована?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupNotes").display = "none";
});
document.querySelector("#archivePopupPlanner").addEventListener("click", function (event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/change/status";
  serverURL += "?note=" + document.querySelector("#archivePopupPlanner").value;
  fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка архивирована!");
      location.reload();
    } else {
      alert("Заметка не архивирована?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupPlanner").display = "none";
});

var updateToDo = function updateToDo(event) {
  event.preventDefault();
  var todoInput = document.getElementById("todo-list");
  var todoText = todoInput.outerHTML;
  var serverURL = "http://localhost:8080/api/note/change/text";
  serverURL += "?note=" + document.querySelector("#submitToDo").value;
  fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: todoText
    })
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка обновлена!");
      location.reload();
    } else {
      alert("Заметка не обновлена?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupToDo").display = "none";
};

var updateNote = function updateNote(event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/change/text";
  serverURL += "?note=" + document.querySelector("#savePopupNotes").value;
  var noteText = document.querySelector("#note-text").value;
  fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: noteText
    })
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка обновлена!");
      location.reload();
    } else {
      alert("Заметка не обновлена?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupNotes").display = "none";
};

var updatePlanner = function updatePlanner(event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/change/text";
  serverURL += "?note=" + document.querySelector("#savePopupPlanner").value;
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

  fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: plannerText
    })
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка обновлена!");
      location.reload();
    } else {
      alert("Заметка не обновлена?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupPlanner").display = "none";
};

var updateBrain = function updateBrain(event) {
  event.preventDefault();
  var serverURL = "http://localhost:8080/api/note/change/text";
  serverURL += "?note=" + document.querySelector("#savePopupBrain").value;
  var brainText = document.querySelector("#brain_notes").innerHTML;
  fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: brainText
    })
  }).then(function (response) {
    if (response.status == 200) {
      alert("Заметка обновлена!");
      location.reload();
    } else {
      alert("Заметка не обновлена?!");
    }
  })["catch"](function (error) {
    alert("Ошибочка: ", error);
  });
  document.querySelector("#popupBrain").display = "none";
};

init();