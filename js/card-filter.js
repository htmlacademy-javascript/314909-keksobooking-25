/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import { markerGroup } from './map.js';

const PriceTypes = {
	'LOW': 10000,
	'HIGH': 50000,
};
const mapFiltersForm = document.querySelector('.map__filters');
const typeFilterSelect = document.querySelector('#housing-type');
const priceFilterSelect = document.querySelector('#housing-price');
const roomsFilterSelect = document.querySelector('#housing-rooms');
const guestsFilterSelect = document.querySelector('#housing-guests');

const filterByType = ({ type }) => typeFilterSelect.value === type || typeFilterSelect.value === 'any';
const filterByRooms = ({ rooms }) => +roomsFilterSelect.value === rooms || roomsFilterSelect.value === 'any';
const filterByGuests = ({ guests }) => +guestsFilterSelect.value === guests || guestsFilterSelect.value === 'any';
const filterByPrice = ({ price }) => {
	switch (priceFilterSelect.value) {
		case 'low':
			return price <= PriceTypes['LOW'];

		case 'middle':
			return price > PriceTypes['LOW'] && price <= PriceTypes['HIGH'];

		case 'high':
			return price > PriceTypes['HIGH'];

		default:
			return true;
	}
};

const setMapFilters = (cb) => {
	mapFiltersForm.addEventListener('change', () => {
		markerGroup.clearLayers();
		cb();
	});
};

const filterByFeatures = ({ features }) => {
	const currentFeatures = document.querySelectorAll('.map__checkbox:checked');
	if (features) {
		return Array.from(currentFeatures).every((item) => features.includes(item.value));
	}
	return false;
};

const setFilterFeatures = ({ offer }) => {
	const filtersFeatures = [];
	const checkedFilters = document.querySelector('.map__features').querySelectorAll('input:checked');
	checkedFilters.forEach((el) => filtersFeatures.push(el.value));
	if (offer.features) {
		return filtersFeatures.every((feature) => offer.features.includes(feature));
	}
	return false;
};

const filterOffers = ({ offer }) =>
	filterByType(offer) &&
	filterByPrice(offer) &&
	filterByRooms(offer) &&
	filterByGuests(offer) &&
	filterByFeatures(offer);

export { setFilterFeatures, setMapFilters, filterOffers, mapFiltersForm };

