/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/*
    Импорты других модулей
    Вызовы общих функций
    Настройка скриптов
    ...
*/

import { arrayOfAdverts, ADVERTS_NUMBER } from './advertisment';
import { TIME_OUT } from './data.js';
import { drawMap } from './draw-map.js';
import { deactivateForms, activateAdvertForm, activateMapFilterForm } from './map-statement.js';
import './form.js';
import './map.js';

arrayOfAdverts(ADVERTS_NUMBER);
drawMap();

// deactivateForms();
// activateAdvertForm();
// setTimeout(activateMapFilterForm(), TIME_OUT);
