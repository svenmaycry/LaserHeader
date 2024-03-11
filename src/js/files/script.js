const iconMenuButton = document.querySelector('.icon-menu');
const inputButton = document.querySelector('.search-header__button');
const inputWrapper = document.querySelector('.input-wrapper');
// const input = document.querySelector('#search-input');

// ? Закрытие меню-бургер при клике на поиск.
const closeBurgerMenu = () => {
  if (document.documentElement.classList.contains('main-nav-open')) {
    document.documentElement.classList.remove('main-nav-open', 'lock');
  }
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

const onIconMenuClick = () => {
  closeSearchWrapper();
};

inputButton.addEventListener('click', onInputClick);
iconMenuButton.addEventListener('click', onIconMenuClick);

//========================================================================================================================================================
// ? Изменение иконки стрелки в крестик
// const mainNavButton = document.querySelector('.main-nav-item__button');
// const mainNavIcon = document.querySelector('#nav-icon');

// const changeIconPath = () => {
//   mainNavIcon.setAttribute('xlink:href', '#icon-cross');

//   if (mainNavButton.classList.contains('--spoller-active')) {
//     mainNavIcon.setAttribute('xlink:href', '#icon-arrow-down');
//   }
// };

// mainNavButton.addEventListener('click', changeIconPath);
