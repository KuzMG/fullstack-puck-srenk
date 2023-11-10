async function getData() {
  try {
    const url = "http://localhost:8080/api/note/completed?name=" + localStorage.getItem('username');
    const response = await fetch(url);
    const data = await response.json();
    alert(data)
    return data;
  } catch (error) {
    console.error(error);
  }
}
  
function createNotesTable(notes) {
    const tableBody = document.querySelector(".history__container");
    
    notes.forEach((note) => {
      const nameCell = document.createElement("div");
      nameCell.classList.add("grid-item");
      nameCell.innerText = note.name;
  
      const createdAtCell = document.createElement("div");
      createdAtCell.classList.add("grid-item");
      createdAtCell.innerText = note.first_date.split('T')[0];
      
      const dueDateCell = document.createElement("div");
      dueDateCell.classList.add("grid-item");
      dueDateCell.innerText = note.last_date.split('T')[0];
  
      const openButton = document.createElement("button");
      openButton.classList.add("button-item");
      openButton.innerText = "Открыть";
      openButton.addEventListener("click", () => openNote(note.name, note.id, note.txt));

      tableBody.appendChild(nameCell);
      tableBody.appendChild(createdAtCell);
      tableBody.appendChild(dueDateCell);
      tableBody.appendChild(openButton);
    });
}
  
  function openNote(name, id, txt) {
    document.querySelector("#popup").classList.remove("hidden");
    document.querySelector("#headerNote").innerHTML = name;
    document.querySelector("#forText").innerHTML = txt;
  }
  
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


document.querySelector("#closePopup").addEventListener("click", function() {
  document.querySelector("#popup").classList.add("hidden");
});
