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

    <!-- 
      有坑，想用 p 加上可编辑属性来做文本编辑
      然而不支持 v-model 属性 
      暂时先这样做着
    -->

    <section>
      <h4>文章内容</h4>
      <p class="editor" 
         contenteditable="true" 
         id="editor-article">
        {{currentArticle.atc_content}}
      </p>
    </section>

    <p>所属部门</p>
    <select class="form-control" id="type">
      <option value="1">综合部</option>
      <option value="2">项目管理部</option>
      <option value="3">科技人文部</option>
      <option value="4">科创竞赛部</option>
      <option value="5">信息部</option>
      <option value="6">媒体运营部</option>
    </select>

    <div class="submit-container">
      <button type="button" 
              class="btn btn-warning" 
              @click="submitArticle">
        提交
      </button>
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
      this.$options.methods.getArticle.bind(this)();
    },
    data () {
      return {
        currentArticle: {
          atc_title: "",
          atc_content: "",
          atc_type: ""
        }
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
          }, (res) => {
            console.log("获取单条信息失败");
          });
        } else {
          console.log("新建活动");
        }  
      },
      submitArticle () {
        let atc_content = document.getElementById("editor-article").innerHTML.trim();
        let atc_type = document.getElementById("type").value;
        let data = this.currentArticle;
        let url = ``;

        data.atc_content = atc_content;
        data.atc_type = atc_type;

        console.log(this.currentArticle);

        if (this.modifyId > 0) {
          url = `http://localhost:8360/backend/index/updatearticle`;
        } else {
          url = `http://localhost:8360/backend/index/createarticle`;
        }

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          console.log(`提交成功`);
        }, (res) => {
          console.log(`提交失败`);
        });
      }
    }
  }
</script>