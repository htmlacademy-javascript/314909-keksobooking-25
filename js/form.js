/* eslint-disable indent */
import { resetMap, resetMarker, renderMarkers } from './map.js';
import { mapFiltersForm } from './card-filter.js';
import { getOffer } from './api.js';
import { createSlider } from './slider.js';
import { typePrice } from './data.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const avatar = document.querySelector('#avatar');
const adForm = document.querySelector('.ad-form');
const preview = document.querySelector('.ad-form-header__preview');
const avatarImg = preview.querySelector('img');
const photos = document.querySelector('#images');
const photosContainer = document.querySelector('.ad-form__photo-container');
const resetBtn = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');

guests.value = rooms.value;

const createImage = (files) => {
	const reader = new FileReader();
	const div = document.createElement('div');
	const photo = document.createElement('img');
	div.classList.add('ad-form__photo');
	div.classList.add('photo');
	reader.addEventListener('load', () => {
		photo.src = reader.result;
		div.append(photo);
		photosContainer.append(div);
	});
	if (files) {
		return reader.readAsDataURL(files);
	}
	photo.src = DEFAULT_AVATAR;
};

const createAvatar = (file) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => {
		avatarImg.src = reader.result;
	});
	if (file) {
		reader.readAsDataURL(file);
	}
	avatarImg.src = DEFAULT_AVATAR;
};

const onAvatarImageChange = (evt) => {
	const file = evt.target.files[0];
	createAvatar(file);
};

const onPhotoImagesChange = (evt) => {
	const files = evt.target.files;
	for (let i = 0; i <= files.length; i++) {
		createImage(files[i]);
	}
};

const onResetButtonClick = () => {
	adForm.reset();
	avatar.files.value = DEFAULT_AVATAR;
	avatarImg.src = DEFAULT_AVATAR;
	photos.files.value = '';
	const userPhotos = document.querySelectorAll('.photo');
	userPhotos.forEach((element) => element.remove());
	resetMarker();
	mapFiltersForm.reset();
	getOffer((offers) => renderMarkers(offers));
	createSlider.noUiSlider.reset();
	resetMap();
};

const blockSubmitButton = () => {
	submitButton.disabled = true;
	submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
	submitButton.disabled = false;
	submitButton.textContent = 'Опубликовать';
};

resetBtn.addEventListener('click', onResetButtonClick);

type.addEventListener('change', () => {
	price.placeholder = typePrice[type.value];
	price.min = typePrice[type.value];
});

timeIn.addEventListener('change', () => {
	timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
	timeIn.value = timeOut.value;
});

avatar.addEventListener('change', onAvatarImageChange, false);
photos.addEventListener('change', onPhotoImagesChange, false);

export { price, onResetButtonClick, blockSubmitButton, unblockSubmitButton };
