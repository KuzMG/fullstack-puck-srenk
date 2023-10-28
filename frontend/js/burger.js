const burger = document.querySelector("#burger");
const popup = document.querySelector("#popup");
const body = document.body;

// Клонируем меню, чтобы задать свои стили для мобильной версии
const menu = document.querySelector("#menu").cloneNode(1);

// При клике на иконку burger вызываем ф-ию burgerHandler
burger.addEventListener("click", burgerHandler);

// Выполняем действия при клике ..
function burgerHandler(e) {
  e.preventDefault();
  // Переключаем стили элементов при клике
  popup.classList.toggle("open");
  burger.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

// Здесь мы рендерим элементы в наш попап
function renderPopup() {
    popup.appendChild(menu);
  }
  
  // Код для закрытия меню при нажатии на ссылку
  const links = Array.from(menu.children);
  
  // Для каждого элемента меню при клике вызываем ф-ию
  links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
  });
  
  // Закрытие попапа при клике на меню
  function closeOnClick() {
    popup.classList.remove("open");
    burger.classList.remove("active");
    body.classList.remove("noscroll");
  }