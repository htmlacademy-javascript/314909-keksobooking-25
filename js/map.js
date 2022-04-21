/* eslint-disable indent */
import { fillOffer } from './form-generator.js';
import { mapFiltersForm, setMapFilters, filterOffers } from './feature-filter.js';
import { addForm } from './form-validations.js';
import { getOffer, showError } from './api.js';
import { debounce } from './utilites.js';

const MAIN_PIN_SIZE = 52;
const AD_PIN_SIZE = 40;
const BASE_LAT = 35.68948;
const BASE_LNG = 139.69170;
const BASE_MAP_SCALING = 13;
const DECIMAL = 5;
const OFFERS_COUNT = 10;
const map = L.map('map-canvas');
const adress = document.querySelector('#address');

const toggleClass = (element, className, value) => {
	element.classList.toggle(className, value);
};

const toggleFormElements = (formElements, value) => {
	formElements.forEach((element) => { element.disabled = value; });
};

const toggleAdForm = (value) => {
	toggleClass(addForm, 'ad-form--disabled', value);
	toggleFormElements(addForm.querySelectorAll('fieldset'), value);
};

const toggleFiltersForm = (value) => {
	toggleClass(mapFiltersForm, 'map__filters--disabled', value);
	toggleFormElements(mapFiltersForm.querySelectorAll('select, .map__features'), value);
};

const toggleForms = (value) => {
	toggleAdForm(value);
	toggleFiltersForm(value);
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
		lat: BASE_LAT,
		lng: BASE_LNG,
	},
	{
		draggable: true,
		icon: mainPinMarker,
	},
);

const markerGroup = L.layerGroup().addTo(map);

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
		.bindPopup(fillOffer(point));
};

const renderMarkers = (offers) => {
	offers
		.slice()
		.slice(0, OFFERS_COUNT)
		.forEach((point) => createMarker(point));
};

const createMap = () => {
	map.on('load', () => {
		getOffer((offers) => {
			setMapFilters(debounce(
				() => renderMarkers(filterOffers(offers)),
			));
			renderMarkers(offers);
			toggleForms(false);
		}, () => showError('Не удалось получить данные. Попробуйте ещё раз'));
	})
		.setView({
			lat: BASE_LAT,
			lng: BASE_LNG,
		}, BASE_MAP_SCALING);
};
const resetMap = () => map.setView({
	lat: BASE_LAT,
	lng: BASE_LNG,
});

L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	},
).addTo(map);

const resetMarker = () => {
	marker.setLatLng({
		lat: BASE_LAT,
		lng: BASE_LNG,
	});
};

marker.addTo(map);

marker.on('drag', (evt) => {
	const coordinates = evt.target.getLatLng();
	adress.value = `${coordinates.lat.toFixed(DECIMAL)}, ${coordinates.lng.toFixed(DECIMAL)}`;
});

export { addForm, markerGroup, createMap, resetMap, resetMarker, renderMarkers, toggleForms, toggleFiltersForm };
