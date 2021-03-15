import { FILTER } from '../constants.js';
import { $likeVideoSwitchButton } from '../elements.js';
import controllerUtil from './controllerUtil.js';

const filterController = {
  initEventListeners() {
    $likeVideoSwitchButton.addEventListener('click', appendLikeToHash);
  }
}

function appendLikeToHash() {
  const [ videoType ] = controllerUtil.parseHash(location.hash).split('#');
  location.hash = `#${videoType}#${FILTER.LIKE}`
}

export default filterController;