/* eslint-disable indent */
import { TypePrice, blockSubmitButton, unblockSubmitButton } from './form.js';
import { sendOffer } from './api.js';

const addForm = document.querySelector('.ad-form');
const accommodationType = document.querySelector('#type');
const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const MAX_ROOMS = 100;
const MIN_ROOMS = 0;

const pristine = new Pristine(addForm, {
	classTo: 'ad-form__element',
	errorTextParent: 'ad-form__element',
	errorTextClass: 'ad-form__error-text',
}, false);

const validatePrice = () => price.value >= TypePrice[accommodationType.value];

const validateRoomsAndGuests = () => Number(rooms.value) === MAX_ROOMS && Number(guests.value) === MIN_ROOMS || Number(guests.value) <= Number(rooms.value) && Number(rooms.value) !== MAX_ROOMS && Number(guests.value) !== MIN_ROOMS;

const showPriceValidationError = () => `Минимальная цена должна быть больше ${TypePrice[accommodationType.value]}`;

pristine.addValidator(price, validatePrice, showPriceValidationError);

pristine.addValidator(
	rooms,
	validateRoomsAndGuests,
	'Количество комнат должно быть меньше или равно количеству гостей'
);

pristine.addValidator(
	guests,
	validateRoomsAndGuests,
	'Количество гостей должно быть меньше или равно количеству комнат'
);

const setUserFromSubmit = (onSuccess, onFail) => {
	addForm.addEventListener('submit', (evt) => {
		evt.preventDefault();
		const isValid = pristine.validate();
		if (isValid) {
			blockSubmitButton();
			sendOffer(
				() => {
					onSuccess();
					unblockSubmitButton();
				},
				() => {
					onFail();
					unblockSubmitButton();
				},
				new FormData(evt.target)
			);
		}
	});
};

export { setUserFromSubmit, addForm };

