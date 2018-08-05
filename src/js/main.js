"use strict";

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
}

window.onload = init;