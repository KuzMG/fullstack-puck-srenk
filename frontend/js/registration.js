document.querySelector("#registration").addEventListener("submit", function(e) {
  e.preventDefault();

  const login = document.querySelector("#login_in").value;
  const password = document.querySelector("#pass_in").value;
  
  if (password === '' || login === '') {
    alert("Проверьте правильность введенных данных");
  } else {
    const serverURL = "http://localhost:8080/api/signUp"; 
    fetch(serverURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      //make sure to serialize your JSON body
      body: JSON.stringify({
        name: login,
        password: password
      })
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Вы зарегистрировались!");
        } else {
          alert("Такой юзер уже есть...");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
});