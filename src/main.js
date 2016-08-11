import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Login from './components/login/index'
import App from './App'

import gallery from './components/gallery/index'
import gallery_album from './components/gallery/album'
import gallery_image from './components/gallery/image'
import activity from './components/activity/index'
import activity_list from './components/activity/list'
import activity_detail from './components/activity/detail'
import activity_live from './components/activity/live'
import sayings from './components/sayings/index'
import sayings_list from './components/sayings/list'
import download from './components/download/index'
import download_list from './components/download/list'
import download_upload from './components/download/upload'


Vue.config.debug = true;
var Index = Vue.extend({});

Vue.use(VueRouter);
Vue.use(VueResource);

let router = new VueRouter();

router.map({
  '/login': {
    component: Login
  },
  '/app': {
    component: App,
    subRoutes: {
      '/gallery': {
        component: gallery,
        subRoutes: {
          '/album': {
            component: gallery_album
          },
          '/image': {
            component: gallery_image
          }
        }
      },
      '/activity': {
        component: activity,
        subRoutes: {
          '/list': {
            component: activity_list
          },
          '/detail': {
            component: activity_detail
          },
          '/live': {
            component: activity_live
          }
        }
      },
      '/sayings': {
        component: sayings,
        subRoutes: {
          '/list': {
            component: sayings_list
          }
        }
      },
      '/download': {
        component: download,
        subRoutes: {
          '/list': {
            component: download_list
          },
          '/upload': {
            component: download_upload
          }
        }
      }
    }
  }
});
router.redirect({
  '*': '/app'
});
/*
 *   每次新开一个页面, 就在 map 传递的对象下面加一个
 *   然后同页面下的就加在 subRoutes 里面
 * */

router.start(Index, '#app');
