import { SETTINGS } from '../constants';
import { watchedVideoModel, watchingVideoModel } from '../store.js';

const watchingVideoService = {
  isVideosEmpty() {
    return watchingVideoModel.getItem().length === 0;
  },
  pushNewVideo(dataset) {
    watchingVideoModel.pushItem(getNewVideo(dataset));
  },
};

function getNewVideo(dataset) {
  return {
    title: dataset.title,
    channelTitle: dataset.channelTitle,
    publishedAt: dataset.publishedAt,
    videoId: dataset.videoId,
    isSaved: true,
    isLiked: false
  };
}

export default watchingVideoService;
