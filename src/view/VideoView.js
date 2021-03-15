import { SELECTOR_CLASS, STYLE_CLASS } from '../constants';
import BasicView from './BasicView';

export default class VideoView extends BasicView {
  #isChecked;

  constructor({ $videoWrapper, $emptyVideoImage }, isChecked) {
    super({ $videoWrapper, $emptyVideoImage });
    this.#isChecked = isChecked;
  }

  renderVideos(videos) {
    this.renderHTML(this._element.$videoWrapper, '');
    this.renderHTML(
      this._element.$videoWrapper,
      this._getVideoListTemplate(videos, this.#isChecked)
    );
  }

  eraseVideos() {
    this.renderHTML(this._element.$videoWrapper, '');
  }

  showEmptyVideoImage() {
    this.showElement(this._element.$emptyVideoImage);
  }

  hideEmptyVideoImage() {
    this.hideElement(this._element.$emptyVideoImage);
  }

  _getVideoListTemplate(videos, isWatched) {
    return videos
      .map(video => this._getVideoTemplate(video, isWatched))
      .join('');
  }

  _getVideoTemplate(videoItem, isWatched) {
    return `
    <article class="${SELECTOR_CLASS.CLIP} clip">
      <div class="clip__preview">
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${videoItem.videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="clip__content pt-2 px-1">
        <h3>${videoItem.title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
            target="_blank"
            class="channel-name mt-1"
          >
            ${videoItem.channelTitle}
          </a>
          <div class="meta">
            <p>${videoItem.publishedAt}</p>
          </div>
          <div>
            <span 
              class="
                ${SELECTOR_CLASS.CLIP_CHECK_BUTTON}
                clip__check-button
                ${isWatched ? STYLE_CLASS.CHECKED : STYLE_CLASS.OPACITY_HOVER} 
              " 
              data-video-id="${videoItem.videoId}"
            >✅</span>
            <span 
              class="
                ${SELECTOR_CLASS.CLIP_LIKE_BUTTON}
                ${videoItem.isLiked ? STYLE_CLASS.CHECKED : STYLE_CLASS.OPACITY_HOVER} 
              "
              data-video-id="${videoItem.videoId}">👍</span>
            <span class="${STYLE_CLASS.OPACITY_HOVER}">💬</span>
            <span 
              class="${SELECTOR_CLASS.CLIP_DELETE_BUTTON} ${STYLE_CLASS.OPACITY_HOVER}" 
              data-video-id="${videoItem.videoId}"
            >🗑️</span>
          </div>
        </div>
      </div>
    </article>
    `;
  }
}
