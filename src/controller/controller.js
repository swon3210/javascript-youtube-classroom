import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
} from '../elements.js';
import view from '../view/view.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from '../storage/localStorage.js';
import {
  LOCAL_STORAGE_KEY,
  SELECTOR_ID,
  SELECTOR_CLASS,
} from '../constants.js';
import { model } from '../store.js';

const controller = {
  initEventListeners() {
    // const observer = new IntersectionObserver(onRenewVideosLoad);
    // observer.observe($searchResultIntersector);

    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
};

function onRenewVideosLoad() {
  console.log('hey');
  getVideosByKeyword(model.LastQuery, model.NextPageToken).then(
    ({ videos, nextPageToken }) => {
      view.renderVideoItems(videos);
      if (videos.length === 0) {
        view.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
        return;
      }
      setLocalStorageItem(LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_RESULTS, videos);
      model.NextPageToken = nextPageToken;
    }
  );
}

function onModalOpen() {
  view.openModal();
  const prevSearchResults = getLocalStorageItem(
    LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_RESULTS
  );
  if (prevSearchResults) {
    view.renderVideoItems(prevSearchResults.videos);
    model.NextPageToken = prevSearchResults.nextPageToken;
  }
}

function onModalClose() {
  view.closeModal();
}

function onVideoSearch(event) {
  event.preventDefault();
  const input = $searchFormInput.value;
  if (input === model.LastQuery) {
    return;
  }
  view.hideElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  view.renderSkeletonItems();
  getVideosByKeyword(input).then(({ videos, nextPageToken }) => {
    model.LastQuery = input;
    view.hideElementBySelector(`.${SELECTOR_CLASS.SKELETON}`);
    if (videos.length === 0) {
      view.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
      return;
    }
    view.renderVideoItems(videos);
    setLocalStorageItem(LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_RESULTS, {
      videos,
      nextPageToken,
    });
    model.NextPageToken = nextPageToken;
  });
}

export default controller;
