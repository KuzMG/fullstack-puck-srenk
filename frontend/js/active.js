async function getData() {
  try {
    const url = "http://localhost:8080/api/note/active?name=" + localStorage.getItem('username');
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function getDataSort(field, trend) {
  try {
    let url = "http://localhost:8080/api/note/active/sortered?name=" + localStorage.getItem('username');
    url += "&field=" + field + "&trend=" + trend
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


function createNotesTable(notes) {
    const tableBody = document.querySelector(".active__container");
    notes.forEach((note) => {
      const nameCell = document.createElement("div");
      nameCell.classList.add("grid-item");
      const aButton = document.createElement("div");
      aButton.classList.add("button-item");
      aButton.innerHTML = note.name;
      aButton.addEventListener("click", () => openNote(note.name, note.id, note.txt));
      nameCell.appendChild(aButton);
  
      const createdAtCell = document.createElement("div");
      createdAtCell.classList.add("grid-item");
      createdAtCell.innerText = note.first_date.split('T')[0];

      tableBody.appendChild(nameCell);
      tableBody.appendChild(createdAtCell);
    });
}


function openNote(name, id, txt) {
  if (txt){
    if (txt.includes('<ul id="todo-list">')){    
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
    } else if (txt.includes('<li class="note_brain">')){
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

document.querySelector("#closePopup").addEventListener("click", function(event) {
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
      nodes[i+1].style.display = "block";
    } else {
      nodes[i].style.display = "none";
      nodes[i+1].style.display = "none";
    }
  }
}

document.querySelector("#button_for_sort_name").addEventListener("click", async function(event) {
  event.preventDefault();
  if (document.querySelector("#button_for_sort_name").value == "1"){
    document.querySelector("#button_for_sort_name").value = "2"
    document.querySelector("#button_for_sort_name").innerText = "имя↓"
    const notes = await getDataSort("name", "ASC");
    if (notes) {
      var nodes = document.getElementsByClassName('grid-item');
      for (i = nodes.length-1; i > 3; i -= 1) {
        nodes[i].remove();
      }
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
  } else {
    document.querySelector("#button_for_sort_name").value = "1"
    document.querySelector("#button_for_sort_name").innerText = "имя↑"
    const notes = await getDataSort("name", "DESC");
    if (notes) {
      var nodes = document.getElementsByClassName('grid-item');
      for (i = nodes.length-1; i > 3; i -= 1) {
        nodes[i].remove();
      }
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
  }
});

document.querySelector("#button_for_sort_date").addEventListener("click", async function(event) {
  event.preventDefault();
  if (document.querySelector("#button_for_sort_date").value == "1"){
    document.querySelector("#button_for_sort_date").value = "2"
    document.querySelector("#button_for_sort_date").innerText = "дата↓"
    const notes = await getDataSort("id", "ASC");
    if (notes) {
      var nodes = document.getElementsByClassName('grid-item');
      for (i = nodes.length-1; i > 3; i -= 1) {
        nodes[i].remove();
      }
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
  } else {
    document.querySelector("#button_for_sort_date").value = "1"
    document.querySelector("#button_for_sort_date").innerText = "дата↑"
    const notes = await getDataSort("id", "DESC");
    if (notes) {
      var nodes = document.getElementsByClassName('grid-item');
      for (i = nodes.length-1; i > 3; i -= 1) {
        nodes[i].remove();
      }
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
  }
});

async function init() {
    if (localStorage.getItem('theme') == 'dark'){
        document.querySelector('body').classList.add('dark-theme');
      } 
    const notes = await getData();
    if (notes) {
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
}

function createTodoOldItem(text) {
const tags = text.split('>');
for (let i = 0; i < (tags.length-1)/7; i++){
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  let flag = false;
  for (let j = 0; j < 7; j++) {
    let item = tags[i*7+j];
    if (item.includes('class="checked"')){
      flag = true;
    } else if (item.includes('<span')) {
    }
  }
  let item = tags[i*7+3];
  if (flag){
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.addEventListener("change", function () {
      todoText.classList.toggle("checked");
    });
    todoItem.appendChild(checkbox);
    const todoText = document.createElement("span");
    todoText.classList.add("checked");
    todoText.textContent = item.slice(0, -6);
    todoItem.appendChild(todoText);
  } else {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      todoText.classList.toggle("checked");
    });
    todoItem.appendChild(checkbox);
    const todoText = document.createElement("span");
    todoText.textContent = item.slice(0, -6);
    todoItem.appendChild(todoText);
  }

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "×";
  todoItem.appendChild(deleteButton);

  deleteButton.addEventListener("click", function () {
       todoItem.remove();
  });
  document.getElementById("todo-list").appendChild(todoItem);
}
}

function createBrainOldItem(){

let add_btns = document.querySelectorAll('.add-child-brain');
let del_btns = document.querySelectorAll('.delete-brain');
alert(add_btns.length);
add_btns.forEach((btn) => {
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    const childrenList = createAndAppendChildrenList(btn.parentNode.parentNode);
    createAndAppendNoteItem(childrenList)
  })
})
del_btns.forEach((btn) => {
  btn.addEventListener('click',function(event) {
    event.preventDefault();
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
  })
})
}

function createPlannerOldItem(text){
const notesList = document.querySelector('.planner-list');
notesList.innerHTML = '';
let text_data = text.split('</p>').slice(0, 24);
text_data = text_data.map((data) => data.split('</span>').slice(1));

for (let i = 0; i < 24; i++) {
    const listItem = document.createElement('li');
    const timeSpan = document.createElement('span');
    const noteInput = document.createElement('textarea');
    const divcontainer = document.createElement('div');
    
    timeSpan.classList.add('time');
    timeSpan.textContent = (i < 10 ? '0' + i : i) + ':00';
    noteInput.classList.add('planner-area');
    noteInput.type = 'text';
    noteInput.value = text_data[i];
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

let serverURL = "http://localhost:8080/api/note/delete";
serverURL += "?note=" + document.querySelector("#deletePopupNotes").value;
fetch(serverURL, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status == 200) {
        alert("Заметка удалена!");
        location.reload();
      } else {
        alert("Заметка не удалена?!");
      }
    })
    .catch((error) => {
      alert("Ошибочка: ", error);
    });

document.querySelector("#popupNotes").display = "none";
});

document.querySelector("#deletePopupPlanner").addEventListener("click", function (event) {
event.preventDefault();

let serverURL = "http://localhost:8080/api/note/delete";
serverURL += "?note=" + document.querySelector("#deletePopupPlanner").value;
fetch(serverURL, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status == 200) {
        alert("Заметка удалена!");
        location.reload();
      } else {
        alert("Заметка не удалена?!");
      }
    })
    .catch((error) => {
      alert("Ошибочка: ", error);
    });

document.querySelector("#popupPlanner").display = "none";
});

document.querySelector("#archiveToDo").addEventListener("click", function (event) {
event.preventDefault();

let serverURL = "http://localhost:8080/api/note/change/status";
serverURL += "?note=" + document.querySelector("#archiveToDo").value;
fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status == 200) {
        alert("Заметка архивирована!");
        location.reload();
      } else {
        alert("Заметка не архивирована?!");
      }
    })
    .catch((error) => {
      alert("Ошибочка: ", error);
    });

document.querySelector("#popupToDo").display = "none";
});


