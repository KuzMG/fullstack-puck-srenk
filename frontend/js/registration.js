function init(){
  if (localStorage.getItem('theme') == 'dark'){
    document.querySelector('body').classList.add('dark-theme');
  } 
}

document.querySelector("#registration").addEventListener("submit", function(e) {
  e.preventDefault();

  const login = document.querySelector("#login_in").value;
  const password = document.querySelector("#pass_in").value;
  
  if (password === '' || login === '') {
    alert("Проверьте правильность введенных данных");
  } else if (password.length < 8) {
    alert("Проверьте, что длина пароля больше 8 символов");
  } else {
    const serverURL = "http://localhost:8080/api/signUp"; 
    fetch(serverURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: login,
        password: password
      })
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Вы зарегистрировались!");
          localStorage.clear();
          localStorage.setItem('username', login);
          localStorage.setItem('theme', '');
          window.location = "main_page.html";
        } else {
          alert("Такой юзер уже есть...");
        }
      })
      .catch((error) => {
        alert("Ошибочка: ", error);
      });
  }
});

init()