/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import { getOffer } from './api.js';
import { setAdFormActions } from './form-validations.js';
import { createSlider } from './slider.js';
import { createCard } from './cards-generator.js';
import { setFilterFeatures, setMapFilters, filterOffers } from './card-filter.js';
import { activateAdvertForm, mapFilterForm } from './map-statement.js';
import { addPhotoInputsListeners, clearImageBlocks } from './image-prepare.js';
import { renderGetErrorMessage, renderPostErrorMessage } from './error-message.js';
import { locationRange } from './data.js';
import { debounce, getRandomFloat } from './utilites.js';

const ADVERTS_COUNTER = 10;
const DECIMALS = 5;
const MAIN_PIN_SIZE = 52;
const AD_PIN_SIZE = 40;
const BASIC_LAT = 35.68948;
const BASIC_LNG = 139.69170;
const BASIC_MAP_SCALING = 13;
const START_LOCATION = {
	lat: getRandomFloat(locationRange.lat.from, locationRange.lat.to, DECIMALS),
	lng: getRandomFloat(locationRange.lng.from, locationRange.lng.to, DECIMALS),
};

const sliderElement = document.querySelector('.ad-form__slider');
const resetButton = document.querySelector('.ad-form__reset');
const addressInput = document.querySelector('#address');
const interactiveMap = L.map('map-canvas');
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

const setStartAddress = () => {
	addressInput.value = `${START_LOCATION.lat}, ${START_LOCATION.lng}`;
};

const setLocation = (target) => {
	const location = target.getLatLng();
	addressInput.value = `${location.lat.toFixed(DECIMALS)}, ${location.lng.toFixed(DECIMALS)}`;
};
const markerGroup = L.layerGroup().addTo(interactiveMap);

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
		.bindPopup(createCard(point));
};

const moveOnMarker = (evt) => setLocation(evt.target);

const resetMap = () => interactiveMap.setView({
	lat: BASIC_LAT,
	lng: BASIC_LNG,
});

L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	},
).addTo(interactiveMap);

marker.addTo(interactiveMap);
const toggleClass = (element, className, value) => {
	element.classList.toggle(className, value);
};

const toggleFormElements = (formElements, value) => {
	formElements.forEach((element) => { element.disabled = value; });
};

const toggleAdForm = (value) => {
	toggleClass(setAdFormActions, 'ad-form--disabled', value);
	toggleFormElements(setAdFormActions.querySelectorAll('fieldset'), value);
};

const toggleFiltersForm = (value) => {
	toggleClass(setFilterFeatures, 'map__filters--disabled', value);
	toggleFormElements(setFilterFeatures.querySelectorAll('select, .map__features'), value);
};

const toggleForms = (value) => {
	toggleAdForm(value);
	toggleFiltersForm(value);
};

const ResetButtonOnClick = () => {
	setTimeout(() => setStartAddress());
	clearImageBlocks();
	sliderElement.noUiSlider.reset();
	resetMap();
	mapFilterForm.reset();
};

const activateAddForm = () => {
	activateAdvertForm();
	setStartAddress();
	setAdFormActions(setAdFormActions, renderPostErrorMessage);
	createSlider();
	addPhotoInputsListeners();
	resetButton.addEventListener('click', ResetButtonOnClick);
};

const resetMarker = (data) => {
	formFilter.addEventListener('change', () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			markerGroup.clearLayers();
			resetMap();
			addMarkerGroup(data);
		}, TIME_INTERVAL);
	});
};


const renderMarkers = (offers) => {
	offers
		.slice()
		.slice(0, ADVERTS_COUNTER)
		.forEach((point) => createMarker(point));
};

const createMap = () => {
	interactiveMap.on('load', () => {
		getOffer((offers) => {
			setMapFilters(debounce(
				() => renderMarkers(filterOffers(offers)),
			));
			renderMarkers(offers);
			toggleForms(false);
		}, () => renderGetErrorMessage());
		activateAddForm();
	})
		.setView({
			lat: BASIC_LAT,
			lng: BASIC_LNG,
		}, BASIC_MAP_SCALING);
};

L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		foo: 'bar',
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	},
).addTo(interactiveMap);

const interactiveMarker = L.marker(START_LOCATION,
	{
		draggable: 'true',
		icon: L.icon({
			iconUrl: './img/main-pin.svg',
			iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
			iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
		}),
	}).addTo(interactiveMap);

interactiveMarker.on('moveend', moveOnMarker);

export { createMap, resetMap, resetMarker, renderMarkers, setStartAddress, toggleForms, markerGroup };
