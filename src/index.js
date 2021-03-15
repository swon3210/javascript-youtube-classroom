import controller from './controller/controller.js';
import watchingVideoController from './controller/watchingVideoController.js';
import watchedVideoController from './controller/watchedVideoController.js';
import modalController from './controller/modalController.js';
import filterController from './controller/filterController.js';

controller.initRouteEventListeners();
modalController.initEventListeners();
modalController.initSearchQueries();
watchingVideoController.initEventListeners();
watchedVideoController.initEventListeners();
filterController.initEventListeners();
watchingVideoController.loadVideos();