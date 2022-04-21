/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import './form.js';
import './slider.js';
import { toggleForms, createMap } from './map.js';
import { setUserFromSubmit } from './form-validations.js';
import { showSuccessPopup, showErrorPopup } from './popup.js';

toggleForms(true);
createMap();
setUserFromSubmit(showSuccessPopup, showErrorPopup);
