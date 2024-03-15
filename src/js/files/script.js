const iconMenuButton = document.querySelector('.icon-menu');
const inputButton = document.querySelector('.search-header__button');
const inputWrapper = document.querySelector('.input-wrapper');
const overlay = document.querySelector('.overlay');

// ? Закрытие меню-бургер при клике на поиск.
const closeBurgerMenu = () => {
  if (document.documentElement.classList.contains('main-nav-open')) {
    document.documentElement.classList.remove('main-nav-open', 'lock');
  }
};

//? Удаление класса --active оверлея.
const overlayClose = () => {
  overlay.classList.remove('--active');
};

// ? Закрытие поиска при клике на меню-бургер.
const closeSearchWrapper = () => {
  if (inputButton.classList.contains('--spoiler-active')) {
    inputButton.classList.remove('--spoiler-active');
    inputWrapper.setAttribute('hidden', '');
  }
};

const onInputClick = () => {
  closeBurgerMenu();
};

const onIconMenuClick = (e) => {
  closeSearchWrapper();
  overlayClose(e);
};

inputButton.addEventListener('click', onInputClick);
iconMenuButton.addEventListener('click', onIconMenuClick);
