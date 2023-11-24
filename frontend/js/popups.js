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

const saveNote = 
  function (event) {
    event.preventDefault();

    const header = document.querySelector("#notesHeader").value;
    const noteText = document.querySelector("#note-text").value;

    if (header === ''){
      alert('Введите заголовок!')
    } else {
      const serverURL = "http://localhost:8080/api/note/create"; 
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
      })
        .then((response) => {
          if (response.status) {
            alert("Заметка создана!");
            window.location = "main_page.html";
          } else {
            alert("Заметка не создана?!");
          }
        })
        .catch((error) => {
          alert("Ошибочка: ", error);
        });

    const popup = document.querySelector("#popupNotes");
    popup.style.display = "none";
    }
  };

document.querySelector("#savePopupNotes").addEventListener("click", saveNote);

document.getElementById("todoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const todoInput = document.getElementById("todo-input");
    const todoText = todoInput.value.trim();

    if (todoText) {
        const todoItem = createTodoItem(todoText);
        document.getElementById("todo-list").appendChild(todoItem);
        todoInput.value = "";
    }
});

const saveToDo = 
  function () {
    const todoInput = document.getElementById("todo-list");
    const header = document.querySelector("#todosHeader").value;
    const todoText = todoInput.outerHTML;
    
    if (header === ''){
      alert('Введите заголовок!')
    } else {
      const serverURL = "http://localhost:8080/api/note/create"; 
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
        })
          .then((response) => {
            if (response.status) {
              alert("Заметка создана!");
              window.location = "main_page.html";
            } else {
              alert("Заметка не создана?!");
            }
          })
          .catch((error) => {
            alert("Ошибочка: ", error);
          });
  
      const popup = document.querySelector("#popupToDo");
      popup.style.display = "none";
    }
  }

document.querySelector("#submitToDo").addEventListener("click", saveToDo);


function createTodoItem(text) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    todoItem.appendChild(checkbox);

    const todoText = document.createElement("span");
    todoText.textContent = text;
    todoItem.appendChild(todoText);

    checkbox.addEventListener("change", function () {
        todoText.classList.toggle("checked");
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "×";
    todoItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
        todoItem.remove();
    });

    return todoItem;
}

function createPlanner(){
  const notesList = document.querySelector('.planner-list');
  notesList.innerHTML = '';

  for (let i = 0; i < 24; i++) {
      const listItem = document.createElement('li');
      const timeSpan = document.createElement('span');
      const noteInput = document.createElement('textarea');
      const divcontainer = document.createElement('div');
      
  
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

const savePlanner = 
  function (event) {
  event.preventDefault();
  const plannerInput = document.querySelectorAll("#divPlannerId");
  let plannerText = ''
  for (let elem of plannerInput) {
    plannerText += '<li><p class="planner__text"><span id="plannerTime">' + elem.textContent + ':</span>    ' + elem.querySelector('.planner-area').value + '</p>' + '</li>';
  }
  const plannerHeader = document.querySelector("#plannerHeader").value;
  if (plannerHeader === ''){
    alert('Введите заголово!')
  } else {
    const serverURL = "http://localhost:8080/api/note/create"; 
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
      })
        .then((response) => {
          if (response.status) {
            alert("Заметка создана!");
            window.location = "main_page.html";
          } else {
            alert("Заметка не создана?!");
          }
        })
        .catch((error) => {
          alert("Ошибочка: ", error);
        });
  
    const popup = document.querySelector("#popupPlanner");
    popup.style.display = "none";
  }
}

document.querySelector("#savePopupPlanner").addEventListener("click", savePlanner);

const saveBrain = 
  function (event) {
    event.preventDefault();
    const brainHeader = document.querySelector("#brainHeader").value;
    const brainText = document.querySelector("#brain_notes").innerHTML;

    if (brainHeader === ''){
      alert('Введите заголовок!')
    } else {
      const serverURL = "http://localhost:8080/api/note/create"; 
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
        })
          .then((response) => {
            if (response.status) {
              alert("Заметка создана!");
              window.location = "main_page.html";
            } else {
              alert("Заметка не создана?!");
            }
          })
          .catch((error) => {
            alert("Ошибочка: ", error);
          });
  
      document.querySelector("#popupBrain").style.display = "none";
    }
  }

document.querySelector("#savePopupBrain").addEventListener("click", saveBrain);


document.getElementById('add_brain_note').addEventListener('click', (event) => {
    event.preventDefault();
    const notes = document.getElementById('brain_notes');
    
    createAndAppendNoteItem(notes);
});

function createAndAppendNoteItem(parentNode) {
    const inputNote = document.getElementById('input_brain_note');
    
    const newNote = document.createElement('li');
    newNote.className = 'note_brain';
    newNote.innerText = inputNote.value;
    
    const noteControls = document.createElement('div');
    noteControls.className = 'note-controls-brain';

    const addChildButton = document.createElement('button');
    addChildButton.className = 'add-child-brain';
    addChildButton.innerText = 'Добавить потомка';
    addChildButton.onclick = (event) => {
      event.preventDefault();
        const childrenList = createAndAppendChildrenList(newNote);
        createAndAppendNoteItem(childrenList)
    };
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-brain';
    deleteButton.innerText = 'Удалить';
    deleteButton.onclick = (event) => {
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
    let childrenList = parentNote.querySelector('ul');

    if (!childrenList) {
        childrenList = document.createElement('ul');
        childrenList.className = 'note-children-brain';
        parentNote.appendChild(childrenList);
    }
    return childrenList;
}