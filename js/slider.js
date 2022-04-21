/* eslint-disable indent */
import { price } from './form.js';

const sliderElement = document.querySelector('#slider');

const createSlider = () => {
	noUiSlider.create(sliderElement, {
		start: [5000],
		connect: [true, false],
		tooltips: true,
		step: 100,
		range: {
			'min': [0],
			'10%': [500, 100],
			'50%': [4000, 500],
			'70%': [10000, 500],
			'max': [100000]
		}
	});

	sliderElement.noUiSlider.on('change', (values, handle) => {
		price.value = Math.floor(values[handle]);
	});
};

export { createSlider };

