"use strict";

//Функция промотки влево/вверх
function scrollLT(evt) {
  
  evt.preventDefault();
  
  var targetPar = evt.currentTarget.parentElement;
  
  //Определяем на кнопку какого блока произошло нажатие
  if (targetPar.className === 'fav-devices__navi') {
        
    var elemToScroll = document.querySelector('.' + targetPar.className + ' ~ .devices');  //Получаем блок devices
    var amount = elemToScroll.scrollLeft; //Получаем текущее значение прокрутки
    
    anim(elemToScroll, '-' + amount); //Прокручиваем влево на данное значение
    
  } else if (targetPar.className === 'fav-scripts__navi') {
    
    var elemToScroll = document.querySelector('.' + targetPar.className + ' ~ .scripts'); //Получаем блок scripts 
    var amount = elemToScroll.scrollTop; //Получаем текущее значение прокрутки
    
    anim(elemToScroll, '-' + amount); //Прокручиваем вверх на данное значение
  }
}

//Функция промотки вправо/вниз
function scrollRB(evt) {
  
  evt.preventDefault();
  
  var targetPar = evt.currentTarget.parentElement;
  
  //Определяем на кнопку какого блока произошло нажатие
  if (targetPar.className === 'fav-devices__navi') {
    
    var elemToScroll = document.querySelector('.' + targetPar.className + ' ~ .devices');  //Получаем блок devices
    var amountMax = elemToScroll.scrollWidth - elemToScroll.clientWidth;  //Получаем максимально возможную прокрутку
    var amount = amountMax - elemToScroll.scrollLeft;  //Получаем значение на которое нужно прокрутить до конца

    anim(elemToScroll, amount);  //Прокручиваем вправо на данное значение
    
  } else if (targetPar.className === 'fav-scripts__navi') {
    
    var elemToScroll = document.querySelector('.' + targetPar.className + ' ~ .scripts'); //Получаем блок scripts    
    var amountMax = elemToScroll.scrollHeight - elemToScroll.clientHeight;  //Получаем максимально возможную прокрутку
    var amount = elemToScroll.scrollTop + amountMax;  //Получаем значение на которое нужно прокрутить до конца
    
    anim(elemToScroll, amount);  //Прокручиваем вниз на данное значение
  }
}

//Функция анимации
function anim(elem, scroll) {
  
  //Определяем стартовую позицию скролла
  if (elem.className === 'devices') {
    var startPos = elem.scrollLeft;    
  } else if (elem.className === 'scripts') {
    var startPos = elem.scrollTop;   
  }

  var start = Date.now();  //Текущее время
  
  //Интервал 20мс в который происходит отрисовка позиции
  var timer = setInterval(function() {

    var TIME_MAX = 500; //Постоянная времени анимации
    var timePassed = Date.now() - start;  //Времени прошло
    
    //Проверка на истечение времени анимации
    if (timePassed >= TIME_MAX) {
      clearInterval(timer);
      return;
    }

    //Отрисовка позиции
    draw(timePassed, TIME_MAX, elem, scroll, startPos);

  }, 20);
}

//Функция отрисовки позиции
function draw(time, timeMax, elem, scroll, startPos) {
  
  var scrollInt = parseInt(scroll);  //Приводим входное значение к целочисленному
  
  //Проверка на блок и сторону изменения позиции
  if (scrollInt >= 0 && elem.className === 'devices') {
    elem.scrollLeft = startPos + (scrollInt / timeMax) * time;
  } else if (scrollInt < 0 && elem.className === 'devices') {
    elem.scrollLeft = -scrollInt + ((scrollInt / timeMax) * time);
  }

  if (scrollInt >= 0 && elem.className === 'scripts') {
    elem.scrollTop = startPos + (scrollInt / timeMax) * time;
  } else if (scrollInt < 0 && elem.className === 'scripts') {
    elem.scrollTop = -scrollInt + ((scrollInt / timeMax) * time);
  }
}

//Функция для расчета параметра top для прижатия заглушки к низу
function dummyLoc() {
  var DUMMY_BOTTOM = 493;
  var FOOT_BOTTOM = 759;
  
  var dummy = document.getElementById('dummy');
  
  var dumOffsParT = dummy.offsetTop;
  var dumOffsWinB = dummy.getBoundingClientRect().bottom;
  var footOffsWinB = document.getElementsByClassName('footer')[0].getBoundingClientRect().bottom;

  var dumEndLocT = dumOffsParT + (DUMMY_BOTTOM - dumOffsWinB) - (FOOT_BOTTOM - footOffsWinB);

  return dumEndLocT + 'px';
}

