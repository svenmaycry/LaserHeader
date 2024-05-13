// Подключение списка активных модулей
import {flsModules} from './modules.js';

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

/* Проверка мобильного браузера */
export let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) document.documentElement.classList.add('touch');
}

// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.documentElement.classList.add('loaded');
    }, 0);
  });
}

// Получение хеша в адресе сайта
export function getHash() {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
}

// Указание хеша в адресе сайта
export function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0];
  history.pushState('', '', hash);
}

// Учет плавающей панели на мобильных устройствах при 100vh
export function fullVHfix() {
  const fullScreens = document.querySelectorAll('[data-fullscreen]');
  if (fullScreens.length && isMobile.any()) {
    window.addEventListener('resize', fixHeight);

    function fixHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    fixHeight();
  }
}

// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
export let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent('slideUpDone', {
          detail: {
            target: target,
          },
        })
      );
    }, duration);
  }
};
export let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent('slideDownDone', {
          detail: {
            target: target,
          },
        })
      );
    }, duration);
  }
};
export let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;
let body = document.querySelector('body');

export let bodyLockToggle = () => {
  if (body.classList.contains('lock')) {
    bodyUnlock();
  } else {
    bodyLock();
  }
};
export let bodyUnlock = () => {
  if (bodyLockStatus) {
    body.classList.remove('lock');
    bodyLockStatus = true;
  }
};
export let bodyLock = () => {
  if (bodyLockStatus) {
    body.classList.add('lock');

    bodyLockStatus = true;
  }
};

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/menu-burger.html
Сниппет (HTML): menu
*/
export function menuInit() {
  if (document.querySelector('.js-icon-menu')) {
    document.addEventListener('click', function (e) {
      if (bodyLockStatus && e.target.closest('.js-icon-menu')) {
        bodyLockToggle();
        body.classList.toggle('main-nav-open');
      }
    });
  }
}

export function menuOpen() {
  bodyLock();
  body.classList.add('main-nav-open');
}

export function menuClose() {
  bodyUnlock();
  body.classList.remove('main-nav-open');
}

