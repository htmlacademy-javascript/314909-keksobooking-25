/* eslint-disable indent */
import { arrayOfAdverts } from './advertisment.js';
import { FEATURES, OFFER_TYPES } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = arrayOfAdverts();

const similarListElement = document.querySelector('#map-canvas');


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

const fillELement = (container, dataList, getChild) => {
    if (dataList) {
        container.innerHTML = '';
        dataList.forEach((item) => {
            container.append(getChild(item));
        });
    } else {
        setHidden(container);
    }
};


const createOffer = ({ author, offer }) => {
    const balloonTemplate = cardTemplate.cloneNode(true);

    const contentToSelector = {
        '.popup__title': offer.title,
        '.popup__text--address': offer.address,
        '.popup__text--price': `${offer.price} ₽/ночь`,
        '.popup__type': OFFER_TYPES[offer.type].type,
        '.popup__text--capacity': `${offer.rooms} комнаты для ${offer.guests} гостей`,
        '.popup__text--time': `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
        '.popup__features--capacity': createFeaturesFragment(offer.FEATURES, FEATURES[offer.checkin]),
        '.popup__description': offer.description,
    };

    Object.entries(contentToSelector).forEach(([selector, content]) => {
        const element = balloonTemplate.querySelector(selector);
        if (content) {
            element.textContent = content;
        } else {
            setHidden(element);
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
        setHidden(avatarElement);
    }

    return balloonTemplate;
};


const drawMap = () => {
    const similarListFragment = document.createDocumentFragment();

    similarAds.forEach(({ offer, author }) => {
        similarListFragment.append(createOffer({ offer, author }));
    });

    similarListElement.append(similarListFragment);
};

export { drawMap };
