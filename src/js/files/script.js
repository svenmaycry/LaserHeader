const iconMenu = document.querySelector('.icon-menu');
const closeInputButton = document.getElementById('input-close-button');
const inputWrapper = document.getElementById('input-wrapper');

const closeBurgerMenu = () => {
  document.documentElement.classList.remove('main-nav-open');
};

const closeSearchWrapper = () => {
  closeInputButton.classList.remove('_spoller-active');
  inputWrapper.setAttribute('hidden', '');
};

closeInputButton.addEventListener('click', closeBurgerMenu);
iconMenu.addEventListener('click', closeSearchWrapper);

// ! Попытка сделать фокус на клике на кнопку поиска

// const focusSearch = () => {
//   document.getElementById('search-input').focus();
// };

// closeInputButton.addEventListener('click', focusSearch);