document.querySelector("#deletePopupBrain").addEventListener("click", function (event) {
event.preventDefault();

let serverURL = "http://localhost:8080/api/note/delete";
serverURL += "?note=" + document.querySelector("#deletePopupBrain").value;
fetch(serverURL, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status == 200) {
        alert("Заметка удалена!");
        location.reload();
      } else {
        alert("Заметка не удалена?!");
      }
    })
    .catch((error) => {
      alert("Ошибочка: ", error);
    });

document.querySelector("#popupBrain").display = "none";
});

document.querySelector("#deleteToDo").addEventListener("click", function (event) {
event.preventDefault();

let serverURL = "http://localhost:8080/api/note/delete";
serverURL += "?note=" + document.querySelector("#deleteToDo").value;
fetch(serverURL, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status == 200) {
        alert("Заметка удалена!");
        location.reload();
      } else {
        alert("Заметка не удалена?!");
      }
    })
    .catch((error) => {
      alert("Ошибочка: ", error);
    });

document.querySelector("#popupToDo").display = "none";
});


document.querySelector("#archivePopupBrain").addEventListener("click", function (event) {
event.preventDefault();

let serverURL = "http://localhost:8080/api/note/change/status";
serverURL += "?note=" + document.querySelector("#archivePopupBrain").value;
fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status == 200) {
        alert("Заметка архивирована!");
        location.reload();
      } else {
        alert("Заметка не архивирована?!");
      }
    })
    .catch((error) => {
      alert("Ошибочка: ", error);
    });

