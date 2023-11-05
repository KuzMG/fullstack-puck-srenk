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

    const noteText = document.querySelector("#note-text").value;

    // Do something with the note text (e.g., save to local storage, send to server, etc.)
    alert("Текст:", noteText);

    // Close the popup after saving the note
    const popup = document.querySelector("#popupNotes");
    popup.style.display = "none";
});

document.getElementById("todo-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const todoInput = document.getElementById("todo-input");
    const todoText = todoInput.value.trim();

    if (todoText) {
        const todoItem = createTodoItem(todoText);
        document.getElementById("todo-list").appendChild(todoItem);
        todoInput.value = "";
    }
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








// document.querySelector("#registration").addEventListener("submit", function(e) {
//     e.preventDefault();
  

//     const serverURL = "http://localhost:8080/api/note/active?name=asdasd"; 
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open("GET", serverURL, false); // true for asynchronous 
//     xmlHttp.send(null);
//     for(let xml of xmlHttp.responseText.split(',')){
//         alert(xml)
//     }});