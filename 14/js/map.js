/* eslint-disable indent */
import { drawMap } from './draw-map.js';
import { adForm } from './form-validation.js';
import { getData, showError } from './api.js';
import { debounce } from './debounce.js';

const MAIN_PIN_SIZE = 52;
const AD_PIN_SIZE = 40;
const BASIC_LAT = 35.68948;
const BASIC_LNG = 139.69170;
const BASIC_MAP_SCALING = 13;
const DECIMAL_PLACE = 5;
const OFFERS_COUNT = 10;
const PricesByValues = {
    'low': {
        min: 0,
        max: 10000
    },
    'high': {
        min: 50000,
        max: 100000
    },
    'middle': {
        min: 10000,
        max: 50000
    },
    'any': {
        min: 0,
        max: 100000
    },
};

const mainPinMarker = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
    iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

const adPin = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [AD_PIN_SIZE, AD_PIN_SIZE],
    iconAnchor: [AD_PIN_SIZE / 2, AD_PIN_SIZE],
});

const marker = L.marker(
    {
        lat: BASIC_LAT,
        lng: BASIC_LNG,
    },
    {
        draggable: true,
        icon: mainPinMarker,
    },
);
const map = L.map('map-canvas');
const adress = document.querySelector('#address');
const mapFiltersForm = document.querySelector('.map__filters');
const livingTypeInput = document.querySelector('#housing-type');
const priceInput = document.querySelector('#housing-price');
const roomsInput = document.querySelector('#housing-rooms');
const guestsInput = document.querySelector('#housing-guests');

const markerGroup = L.layerGroup().addTo(map);

const setMapFilters = (cb) => {
    mapFiltersForm.addEventListener('change', () => {
        markerGroup.clearLayers();
        cb();
    });
};

const filterByLivingType = ({ offer }) => {
    if (livingTypeInput.value === 'any') {
        return offer;
    }
    if (offer.type === livingTypeInput.value) {
        return offer;
    }
};

const filterByPrice = ({ offer }) => offer.price >= PricesByValues[priceInput.value].min && offer.price <= PricesByValues[priceInput.value].max;

const filterByRooms = ({ offer }) => (roomsInput.value === 'any') ? offer : offer.rooms === Number(roomsInput.value);

const filterByGuests = ({ offer }) => (guestsInput.value === 'any') ? offer : offer.guests === Number(guestsInput.value);

const filterByFeatures = ({ offer }) => {
    const filtersFeatures = [];
    const checkedFilters = document.querySelector('.map__features').querySelectorAll('input:checked');
    checkedFilters.forEach((el) => filtersFeatures.push(el.value));
    if (offer.features) {
        return filtersFeatures.every((feature) => offer.features.includes(feature));
    }
    return false;
};

const filterOffers = (offers) => offers.filter((offer) => (filterByLivingType(offer) &&
    filterByPrice(offer) &&
    filterByRooms(offer) &&
    filterByGuests(offer) &&
    filterByFeatures(offer)));

const toggleClass = (element, className, value) => {
    element.classList.toggle(className, value);
};

const toggleFormElements = (formElements, value) => {
    formElements.forEach((element) => { element.disabled = value; });
};

const toggleAdForm = (value) => {
    toggleClass(adForm, 'ad-form--disabled', value);
    toggleFormElements(adForm.querySelectorAll('fieldset'), value);
};

const toggleFiltersForm = (value) => {
    toggleClass(mapFiltersForm, 'map__filters--disabled', value);
    toggleFormElements(mapFiltersForm.querySelectorAll('select, .map__features'), value);
};

const toggleForms = (value) => {
    toggleAdForm(value);
    toggleFiltersForm(value);
};

const createMarker = (point) => {
    const { location } = point;
    const adMarker = L.marker(
        {
            lat: location.lat,
            lng: location.lng,
        },
        {
            icon: adPin,
        },
    );
    adMarker
        .addTo(markerGroup)
        .bindPopup(drawMap(point));
};

const renderMarkers = (offers) => {
    offers
        .slice()
        .slice(0, OFFERS_COUNT)
        .forEach((point) => createMarker(point));
};

const loadMap = () => {
    map.on('load', () => {
        getData((offers) => {
            setMapFilters(debounce(
                () => renderMarkers(filterOffers(offers)),
            ));
            renderMarkers(offers);
            toggleForms(false);
        }, () => showError('Не удалось получить данные. Попробуйте ещё раз'));
    })
        .setView({
            lat: BASIC_LAT,
            lng: BASIC_LNG,
        }, BASIC_MAP_SCALING);
};

const resetMap = () => map.setView({
    lat: BASIC_LAT,
    lng: BASIC_LNG,
});

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
).addTo(map);

const resetMarker = () => {
    marker.setLatLng({
        lat: BASIC_LAT,
        lng: BASIC_LNG,
    });
};

marker.addTo(map);

marker.on('drag', (evt) => {
    const coordinates = evt.target.getLatLng();
    adress.value = `${coordinates.lat.toFixed(DECIMAL_PLACE)}, ${coordinates.lng.toFixed(DECIMAL_PLACE)}`;
});

export { loadMap, resetMap, adForm, resetMarker, markerGroup, renderMarkers, toggleForms, toggleFiltersForm };
