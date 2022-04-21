/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import './form.js';
import './slider.js';
import { deactivateForms } from './map-statement.js';
import { toggleForms, createMap } from './map.js';
import { setAdFormActions } from './form-validations.js';
import { showSuccessPopup } from './popup.js';

toggleForms(true);
createMap();
deactivateForms(showSuccessPopup, setAdFormActions);
