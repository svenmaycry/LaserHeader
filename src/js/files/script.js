const iconMenuButton = document.querySelector('.icon-menu');
const inputButton = document.querySelector('.search-header__button');
const inputWrapper = document.querySelector('.input-wrapper');
const overlay = document.querySelector('.overlay');
const mainHeader = document.querySelector('.main-header');
const headerContainer = document.querySelector('.main-header__container');

//? При клике на поиск закрытие Меню-бургер.
const closeBurgerMenu = () => {
  if (document.documentElement.classList.contains('main-nav-open')) {
    document.documentElement.classList.remove('main-nav-open', 'lock');
  }
};

//? При клике на поиск добавлять/убирать оверлей.
const overlayClassToggle = () => {
  if (window.innerWidth <= 1279) {
    overlay.classList.toggle('--active');
  }
};

//? При клике на меню удаление класса --active оверлея.
const overlayClose = () => {
  overlay.classList.remove('--active');
};

//? При клике на меню закрытие поиска.
const closeSearchWrapper = () => {
  if (inputButton.classList.contains('--spoiler-active')) {
    inputButton.classList.remove('--spoiler-active');
    //  inputWrapper.setAttribute('hidden', '');
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

//? Изменить атрибут у контейнера шапки для изменения работы логики Спойлеров.
const changeContainerAttribute = () => {
  if (window.innerWidth <= 1279) {
    headerContainer.removeAttribute('data-one-spoiler');
  } else {
    if (window.innerWidth >= 1279) {
      headerContainer.setAttribute('data-one-spoiler', '');
    }
  }
};

const onInputClick = () => {
  closeBurgerMenu();
  overlayClassToggle();
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

inputButton.addEventListener('click', onInputClick);
iconMenuButton.addEventListener('click', onIconMenuClick);
document.addEventListener('scroll', onDocumentScroll);
window.addEventListener('resize', onDocumentResize);
window.addEventListener('load', onDocumentResize);

// function hasClass(el, className) {
//   return el.classList.contains(className);
// }

// function addClass(el, className) {
//   var classList = className.split(' ');
//   classList.forEach(function (name) {
//     el.classList.add(name);
//   });
// }

// function removeClass(el, className) {
//   var classList = className.split(' ');
//   classList.forEach(function (name) {
//     el.classList.remove(name);
//   });
// }

// function toggleClass(el, className, bool) {
//   if (bool) {
//     addClass(el, className);
//   } else {
//     removeClass(el, className);
//   }
// }

// (function () {
//   var switchIcons = document.getElementsByClassName('js-switch-icon');
//   if (switchIcons.length > 0) {
//     for (var i = 0; i < switchIcons.length; i++) {
//       (function (i) {
//         if (!hasClass(switchIcons[i], 'switch-icon--hover')) {
//           initswitchIcons(switchIcons[i]);
//         }
//       })(i);
//     }

//     function initswitchIcons(btn) {
//       btn.addEventListener('click', function (event) {
//         event.preventDefault();
//         var status = !hasClass(btn, 'switch-icon--state-b');
//         toggleClass(btn, 'switch-icon--state-b', status);
//         // emit custom event
//         var event = new CustomEvent('switch-icon-clicked', {
//           detail: status,
//         });
//         btn.dispatchEvent(event);
//       });
//     }
//   }
// })();
