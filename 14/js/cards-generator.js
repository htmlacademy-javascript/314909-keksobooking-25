/* eslint-disable indent */
const template = document.querySelector('#card').content;
const cardTemplate = template.querySelector('.popup');

const typeFromEngToRusDictionary = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
};

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

const createRandomAdvertisementCard = (advertisement) => {
    const cardElement = cardTemplate.cloneNode(true);

    //SET AVATAR
    let element = cardElement.querySelector('.popup__avatar');
    element.src = advertisement.author.avatar ? advertisement.author.avatar : setHidden(element).src;

    //SET TITLE
    element = cardElement.querySelector('.popup__title');
    element.textContent = advertisement.offer.title ? advertisement.offer.title : setHidden(element).textContent;

    //SET ADDRESS
    element = cardElement.querySelector('.popup__text--address');
    element.textContent = advertisement.offer.address ? advertisement.offer.address : setHidden(element).textContent;

    //SET PRICE
    element = cardElement.querySelector('.popup__text--price');
    element.textContent = advertisement.offer.price ? `${String(advertisement.offer.price)} ₽/ночь` : setHidden(element).textContent;

    //SET TYPE
    element = cardElement.querySelector('.popup__type');
    element.textContent = advertisement.offer.type ? typeFromEngToRusDictionary[advertisement.offer.type] : setHidden(element).textContent;

    //SET CAPACITY
    element = cardElement.querySelector('.popup__text--capacity');
    element.textContent = advertisement.offer.rooms && advertisement.offer.guests ? `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей` : setHidden(element).textContent;

    //SET TIME
    element = cardElement.querySelector('.popup__text--time');
    element.textContent = advertisement.offer.checkin && advertisement.offer.checkout ? `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}` : setHidden(element).textContent;

    //SET PHOTOS
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

    //SET FEATURES
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

    //SET DESCRIPTION
    element = cardElement.querySelector('.popup__description');
    if (advertisement.offer.description) {
        element.textContent = advertisement.offer.description;
    }
    else {
        setHidden(element);
    }
    return cardElement;

};

export { createRandomAdvertisementCard };
