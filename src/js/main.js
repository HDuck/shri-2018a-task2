function init() {
  
  //Добавляем обработчик для всех device__item на клик
  var devs = document.getElementsByClassName('devices__item');
  for (var i = 0; i < devs.length; i++) {
    devs[i].addEventListener('touchend', openPopUp);
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
    scrNavi.children[0].addEventListener('click', scrollLT);
    scrNavi.children[1].addEventListener('click', scrollRB);
  }
  
  if (devCount > 6) {
    
    //Показываем кнопки навигации
    var devNavi = document.getElementsByClassName('fav-devices__navi')[0];
    devNavi.style.visibility = 'visible';
    
    //Добавляем горизонтальную полосу прокрутки блоку
    var devices = document.getElementsByClassName('devices')[1];
    devices.style = 'overflow-x: scroll';
    
    //Добавляем обработчики для оживления кнопок
    devNavi.children[0].addEventListener('touchend', scrollLT);
    devNavi.children[1].addEventListener('touchend', scrollRB);    
  }
}

window.onload = init;