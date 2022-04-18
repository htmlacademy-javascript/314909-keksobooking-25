import { isEscKey } from './utilites';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const createPopup = (success, message, buttonText = '') => {
  const popupTemplate = (success ? successTemplate : errorTemplate).cloneNode(true);

  if (success) {
    const messageElement = popupTemplate.querySelector('.success__message');
    messageElement.textContent = message;
  } else {
    const messageElement = popupTemplate.querySelector('.error__message');
    const buttonElement = popupTemplate.querySelector('.error__button');
    messageElement.textContent = message;
    buttonElement.textContent = buttonText;
  }

  document.body.append(popupTemplate);

  const closePopup = () => {
    popupTemplate.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  function onPopupEscKeydown(evt) {
    if (isEscKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  popupTemplate.addEventListener('click', () => closePopup());
  document.addEventListener('keydown', onPopupEscKeydown);
};

export { createPopup };
