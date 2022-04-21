/* eslint-disable indent */
import { price } from './form.js';

const sliderElement = document.querySelector('#slider');

const createSlider = () => {
	noUiSlider.create(sliderElement, {
		range: {
			min: 0,
			max: 100000,
		},
		start: 5000,
		step: 1000,
		connect: 'lower',
		format: {
			to: function (value) {
				return value;
			},
			from: function (value) {
				return parseFloat(value);
			},
		}
	});

	sliderElement.noUiSlider.on('change', (values, handle) => {
		price.value = Math.floor(values[handle]);
	});
};

export { createSlider };
