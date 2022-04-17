/* eslint-disable indent */
import { arrayOfAdverts } from './setup.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = arrayOfAdverts();

const similarListElement = document.querySelector('#map-canvas');

const OFFER_TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalow': 'Бунгало',
    'hotel': 'Отель',
};

const fillELement = (container, dataList, getChild) => {
    if (dataList) {
        container.innerHTML = '';
        dataList.forEach((item) => {
            container.append(getChild(item));
        });
    } else {
        container.remove();
    }
};

const createAd = ({ author, offer }) => {
    const balloonTemplate = cardTemplate.cloneNode(true);

    const contentToSelector = {
        '.popup__title': offer.title,
        '.popup__text--address': offer.address,
        '.popup__text--price': `${offer.price} ₽/ночь`,
        '.popup__type': OFFER_TYPES[offer.type].type,
        '.popup__text--capacity': `${offer.rooms} комнаты для ${offer.guests} гостей`,
        '.popup__text--time': `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
        '.popup__description': offer.description
    };

    Object.entries(contentToSelector).forEach(([selector, content]) => {
        const element = balloonTemplate.querySelector(selector);
        if (content) {
            element.textContent = content;
        } else {
            element.remove();
        }
    });

    const photoContainer = balloonTemplate.querySelector('.popup__photos');
    const photoElement = photoContainer.querySelector('.popup__photo');

    fillELement(photoContainer, offer.photos, (photo) => {
        const newPhoto = photoElement.cloneNode(true);
        newPhoto.src = photo;
        return newPhoto;
    });

    const avatarElement = balloonTemplate.querySelector('.popup__avatar');
    if (author.avatar) {
        avatarElement.src = author.avatar;
    } else {
        avatarElement.remove();
    }

    return balloonTemplate;
};


const drawMap = () => {
    const similarListFragment = document.createDocumentFragment();

    similarAds.forEach(({ offer, author }) => {
        similarListFragment.append(createAd({ offer, author }));
    });

    similarListElement.append(similarListFragment);
};

export { drawMap };
