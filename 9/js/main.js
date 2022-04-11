/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/*
    Импорты других модулей
    Вызовы общих функций
    Настройка скриптов
    ...
*/

import { arrayOfAdverts, ADVERTS_NUMBER } from './setup.js';
import { drawAd } from './markup-generator.js';
import { getActiveState, getUnactiveState } from './map-statement.js';
import './form.js';
import './map.js';

arrayOfAdverts(ADVERTS_NUMBER);
drawAd();

getUnactiveState();
setTimeout(getActiveState, 2000);
