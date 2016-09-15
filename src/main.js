import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueHtml5Editor from 'vue-html5-editor'

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
import slider from './components/slider/index'

Vue.config.debug = true;
let Index = Vue.extend({});

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueHtml5Editor, {
    //全局组件的名称
    name: "editor",
    //图片相关配置
    image: {
        //服务器上传地址
        //服务器需要返回json数据类似 {ok:false,msg:"错误信息"} 或者 {ok:true,data:"图片地址"}
        server: null,
        //图片上传请求参数名称
        fieldName: "image",
        //大小限制,默认512k
        sizeLimit: 1024 * 1024,
        //是否压缩,如果设置为false,后面3个参数无用
        compress: true,
        //压缩后的最大宽度
        width: 600,
        //压缩后的最大高度
        height: 400,
        //jpeg质量
        quality: 80
    }
});

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
      },
      '/slider': {
        component: slider
      }
    }
  }
});

router.redirect({
  '*': '/login'
});
/*
 *   每次新开一个页面, 就在 map 传递的对象下面加一个
 *   然后同页面下的就加在 subRoutes 里面
 * */

router.start(Index, '#app');
