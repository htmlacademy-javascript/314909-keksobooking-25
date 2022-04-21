/* eslint-disable indent */
const TEMPLATE_FRAGMENT = document.querySelector('#card').content;
const TEMPLATE = TEMPLATE_FRAGMENT.querySelector('.popup');
//const PHOTO_TEMPLATE = TEMPLATE_FRAGMENT.querySelector('.popup__photo');
const OFFER_TYPES = {
	flat: 'Квартира',
	bungalow: 'Бунгало',
	house: 'Дом',
	palace: 'Дворец',
	hotel: 'Отель'
};

const CARD_TEMPLATE = TEMPLATE.querySelector('.popup');

const createPhotosFragment = (srcList, imgTemplate) => {
	if (!srcList || srcList.length <= 0) {
		return null;
	}

	const popupPhotosFragment = document.createDocumentFragment();

	srcList.forEach((src) => {
		const imgElement = imgTemplate.cloneNode(true);
		imgElement.src = src;
		popupPhotosFragment.append(imgElement);
	});

	return popupPhotosFragment;
};

const createFeaturesFragment = (features, featuresAvailable) => {
	if (!featuresAvailable || featuresAvailable.length <= 0) {
		return null;
	}

	const featuresFragment = document.createDocumentFragment();

	features.forEach((featureItem) => {
		const isNecessary = featuresAvailable.some((featureAvailable) =>
			featureItem.classList.contains(`popup__feature--${featureAvailable}`)
		);

		if (isNecessary) {
			featuresFragment.append(featureItem);
		}
	});

	return featuresFragment;
};

const setHidden = (element) => {
	element.classList.add('hidden');

	return element;
};

const createOffer = (advertisement) => {
	const cardElement = CARD_TEMPLATE.cloneNode(true);

	let element = cardElement.querySelector('.popup__avatar');
	element.src = advertisement.author.avatar ? advertisement.author.avatar : setHidden(element).src;
	element = cardElement.querySelector('.popup__title');
	element.textContent = advertisement.offer.title ? advertisement.offer.title : setHidden(element).textContent;
	element = cardElement.querySelector('.popup__text--address');
	element.textContent = advertisement.offer.address ? advertisement.offer.address : setHidden(element).textContent;

	element = cardElement.querySelector('.popup__text--price');
	element.textContent = advertisement.offer.price ? `${String(advertisement.offer.price)} ₽/ночь` : setHidden(element).textContent;

	element = cardElement.querySelector('.popup__type');
	element.textContent = advertisement.offer.type ? OFFER_TYPES[advertisement.offer.type] : setHidden(element).textContent;

	element = cardElement.querySelector('.popup__text--capacity');
	element.textContent = advertisement.offer.rooms && advertisement.offer.guests ? `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей` : setHidden(element).textContent;

	element = cardElement.querySelector('.popup__text--time');
	element.textContent = advertisement.offer.checkin && advertisement.offer.checkout ? `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}` : setHidden(element).textContent;

	const popupPhotosElement = cardElement.querySelector('.popup__photos');
	const photoElement = cardElement.querySelector('.popup__photo');
	const photosFragment = createPhotosFragment(advertisement.offer.photos, photoElement);
	popupPhotosElement.innerHTML = '';
	if (photosFragment) {
		popupPhotosElement.append(photosFragment);
	}
	else {
		setHidden(popupPhotosElement);
	}

	const popupFeaturesElement = cardElement.querySelector('.popup__features');
	const features = cardElement.querySelectorAll('.popup__feature');
	const featuresFragment = createFeaturesFragment(features, advertisement.offer.features);
	popupFeaturesElement.innerHTML = '';
	if (featuresFragment) {
		popupFeaturesElement.append(featuresFragment);
	}
	else {
		setHidden(popupFeaturesElement);
	}

	element = cardElement.querySelector('.popup__description');
	if (advertisement.offer.description) {
		element.textContent = advertisement.offer.description;
	}
	else {
		setHidden(element);
	}
	return cardElement;

};

export { createOffer };
