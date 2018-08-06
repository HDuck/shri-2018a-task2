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