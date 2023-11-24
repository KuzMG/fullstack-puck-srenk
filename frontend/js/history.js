async function getData() {
  try {
    const url = "http://localhost:8080/api/note/completed?name=" + localStorage.getItem('username');
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function getDataSort(field, trend) {
  try {
    let url = "http://localhost:8080/api/note/completed/sortered?name=" + localStorage.getItem('username');
    url += "&field=" + field + "&trend=" + trend
    const response = await fetch(url);
    const data = await response.json();
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
  
      const buttonAtCell = document.createElement("div");
      buttonAtCell.classList.add("grid-item");
      const openButton = document.createElement("button");
      openButton.classList.add("button-item");
      openButton.innerText = "Открыть";
      openButton.addEventListener("click", () => openNote(note.name, note.txt));
      buttonAtCell.appendChild(openButton)

      tableBody.appendChild(nameCell);
      tableBody.appendChild(createdAtCell);
      tableBody.appendChild(dueDateCell);
      tableBody.appendChild(buttonAtCell);
    });
}
  
  function openNote(name, txt) {
    document.querySelector("#popupArchive").style.display = 'flex';
    document.querySelector("#headerNote").innerHTML = name;
    const pattern = '<div class="note-controls-brain"><button class="add-child-brain">Добавить потомка</button><button class="delete-brain">Удалить</button></div>'
    let newtxt = txt.replaceAll(pattern, '');
    document.querySelector("#forText").innerHTML = newtxt;
  }
  
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
  
init();

function myFunction() {
  var input = document.getElementById("text-to-find");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('grid-item');

  for (i = 8; i < nodes.length; i += 4) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "block";
      nodes[i+1].style.display = "block";
      nodes[i+2].style.display = "block";
      nodes[i+3].style.display = "block";
    } else {
      nodes[i].style.display = "none";
      nodes[i+1].style.display = "none";
      nodes[i+2].style.display = "none";
      nodes[i+3].style.display = "none";
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
      for (i = nodes.length-1; i > 7; i -=1) {
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
      for (i = nodes.length-1; i > 7; i -=1) {
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
    document.querySelector("#button_for_sort_date").innerText = "создание↓"
    const notes = await getDataSort("id", "ASC");
    if (notes) {
      var nodes = document.getElementsByClassName('grid-item');
      for (i = nodes.length-1; i > 7; i -=1) {
        nodes[i].remove();
      }
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
  } else {
    document.querySelector("#button_for_sort_date").value = "1"
    document.querySelector("#button_for_sort_date").innerText = "создание↑"
    const notes = await getDataSort("name", "DESC");
    if (notes) {
      var nodes = document.getElementsByClassName('grid-item');
      for (i = nodes.length-1; i > 7; i -=1) {
        nodes[i].remove();
      }
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
  }
});

document.querySelector("#button_for_sort_last").addEventListener("click", async function(event) {
  event.preventDefault();
  if (document.querySelector("#button_for_sort_last").value == "1"){
    document.querySelector("#button_for_sort_last").value = "2"
    document.querySelector("#button_for_sort_last").innerText = "выполнение↓"
    const notes = await getDataSort("last_date", "ASC");
    if (notes) {
      var nodes = document.getElementsByClassName('grid-item');
      for (i = nodes.length-1; i > 7; i -=1) {
        nodes[i].remove();
      }
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
  } else {
    document.querySelector("#button_for_sort_last").value = "1"
    document.querySelector("#button_for_sort_last").innerText = "выполнение↑"
    const notes = await getDataSort("last_date", "DESC");
    if (notes) {
      var nodes = document.getElementsByClassName('grid-item');
      for (i = nodes.length-1; i > 7; i -=1) {
        nodes[i].remove();
      }
      createNotesTable(notes);
            } else {
      alert("Не удалось загрузить заметки");
    }
  }
});

document.querySelector("#closeArchive").addEventListener("click", function() {
  document.querySelector("#popupArchive").style.display = 'none';
});
