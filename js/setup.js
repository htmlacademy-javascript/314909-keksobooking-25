/* eslint-disable indent */
import { TYPES, TIME, FEATURES, PHOTOS, DESCRIPTION, PARAMS } from './data.js';
import { getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomSlice } from './utilites.js';

const createPoint = (i) => {
    const location = {
        lat: getRandomFloat(PARAMS.MIN_LAT, PARAMS.MAX_LAT, PARAMS.COORD_PRECISION),
        lng: getRandomFloat(PARAMS.MIN_LNG, PARAMS.MAX_LNG, PARAMS.COORD_PRECISION),
    };
    const offer = {
        title: 'Заголовок предложения',
        address: `${location.lat}, ${location.lng}`,
        price: getRandomNumber(PARAMS.MIN_PRICE, PARAMS.MAX_PRICE),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomNumber(PARAMS.MIN_ROOMS, PARAMS.MAX_ROOMS),
        guests: getRandomNumber(PARAMS.MIN_GUESTS, PARAMS.MAX_GUESTS),
        checkin: getRandomArrayElement(TIME),
        checkout: getRandomArrayElement(TIME),
        features: getRandomSlice(FEATURES),
        description: getRandomArrayElement(DESCRIPTION),
        photos: getRandomSlice(PHOTOS),
    };
    return {
        autor: {
            avatar: `img/avatars/user${0 + i.slice(-2)}.png`
        },
        location,
        offer
    };
};

export { createPoint };
