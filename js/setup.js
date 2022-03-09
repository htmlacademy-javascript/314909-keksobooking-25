/* eslint-disable indent */
import { TYPES, TIME, FEATURES, PHOTOS, DESCRIPTION, PARAMS } from './data.js';
import { getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomSlice } from './api.js';

const createPoint = (i) => {
    const location = {
        lat: getRandomFloat(PARAMS[7], PARAMS[8], PARAMS[11]),
        lng: getRandomFloat(PARAMS[9], PARAMS[10], PARAMS[11]),
    };
    const offer = {
        title: 'Заголовок предложения',
        address: `${location.lat}, ${location.lng}`,
        price: getRandomNumber(PARAMS[1], PARAMS[2]),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomNumber(PARAMS[3], PARAMS[4]),
        guests: getRandomNumber(PARAMS[5], PARAMS[6]),
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
