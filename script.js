function ViewDOM () {       //ViewDOM
    let element = null,
        model = null;
    
    this.init = function (elem, mod){
        element = elem,
        model = mod;
    };

    this.createClock = function(_radius, _angle, _clockFaceSize, _numbersSize, _hourArrowHeight, _hourArrowWidth, _minuteArrowHeight, _minuteArrowWidth, _secondsArrowHeight, _secondsArrowWidth){
        document.head.innerHTML += 
        `<style>
        #clock-face {
            position: relative;
            border-radius: 50%;
            border: 2px solid black;
            }
        .number {
            border: 1px solid black;
            position: absolute;
            border-radius: 50%;
            display: flex;
            align-items: center; 
            justify-content: center;
        }
        #hour-arrow{
            background-color:black;
            position: absolute;
        }
        #minute-arrow{
            background-color:dimgray;
            position: absolute;
        }
        #seconds-arrow{
            background-color:red;
            position: absolute;
        }
        </style>`;

        let clock = document.createElement('div');
        clock.setAttribute('id','clock')      //создаем div-родитель
        element.append(clock);

        let clockFace = document.createElement('div');
        clockFace.setAttribute('id', 'clock-face'); // создаем циферблат

    clock.appendChild(clockFace);

    clockFace.style.width = _clockFaceSize +'px'; // устанавливаем размер циферблата
    clockFace.style.height = _clockFaceSize +'px';

    let clockFaceCenterX = clockFace.offsetLeft + clockFace.offsetWidth / 2; // центр циферблата
    let clockFaceCenterY = clockFace.offsetTop + clockFace.offsetHeight / 2;

    for ( let i = 1; i <= 12; i++){

        let numX = clockFaceCenterX + _radius * Math.sin((_angle* i) / 180 * Math.PI) ; //центр цифр
        let numY = clockFaceCenterY - _radius * Math.cos((_angle * i) / 180 * Math.PI); 

        let number = document.createElement('div');
            number.setAttribute('class', 'number'); //див для цифр
            number.innerHTML = i;

            clock.appendChild(number)

            number.style.width = _numbersSize +'px'; // устанавливаем размер кругов цифр
            number.style.height = _numbersSize +'px';

            number.style.left = Math.round(numX - number.offsetWidth / 2)+"px";   //позиционирование относительно родителя
            number.style.top = Math.round(numY - number.offsetHeight / 2)+"px";
        
    }

        let secondsArrow = document.createElement('div');
            secondsArrow.setAttribute('id', 'seconds-arrow');
        clock.appendChild(secondsArrow)

        secondsArrow.style.width = _secondsArrowWidth + 'px'; // устанавливаем размер секундной стрелки
        secondsArrow.style.height = _secondsArrowHeight / 2 + 'px';

        secondsArrow.style.left = clockFaceCenterX + "px";  //позиционируем стрелку
        secondsArrow.style.top = clockFaceCenterY - _secondsArrowHeight / 2 + "px";

        let minuteArrow = document.createElement('div');
            minuteArrow.setAttribute('id', 'minute-arrow');
        clock.appendChild(minuteArrow)

        minuteArrow.style.width = _minuteArrowWidth + 'px'; // устанавливаем размер минутной стрелки
        minuteArrow.style.height = _minuteArrowHeight  + 'px';

        minuteArrow.style.left = clockFaceCenterX + "px";  //позиционируем стрелку
        minuteArrow.style.top = clockFaceCenterY  - _minuteArrowHeight / 2 + "px";

        let hourArrow = document.createElement('div');
            hourArrow.setAttribute('id', 'hour-arrow');
        clock.appendChild(hourArrow)

        hourArrow.style.width = _hourArrowWidth +'px'; // устанавливаем размер часовой стрелки
        hourArrow.style.height = _hourArrowHeight +'px';

        hourArrow.style.left = clockFaceCenterX  + "px";  //позиционируем стрелку
        hourArrow.style.top = clockFaceCenterY  - _hourArrowHeight / 2 + "px";

    setInterval(clockWork, 1000); // интервал на вызов функции каждую сек

function clockWork (){      //функция на часы
    let date = new Date();
    let sec = date.getSeconds();
    let min = date.getMinutes();
    let hour = date.getHours();
    let count = 270; // стрелки на 12

    let secondsArrow = clock.querySelector('#seconds-arrow')
    let minuteArrow = clock.querySelector('#minute-arrow');
    let hourArrow = clock.querySelector('#hour-arrow');

    secondsArrow.style.transformOrigin = `top left`;
    secondsArrow.style.transform = 'rotate('+ Number(count + (sec * 6)) +'deg)'; // 360гр / 60 сек = 6гр/сек

    minuteArrow.style.transformOrigin = `top left`;
    minuteArrow.style.transform = 'rotate('+ Number(count + (min * 6)) +'deg)'; // 360гр / 60 мин = 6гр/мин

    hourArrow.style.transformOrigin = `top left`;   //возможно ниже будет косяк
    hourArrow.style.transform = 'rotate('+ Number(count + hour * 30 + (min / 2) ) +'deg)'; // 360гр / 12 ч = 30гр/час

   } clockWork()
   
   let timeZone = new Date().toString();     //часовой пояс
   console.log(new Date().toLocaleDateString())
   console.log(timeZone.split(' ')[5].slice(0,6))
   console.log(timeZone.split(' ')[6].slice(1,7))
   let btns = document.createElement('div');
    btns.innerHTML = `<button id="start">Старт</button><button id="stop">Стоп</button> ${timeZone}`;
    clock.appendChild(btns)
    };
};
function ViewSVG () {       //ViewSVG
    const svgNS = "http://www.w3.org/2000/svg";  //svg инструкции
    let element = null,
    model = null;

    this.init = function (elem, mod){
        element = elem,
        model = mod;
    };
    this.createClock = function(_radius, _angle, _clockFaceSize, _numbersSize, _hourArrowHeight, _hourArrowWidth, _minuteArrowHeight, _minuteArrowWidth, _secondsArrowHeight, _secondsArrowWidth){

        let clockWrap = document.createElement('div');
        element.appendChild(clockWrap);

        let clock = document.createElementNS(svgNS, 'svg'); //первый парам оч важный!
            clock.setAttribute('id', 'clock');
            clock.setAttribute('height', _clockFaceSize);
            clock.setAttribute('width', _clockFaceSize); //создаем родительский див
            clockWrap.append(clock);

    let clockFace = document.createElementNS(svgNS,"circle");
        clockFace.setAttributeNS(null,"cx", _clockFaceSize / 2);
        clockFace.setAttributeNS(null,"cy", _clockFaceSize / 2);
        clockFace.setAttributeNS(null,"r", (_clockFaceSize-1) / 2); // рисуем циферблат(-1 чтоб не выходил за границы)
        clockFace.setAttributeNS(null,"fill","none");
        clockFace.setAttributeNS(null,"stroke","black");
    clock.appendChild(clockFace);

for (let i = 1; i <= 12; i++){

    let numX = _clockFaceSize / 2 + _radius * Math.sin((_angle* i) / 180 * Math.PI) ; //центр цифр
    let numY = _clockFaceSize / 2 - _radius * Math.cos((_angle * i) / 180 * Math.PI); 

    let number = document.createElementNS(svgNS, "circle");
        number.setAttributeNS(null,"cx", numX);
        number.setAttributeNS(null,"cy", numY);
        number.setAttributeNS(null,"r", _numbersSize / 2); // рисуем круги цифр
        number.setAttributeNS(null,"fill","none");
        number.setAttributeNS(null,"stroke","black");

    let count = document.createElementNS(svgNS, "text");
        count.setAttribute('x', numX);
        count.setAttribute('y', numY);
        count.setAttribute('fill', 'black'); //добавляем сами цифры
        count.setAttribute('text-anchor', 'middle'); //выравниваем по горизонтали
        count.setAttribute('alignment-baseline', 'middle'); //выравниваем по вертикали
        count.textContent = i;
        clock.appendChild(count);

    clock.appendChild(number)

        };

        let secondsArrow = document.createElementNS(svgNS, "line"); //рисуем секундную стрелку
            secondsArrow.setAttribute('id', 'seconds-arrow');
            secondsArrow.setAttributeNS(null,"x1", _clockFaceSize / 2);
            secondsArrow.setAttributeNS(null,"x2", _clockFaceSize / 2);  //позиционируем
            secondsArrow.setAttributeNS(null,"y1", _clockFaceSize / 2);
            secondsArrow.setAttributeNS(null,"y2", _secondsArrowWidth + _clockFaceSize / 2);
            secondsArrow.setAttributeNS(null,"stroke", "red");
            secondsArrow.setAttributeNS(null,"stroke-width", _secondsArrowHeight);
        clock.appendChild(secondsArrow)

    let minuteArrow = document.createElementNS(svgNS, "line");  //рисуем минутную стрелку
            minuteArrow.setAttribute('id', 'minute-arrow');
            minuteArrow.setAttributeNS(null,"x1", _clockFaceSize / 2);
            minuteArrow.setAttributeNS(null,"x2", _clockFaceSize / 2);   //позиционируем
            minuteArrow.setAttributeNS(null,"y1", _clockFaceSize / 2);
            minuteArrow.setAttributeNS(null,"y2", _minuteArrowWidth + _clockFaceSize / 2);
            minuteArrow.setAttributeNS(null,"stroke", "dimgray");
            minuteArrow.setAttributeNS(null,"stroke-width", _minuteArrowHeight);
        clock.appendChild(minuteArrow)

    let hourArrow = document.createElementNS(svgNS, "line");    //рисуем часовую стрелку
            hourArrow.setAttribute('id', 'hour-arrow');
            hourArrow.setAttributeNS(null,"x1", _clockFaceSize / 2);
            hourArrow.setAttributeNS(null,"x2", _clockFaceSize / 2); //позиционируем
            hourArrow.setAttributeNS(null,"y1", _clockFaceSize / 2);
            hourArrow.setAttributeNS(null,"y2", _hourArrowWidth + _clockFaceSize / 2);
            hourArrow.setAttributeNS(null,"stroke", "black");
            hourArrow.setAttributeNS(null,"stroke-width", _hourArrowHeight);
        clock.appendChild(hourArrow)

        let timeZone = new Date().toString();     //часовой пояс
    console.log(new Date().toLocaleDateString())
    console.log(timeZone.split(' ')[5].slice(0,6))
    console.log(timeZone.split(' ')[6].slice(1,7))
    let btns = document.createElement('div');
    btns.innerHTML = `<button id="start">Старт</button><button id="stop">Стоп</button> ${timeZone}`;
    clockWrap.appendChild(btns)

    setInterval(clockWork, 1000); 

    function clockWork (){      //функция на часы
        let date = new Date();
        let sec = date.getSeconds();
        let min = date.getMinutes();
        let hour = date.getHours();
        let count = 180; // стрелки на 12
    
        let secondsArrow = clock.querySelector('#seconds-arrow')
        let minuteArrow = clock.querySelector('#minute-arrow');
        let hourArrow = clock.querySelector('#hour-arrow');

        secondsArrow.setAttributeNS(null,"transform", `rotate(${Number(count + (sec * 6))} ${_clockFaceSize / 2} ${_clockFaceSize / 2})`);
        minuteArrow.setAttributeNS(null,"transform", `rotate(${Number(count + (min * 6))} ${_clockFaceSize / 2} ${_clockFaceSize / 2})`);
        hourArrow.setAttributeNS(null,"transform", `rotate(${Number(count + (hour * 30 + (min / 2)) )} ${_clockFaceSize / 2} ${_clockFaceSize / 2})`);
       } clockWork()
    };

    
};
function ViewCanvas () {       //ViewCanvas
    let element = null,
    model = null;

    this.init = function (elem, mod){
        element = elem,
        model = mod;
    };

    this.createClock = function(_radius, _angle, _clockFaceSize, _numbersSize, _hourArrowHeight, _hourArrowWidth, _minuteArrowHeight, _minuteArrowWidth, _secondsArrowHeight, _secondsArrowWidth){

        let clock = document.createElement('div');
            clock.setAttribute('id', 'clock');
            clock.setAttribute('height', _clockFaceSize);
            clock.setAttribute('width', _clockFaceSize); //создаем родительский див
        element.append(clock);

        let clockFace = document.createElement('canvas');   //создаем канвас
            clockFace.setAttribute('id', 'clock-face');
            clockFace.setAttribute('width', _clockFaceSize); //задаем аттрибуты
            clockFace.setAttribute('height', _clockFaceSize);
        clock.appendChild(clockFace)

        let timeZone = new Date().toString();     //часовой пояс
            console.log(new Date().toLocaleDateString())
            console.log(timeZone.split(' ')[5].slice(0,6))
            console.log(timeZone.split(' ')[6].slice(1,7))
        let btns = document.createElement('div');
            btns.innerHTML = `<button id="start">Старт</button><button id="stop">Стоп</button> ${timeZone}`;
        clock.appendChild(btns);

        ctx = clockFace.getContext('2d');   //Контекст

        function createClockFace(){
            
                ctx.restore();
        ctx.clearRect(0, 0, _clockFaceSize, _clockFaceSize)       //очищаем холст
                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'white';    //рисуем круг
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(_clockFaceSize / 2, _clockFaceSize / 2, _clockFaceSize / 2, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();
                
            for (let i = 1; i <= 12; i++){  //цикл на добавление цифр и кругов

            let numX = _clockFaceSize / 2 + _radius * Math.sin((_angle * i) / 180 * Math.PI) ; //центр цифр
            let numY = _clockFaceSize / 2 - _radius * Math.cos((_angle * i) / 180 * Math.PI); 

                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'white';    //рисуем круг
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(numX, numY, _numbersSize / 2, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.font = "18px Verdana";
                ctx.fillStyle = 'black';    //добавляем цифры
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';    //ровняем в центр по верт и гориз
                ctx.fillText(i, numX, numY);
                ctx.save(); //сохраняем параметры
            };
        };
            function clockWork (){      //функция на часы
                let date = new Date();
                let sec = date.getSeconds();
                let min = date.getMinutes();
                let hour = date.getHours();
                ctx = clockFace.getContext('2d');   //Контекст

                ctx.restore();  //загружаем последние параметры
                createClockFace()   //вызываем функцию на отрисовку цифеблата       
                ctx.strokeStyle = 'red';
                ctx.fillStyle = 'red';
                ctx.lineWidth = _secondsArrowHeight; //рисуем сек стрелку

                ctx.beginPath()
                ctx.translate(_clockFaceSize / 2, _clockFaceSize / 2); // переходим в центр 
                ctx.rotate((Math.PI / 180) * sec * 6); // вращаем
                ctx.translate(-_clockFaceSize / 2, -_clockFaceSize / 2); // возвращаем исходные значения
                ctx.moveTo(_clockFaceSize / 2, _clockFaceSize / 2);
                ctx.lineTo(_clockFaceSize / 2 , _clockFaceSize / 2 - _secondsArrowWidth );
                ctx.lineCap = 'round';
                ctx.stroke();       
                ctx.restore();  //загружаем последние параметры

                ctx.strokeStyle = 'dimgray';
                ctx.fillStyle = 'dimgray';
                ctx.lineWidth = _minuteArrowHeight;
                ctx.beginPath()     //рисуем мин стрелку
                ctx.translate(_clockFaceSize / 2, _clockFaceSize / 2); // переходим в центр 
                ctx.rotate((Math.PI / 180) * min * 6); // вращаем
                ctx.translate(-_clockFaceSize / 2, -_clockFaceSize / 2); // возвращаем исходные значения
                ctx.moveTo(_clockFaceSize / 2, _clockFaceSize / 2);
                ctx.lineTo(_clockFaceSize / 2 , _clockFaceSize / 2 - _minuteArrowWidth );
                ctx.lineCap = 'round';
                ctx.stroke();       
                ctx.restore();  //загружаем последние параметры

                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'black';
                ctx.lineWidth = _hourArrowHeight;
                ctx.beginPath()     //рисуем час стрелку
                ctx.translate(_clockFaceSize / 2, _clockFaceSize / 2); // переходим в центр  
                ctx.rotate((Math.PI / 180) * (hour * 30 + (min/2))); // вращаем
                ctx.translate(-_clockFaceSize / 2, -_clockFaceSize / 2); // возвращаем исходные значения
                ctx.moveTo(_clockFaceSize / 2, _clockFaceSize / 2);
                ctx.lineTo(_clockFaceSize / 2 , _clockFaceSize / 2  - _hourArrowWidth );
                ctx.lineCap = 'round';
                ctx.stroke();       

                        } clockWork()
                        setInterval(clockWork, 1000);
    };

};
function Model () {     //Model
    let element = null,
        view = null,
        settings = {}, //обьект с настройками
        zoneTime = null,
        zoneName = null;

    this.setSettings = function({_radius, _angle, _clockFaceSize, _numbersSize, _hourArrowHeight, _hourArrowWidth, _minuteArrowHeight, _minuteArrowWidth, _secondsArrowHeight, _secondsArrowWidth}){
        settings.radius = _radius,
        settings.angle = _angle, 
        settings.clockFaceSize = _clockFaceSize,
        settings.numbersSize = _numbersSize,
        settings.hourArrowHeight = _hourArrowHeight,
        settings.hourArrowWidth = _hourArrowWidth,
        settings.minuteArrowHeight = _minuteArrowHeight,
        settings.minuteArrowWidth = _minuteArrowWidth,
        settings.secondsArrowHeight = _secondsArrowHeight,
        settings.secondsArrowWidth = _secondsArrowWidth;

        view.createClock(settings.radius, settings.angle, settings.clockFaceSize, settings.numbersSize, settings.hourArrowHeight, settings.hourArrowWidth, settings.minuteArrowHeight, settings.minuteArrowWidth, settings.secondsArrowHeight, settings.secondsArrowWidth) //?
        
    };
    this.init = function (elem, vie){
        element = elem;
        view = vie;
    };
    this.handleClick = function(event){
        console.log(event.target.id)
    }
};
function Controller () {        //Controller
    let element = null,
        model = null;

    this.init = function (elem, mod, set){
        element = elem;
        model = mod;
        model.setSettings(set);
    };
    
    // this.setSettings = function(...args){
    //     model.setSettings(...args);
    // };
    
    this.handleClick = function (event) {
        model.handleClick(event)
    };
};