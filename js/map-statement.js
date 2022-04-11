/* eslint-disable indent */
const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const getUnactiveState = () => {
    form.classList.add('ad-form--disabled');
    for (let i = 0; i < form.children.length; i++) {
        form.children[i].disabled = true;
    }
    mapFilters.classList.add('ad-form--disabled');
    for (let i = 0; i < mapFilters.children.length; i++) {
        mapFilters.children[i].disabled = true;
    }
};

const getActiveState = () => {
    form.classList.remove('ad-form--disabled');
    for (let i = 0; i < form.children.length; i++) {
        form.children[i].disabled = false;
    }
    mapFilters.classList.remove('ad-form--disabled');
    for (let i = 0; i < mapFilters.children.length; i++) {
        mapFilters.children[i].disabled = false;
    }
};

export { getUnactiveState, getActiveState };