document.querySelector("#popupBrain").display = "none";
});

document.querySelector("#archivePopupNotes").addEventListener("click", function (event) {
event.preventDefault();

let serverURL = "http://localhost:8080/api/note/change/status";
serverURL += "?note=" + document.querySelector("#archivePopupNotes").value;
fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status == 200) {
        alert("Заметка архивирована!");
        location.reload();
      } else {
        alert("Заметка не архивирована?!");
      }
    })
    .catch((error) => {
      alert("Ошибочка: ", error);
    });

document.querySelector("#popupNotes").display = "none";
});

document.querySelector("#archivePopupPlanner").addEventListener("click", function (event) {
event.preventDefault();

let serverURL = "http://localhost:8080/api/note/change/status";
serverURL += "?note=" + document.querySelector("#archivePopupPlanner").value;
fetch(serverURL, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status == 200) {
        alert("Заметка архивирована!");
        location.reload();
      } else {
        alert("Заметка не архивирована?!");
      }
    })
    .catch((error) => {
      alert("Ошибочка: ", error);
    });

document.querySelector("#popupPlanner").display = "none";
});

const updateToDo = 
  function (event) {
    event.preventDefault();

    const todoInput = document.getElementById("todo-list");
    const todoText = todoInput.outerHTML;

    let serverURL = "http://localhost:8080/api/note/change/text";
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
    })
        .then((response) => {
          if (response.status == 200) {
            alert("Заметка обновлена!");
            location.reload();
          } else {
            alert("Заметка не обновлена?!");
          }
        })
        .catch((error) => {
          alert("Ошибочка: ", error);
        });

    document.querySelector("#popupToDo").display = "none";}

const updateNote = 
  function (event) {
    event.preventDefault();

    let serverURL = "http://localhost:8080/api/note/change/text";
    serverURL += "?note=" + document.querySelector("#savePopupNotes").value;
    const noteText = document.querySelector("#note-text").value;
    fetch(serverURL, {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: noteText
      })
    })
        .then((response) => {
          if (response.status == 200) {
            alert("Заметка обновлена!");
            location.reload();
          } else {
            alert("Заметка не обновлена?!");
          }
        })
        .catch((error) => {
          alert("Ошибочка: ", error);
        });

    document.querySelector("#popupNotes").display = "none";}

const updatePlanner = 
    function (event) {
      event.preventDefault();

      let serverURL = "http://localhost:8080/api/note/change/text";
      serverURL += "?note=" + document.querySelector("#savePopupPlanner").value;
      const plannerInput = document.querySelectorAll("#divPlannerId");
      let plannerText = ''
      for (let elem of plannerInput) {
        plannerText += '<li><p class="planner__text"><span id="plannerTime">' + elem.textContent + ':</span>    ' + elem.querySelector('.planner-area').value + '</p>' + '</li>';
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
      })
          .then((response) => {
            if (response.status == 200) {
              alert("Заметка обновлена!");
              location.reload();
            } else {
              alert("Заметка не обновлена?!");
            }
          })
          .catch((error) => {
            alert("Ошибочка: ", error);
          });

      document.querySelector("#popupPlanner").display = "none";}

const updateBrain = 
      function (event) {
        event.preventDefault();
  
        let serverURL = "http://localhost:8080/api/note/change/text";
        serverURL += "?note=" + document.querySelector("#savePopupBrain").value;
        const brainText = document.querySelector("#brain_notes").innerHTML;
        fetch(serverURL, {
          method: "put",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: brainText
          })
        })
            .then((response) => {
              if (response.status == 200) {
                alert("Заметка обновлена!");
                location.reload();
              } else {
                alert("Заметка не обновлена?!");
              }
            })
            .catch((error) => {
              alert("Ошибочка: ", error);
            });
  
        document.querySelector("#popupBrain").display = "none";}        
    
init();