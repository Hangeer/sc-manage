<style scoped>
  .album {
    margin-top: 20px;
  }
  .title {
    line-height: 50px;
    padding: 0 10px;
    font-size: 20px;
  }
  .input-group, .editor-container {
    margin-bottom: 10px;
  }
  .editor {
    padding:5px 10px;
    border: 1px solid #ccc;
    height: 200px;
    overflow: scroll;
  }
  .submit-container {
    margin: 50px 0;
    overflow: hidden;
  }
</style>

<template>
  <section class="album">
    <p class="bg-info title">编辑活动</p>

    <div class="input-group" v-for="item in infos">
      <span class="input-group-addon">{{item.text}}</span>
      <input type="text" class="form-control" v-model="item.val">
      <!--<span class="input-group-addon">{{item.val}}</span>-->
    </div>


    <section>
      <h4>{{infos_detail.hd_detail.text}}</h4>
      <p class="editor" contenteditable="true" id="editor-article">
        {{infos_detail.hd_detail.val}}
      </p>
    </section>

    <section>
      <h4>{{infos_detail.hd_compere.text}}</h4>
      <p class="editor" contenteditable="true" id="editor-figure">
        {{infos_detail.hd_compere.val}}
      </p>
    </section>

    <p>{{infos_detail.hd_state.text}}</p>
    <select class="form-control" id="status">
      <option value="1">未开始</option>
      <option value="2">进行中</option>
      <option value="3">已完成</option>
    </select>

    <p>{{infos_detail.hd_type.text}}</p>
    <select class="form-control" id="type">
      <option value="1">辣鸡</option>
      <option value="2">很垃圾</option>
      <option value="3">灰常辣鸡</option>
    </select>

    <div class="submit-container">
      <button type="button" class="btn btn-warning" style="float: right" @click="data_submit">
        提交
      </button>
    </div>

    <!--<form id= "uploadForm">-->
      <!--<p>上传文件： <input type="file" name="file"/></p>-->
      <!--<input type="button" value="上传" @click="uploadImg" />-->
    <!--</form>-->

    <form action="/backend/index/upload" enctype="multipart/form-data" method="post">
      <input type="file" name="image" />
      <input type="submit" value="Submit"/>
    </form>

  </section>
</template>

<script>
  /*
  *   infos
  *     hd_title
  *     hd_cover
  *     hd_time
  *     hd_place
  *     hd_getTicket_time
  *     hd_getTicket_place
  *     hd_unit
  *     hd_peixun
  *   infos_detail
  *     hd_state
  *     hd_type
  *     hd_detail
  *     hd_compere
  * */
  export default {
    ready () {
//      this.$http.get('book.json', function(data) {
//      }).error(function(data, status, request) {
//      });
      /* vue-resource 用来发请求 请求数据 */
    },
    data () {
      return {
        infos: {
          hd_title: {text: "活动名称", val: "【活动】文峰青年大讲堂"},
          hd_cover: {text: "封面图链接", val: "http://202.202.43.125"},
          hd_place: {text: "活动地点", val: "后山小树林"},
          hd_time: {text: "活动时间", val: "2016年8月5日"},
          hd_getTicket_time: {text: "抢票时间", val: "2016年8月5日"},
          hd_getTicket_place: {text: "抢票地点", val: "太极西三门"},
          hd_unit: {text: "主办单位", val: "重庆邮电大学红岩网校"},
          hd_peixun: {text: "培训时间", val: "2016年8月5日"}
        },
        infos_detail: {
          hd_state: {text: "活动状态", val: "1"},
          hd_type: {text: "活动类型", val: "1"},
          hd_detail: {text: "文章内容", val: "这是文章内容"},
          hd_compere: {text: "主讲人介绍", val: "这是主讲人介绍"}
        }
      }
    },
    methods: {
      data_submit () {
        let data = {};

        for(let key in this.infos){
          data[key] = this.infos[key];
        }
        /* 拷贝 infos 到 data 中 */
        for(let key in this.infos_detail){
          data[key] = this.infos_detail[key];
        }
        /* 拷贝 infos_detail 到 data 中 */

        let figure = getRawHTML(document.getElementById('editor-figure'));
        let article = getRawHTML(document.getElementById('editor-article'));
        let status = document.getElementById('status').value;
        let type = document.getElementById('type').value;

        function getRawHTML (ele) {
          return ele.innerHTML.trim().replace(/<div>|<\/div>|<br>/g, "\n").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">").replace(/\n+/g, "\n");
        }

        data.hd_state.val = status;
        data.hd_type.val = type;
        data.hd_detail.val = article;
        data.hd_compere.val = figure;

        console.log(JSON.parse(JSON.stringify(data)));

      },
      uploadImg () {
        let formdata = new FormData(document.getElementById("uploadForm"));
        console.log(formdata);
        this.$http.post('/backend/index/upload', formdata);

      }
    }
  }
</script>
