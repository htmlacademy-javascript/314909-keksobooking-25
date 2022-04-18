/* eslint-disable indent */
const DEFAULT_PRECISION = 5;

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

const getNumberWithLeadZero = (i) => (i < 10) ? `0${i}` : i;

const toggleForm = (form, activClassName, isActive) => {
    const fieldsetList = form.querySelectorAll('fieldset');
    form.classList.toggle(activClassName);
    fieldsetList.forEach((fieldset) => {
        fieldset.disabled = !isActive;
    });
};
const isEscKey = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

const renderElement = (container, element) => {
    container.insertAdjacentHTML('beforeend', element);
};

const debounce = (callback, timeoutDelay) => {
    let timeoutId;
    return (...rest) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
};

const getPriceLevel = (price) => {
    if (price <= 10000) {
        return 'low';
    } else if (price >= 50000) {
        return 'high';
    }
    return 'middle';
};

const checkEquality = ([valueA, valueB]) => {
    if (valueB === 'any') {
        return true;
    }
    const ethalon = typeof valueA === 'number' ? parseInt(valueB, 10) : valueB;
    return valueA === ethalon;
};

export {
    getRandomNumber,
    getRandomFloat,
    getRandomArrayElement,
    getRandomSlice,
    getNumberWithLeadZero,
    toggleForm,
    isEscKey,
    renderElement,
    getPriceLevel,
    debounce,
    checkEquality
};
