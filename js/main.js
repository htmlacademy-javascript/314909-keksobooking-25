// подключение скрипта  <script src="js/main.js"></script>
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const ALERT_MESS_1 = "начальное значение диапазона не должно быть отрицательным!";
const ALERT_MESS_2 = "начальное значение диапазона не должно быть больше конечного!";
function customAlert(message) {
    return alert(message);
}

function getRandomInt(min, max) {
    if (min <= 0) { customAlert(ALERT_MESS_1); }
    if (max - min <= 0) { customAlert(ALERT_MESS_2); }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

/* Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Будет использоваться для генерации временных географических координат в следующем задании. */
// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой  (accur)"
function getRandomArbitrary(min, max, accur) {
    if (min <= 0) { customAlert(ALERT_MESS_1); }
    if ((max - min) <= 0) { customAlert(ALERT_MESS_2); }
    return Math.round(Math.random() * (max - min + 1) + min, accur);
}

getRandomArbitrary(1.1, 1.2, 0.1);
getRandomInt(1, 10);