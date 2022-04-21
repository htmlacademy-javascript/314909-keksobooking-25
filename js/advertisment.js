/* eslint-disable indent */
import { ADVERTS_NUM, OFFER_TYPES, TIME, FEATURES, PHOTOS, DESCRIPTION, locationRange, roomParams } from './data.js';
import { getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomSlice } from './utilites.js';

const createPoint = (i) => {
	const currentIndex = i + 1;

	const location = {
		lat: getRandomFloat(locationRange.lat.from, locationRange.lat.to, locationRange.decimals),
		lng: getRandomFloat(locationRange.lng.from, locationRange.lng.to, locationRange.decimals),
	};
	const offer = {
		title: 'Заголовок предложения',
		address: `${location.lat}, ${location.lng}`,
		price: getRandomNumber(roomParams.price.min, roomParams.price.max),
		type: getRandomArrayElement(OFFER_TYPES),
		rooms: getRandomNumber(roomParams.roomNumbers.min, roomParams.roomNumbers.max),
		guests: getRandomNumber(roomParams.guests.min, roomParams.guests.max),
		checkin: getRandomArrayElement(TIME),
		checkout: getRandomArrayElement(TIME),
		features: getRandomSlice(FEATURES),
		description: getRandomArrayElement(DESCRIPTION),
		photos: getRandomSlice(PHOTOS),
	};

	return {
		autor: {
			avatar: `img/avatars/user${(currentIndex.toString()).padStart(2, '0')}.png`
		},
		location,
		offer
	};
};

const advertArray = () => Array.from({ length: ADVERTS_NUM }).map((item, idx) => createPoint(idx));

export { advertArray, ADVERTS_NUM };