function dummyDisappear(evt) {
  
  evt.stopPropagation();
  
  //Добавляем анимацию исчезновения заглушки
  var dummy = document.getElementById('dummy');
  dummy.className = 'devices__dummy_hide';
  
  return true;
}

function dummyAppear() {
  
  var dummy = document.getElementById('dummy');
  var dummyTop = dummyLoc();  //Получаем top
  
  //Показываем заглушку, если она далеко от конца прокрутки
  if (parseInt(dummyTop) < 420) {
    dummy.style.top = dummyTop;
    dummy.className = 'devices__dummy_show';
    return true;
    
  } else {
    
    return false;
  }
}

//Анимация открытия pop-up окна
function openPopUp(evt) {

  evt.stopPropagation();

  //Запрещаем прокрутку содержимого за pop-up окном
  var bodyEl = document.body;
  bodyEl.style.overflow = 'hidden';
  
  //Добавление анимации blur для контейнера
  var cont = document.getElementsByClassName('container')[0];
  cont.className += ' container_anim';
  
  //Добавление серого фона
  var popUpBg = document.createElement('div');
  popUpBg.className = 'pop-up__bg';
  document.body.appendChild(popUpBg);
  
  //Добавление обертки для pop-up окна
  var popUpWrapper = document.createElement('div');
  popUpWrapper.className = 'pop-up';
  document.body.appendChild(popUpWrapper);

  var devItem = evt.currentTarget;
  var devItemLoc = devItem.getBoundingClientRect();  //Получаем координаты device__item

  var nDevItem = devItem.cloneNode(true); //Клонируем device__item
  nDevItem.style = 'top: ' + devItemLoc.top + 'px; left: ' + devItemLoc.left + 'px;';  //Позиционируем клон на место оригинального device__item
  popUpWrapper.appendChild(nDevItem);  //Добавляем клон в обертку

  var devTypeClass = nDevItem.childNodes[1].className;

  nDevItem.childNodes[3].className = '';  //Убираем стилизацию у item__desc
  nDevItem.childNodes[3].childNodes[1].className = 'sec-txt_s18b dev-name'; //Добавляем анимацию и стилизацию item__name
  nDevItem.childNodes[3].childNodes[3].className = 'dev-time sec-txt'; //Добавляем стилизацию item__time

  if (!(nDevItem.childNodes[3].childNodes[1].textContent == 'Xiaomi warm floor')) {

    //Добавляем список с стандартными программами регулирования температуры/света
    var devTimeList = document.createElement('ul');
    devTimeList.className = 'dev-list';

    for (var i = 1; i < 5; i++) {
      var devTimeListItem = document.createElement('li');
      devTimeListItem.className = 'dev-list__item sec-txt_s13';
      devTimeList.appendChild(devTimeListItem);
    }

    //Заполнение текстом в зависимости от класса иконки при device__item
    if (devTypeClass === 'item__sun_off' || devTypeClass === 'item__sun_on') {

      devTimeList.children[0].textContent = 'Вручную';
      devTimeList.children[1].textContent = 'Дневной свет';
      devTimeList.children[2].textContent = 'Вечерний свет';
      devTimeList.children[3].textContent = 'Рассвет';
    } else if (devTypeClass === 'item__temp_off' || devTypeClass === 'item__temp_on') {

      devTimeList.children[0].textContent = 'Вручную';
      devTimeList.children[1].textContent = 'Холодно';
      devTimeList.children[2].textContent = 'Тепло';
      devTimeList.children[3].textContent = 'Жарко';
    }

    nDevItem.appendChild(devTimeList);

    //Добавляем слайдер
    var slider = document.createElement('div');

    var sliderImgT = document.createElement('div');
    var sliderBtn = document.createElement('div');
    var sliderImgB = document.createElement('div');

    //Добавляем граничные значения света/тепла и кнопку-регулятор
    sliderImgT.className = 'dev-slider' + devSliderImg;
    sliderBtn.className = 'dev-slider__btn';
    sliderImgB.className = 'dev-slider' + devSliderImg;

    slider.appendChild(sliderImgT);
    slider.appendChild(sliderBtn);
    slider.appendChild(sliderImgB);
    nDevItem.appendChild(slider);

  } else {
      
    //Добавляем круговой слайдер
    var circSlider = document.createElement('div');
    circSlider.className = 'dev-circ-slider';

    //Позиционируем не заполненную полосу температуры
    var circUnused = document.createElement('div');
    circUnused.className = 'dev-circ-slider__unused-temp';

    //Позиционируем внутреннее кольцо (с эффектом тени)
    var circInner = document.createElement('div');
    circInner.className = 'dev-circ-slider__inner-circ';

    //Позиционируем число внутри слайдера
    var circNum = document.createElement('span');
    circNum.className = 'dev-circ-slider__num';
    circNum.textContent = '+23';

    //Позиционируем кнопку-регулятор
    var circBtn = document.createElement('div');
    circBtn.className = 'dev-circ-slider__btn'

    circInner.appendChild(circNum);
    circSlider.appendChild(circBtn);
    circSlider.appendChild(circUnused);
    circSlider.appendChild(circInner);
    nDevItem.appendChild(circSlider);
  }

  //Добавляем кнопку "Применить" в pop-up окно
  var acceptBtn = document.createElement('button');
  acceptBtn.className = 'pop-up__btn sec-txt_s18b';  //Анимируем и стилизуем кнопку
  acceptBtn.textContent = 'Применить';
  popUpWrapper.appendChild(acceptBtn);

  //Добавляем кнопку "Закрыть" в pop-up окно
  var cancelBtn = document.createElement('button');
  cancelBtn.className = 'pop-up__btn sec-txt_s18b';  //Анимируем и стилизуем кнопку
  cancelBtn.textContent = 'Закрыть';
  popUpWrapper.appendChild(cancelBtn);

  //Добавляем действие при клике на кнопку закрыть
  cancelBtn.addEventListener('click', function(evt) {
    closePopUpAnim(evt);
    setTimeout(delPopUp, 400);
  });
  
  //Анимация для mobile версии
  if (bodyEl.clientWidth <= 1365) {

    nDevItem.className = 'pop-up__cont';  //Добавляем анимацию расширения окна
    
    //Проверка на значок у device__item для последующего стилизирования слайдера
    if (devTypeClass === 'item__temp_off' || devTypeClass === 'item__temp_on') {
      var devSliderImg = '__heat';
      nDevItem.childNodes[1].className = 'dev-type__heat';
    } else if (devTypeClass === 'item__sun_off' || devTypeClass === 'item__sun_on') {
      var devSliderImg = '__light';
      nDevItem.childNodes[1].className = 'dev-type__light'
    }

    //Проверка на 3-ий вид pop-up окна
    if (!(nDevItem.childNodes[3].childNodes[1].textContent == 'Xiaomi warm floor')) {

      //Стилизуем градиент в зависимости от типа слайдера
      if (devSliderImg === '__light') {
        slider.className = 'dev-slider-light_grad dev-slider';
      } else if (devSliderImg === '__heat') {
        slider.className = 'dev-slider-heat_grad dev-slider';      
      }
      
    } 
  //Анимация для desktop версии  
  } else if (bodyEl.clientWidth > 1365) {
    
    if (nDevItem.childNodes[3].childNodes[1].textContent == 'Xiaomi warm floor') {
      nDevItem.className = 'pop-up__cont-circ';  //Добавляем анимацию расширения окна для кругового слайдера
    } else {
      nDevItem.className = 'pop-up__cont';  //Добавляем анимацию расширения окна      
    }
        
    //Проверка на тип значка у device__item для последующего стилизирования слайдера
    if (devTypeClass === 'item__temp_off' || devTypeClass === 'item__temp_on') {
      var devSliderImg = '__heat';
      nDevItem.childNodes[1].className += ' dev-type';
      
      //Создаем цифру рядом с значком температуры
      var numType = document.createElement('span');
      numType.className = 'dev-circ-slider__type-num'
      numType.textContent = '+23';
      nDevItem.appendChild(numType);
  
    } else if (devTypeClass === 'item__sun_off' || devTypeClass === 'item__sun_on') {
      var devSliderImg = '__light';
      nDevItem.childNodes[1].className += ' dev-type';
    }

    //Проверка на 3-ий вид pop-up окна
    if (!(nDevItem.childNodes[3].childNodes[1].textContent == 'Xiaomi warm floor')) {

      //Стилизуем градиент в зависимости от типа слайдера
      if (devSliderImg === '__light') {
        slider.className = 'dev-slider-light_grad dev-slider_rotate dev-slider';
      } else if (devSliderImg === '__heat') {
        slider.className = 'dev-slider-heat_grad dev-slider_rotate dev-slider';      
      }   
    }
  }
}

