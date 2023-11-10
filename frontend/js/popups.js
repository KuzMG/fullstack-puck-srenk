// let buttonsOpen = document.querySelectorAll("#openNotes");
// for(let button of buttonsOpen){
//     button.addEventListener("click", function () {
//         const popup = document.querySelector("#popupNotes");
//         popup.style.display = "flex";
//     });
// };

document.querySelector("#openNotes").addEventListener("click", function () {
    const popup = document.querySelector("#popupNotes");
    popup.style.display = "flex";
});
document.querySelector("#openToDo").addEventListener("click", function () {
    const popup = document.querySelector("#popupToDo");
    popup.style.display = "flex";
});
document.querySelector("#openPlanner").addEventListener("click", function () {
    const popup = document.querySelector("#popupPlanner");
    popup.style.display = "flex";
});

// let buttonsClose = document.querySelectorAll("#closePopupNotes");
// for(let button of buttonsClose){
//     button.addEventListener("click", function () {
//         const popup = document.querySelector("#popupNotes");
//         popup.style.display = "none";
//     });
// };
document.querySelector("#closePopupNotes").addEventListener("click", function () {
    const popup = document.querySelector("#popupNotes");
    popup.style.display = "none";
});
document.querySelector("#closePopupToDo").addEventListener("click", function () {
    const popup = document.querySelector("#popupToDo");
    popup.style.display = "none";
});
document.querySelector("#closePopupPlanner").addEventListener("click", function () {
    const popup = document.querySelector("#popupPlanner");
    popup.style.display = "none";
});

// let buttonsForm = document.querySelectorAll("#notesForm");
// for(let button of buttonsForm){
//     button.addEventListener("submitNotes", function () {
//         event.preventDefault();
//         const noteText = document.querySelector("#note-text").value;

//         // Do something with the note text (e.g., save to local storage, send to server, etc.)
//         alert("Текст:", noteText);
        
//         // Close the popup after saving the note
//         const popup = document.querySelector("#popupNotes");
//         popup.style.display = "none";
//     });
// };
document.querySelector("#notesForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const header = document.querySelector("#notesHeader").value;
    const noteText = document.querySelector("#note-text").value;

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
});

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

document.querySelector("#submitToDo").addEventListener("click", function () {
    const todoInput = document.getElementById("todo-list");
    const header = document.querySelector("#todosHeader").value;
    const todoText = todoInput.outerHTML;

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
});

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


const notesList = document.querySelector('.planner-list');

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

document.querySelector("#plannerForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const plannerInput = document.querySelectorAll("#divPlannerId");
  let plannerText = ''
  for (let elem of plannerInput) {
    plannerText += '<li><p class="planner__text"><span id="plannerTime">' + elem.textContent + ':</span>    ' + elem.querySelector('.planner-area').value + '</p>' + '</li>';
  }
  const plannerHeader = document.querySelector("#plannerHeader").value;
  
  alert(plannerText);
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
});



// document.querySelector("#registration").addEventListener("submit", function(e) {
//     e.preventDefault();
  

//     const serverURL = "http://localhost:8080/api/note/active?name=asdasd"; 
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open("GET", serverURL, false); // true for asynchronous 
//     xmlHttp.send(null);
//     for(let xml of xmlHttp.responseText.split(',')){
//         alert(xml)
//     }});