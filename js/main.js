// подключение скрипта  <script src="js/main.js"></script>
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MAX_ADS = 10;
const MIN_PRICE = 1;
const MAX_PRICE = 30000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const FLOAT = 5;

// Возвращает случайное целое число из переданного диапазона включительно.
const getRandomNumber = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

// Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

// Вовзращает случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
const getRandomLengthArr = (array) => {
  const newArr = [];
  const count = getRandomNumber(1, array.length);
  for (let i = 0; i < count; i++) {
    newArr.push(array[i]);
  }
  return newArr;
};

const createPoint = (i) => {
  const location = {
    lat: getRandomFloat(MIN_LAT, MAX_LAT, FLOAT),
    lng: getRandomFloat(MIN_LNG, MAX_LNG, FLOAT),
  };
  return {
    autor: {
      avatar: `img/avatars/user${0 + i.slice(-2)}.png`
    },
    location,
    offer: {
      title: 'Заголовок предложения',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomLengthArr(FEATURES),
      description: 'Описание помещения',
      photos: getRandomLengthArr(PHOTOS),
    }
  };
};

getRandomFloat(1.1, 1.2, 5);
getRandomNumber(1, MAX_ADS);
createPoint(MAX_ADS);
