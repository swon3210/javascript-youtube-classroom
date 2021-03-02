import { $modal } from '../elements.js';
import { STYLE_CLASS } from '../constants.js';


const view = {
  openModal() {
    $modal.classList.add(STYLE_CLASS.OPEN);
  },
  closeModal() {
    $modal.classList.remove(STYLE_CLASS.OPEN);
  }
}

export default view;
