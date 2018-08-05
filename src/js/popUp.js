"use strict";

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
  
  //Анимация для mobile версии
  if (bodyEl.clientWidth < 1365) {

    var devItem = evt.currentTarget;
    var devItemLoc = devItem.getBoundingClientRect();  //Получаем координаты device__item

    var nDevItem = devItem.cloneNode(true); //Клонируем device__item
    nDevItem.style = 'top: ' + devItemLoc.top + 'px; left: ' + devItemLoc.left + 'px;';  //Позиционируем клон на место оригинального device__item
    nDevItem.className = 'pop-up__cont';  //Добавляем анимацию расширения окна
    popUpWrapper.appendChild(nDevItem);  //Добавляем клон в обертку
    
    var devTypeClass = nDevItem.childNodes[1].className;
    
    //Проверка на значок у device__item для последующего стилизирования слайдера
    if (devTypeClass === 'item__temp_off' || devTypeClass === 'item__temp_on') {
      var devSliderImg = '__heat';
      nDevItem.childNodes[1].className = 'dev-type__heat';
    } else if (devTypeClass === 'item__sun_off' || devTypeClass === 'item__sun_on') {
      var devSliderImg = '__light';
      nDevItem.childNodes[1].className = 'dev-type__light'
    }

    nDevItem.childNodes[3].className = '';  //Убираем стилизацию у item__desc
    nDevItem.childNodes[3].childNodes[1].className = 'dev-name sec-txt_s18b'; //Добавляем анимацию и стилизацию item__name
    nDevItem.childNodes[3].childNodes[3].className = 'dev-time sec-txt'; //Добавляем стилизацию item__time
    
    //Проверка на 3-ий вид pop-up окна
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
      if (nDevItem.childNodes[1].className === 'dev-type__light') {

        devTimeList.children[0].textContent = 'Вручную';
        devTimeList.children[1].textContent = 'Дневной свет';
        devTimeList.children[2].textContent = 'Вечерний свет';
        devTimeList.children[3].textContent = 'Рассвет';
      } else if (nDevItem.childNodes[1].className === 'dev-type__heat') {

        devTimeList.children[0].textContent = 'Вручную';
        devTimeList.children[1].textContent = 'Холодно';
        devTimeList.children[2].textContent = 'Тепло';
        devTimeList.children[3].textContent = 'Жарко';
      }

      nDevItem.appendChild(devTimeList);

      //Добавляем слайдер
      var slider = document.createElement('div');

      //Стилизуем градиент в зависимости от типа слайдера
      if (devSliderImg === '__light') {
        slider.className = 'dev-slider-light_grad dev-slider';
      } else if (devSliderImg === '__heat') {
        slider.className = 'dev-slider-heat_grad dev-slider';      
      }

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
    
    //Добавляем действие при клике на кнопку закрыть
    cancelBtn.addEventListener('click', function(evt) {
      closePopUpAnim(evt);
      setTimeout(delPopUp, 400);
    });
    
    popUpWrapper.appendChild(cancelBtn);
    
  //Анимация для desktop версии  
  } else if (bodyEl.clientWidth >= 1365) {
    
    var devItem = evt.currentTarget;
    var devItemLoc = devItem.getBoundingClientRect();  //Получаем координаты device__item

    var nDevItem = devItem.cloneNode(true); //Клонируем device__item
    nDevItem.style = 'top: ' + devItemLoc.top + 'px; left: ' + devItemLoc.left + 'px;';  //Позиционируем клон на место оригинального device__item
    
    if (nDevItem.childNodes[3].childNodes[1].textContent == 'Xiaomi warm floor') {
      nDevItem.className = 'pop-up__cont-circ';  //Добавляем анимацию расширения окна для кругового слайдера
    } else
      nDevItem.className = 'pop-up__cont';  //Добавляем анимацию расширения окна
    
    popUpWrapper.appendChild(nDevItem);  //Добавляем клон в обертку
    
    var devTypeClass = nDevItem.childNodes[1].className;

    //Проверка на тип значка у device__item для последующего стилизирования слайдера
    if (devTypeClass === 'item__temp_off' || devTypeClass === 'item__temp_on') {
      var devSliderImg = '__heat';
      nDevItem.childNodes[1].className += ' dev-type';
       
      var numType = document.createElement('span');
      numType.className = 'dev-circ-slider__type-num'
      numType.textContent = '+23';
      nDevItem.appendChild(numType);
  
    } else if (devTypeClass === 'item__sun_off' || devTypeClass === 'item__sun_on') {
      var devSliderImg = '__light';
      nDevItem.childNodes[1].className += ' dev-type';
    }

    nDevItem.childNodes[3].className = '';  //Убираем стилизацию у item__desc
    nDevItem.childNodes[3].childNodes[1].className = 'dev-name sec-txt_s18b'; //Добавляем анимацию и стилизацию item__name
    nDevItem.childNodes[3].childNodes[3].className = 'dev-time sec-txt'; //Добавляем стилизацию item__time
    
    //Проверка на 3-ий вид pop-up окна
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

      //Стилизуем градиент в зависимости от типа слайдера
      if (devSliderImg === '__light') {
        slider.className = 'dev-slider-light_grad dev-slider_rotate dev-slider';
      } else if (devSliderImg === '__heat') {
        slider.className = 'dev-slider-heat_grad dev-slider_rotate dev-slider';      
      }

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
    
    //Добавляем действие при клике на кнопку закрыть
    cancelBtn.addEventListener('click', function(evt) {
      closePopUpAnim(evt);
      setTimeout(delPopUp, 400);
    });
    
    popUpWrapper.appendChild(cancelBtn);
    
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

  var popUpBtns = document.querySelectorAll('.pop-up__btn');

  //Анимируем исчезновение кнопок
  for (var i = 0; i < popUpBtns.length; i++) {
    popUpBtns[i].className = 'pop-up__btn_close sec-txt_s18b';
  }
  
  //Проверяем какой слайдер в pop-up окне и анимируем его исчезновение
  if (document.querySelector('.dev-slider')) {
    var popUpSlider = document.querySelector('.dev-slider');
  } else if (document.querySelector('.dev-circ-slider')) {
    var popUpSlider = document.querySelector('.dev-circ-slider');
  }
  popUpSlider.className += '_close';
  
  //Анимируем возврат клона device__item к его оригинальным размерам 
  var devName = document.querySelector('.dev-name');
  if (devName.textContent == 'Xiaomi warm floor') {
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
