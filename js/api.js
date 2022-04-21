/* eslint-disable indent */
import { setAdFormActions } from './form-validations.js';
import { showSuccessPopup } from './popup.js';

const APROVE_MESSAGE = 'Ваше объявление успешно размещено!';
const ERROR_MESSAGE = 'Ошибка размещения объявления';
const BUTTON_TEXT = 'Попробовать снова';
const DATABASE_URL = 'https://25.javascript.pages.academy/keksobooking';
const ERROR_SHOW_TIME = 5000;

const showError = (error) => {
	const errorContainer = document.createElement('div');
	errorContainer.classList.add('error-container');
	errorContainer.textContent = error;

	document.body.append(errorContainer);

	setTimeout(() => {
		errorContainer.remove();
	}, ERROR_SHOW_TIME);
};

const getOffer = (onSuccess) => {
	fetch(`${DATABASE_URL}/data`, {
		method: 'GET',
		credentials: 'same-origin',
	},
	)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			showSuccessPopup(false, ERROR_MESSAGE, 'Добавить объявление');
			return [];
		})
		.then(onSuccess);
};

const sendOffer = (offer, onSuccess) =>
	fetch(
		DATABASE_URL,
		{
			method: 'POST',
			credentials: 'same-origin',
			body: offer,
		},
	)
		.then((response) => {
			if (response.ok) {
				showSuccessPopup(true, APROVE_MESSAGE);
				onSuccess();
				setAdFormActions();
			} else {
				showSuccessPopup(false, ERROR_MESSAGE, BUTTON_TEXT);
			}
		});

export { getOffer, sendOffer, showError };
