import { $watchingVideoWrapper } from '../elements';
import { watchedVideoModel, watchingVideoModel } from '../store';
import {
  layoutView,
  watchedVideoView,
  watchingVideoView,
} from '../view';
import watchingVideoService from '../service/watchingVideoService.js';
import {
  CONFIRM_MESSAGE,
  SELECTOR_CLASS,
  SNACKBAR_MESSAGE,
} from '../constants';

const watchingVideoController = {
  initEventListeners() {
    $watchingVideoWrapper.addEventListener('click', onWatchingVideoInteract);
  },
  loadVideos() {
    loadWatchingVideos();
  }
};

function onWatchingVideoInteract({ target }) {
  if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
    onClipCheck(target.dataset.videoId);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
    onWatchingVideoDelete(target.dataset.videoId);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_LIKE_BUTTON)) {
    onWatchingVideoLike(target.dataset.videoId);
    return
  }
}

function onClipCheck(videoId) {
  watchingVideoModel.sendVideoTo(watchedVideoModel, videoId);
  loadWatchingVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_CHECK_SUCCESS, true);
}

// TODO : button 이 아니라 videoId 를 넘겨받도록 변경. 다른 곳에서도 동일하게 모두 변경
function onWatchingVideoDelete(videoId) {
  if (!layoutView.confirm(CONFIRM_MESSAGE.WATCHING_VIDEO_DELETE)) {
    return;
  }
  watchingVideoModel.popVideoByVideoId(videoId);
  loadWatchingVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_DELETE_SUCCESS, true);
}

function onWatchingVideoLike(videoId) {
  if (typeof videoId !== 'string') {
    return;
  }
  watchingVideoModel.toggleLikeState(videoId);
  loadWatchingVideos();
}

function loadWatchingVideos() {
  const watchingVideos = watchingVideoModel.getItem();
  if (watchingVideoService.isVideosEmpty()) {
    watchingVideoView.showEmptyVideoImage();
    watchedVideoView.hideEmptyVideoImage();
  }
  watchingVideoView.renderVideos(watchingVideos);
}

export default watchingVideoController;
