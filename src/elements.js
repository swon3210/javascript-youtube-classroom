import { SELECTOR_ID } from './constants.js';
import { $ } from './utils/querySelector.js';

export const $searchButton = $(`#${SELECTOR_ID.SEARCH_BUTTON}`);
export const $searchForm = $(`#${SELECTOR_ID.SEARCH_FORM}`);
export const $searchFormInput = $(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`);
export const $searchFormSubmit = $(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
export const $modal = $(`#${SELECTOR_ID.MODAL}`);
export const $modalCloseButton = $(`#${SELECTOR_ID.MODAL_CLOSE_BUTTON}`);
export const $searchResultVideoWrapper = $(
  `#${SELECTOR_ID.SEARCH_RESULT_VIDEO_WRAPPER}`
);
export const $searchResultIntersector = $(
  `#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`
);
export const $watchingVideoWrapper = $(
  `#${SELECTOR_ID.WATCHING_VIDEO_WRAPPER}`
);
export const $searchQueries = $(`#${SELECTOR_ID.SEARCH_QUERIES}`);
export const $searchedVideoNotFound = $(`#${SELECTOR_ID.SEARCHED_VIDEO_NOT_FOUND}`);
export const $emptyWatchingVideo = $(`#${SELECTOR_ID.EMPTY_WATCHING_VIDEO}`);
export const $emptyWatchedVideo = $(`#${SELECTOR_ID.EMPTY_WATCHED_VIDEO}`);
export const $snackbarWrapper = $(`#${SELECTOR_ID.SNACKBAR_WRAPPER}`);
export const $watchedVideoWrapper = $(`#${SELECTOR_ID.WATCHED_VIDEO_WRAPPER}`);
export const $nav = $(`#${SELECTOR_ID.NAV}`);
export const $savedVideoCount = $(`#${SELECTOR_ID.SAVED_VIDEO_COUNT}`);
export const $likeVideoSwitchButton = $(`#${SELECTOR_ID.LIKE_VIDEO_SWITCH_BUTTON}`);
export const $watchingVideoWrapperIntersector = $(`#${SELECTOR_ID.WATCHING_VIDEO_WRAPPER_INTERSECTOR}`)
export const $watchedVideoWrapperIntersector = $(`#${SELECTOR_ID.WATCHED_VIDEO_WRAPPER_INTERSECTOR}`)

