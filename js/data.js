/* eslint-disable indent */

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
const DESCRIPTION = ['Описание помещения',
    'Великолепная квартира-студия',
    'Гнездышко для молодоженов',
    'Квартира для студентов',
    'Для многодетной семьи',
    'Для одиночек с животными',
];

const PARAMS = {
    MAX_ADS: 10,
    MIN_PRICE: 1,
    MAX_PRICE: 30000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 5,
    MIN_GUESTS: 1,
    MAX_GUESTS: 10,
    MIN_LAT: 35.65000,
    MAX_LAT: 35.70000,
    MIN_LNG: 139.70000,
    MAX_LNG: 139.80000,
    COORD_PRECISION: 5
};

export { TYPES, TIME, FEATURES, PHOTOS, DESCRIPTION, PARAMS };

