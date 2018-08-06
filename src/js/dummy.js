//Функция для расчета параметра top для прижатия заглушки к низу
function dummyLoc() {
  var DUMMY_BOTTOM = 493;
  
  var dummy = document.getElementById('dummy');
  
  var dumOffsParT = dummy.offsetTop;
  var dumOffsWinB = dummy.getBoundingClientRect().bottom;

  var dumEndLocT = dumOffsParT + (DUMMY_BOTTOM - dumOffsWinB);

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
