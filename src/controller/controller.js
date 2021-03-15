import { BROWSER_HASH, FILTER } from '../constants.js';
import { watchingVideoModel, watchedVideoModel, videoFilter } from '../store.js';
import controllerUtil from './controllerUtil.js';

import {
  watchingVideoView,
  watchedVideoView,
  layoutView,
} from '../view/index.js';

const controller = {
  initRouteEventListeners() {
    window.onhashchange = routeByHash;
    window.onload = routeByHash;
  },
};

// 이미 좋아요 해쉬인 상태에서 다시 좋아요 해제 한 상태 만들기

function routeByHash() {
  const [ videoType, renderCondition ] = controllerUtil.parseHash(location.hash).split('#');
  layoutView.highlightNavButton(videoType);  
  if (videoType === BROWSER_HASH.WATCHED) {
    const videos = watchedVideoModel.getItem();
    const filteredVideos = getFilteredVideos(videos, renderCondition)
    onWatchedVideoShow(filteredVideos);
    return;
  }
  const videos = watchingVideoModel.getItem();
  const filteredVideos = getFilteredVideos(videos, renderCondition);
  onWatchingVideoShow(filteredVideos);
}

function onWatchingVideoShow(videos) {
  if (videos.length === 0) {
    watchingVideoView.showEmptyVideoImage();
  }
  watchedVideoView.eraseVideos();
  watchedVideoView.hideEmptyVideoImage();
  watchingVideoView.renderVideos(videos);
  watchingVideoView.hideEmptyVideoImage();
}

function onWatchedVideoShow(videos) {
  if (videos.length === 0) {
    watchedVideoView.showEmptyVideoImage();
  }
  watchingVideoView.eraseVideos();
  watchingVideoView.hideEmptyVideoImage();
  watchedVideoView.renderVideos(videos);
  watchedVideoView.hideEmptyVideoImage();
}

export default controller;

function getFilteredVideos(videos, condition) {
  if (condition && condition === FILTER.LIKE) {
    return videos.filter(video => video.isLiked === true);
  }

  return videos;
}