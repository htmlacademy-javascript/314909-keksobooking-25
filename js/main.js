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
import { drawMap } from './map-generator.js';
import { getActiveState, getUnactiveState } from './map-statement.js';
import './form.js';
import './map.js';

arrayOfAdverts(ADVERTS_NUMBER);
drawMap();

getUnactiveState();
setTimeout(getActiveState, TIME_OUT);
