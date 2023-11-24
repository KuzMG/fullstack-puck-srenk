"use strict";

function getData() {
  var url, response, data;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          url = "http://localhost:8080/api/note/completed?name=" + localStorage.getItem('username');
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
          url = "http://localhost:8080/api/note/completed/sortered?name=" + localStorage.getItem('username');
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
  var tableBody = document.querySelector(".history__container");
  notes.forEach(function (note) {
    var nameCell = document.createElement("div");
    nameCell.classList.add("grid-item");
    nameCell.innerText = note.name;
    var createdAtCell = document.createElement("div");
    createdAtCell.classList.add("grid-item");
    createdAtCell.innerText = note.first_date.split('T')[0];
    var dueDateCell = document.createElement("div");
    dueDateCell.classList.add("grid-item");
    dueDateCell.innerText = note.last_date.split('T')[0];
    var buttonAtCell = document.createElement("div");
    buttonAtCell.classList.add("grid-item");
    var openButton = document.createElement("button");
    openButton.classList.add("button-item");
    openButton.innerText = "Открыть";
    openButton.addEventListener("click", function () {
      return openNote(note.name, note.txt);
    });
    buttonAtCell.appendChild(openButton);
    tableBody.appendChild(nameCell);
    tableBody.appendChild(createdAtCell);
    tableBody.appendChild(dueDateCell);
    tableBody.appendChild(buttonAtCell);
  });
}

function openNote(name, txt) {
  document.querySelector("#popupArchive").style.display = 'flex';
  document.querySelector("#headerNote").innerHTML = name;
  var pattern = '<div class="note-controls-brain"><button class="add-child-brain">Добавить потомка</button><button class="delete-brain">Удалить</button></div>';
  var newtxt = txt.replaceAll(pattern, '');
  document.querySelector("#forText").innerHTML = newtxt;
}

function init() {
  var notes;
  return regeneratorRuntime.async(function init$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (localStorage.getItem('theme') == 'dark') {
            document.querySelector('body').classList.add('dark-theme');
          }

          _context3.next = 3;
          return regeneratorRuntime.awrap(getData());

        case 3:
          notes = _context3.sent;

          if (notes) {
            createNotesTable(notes);
          } else {
            alert("Не удалось загрузить заметки");
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

init();

function myFunction() {
  var input = document.getElementById("text-to-find");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('grid-item');

  for (i = 8; i < nodes.length; i += 4) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "block";
      nodes[i + 1].style.display = "block";
      nodes[i + 2].style.display = "block";
      nodes[i + 3].style.display = "block";
    } else {
      nodes[i].style.display = "none";
      nodes[i + 1].style.display = "none";
      nodes[i + 2].style.display = "none";
      nodes[i + 3].style.display = "none";
    }
  }
}

document.querySelector("#button_for_sort_name").addEventListener("click", function _callee(event) {
  var notes, nodes, _notes;

  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          event.preventDefault();

          if (!(document.querySelector("#button_for_sort_name").value == "1")) {
            _context4.next = 10;
            break;
          }

          document.querySelector("#button_for_sort_name").value = "2";
          document.querySelector("#button_for_sort_name").innerText = "имя↓";
          _context4.next = 6;
          return regeneratorRuntime.awrap(getDataSort("name", "ASC"));

        case 6:
          notes = _context4.sent;

          if (notes) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 7; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(notes);
          } else {
            alert("Не удалось загрузить заметки");
          }

          _context4.next = 16;
          break;

        case 10:
          document.querySelector("#button_for_sort_name").value = "1";
          document.querySelector("#button_for_sort_name").innerText = "имя↑";
          _context4.next = 14;
          return regeneratorRuntime.awrap(getDataSort("name", "DESC"));

        case 14:
          _notes = _context4.sent;

          if (_notes) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 7; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(_notes);
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
document.querySelector("#button_for_sort_date").addEventListener("click", function _callee2(event) {
  var notes, nodes, _notes2;

  return regeneratorRuntime.async(function _callee2$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          event.preventDefault();

          if (!(document.querySelector("#button_for_sort_date").value == "1")) {
            _context5.next = 10;
            break;
          }

          document.querySelector("#button_for_sort_date").value = "2";
          document.querySelector("#button_for_sort_date").innerText = "создание↓";
          _context5.next = 6;
          return regeneratorRuntime.awrap(getDataSort("id", "ASC"));

        case 6:
          notes = _context5.sent;

          if (notes) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 7; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(notes);
          } else {
            alert("Не удалось загрузить заметки");
          }

          _context5.next = 16;
          break;

        case 10:
          document.querySelector("#button_for_sort_date").value = "1";
          document.querySelector("#button_for_sort_date").innerText = "создание↑";
          _context5.next = 14;
          return regeneratorRuntime.awrap(getDataSort("name", "DESC"));

        case 14:
          _notes2 = _context5.sent;

          if (_notes2) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 7; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(_notes2);
          } else {
            alert("Не удалось загрузить заметки");
          }

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  });
});
document.querySelector("#button_for_sort_last").addEventListener("click", function _callee3(event) {
  var notes, nodes, _notes3;

  return regeneratorRuntime.async(function _callee3$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          event.preventDefault();

          if (!(document.querySelector("#button_for_sort_last").value == "1")) {
            _context6.next = 10;
            break;
          }

          document.querySelector("#button_for_sort_last").value = "2";
          document.querySelector("#button_for_sort_last").innerText = "выполнение↓";
          _context6.next = 6;
          return regeneratorRuntime.awrap(getDataSort("last_date", "ASC"));

        case 6:
          notes = _context6.sent;

          if (notes) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 7; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(notes);
          } else {
            alert("Не удалось загрузить заметки");
          }

          _context6.next = 16;
          break;

        case 10:
          document.querySelector("#button_for_sort_last").value = "1";
          document.querySelector("#button_for_sort_last").innerText = "выполнение↑";
          _context6.next = 14;
          return regeneratorRuntime.awrap(getDataSort("last_date", "DESC"));

        case 14:
          _notes3 = _context6.sent;

          if (_notes3) {
            nodes = document.getElementsByClassName('grid-item');

            for (i = nodes.length - 1; i > 7; i -= 1) {
              nodes[i].remove();
            }

            createNotesTable(_notes3);
          } else {
            alert("Не удалось загрузить заметки");
          }

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  });
});
document.querySelector("#closeArchive").addEventListener("click", function () {
  document.querySelector("#popupArchive").style.display = 'none';
});