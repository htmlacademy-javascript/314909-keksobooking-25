/* eslint-disable indent */
let message;

const isPressedEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onDocumentEscKeydown = (evt) => {
	if (isPressedEscapeKey(evt)) {
		evt.preventDefault();
		onDocumentClick();
	}
};

function onDocumentClick() {
	document.querySelector('.popup').remove();
	document.removeEventListener('keydown', onDocumentEscKeydown);
	document.removeEventListener('click', onDocumentClick);
}

const showPopup = () => {
	document.body.append(message);
	document.addEventListener('click', onDocumentClick);
	document.addEventListener('keydown', onDocumentEscKeydown);
};

const showSuccessPopup = () => {
	message = document.querySelector('#success').content.cloneNode(true);
	showPopup();
};

const showErrorPopup = () => {
	message = document.querySelector('#error').content.cloneNode(true);
	showPopup();
};

export { showSuccessPopup, showErrorPopup };
