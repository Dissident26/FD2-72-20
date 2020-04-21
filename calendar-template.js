function createCalendar(element, year, month) {

    let date = new Date(year, month-1); //шаблон таблицы
    let table = `<table><caption>${monthName(month-1)+ ' '} ${year + ' годa'}</caption><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>`              

for (let i = 0; i < getDay(date); i++) { // +пустые ячейки до начала месяца
table += '<td></td>';
    }

while (date.getMonth() == month-1) { // tr каждый понедельник
    table += '<td>' + date.getDate() + '</td>';
    if (getDay(date) % 7 == 6) { 

        table += '</tr><tr>';
        }

date.setDate(date.getDate() + 1);
    }

    if (getDay(date) != 0) {
        for (let i = getDay(date); i < 7; i++) { // +пустые ячейки до конца месяца
        table += '<td></td>';
        }
    }

table += '</tr></table>'; // закрываем табл
element.innerHTML = table;  // присваиваем 

}

function getDay(date) { 
let day = date.getDay();
    if (day == 0) day = 7; // вс последний день
    return day - 1;
}
function monthName(n){      //имена месяцев
let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
return months[n]
}