// Модуль работы со спойлерами =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-spojlery.html
Сниппет (HTML): spollers
*/
export function spoilers() {
  const spoilersArray = document.querySelectorAll('[data-spoilers]');
  const overlay = document.querySelector('.js-header-overlay');
  if (spoilersArray.length > 0) {
    // Получение обычных слойлеров
    const spoilersRegular = Array.from(spoilersArray).filter(function (item) {
      return !item.dataset.spoilers.split(',')[0];
    });
    // Инициализация обычных слойлеров
    if (spoilersRegular.length) {
      initSpoilers(spoilersRegular);
    }

    // Инициализация
    function initSpoilers(spoilersArray, matchMedia = false) {
      spoilersArray.forEach((spoilersBlock) => {
        spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
        if (matchMedia.matches || !matchMedia) {
          spoilersBlock.classList.add('--spoiler-init');
          initSpoilerBody(spoilersBlock);
          spoilersBlock.addEventListener('click', setSpoilerAction);
        } else {
          spoilersBlock.classList.remove('--spoiler-init');
          initSpoilerBody(spoilersBlock, false);
          spoilersBlock.removeEventListener('click', setSpoilerAction);
        }
      });
    }

    // Работа с контентом
    function initSpoilerBody(spoilersBlock) {
      let spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
      if (spoilerTitles.length) {
        spoilerTitles = Array.from(spoilerTitles).filter(
          (item) => item.closest('[data-spoilers]') === spoilersBlock
        );
      }
    }

    function setSpoilerAction(e) {
      const el = e.target;
      if (el.closest('[data-spoiler]')) {
        const spoilerTitle = el.closest('[data-spoiler]');
        const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
        const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler');

        if (
          oneSpoiler &&
          !spoilerTitle.classList.contains('--spoiler-active')
        ) {
          hideSpoilersBody(spoilersBlock);
        }

        if (window.innerWidth >= 1279) {
          overlay.classList.toggle('--active');
        }

        if (!body.classList.contains('main-nav-open')) {
          body.classList.toggle('lock');
        }

        spoilerTitle.classList.toggle('--spoiler-active');
        e.preventDefault();
      }
    }

    function hideSpoilersBody(spoilersBlock) {
      const spoilerActiveTitle = spoilersBlock.querySelector(
        '[data-spoiler].--spoiler-active'
      );
      if (spoilerActiveTitle) {
        overlay.classList.remove('--active');

        body.classList.remove('lock');

        spoilerActiveTitle.classList.remove('--spoiler-active');
      }
    }

    // Закрытие при клике вне спойлера
    const spoilersClose = document.querySelectorAll('[data-spoiler-close]');

    const isEscapeKey = (e) => e.key === 'Escape';

    const closeBody = () => {
      spoilersClose.forEach((spoilerClose) => {
        overlay.classList.remove('--active');

        if (!body.classList.contains('main-nav-open')) {
          body.classList.remove('lock');
        }

        spoilerClose.classList.remove('--spoiler-active');
      });
    };

    if (spoilersClose.length) {
      document.addEventListener('click', function (e) {
        if (!e.target.closest('[data-spoilers]')) {
          closeBody();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (isEscapeKey(e)) {
          closeBody();
        }
      });
    }
  }
}

// Модуь работы с табами =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-taby.html
Сниппет (HTML): tabs
*/
export function tabsHeader() {
  const tabs = document.querySelectorAll('[data-tabs-header]');
  let tabsActiveHash = [];

  tabs.forEach((tabsBlock, index) => {
    tabsBlock.classList.add('--tab-init');
    tabsBlock.setAttribute('data-tabs-header-index', index);
    tabsBlock.addEventListener('mouseover', setTabsAction);
    initTabs(tabsBlock);
  });

  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-header-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-header-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] === tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        '[data-tabs-header-titles]>.main-nav-tab-active'
      );
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-header-title', '');
        tabsContentItem.setAttribute('data-tabs-header-item', '');

        if (tabsActiveHashBlock && index === tabsActiveHash[1]) {
          tabsTitles[index].classList.add('main-nav-tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains(
          'main-nav-tab-active'
        );
      });
    }
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-header-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-header-item]');

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-header-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }

    const tabsBlockAnimate = isTabsAnimate(tabsBlock);
    if (tabsContent.length > 0) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('main-nav-tab-active')) {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = false;
          }
        } else {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-header-title]')) {
      const tabTitle = el.closest('[data-tabs-header-title]');
      const tabsBlock = tabTitle.closest('[data-tabs-header]');
      if (
        !tabTitle.classList.contains('main-nav-tab-active') &&
        !tabsBlock.querySelector('._slide')
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          '[data-tabs-header-title].main-nav-tab-active'
        );
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
            (item) => item.closest('[data-tabs-header]') === tabsBlock
          ))
          : null;
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove('main-nav-tab-active')
          : null;
        tabTitle.classList.add('main-nav-tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}

// Модуль "показать еще" =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Сниппет (HTML): showmore
*/
export function showMore() {
  window.addEventListener('load', function (e) {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]');
    let showMoreBlocksRegular;
    let mdQueriesArray;
    if (showMoreBlocks.length) {
      // Получение обычных объектов
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (
        item,
        index,
        self
      ) {
        return !item.dataset.showmoreMedia;
      });
      // Инициализация обычных объектов
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

      document.addEventListener('click', showMoreActions);
      window.addEventListener('resize', showMoreActions);

      // Получение объектов с медиа запросами
      mdQueriesArray = dataMediaQueries(showMoreBlocks, 'showmoreMedia');
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach((mdQueriesItem) => {
          // Событие
          mdQueriesItem.matchMedia.addEventListener('change', function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }

    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }

    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach((showMoreBlock) => {
        initItem(showMoreBlock, matchMedia);
      });
    }

    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      let showMoreContent = showMoreBlock.querySelectorAll(
        '[data-showmore-content]'
      );
      let showMoreButton = showMoreBlock.querySelectorAll(
        '[data-showmore-button]'
      );
      showMoreContent = Array.from(showMoreContent).filter(
        (item) => item.closest('[data-showmore]') === showMoreBlock
      )[0];
      showMoreButton = Array.from(showMoreButton).filter(
        (item) => item.closest('[data-showmore]') === showMoreBlock
      )[0];
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = false;
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }

    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore
        ? showMoreBlock.dataset.showmore
        : 'size';
      if (showMoreType === 'items') {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 3;
        const showMoreItems = showMoreContent.children;
        for (let index = 1; index < showMoreItems.length; index++) {
          const showMoreItem = showMoreItems[index - 1];
          hiddenHeight += showMoreItem.offsetHeight;
          if (index == showMoreTypeValue) break;
        }
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 150;
        hiddenHeight = showMoreTypeValue;
      }
      return hiddenHeight;
    }

    function getOriginalHeight(showMoreContent) {
      let parentHidden;
      let hiddenHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty('height');
      if (showMoreContent.closest(`[hidden]`)) {
        parentHidden = showMoreContent.closest(`[hidden]`);
        parentHidden.hidden = false;
      }
      let originalHeight = showMoreContent.offsetHeight;
      parentHidden ? (parentHidden.hidden = true) : null;
      showMoreContent.style.height = `${hiddenHeight}px`;
      return originalHeight;
    }

    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;
      if (targetType === 'click') {
        if (targetEvent.closest('[data-showmore-button]')) {
          const showMoreButton = targetEvent.closest('[data-showmore-button]');
          const showMoreBlock = showMoreButton.closest('[data-showmore]');
          const showMoreContent = showMoreBlock.querySelector(
            '[data-showmore-content]'
          );
          const showMoreSpeed = showMoreBlock.dataset.showmoreButton
            ? showMoreBlock.dataset.showmoreButton
            : '500';
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
          if (!showMoreContent.classList.contains('_slide')) {
            showMoreBlock.classList.contains('_showmore-active')
              ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
              : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
            showMoreBlock.classList.toggle('_showmore-active');
          }
        }
      } else if (targetType === 'resize') {
        showMoreBlocksRegular && showMoreBlocksRegular.length
          ? initItems(showMoreBlocksRegular)
          : null;
        mdQueriesArray && mdQueriesArray.length
          ? initItemsMedia(mdQueriesArray)
          : null;
      }
    }
  });
}

//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// FLS (Full Logging System)
export function FLS(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message);
    }
  }, 0);
}

// Получить цифры из строки
export function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ''));
}

// Форматирование цифр типа 100 000 000
export function getDigFormat(item) {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

// Убрать класс из всех элементов массива
export function removeClasses(array, className) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}

// Уникализация массива
export function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

// Функция получения индекса внутри родителя
export function indexInParent(parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}

// Обработа медиа запросов из атрибутов
export function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(',')[0];
    }
  });
  // Инициализация объектов с медиа запросами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach((item) => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      return (
        '(' +
        item.type +
        '-width: ' +
        item.value +
        'px),' +
        item.value +
        ',' +
        item.type
      );
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];

    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(',');
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Объекты с нужными условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        });
      });
      return mdQueriesArray;
    }
  }
}

//================================================================================================================================================================================================================================================================================================================
