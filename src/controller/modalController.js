import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
  $searchResultVideoWrapper,
} from '../elements.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import controllerUtil from './controllerUtil.js';
import {
  prevSearchResultModel,
  searchQueryModel,
  watchedVideoModel,
  watchingVideoModel,
} from '../store.js';
import modalService from '../service/modalService.js';
import { layoutView, modalView, watchedVideoView, watchingVideoView } from '../view/index.js';
import { BROWSER_HASH, SELECTOR_CLASS, SETTINGS, SNACKBAR_MESSAGE } from '../constants.js';
import watchingVideoService from '../service/watchingVideoService.js';

const modalController = {
  initEventListeners() {
    controllerUtil.setObserver(
      $searchResultIntersector,
      onAdditionalVideosLoad
    );
    $searchResultVideoWrapper.addEventListener('click', onSearchedVideoSave);
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
  initSearchQueries() {
    modalView.renderSearchQueries(searchQueryModel.getItem());
  },
};

function onModalOpen() {
  const allVideoCount =
    watchingVideoModel.getItem().length + watchedVideoModel.getItem().length;
  const videos = prevSearchResultModel.getItem().prevSearchedVideos;
  const processedVideos = modalService.getProcessedVideos(videos);

  modalView.openModal();
  modalView.renderSavedVideoCount(allVideoCount);
  if (videos.length === 0) {
    return;
  }
  modalView.renderSearchedVideos(processedVideos);
  modalView.showSearchResultIntersector();
}

function onModalClose() {
  modalView.closeModal();
}

async function onVideoSearch(event) {
  event.preventDefault();
  const input = $searchFormInput.value.trim();
  if (input === prevSearchResultModel.getItem().lastQuery) {
    return;
  }
  if (input === '') {
    return;
  }
  modalView.initSearchEnv();
  const { videos, nextPageToken } = await getVideosByKeyword(input);
  if (videos.length === 0) {
    modalView.hideSearchResultIntersector();
    modalView.showNotFountImage();
    modalView.hideSkeletons();
    return;
  }
  modalService.saveSearchQuery(input);
  modalService.savePrevSearchInfo({ lastQuery: input, nextPageToken });
  modalService.savePrevSearchedVideos(videos);
  modalView.hideSkeletons();
  modalView.renderSearchQueries(searchQueryModel.getItem());
  modalView.renderSearchedVideos(modalService.getProcessedVideos(videos));
  modalView.showSearchResultIntersector();
}

async function onAdditionalVideosLoad() {
  const { lastQuery, pageToken } = modalService.getPrevSearchInfo();
  const { videos, nextPageToken } = await getVideosByKeyword(
    lastQuery,
    pageToken
  );
  console.log(nextPageToken);
  modalView.insertSearchedVideos(videos);
  modalService.savePrevSearchInfo({ nextPageToken: nextPageToken });
}

function onSearchedVideoSave({ target }) {
  if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
    return;
  }
  if (!isVideoCountUnderLimit()) {
    layoutView.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
    return;
  }
  if (watchingVideoService.isVideosEmpty()) {
    watchingVideoView.hideEmptyVideoImage();
    watchedVideoView.hideEmptyVideoImage();
  }
  watchingVideoService.pushNewVideo(target.dataset);

  if (controllerUtil.parseHash(location.hash) === BROWSER_HASH.WATCHING) {
    watchingVideoView.renderVideos(watchingVideoModel.getItem());
  }
  modalView.hideVideoSaveButton(target);
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
}

function isVideoCountUnderLimit() {
  const allVideoCount =
    watchingVideoModel.getItem().length + watchedVideoModel.getItem().length;

  return allVideoCount < SETTINGS.MAX_SAVE_COUNT;
}

export default modalController;