//Анимация закрытия pop-up окна
function closePopUpAnim(evt) {

  evt.stopPropagation();

  //Анимируем понижение blur эффекта до 0
  var cont = document.querySelector('.container_anim');
  cont.className += '_close';

  //Анимируем исчезновение серого фона
  var popUpBg = document.querySelector('.pop-up__bg');
  popUpBg.className += '_close';

  //Анимируем исчезновение кнопок
  var popUpBtns = document.querySelectorAll('.pop-up__btn');
  for (var i = 0; i < popUpBtns.length; i++) {
    popUpBtns[i].className = 'pop-up__btn_close sec-txt_s18b';
  }
  
  //Анимируем исчезновение названия
  var devName = document.querySelector('.dev-name');
  devName.className += '_close';
  
  //Проверяем какой слайдер в pop-up окне и анимируем его исчезновение
  if (document.querySelector('.dev-slider')) {
    var popUpSlider = document.querySelector('.dev-slider');
  } else if (document.querySelector('.dev-circ-slider')) {
    var popUpSlider = document.querySelector('.dev-circ-slider');
  }
  popUpSlider.className += '_close';
  
  //Анимируем возврат клона device__item к его оригинальным размерам 
  if (devName.textContent == 'Xiaomi warm floor' && document.body.clientWidth > 1365) {
    var popUpCont = document.querySelector('.pop-up__cont-circ');
  } else {
    var popUpCont = document.querySelector('.pop-up__cont');    
  }
  popUpCont.className += '_close';
}

