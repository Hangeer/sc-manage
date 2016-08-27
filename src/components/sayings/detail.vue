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
    <p class="bg-success title">文章内容</p>

    <div class="input-group">
      <span class="input-group-addon">文章标题</span>
      <input type="text" 
             class="form-control" 
             v-model="currentArticle.atc_title">
    </div>

    <section>
      <editor :content.sync="currentArticle.atc_content" 
              :height="500" 
              :z-index="1000" 
              :auto-height="true" 
              :disable-full-screen="true">            
      </editor>
    </section>

    <p>所属部门</p>
    <select class="form-control" id="type">
      <option value="综合">综合部</option>
      <option value="项目">项目管理部</option>
      <option value="科技">科技人文部</option>
      <option value="科创">科创竞赛部</option>
      <option value="信息">信息部</option>
      <option value="媒体">媒体运营部</option>
    </select>

    <div class="submit-container">
      <button type="button" 
              class="btn btn-warning" 
              @click="submitArticle">
        提交
      </button>

      <p>提交状态：{{submit_status}}</p>
      <p>提示：提交完毕之后点上方 关闭列表 按钮关闭此列表 </p>
    </div>

  </section>
</template>

<script>
  export default {
    props: [
      'modifyId'
    ],
    ready () {
      this.$options.methods.getArticle.bind(this)();
    },
    data () {
      return {
        currentArticle: {
          atc_title: "",
          atc_content: "",
          atc_type: ""
        },
        submit_status: "未提交"
      }
    },
    methods: {
      getArticle () {
        if (this.modifyId > 0 ) {
          console.log("传入的 id " + this.modifyId + " 有效情况");
          let data = {
            atc_id: this.modifyId
          };
          let url = `http://localhost:8360/backend/index/getsinglearticle`;
          this.$http.post(url, data, { emulateJSON: true })
          .then((res) => {
            this.currentArticle = res.data.data;
            document.querySelector("#type").value = res.data.data.atc_type;
          }, (res) => {
            console.log("获取单条信息失败");
          });
        } else {
          console.log("新建活动");
        }  
      },
      submitArticle () {
        let atc_type = document.getElementById("type").value;
        let data = this.currentArticle;
        let date = new Date();
        let url = ``;

        this.submit_status = `正在提交，请稍等`;
        data.atc_time = date.toLocaleDateString().replace(/\//g, `-`);
        data.atc_type = atc_type;

        if (this.modifyId > 0) {
          url = `http://localhost:8360/backend/index/updatearticle`;
        } else {
          url = `http://localhost:8360/backend/index/createarticle`;
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