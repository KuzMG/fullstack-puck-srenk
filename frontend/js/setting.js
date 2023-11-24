function init(){
  if (localStorage.getItem('theme') == 'dark'){
    document.querySelector('.switch-btn').classList.add('switch-on');
    document.querySelector('body').classList.add('dark-theme');
  } 
}

document.querySelector("#delete-acc-btn").addEventListener('click', function(e) {
  e.preventDefault()
  var isDelte = confirm("Вы уверены, что хотите удалить аккаунт?");

  if (isDelte){
    const serverURL = "http://localhost:8080/api/delete?name=" + localStorage.getItem('username');
    fetch(serverURL, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status == 200) {
          alert("Аккаунт удален!");
          localStorage.clear();
          window.location = "index.html";
        } else {
          alert("Аккаунт не удален?!");
        }
      })
      .catch((error) => {
        alert("Ошибочка: ", error);
      });
  }
})

document.querySelector("#change-pass-btn").addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector(".popup_change").style.display = "flex";
})

document.querySelector("#close_pass").addEventListener('click', function(e){
  e.preventDefault();
  document.querySelector(".popup_change").style.display = "none";
})

document.querySelector("#send_pass").addEventListener('click', function(e){
  e.preventDefault();
  
  const old_pass = document.querySelector("#old_pass_in").value;
  const new_pass = document.querySelector("#new_pass_in").value;

  if (old_pass === '' || new_pass === '') {
    alert("Проверьте правильность введенных данных");
  } else if (old_pass.length < 8 || new_pass.length < 8) {
    alert("Проверьте, что длина пароля больше 8 символов");
  } else {
    const serverURL = "http://localhost:8080/api/changePsw"; 
    alert(localStorage.getItem('username'))
    fetch(serverURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: localStorage.getItem('username'),
        oldPassword: old_pass,
        newPassword: new_pass
      })
    })
      .then((response) => {
        console.log(response.text)
        if (response.status === 200) {
          alert("Вы успешно поменяли пароль!");
        } else {
          alert("Неправильные данные, повторите попытку ещё раз!");
        }
      })
      .catch((error) => {
        alert("Ошибочка: ", error);
      });
      document.querySelector(".popup_change").style.display = "none";
  }
})

$('.switch-btn').click(function(){
    $(this).toggleClass('switch-on');
    if ($(this).hasClass('switch-on')) {
      $(this).trigger('on.switch');
      localStorage.setItem('theme', 'dark');
      document.querySelector('body').classList.add('dark-theme');
    } else {
      $(this).trigger('off.switch');
      localStorage.setItem('theme', '');
      document.querySelector('body').classList.remove('dark-theme');
    }
  
  });

init()