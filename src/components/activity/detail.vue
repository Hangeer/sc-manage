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
    <p class="bg-success title"> 活动内容 </p>

    <div class="input-group">
      <span class="input-group-addon"> 活动标题 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_title">
    </div>

    <div class="input-group">
      <span class="input-group-addon"> 封面图链接 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_cover">
    </div>

    <div class="input-group">
      <span class="input-group-addon"> 活动地点 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_place">
    </div>

    <div class="input-group">
      <span class="input-group-addon"> 活动时间 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_time">
    </div>

    <div class="input-group">
      <span class="input-group-addon"> 抢票时间 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_getTicket_time">
    </div>

    <div class="input-group">
      <span class="input-group-addon"> 抢票地点 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_getTicket_place">
    </div>

    <div class="input-group">
      <span class="input-group-addon"> 主办单位 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_unit">
    </div>

    <div class="input-group">
      <span class="input-group-addon"> 培训时间 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_peixun">
    </div>

    <div class="input-group">
      <span class="input-group-addon"> 标签 </span>
      <input type="text" 
             class="form-control" 
             v-model="currentActivity.hd_tags">
    </div>

    <section>
      <h4> 活动详情 </h4>
      <p>提示：上传图片请不要用此编辑器的上传按钮，请先上传本地图片获取 URL 或者插入网络图片，使用添加 URL 的方式上传</p> 
      <editor :content.sync="currentActivity.hd_detail" 
              :height="500" 
              :z-index="1000" 
              :auto-height="true" 
              :disable-full-screen="true">            
      </editor>
    </section>

    <section>
      <h4> 演讲人详情 </h4>
      <p>提示：上传图片请不要用此编辑器的上传按钮，请先上传本地图片获取 URL 或者插入网络图片，使用添加 URL 的方式上传</p> 
      <editor :content.sync="currentActivity.hd_compere" 
              :height="500" 
              :z-index="1000" 
              :auto-height="true" 
              :disable-full-screen="true">            
      </editor>
    </section>

    <p> 活动状态 </p>
    <select class="form-control" id="status">
      <option value="1"> 未开始 </option>
      <option value="2"> 进行中 </option>
      <option value="3"> 已完成 </option>
    </select>

    <p> 活动类型 </p>
    <select class="form-control" id="type">
      <option value="1"> 辣鸡 </option>
      <option value="2"> 很垃圾 </option>
      <option value="3"> 灰常辣鸡 </option>
    </select>

    <div class="submit-container">
      <button type="button" 
              class="btn btn-warning" 
              @click="submitActivity">
        提交
      </button>

      <p>提交状态：{{submit_status}}</p>
      <p> 提示：提交之后点上方 关闭列表 按钮关闭此列表 </p>
    </div>

  </section>
</template>

<script>
  export default {
    props: [
      'modifyId'
    ],
    ready () {
      this.$options.methods.getActivity.bind(this)();
    },
    data () {
      return {
        currentActivity: {
          hd_title: "",
          hd_cover: "",
          hd_place: "",
          hd_time: "",
          hd_getTicket_time: "",
          hd_getTicket_place: "",
          hd_unit: "",
          hd_peixun: "",
          hd_tags: ""
        },
        submit_status: `未提交`
      }
    },
    methods: {
      getActivity () {
        if (this.modifyId > 0 ) {
          console.log("传入的 id " + this.modifyId + " 有效情况");
          let data = {
            hd_id: this.modifyId
          };
          let url = `http://localhost:8360/backend/index/getsingleactivity`;
          this.$http.post(url, data, {
            emulateJSON: true
          })
          .then((res) => {
            this.currentActivity = res.data.data;
          }, (res) => {
            console.log("获取单条信息失败");
          });
        } else {
          console.log("新建活动");
        }  
      },
      submitActivity () {
        let hd_state = document.getElementById("status").value;
        let hd_type = document.getElementById("type").value;
        let data = this.currentActivity;
        let url = ``;

        this.submit_status = `正在提交，请稍等`;
        data.hd_state = hd_state;
        data.hd_type = hd_type;

        /*
        *   是的没错 这一段写得好智障啊
        *   绑定不了数据
        *   每次都要判断 this.modifyId 看是不是新建活动
        */

        if (this.modifyId > 0) {
          url = `http://localhost:8360/backend/index/updateactivity`;
        } else {
          url = `http://localhost:8360/backend/index/createactivity`;
        }

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          this.submit_status = `提交成功`;
        }, (res) => {
          this.submit_status = `提交失败`;
        });
      }
    }
  }
</script>
