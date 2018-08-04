"use strict";

function init() {
  
  var devs = document.getElementsByClassName('devices__item');
  for (var i = 0; i < devs.length; i++) {
    devs[i].addEventListener('click', openPopUp);
  }
}

//pop-up-animation
function openPopUp(evt) {

  evt.stopPropagation();

  var bodyEl = document.body;
  bodyEl.style.overflow = 'hidden';
  
  var cont = document.getElementsByClassName('container')[0];
  cont.className += ' container_anim';
  
  var popUpBg = document.createElement('div');
  popUpBg.className = 'pop-up__bg';
  document.body.appendChild(popUpBg);
  
  var popUpWrapper = document.createElement('div');
  popUpWrapper.className = 'pop-up';
  document.body.appendChild(popUpWrapper);
  
  if (bodyEl.clientWidth < 1365) {

    var devItem = evt.currentTarget;
    var devItemLoc = devItem.getBoundingClientRect();

    var nDevItem = devItem.cloneNode(true);
    nDevItem.className = 'pop-up__cont';
    nDevItem.style = 'top: ' + devItemLoc.top + 'px; left: ' + devItemLoc.left + 'px;';
    popUpWrapper.appendChild(nDevItem);
    
    var devTypeClass = nDevItem.childNodes[1].className;
    
    if (devTypeClass === 'item__temp_off' || devTypeClass === 'item__temp_on') {
      var devSliderImg = '__heat';
      nDevItem.childNodes[1].className = 'dev-type__heat';
    } else if (devTypeClass === 'item__sun_off' || devTypeClass === 'item__sun_on') {
      var devSliderImg = '__light';
      nDevItem.childNodes[1].className = 'dev-type__light'
    }
       
    nDevItem.childNodes[3].className = '';
    nDevItem.childNodes[3].childNodes[1].className = 'dev-name sec-txt_s18b';
    nDevItem.childNodes[3].childNodes[3].className = 'dev-time sec-txt';
    
    if (!(nDevItem.childNodes[3].childNodes[1].textContent == 'Xiaomi warm floor')) {

      var devTimeList = document.createElement('ul');
      devTimeList.className = 'dev-list';

      for (var i = 1; i < 5; i++) {
        var devTimeListItem = document.createElement('li');
        devTimeListItem.className = 'dev-list__item sec-txt_s13';
        devTimeList.appendChild(devTimeListItem);
      }

      if (nDevItem.childNodes[1].className === 'dev-type__light') {

        devTimeList.children[0].textContent = 'Вручную';
        devTimeList.children[1].textContent = 'Дневной свет';
        devTimeList.children[2].textContent = 'Вечерний свет';
        devTimeList.children[3].textContent = 'Рассвет';
      } else if (nDevItem.childNodes[1].className = 'dev-type__heat') {

        devTimeList.children[0].textContent = 'Вручную';
        devTimeList.children[1].textContent = 'Холодно';
        devTimeList.children[2].textContent = 'Тепло';
        devTimeList.children[3].textContent = 'Жарко';
      }

      nDevItem.appendChild(devTimeList);

      var slider = document.createElement('div');

      if (devSliderImg === '__light') {
        slider.className = 'dev-slider-light_grad dev-slider';
      } else if (devSliderImg === '__heat') {
        slider.className = 'dev-slider-heat_grad dev-slider';      
      }

      var sliderImgT = document.createElement('div');
      var sliderBtn = document.createElement('div');
      var sliderImgB = document.createElement('div');

      sliderImgT.className = 'dev-slider' + devSliderImg;
      sliderBtn.className = 'dev-slider__btn';
      sliderImgB.className = 'dev-slider' + devSliderImg;
      slider.appendChild(sliderImgT);
      slider.appendChild(sliderBtn);
      slider.appendChild(sliderImgB);

      nDevItem.appendChild(slider);
    } else {
      var circSlider = document.createElement('div');
      circSlider.className = 'dev-circ-slider';

      var circUnused = document.createElement('div');
      circUnused.className = 'dev-circ-slider__unused-temp';
      
      var circInner = document.createElement('div');
      circInner.className = 'dev-circ-slider__inner-circ';
      
      var circNum = document.createElement('span');
      circNum.className = 'dev-circ-slider__num';
      circNum.textContent = '+23';
      
      var circBtn = document.createElement('div');
      circBtn.className = 'dev-circ-slider__btn'
      
      circInner.appendChild(circNum);
      circSlider.appendChild(circBtn);
      circSlider.appendChild(circUnused);
      circSlider.appendChild(circInner);
      
      nDevItem.appendChild(circSlider);
    }
    
    var acceptBtn = document.createElement('button');
    acceptBtn.className = 'pop-up__btn sec-txt_s18b';
    acceptBtn.textContent = 'Применить';
    popUpWrapper.appendChild(acceptBtn);
    
    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'pop-up__btn sec-txt_s18b';
    cancelBtn.textContent = 'Закрыть';
    cancelBtn.addEventListener('click', function(evt) {
      closePopUpAnim(evt);
      setTimeout(delPopUp, 400);
    });
    
    popUpWrapper.appendChild(cancelBtn);
  }
}
  
function closePopUpAnim(evt) {

  evt.stopPropagation();

  var cont = document.querySelector('.container_anim');
  cont.className += '_close';

  var popUpBg = document.querySelector('.pop-up__bg');
  popUpBg.className += '_close';

  var popUpBtns = document.querySelectorAll('.pop-up__btn');

  for (var i = 0; i < popUpBtns.length; i++) {
    popUpBtns[i].className = 'pop-up__btn_close sec-txt_s18b';
  }
  
  if (document.querySelector('.dev-slider')) {
    var popUpSlider = document.querySelector('.dev-slider');
  } else if (document.querySelector('.dev-circ-slider')) {
    var popUpSlider = document.querySelector('.dev-circ-slider');
  }
  popUpSlider.className += '_close';

  var popUpCont = document.querySelector('.pop-up__cont');
  popUpCont.className += '_close';
}

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

window.onload = init;