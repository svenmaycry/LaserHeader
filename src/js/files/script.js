const iconMenuButton = document.querySelector('.icon-menu');
const searchButton = document.querySelector('.search-header__button');
const overlay = document.querySelector('.overlay');
const mainHeader = document.querySelector('.main-header');
const headerContainer = document.querySelector('.main-header__container');
const body = document.querySelector('body');

//? При клике на поиск закрытие Меню-бургер.
const closeBurgerMenu = () => {
  if (body.classList.contains('main-nav-open')) {
    body.classList.remove('main-nav-open', 'lock');
  }
};

//? При клике на поиск добавлять/убирать оверлей. Меняем класс lock у body.
const overlayClassToggle = () => {
  if (window.innerWidth <= 1279) {
    overlay.classList.toggle('--active');
  }
};

//? При клике на поиск, на max-width: 1279px добавлять и удалять LOCK у body.
const lockToggle = () => {
  //   if (!body.classList.contains('main-nav-open')) {
  //     body.classList.toggle('lock');
  //   } else {
  //     body.classList.remove('lock');
  //   }
};

//? При клике на меню удаление класса --active оверлея.
const overlayClose = () => {
  overlay.classList.remove('--active');
};

//? При клике на меню закрытие поиска.
const closeSearchWrapper = () => {
  if (searchButton.classList.contains('--spoiler-active')) {
    searchButton.classList.remove('--spoiler-active');
  }
};

//? При скролле страницы показ и скрытие шапки.
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

//? Изменить атрибут у контейнера шапки для изменения логики работы Спойлеров.
const changeContainerAttribute = () => {
  if (window.innerWidth <= 1279) {
    headerContainer.removeAttribute('data-one-spoiler');
  } else {
    if (window.innerWidth >= 1279) {
      headerContainer.setAttribute('data-one-spoiler', '');
    }
  }
};

const onSearchClick = () => {
  closeBurgerMenu();
  overlayClassToggle();
  lockToggle();
};

const onIconMenuClick = (e) => {
  closeSearchWrapper();
  overlayClose(e);
};

const onDocumentScroll = () => {
  showAndHideHeader();
};

const onDocumentResize = () => {
  changeContainerAttribute();
};

searchButton.addEventListener('click', onSearchClick);
iconMenuButton.addEventListener('click', onIconMenuClick);
document.addEventListener('scroll', onDocumentScroll);
window.addEventListener('resize', onDocumentResize);
window.addEventListener('load', onDocumentResize);
