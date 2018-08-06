# Яндекс ШРИ 2018

## Задание 2 - верстка

### Предисловие
  
  Используемые средства: 
    - Brackets.io
    - Sass/scss
    - Grunt.js (для сборки проекта)
    - JS (для анимации pop-up, заглушки и прокрутки)
  Верстка сделана в соответствии с макетами и подогнана по картинкам приближенно к PixelPerfect.
  Были отредактированы svg-файлы: 
    - Убран серый задний фон
    - Убраны лишние строки
    - Поправлено отображение элемента
  Анимацию линейных слайдеров можно сделать по средствам JS. Анимацию кругового слайдера 
  можно сделать через JQuery плагин с круговым слайдером и стилизацией его под необходимый.
  
### Мобильная версия (375px)

#### Header

- Логотип сделан через тег `<picture>` с добавлением разных вариантов изображения в зависимости 
  от экрана и поддерживаемых форматов. 
- Меню сделано через ссылку и псевдокласс `:target`. Появляется с анимацией.

#### Main

- Задний фон и все иконки сделаны через свойство `background-image: image-set()`. 
  По порядку первым всегда загружается svg-формат, затем png-формат в зависимости от разрешения
  экрана и количества пикселей на дюйм (2x/1x). Если не поддерживается svg-формат и `image-set()`,
  то загружается png-формат (1x).
- Сделана анимация открытия pop-up окна приближенно к видео. Сделать чистым css3 не получилось,
  так как требуется множество дополнительных костылей-конструкций для позиционирования начального
  окна pop-up относительно кликнутого. Анимация сделана с помощью css3 свойств `animation` и
  добавление классов с этими свойствами элементам pop-up окна.
  В зависимости от иконки открываемого устройства, открывается соответсвующее pop-up окно. Так как 
  иконки для pop-up температуры пола и просто температуры одинаковые, то выборка pop-up
  окна для температуры делается по названию "Xiaomi Warm Floor".
  "Xiaomi Warm Floor" добавлена 4-ым устройством в блок "Главное".
- Прокрутка элементов сделана через `overflow-x: scroll`.
- Меню в избранных устройствах сделано через ссылку и псевдокласс `:target`. Появляется с анимацией.
  Иконка с стрелкой для меню была сверстана через псевдоэлемент `::after`.

#### Footer

- Футера мобильной версии не было в оригинальном макете. Сверстан на свое усмотрение.

### ПК версия (1366px)

- Убрана вертикальная прокрутка страницы в соответствии с заданием.

#### Header

- Стилизован относительно ПК версии.

#### Main

- Стилизован относительно ПК версии.
- Pop-up окна стилизованы для ПК версии.

#### Footer

- Стилизован под ПК версию.
- Прижат к низу страницы.
