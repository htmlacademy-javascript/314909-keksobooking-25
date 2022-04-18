/* eslint-disable indent */
const DEFAULT_PRECISION = 2;

// Возвращает случайное целое число из переданного диапазона включительно.
const getRandomNumber = (start, end) => {
    // eslint-disable-next-line indent
    const min = Math.ceil(Math.min(Math.abs(start), Math.abs(end)));
    const max = Math.floor(Math.max(Math.abs(start), Math.abs(end)));
    const result = Math.random() * (max - min + 1) + min;

    return Math.floor(result);
};

// Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = (start, end, digits = DEFAULT_PRECISION) => {
    const lower = Math.min(Math.abs(start), Math.abs(end));
    const upper = Math.max(Math.abs(start), Math.abs(end));
    const result = Math.random() * (upper - lower) + lower;
    return +result.toFixed(digits);
};

// Вовзращает случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
const getRandomSlice = (array) => {
    const count = getRandomNumber(1, array.length);
    return array.slice(0, count + 1);
};


export { getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomSlice };
