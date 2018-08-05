function init() {
  
  var devs = document.getElementsByClassName('devices__item');
  for (var i = 0; i < devs.length; i++) {
    devs[i].addEventListener('click', openPopUp);
  }
}

window.onload = init;