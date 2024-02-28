const iconMenuButton = document.querySelector('.icon-menu');
const inputButton = document.querySelector('#input-button');
const inputWrapper = document.querySelector('#input-wrapper');
const input = document.querySelector('#search-input');

// ? Закрытие меню-бургер при клике на поиск.
const closeBurgerMenu = () => {
  if (document.documentElement.classList.contains('main-nav-open')) {
    document.documentElement.classList.remove('main-nav-open');
  }
};

// ? Закрытие поиска при клике на меню-бургер.
const closeSearchWrapper = () => {
  if (inputButton.classList.contains('_spoller-active')) {
    inputButton.classList.remove('_spoller-active');
    inputWrapper.setAttribute('hidden', '');
  }
};

const onInputClick = () => {
  closeBurgerMenu();
};

const onIconMenuClick = () => {
  closeSearchWrapper();
};

inputButton.addEventListener('click', onInputClick);
iconMenuButton.addEventListener('click', onIconMenuClick);

//========================================================================================================================================================
