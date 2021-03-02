import { $searchButton, $modalCloseButton, $searchForm, $searchFormInput } from '../elements.js';
import view from '../view/view.js';

function onModalOpen() {
  view.openModal();
}

function onModalClose() {
  view.closeModal();
}

function onVideoSearch() {
  const input = $searchFormInput.value;
}

const controller = {
  initEventListeners() {
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose)
    $searchForm.addEventListener('submit', onVideoSearch);
  }
}

export default controller;
