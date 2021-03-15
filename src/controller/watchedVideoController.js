import {
  CONFIRM_MESSAGE,
  SELECTOR_CLASS,
  SETTINGS,
  SNACKBAR_MESSAGE,
  STYLE_CLASS,
} from '../constants';
import { $watchedVideoWrapper, $watchedVideoWrapperIntersector } from '../elements';
import watchedVideoService from '../service/watchedVideoService.js';
import { watchedVideoModel, watchingVideoModel } from '../store';
import { layoutView, watchedVideoView, watchingVideoView } from '../view';
import { $ } from '../utils/querySelector.js';
import controllerUtil from './controllerUtil.js';

// TODO : 이것도 VideoController 클래스로 추상화
const watchedVideoController = {
  initEventListeners() {
    controllerUtil.setObserver($watchedVideoWrapperIntersector, displayMoreWatchedVideos)
    $watchedVideoWrapper.addEventListener('click', onWatchedVideoInteract);
  },
};

function onWatchedVideoInteract({ target }) {
  if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
    onClipUnCheck(target.dataset.videoId);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
    onWatchedVideoDelete(target.dataset.videoId);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_LIKE_BUTTON)) {
    onWatchedVideoLike(target.dataset.videoId);
    return
  }
}

function onClipUnCheck(videoId) {
  watchedVideoModel.sendVideoTo(watchingVideoModel, videoId);
  loadWatchedVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_CHECK_SUCCESS, true);
}

function onWatchedVideoDelete(videoId) {
  if (!layoutView.confirm(CONFIRM_MESSAGE.WATCHED_VIDEO_DELETE)) {
    return;
  }
  watchedVideoModel.popVideoByVideoId(videoId);
  loadWatchedVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_DELETE_SUCCESS, true);
}

function onWatchedVideoLike(videoId) {
  if (typeof videoId !== 'string') {
    return;
  }
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

function displayMoreWatchedVideos() {
  let removeCount = 0;
  $(`.${SELECTOR_CLASS.CLIP}`, $watchedVideoWrapper)?.forEach(($clip) => {
    if ($clip.classList.contains(STYLE_CLASS.REMOVED) && removeCount < SETTINGS.CLIP_ADD_COUNT_PER_PAGING) {
      $clip.classList.remove(STYLE_CLASS.REMOVED);
      removeCount += 1
      return;
    }
  })
}

export default watchedVideoController;
