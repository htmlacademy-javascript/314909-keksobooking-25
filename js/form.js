/* eslint-disable indent */
/* eslint-disable indent */
import { resetMap, setStartAddress } from './map.js';
import { clearImageBlocks } from './image-prepare.js';
import { isEscKey, renderElement } from './utilites.js';

const addForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const sliderElement = document.querySelector('.ad-form__slider');
const submitButton = document.querySelector('.ad-form__submit');

const createOkTemplate = () => `<div class="success">
                                      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
                                    </div>`;
const onOkClick = (evt) => {
    evt.preventDefault();
    if (evt.target.closest('.success')) {
        evt.target.closest('.success').remove();
        removeListeners();
    }
};

const onOkKeydown = (evt) => {
    evt.preventDefault();
    const successElement = document.querySelector('.success');
    if (isEscKey(evt) && successElement) {
        successElement.remove();
        removeListeners();
    }
};

const addListeners = () => {
    document.addEventListener('click', onOkClick);
    document.addEventListener('keydown', onOkKeydown);
};

function removeListeners() {
    document.removeEventListener('click', onOkClick);
    document.removeEventListener('keydown', onOkKeydown);
}

const renderOkMessage = () => {
    renderElement(document.body, createOkTemplate);
    addListeners();
    resetMap();
    clearImageBlocks();
    submitButton.disabled = false;
    setTimeout(() => {
        addForm.reset();
        filterForm.reset();
        sliderElement.noUiSlider.reset();
        setStartAddress();
    });
};

export { renderOkMessage };
