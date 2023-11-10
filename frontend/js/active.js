async function getData() {
    try {
      const url = "http://localhost:8080/api/note/active?name=" + localStorage.getItem('username');
      const response = await fetch(url);
      const data = await response.json();
      alert(data)
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
    document.querySelector("#headerNote").innerHTML = name;
    if (txt){
      if (txt.includes('')){

      } else {
        const popup = document.querySelector("#popupNotes");
        const noteText = document.querySelector("#note-text");
        noteText.value = txt;
        popup.style.display = "flex";
      }
    } else {
      const popup = document.querySelector("#popupNotes");
      popup.style.display = "flex";
    }
  }
document.querySelector("#closePopup").addEventListener("click", function() {
  document.querySelector("#popupTask").classList.add("hidden");
});

async function init() {
      const notes = await getData();
      alert(notes);
      if (notes) {
        createNotesTable(notes);
      } else {
        alert("Не удалось загрузить заметки");
      }
  }
    
init();