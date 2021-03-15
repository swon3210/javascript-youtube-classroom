import {
  CONFIRM_MESSAGE,
  SELECTOR_CLASS,
  SNACKBAR_MESSAGE,
} from '../constants';
import { $watchedVideoWrapper } from '../elements';
import watchedVideoService from '../service/watchedVideoService.js';
import { watchedVideoModel, watchingVideoModel } from '../store';
import { layoutView, watchedVideoView, watchingVideoView } from '../view';

// TODO : 이것도 VideoController 클래스로 추상화
const watchedVideoController = {
  initEventListeners() {
    $watchedVideoWrapper.addEventListener('click', onWatchedVideoInteract);
  },
};

function onWatchedVideoInteract({ target }) {
  if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
    onClipUnCheck(target);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
    onWatchedVideoDelete(target);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_LIKE_BUTTON)) {
    onWatchedVideoLike(target);
    return
  }
}

function onClipUnCheck(button) {
  const videoId = button.dataset.videoId;
  watchedVideoModel.sendVideoTo(watchingVideoModel, videoId);
  loadWatchedVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_CHECK_SUCCESS, true);
}

function onWatchedVideoDelete(button) {
  if (!layoutView.confirm(CONFIRM_MESSAGE.WATCHED_VIDEO_DELETE)) {
    return;
  }
  const videoId = button.dataset.videoId;
  watchedVideoModel.popVideoByVideoId(videoId);
  loadWatchedVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_DELETE_SUCCESS, true);
}

function onWatchedVideoLike(button) {
  if (typeof button.dataset.videoId !== 'string') {
    return;
  }
  const videoId = button.dataset.videoId;
  watchedVideoModel.toggleLikeState(videoId);
  loadWatchedVideos();
}

function loadWatchedVideos() {
  const watchedVideos = watchedVideoModel.getItem();
  if (watchedVideoService.isVideosEmpty()) {
    watchedVideoView.showEmptyVideoImage();
    watchingVideoView.hideEmptyVideoImage();
  }
  watchedVideoView.renderVideos(watchedVideos);
}

export default watchedVideoController;
