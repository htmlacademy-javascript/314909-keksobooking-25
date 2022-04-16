/* eslint-disable indent */


const ADVERTS_NUM = 10;
const HOUSES_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
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

const locationRange = {
    lat: {
        from: 35.65000,
        to: 35.70000,
    },
    lng: {
        from: 139.70000,
        to: 139.80000,
    },
    decimals: 5,
};


const roomParams = {
    price: {
        min: 1,
        max: 30000
    },
    roomNumbers: {
        min: 1,
        max: 5,
    },
    guests: {
        min: 1,
        max: 10,
    }
};

export { ADVERTS_NUM, HOUSES_TYPES, TIME, FEATURES, PHOTOS, DESCRIPTION, locationRange, roomParams };