//Удаление pop-up окна после завершения анимации
function delPopUp() {

  var popUpWrapper = document.querySelector('.pop-up');
  var popUpBg = document.querySelector('.pop-up__bg_close');
  var cont = document.querySelector('.container');
  cont.className = 'container';

  var bodyEl = document.body;
  bodyEl.style.overflow = 'scroll';
  document.body.removeChild(popUpBg);
  document.body.removeChild(popUpWrapper);
}

function init() {
  
  //Добавляем обработчик для всех device__item на клик
  var devs = document.getElementsByClassName('devices__item');
  for (var i = 0; i < devs.length; i++) {
    devs[i].addEventListener('click', openPopUp);
  }

  //Добавляем обработчик для анимации заглушки в desktop версии
  var devList = document.getElementsByClassName('devices')[0];
  devList.addEventListener('touchstart', dummyDisappear);
  devList.addEventListener('touchend', function() {
    setTimeout(dummyAppear, 400);  //Задержка, чтобы учесть прокрутку после конца прикосновения
  });
  
  //Определяем величину каждого блока
  var scrCount = document.querySelectorAll('.fav-scripts > .scripts .scripts__item').length;
  var devCount = document.querySelectorAll('.fav-devices > .devices .devices__item').length;
  
  if (scrCount > 9) {
    
    //Показываем кнопки навигации
    var scrNavi = document.getElementsByClassName('fav-scripts__navi')[0];
    scrNavi.style.visibility = 'visible';
    
    //Добавляем вертикальную полосу прокрутки блоку
    var scripts = document.getElementsByClassName('scripts')[0];
    scripts.style = 'overflow-y: scroll';
    
    //Добавляем обработчики для оживления кнопок
    scrNavi.childNodes[1].addEventListener('click', scrollLT);
    scrNavi.childNodes[3].addEventListener('click', scrollRB);
  }
  
  if (devCount > 6) {
    
    //Показываем кнопки навигации
    var devNavi = document.getElementsByClassName('fav-devices__navi')[0];
    devNavi.style.visibility = 'visible';

    //Добавляем горизонтальную полосу прокрутки блоку
    var devices = document.getElementsByClassName('devices')[1];
    devices.style = 'overflow-x: scroll';
    
    //Добавляем обработчики для оживления кнопок
    devNavi.childNodes[1].addEventListener('click', scrollLT);
    devNavi.childNodes[3].addEventListener('click', scrollRB);    
  }
}

window.onload = init;