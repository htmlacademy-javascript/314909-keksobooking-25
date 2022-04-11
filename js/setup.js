/* eslint-disable indent */
import { TYPES, TIME, FEATURES, PHOTOS, DESCRIPTION, params } from './data.js';
import { getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomSlice } from './api.js';

const createPoint = (i) => {
    const location = {
        lat: getRandomFloat(params.MIN_LAT, params.MAX_LAT, params.COORD_PRECISION),
        lng: getRandomFloat(params.MIN_LNG, params.MAX_LNG, params.COORD_PRECISION),
    };
    const offer = {
        title: 'Заголовок предложения',
        address: `${location.lat}, ${location.lng}`,
        price: getRandomNumber(params.MIN_PRICE, params.MAX_PRICE),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomNumber(params.MIN_ROOMS, params.MAX_ROOMS),
        guests: getRandomNumber(params.MIN_GUESTS, params.MAX_GUESTS),
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
