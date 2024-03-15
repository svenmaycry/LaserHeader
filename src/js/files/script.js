const iconMenuButton = document.querySelector('.icon-menu');
const inputButton = document.querySelector('.search-header__button');
const inputWrapper = document.querySelector('.input-wrapper');
const overlay = document.querySelector('.overlay');
const mainHeader = document.querySelector('.main-header');

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

//? Закрытие поиска при клике на меню-бургер.
const closeSearchWrapper = () => {
  if (inputButton.classList.contains('--spoiler-active')) {
    inputButton.classList.remove('--spoiler-active');
    inputWrapper.setAttribute('hidden', '');
  }
};

//? Показ и скрытие шапки при скролле на странице.
let prevScrollPos = window.scrollY;
const headerHeight = mainHeader.offsetHeight;
const scrollThreshold = 200;

const showAndHideHeader = () => {
  let currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    mainHeader.style.top = '0px';
  } else {
    if (currentScrollPos > scrollThreshold) {
      mainHeader.style.top = `-${headerHeight}px`;
    }
  }
  prevScrollPos = currentScrollPos;
};

const onInputClick = () => {
  closeBurgerMenu();
};

const onIconMenuClick = (e) => {
  closeSearchWrapper();
  overlayClose(e);
};

const onDocumentScroll = () => {
  showAndHideHeader();
};

inputButton.addEventListener('click', onInputClick);
iconMenuButton.addEventListener('click', onIconMenuClick);
document.addEventListener('scroll', onDocumentScroll);
