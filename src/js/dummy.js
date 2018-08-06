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
