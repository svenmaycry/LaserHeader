const body = document.querySelector('body');
const iconMenuButton = document.querySelector('.js-icon-menu');
const searchButton = document.querySelector('.js-search-header-button');
const overlay = document.querySelector('.js-header-overlay');
const mainHeader = document.querySelector('.js-main-header');
const headerContainer = document.querySelector('.js-main-header-container');
const mainNavItemButton = document.querySelectorAll('.js-main-nav-item-button');

// При клике на поиск закрытие Меню-бургер + Сохранение класса lock.
const closeBurgerMenu = () => {
    if (body.classList.contains('main-nav-open')) {
        body.classList.remove('main-nav-open', 'lock');
    }
};

// При клике на поиск добавлять/убирать оверлей. Меняем класс lock у body.
const overlayClassToggle = () => {
    if (window.innerWidth <= 1279) {
        overlay.classList.toggle('--active');
    }
};

// При клике на меню удаление класса --active оверлея.
const overlayClose = () => {
    overlay.classList.remove('--active');
};

// При клике на меню закрытие поиска + Сохранение класса lock.
const closeSearchWrapper = () => {
    if (searchButton.classList.contains('--spoiler-active')) {
        searchButton.classList.remove('--spoiler-active');
        body.classList.remove('lock');
    }
};

// При клике на меню и поиск закрытие спойлеров мобильного меню.
const closeSpoilersContent = () => {
    if (body.classList.contains('main-nav-open')) {
        mainNavItemButton.forEach((oneButton) => {
            if (oneButton.classList.contains('--spoiler-active')) {
                oneButton.classList.remove('--spoiler-active');
            }
        });
    }
};

// При скролле страницы показ и скрытие шапки.
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

// Изменить атрибут у контейнера шапки для изменения логики работы Спойлеров.
const changeContainerAttribute = () => {
    if (window.innerWidth <= 1279) {
        headerContainer.removeAttribute('data-one-spoiler');
    } else {
        if (window.innerWidth >= 1279) {
            headerContainer.setAttribute('data-one-spoiler', '');
        }
    }
};

// Закрытие спойлера, оверлея и lock body, при ресайзе страницы.
const closeSpoiler = () => {
    if (!body.classList.contains('main-nav-open') && window.innerWidth <= 1279) {
        mainNavItemButton.forEach((spoiler) => {
            if (spoiler.classList.contains('--spoiler-active')) {
                spoiler.classList.remove('--spoiler-active');
                overlay.classList.remove('--active');
                body.classList.remove('lock');
            }
        });
    }

    if (body.classList.contains('main-nav-open') && window.innerWidth >= 1279) {
        body.classList.remove('lock', 'main-nav-open');
        mainNavItemButton.forEach((spoiler) => {
            spoiler.classList.remove('--spoiler-active');
        });
    }
};

const onSearchClick = () => {
    closeSpoilersContent();
    closeBurgerMenu();
    overlayClassToggle();
};

const onIconMenuClick = (evt) => {
    closeSearchWrapper();
    overlayClose(evt);
    closeSpoilersContent();
};

const onDocumentScroll = () => {
    showAndHideHeader();
};

const onDocumentResize = () => {
    changeContainerAttribute();
    closeSpoiler();
};

searchButton.addEventListener('click', onSearchClick);
iconMenuButton.addEventListener('click', onIconMenuClick);
document.addEventListener('scroll', onDocumentScroll);
window.addEventListener('resize', onDocumentResize);
window.addEventListener('load', onDocumentResize);
