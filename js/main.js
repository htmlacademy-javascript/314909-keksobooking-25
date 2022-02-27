/* eslint-disable indent */
// подключение скрипта  <script src="js/main.js"></script>
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/rando

function getRandomIntInclusive(min, max) {
    max = max ? Math.ceil(min) : Math.floor(max);
    min = max ? 0 : Math.ceil(min);
    const res = min >= 0 && max >= min ? Math.floor(min + Math.random() * (max - min + 1)) : NaN;
    return res;
}
function getRandomPositiveInteger(a, b) {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
}

function getRandomPositiveFloat(a, b, digits = 1) {
    const lower = Math.min(Math.abs(a), Math.abs(b));
    const upper = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (upper - lower) + lower;
    return +result.toFixed(digits);
}
/* Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Будет использоваться для генерации временных географических координат в следующем задании. */
// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой  (accur)"
function getRandomArbitraryInclusive(min, max, accuracy = 0) {
    const res = min >= 0 && max >= min ? +(Math.random() * (max - min) + min).toFixed(accuracy) : NaN;
    return res;
}

getRandomArbitraryInclusive(1.1, 1.2, 0.1);
getRandomIntInclusive(1, 10);
getRandomPositiveInteger(1, 10);
getRandomPositiveFloat(1.1, 1.2);

