<style scoped>
  .album {
    margin-top: 20px;
  }
  .title {
    line-height: 50px;
    padding: 0 10px;
    font-size: 20px;
  }
  .input-group {
    margin-bottom: 10px;
  }
  .new-image {
    margin-bottom: 50px;
  }
  .wrapper {
    margin: 50px 0;
  }
  .pager {
    overflow: hidden;
  }
  .current-page {
    width: 300px; 
    margin: 0 auto;
  }
  .page-container {
    width: 50px; 
    display: inline-block; 
    text-align: center;
  }
</style>

<template>
  <section class="upload-container">
    <div class="new-image">
      <p class="bg-success title">上传文件</p>

      <div class="input-group" v-for="item in fileInfo">
        <span class="input-group-addon"> {{item.text}} </span>
        <input type="text" 
               class="form-control" 
               v-model="item.val">
      </div>

      <p>文件类型</p>
      <select class="form-control" id="type">
        <option value="word">word</option>
        <option value="ppt">ppt</option>
        <option value="excel">excel</option>
        <!-- <option value="">视频</option> -->
      </select>

      <form enctype="multipart/form-data" 
            method="post" 
            id="form-cont" 
            style="overflow: hidden">
        <input type="file" 
               class="btn btn-warning" 
               name="image" 
               style="margin: 10px 0;float: left" />
        <button type="button" 
                class="btn btn-info" 
                style="margin: 10px 10px;float: left" 
                @click="testSubmit">
          点击上传文件
        </button>
      </form>

      <div class="input-group">
        <p>上传本地文件，请点击选择文件，上传成功会返回 url ，再将 url 填写</p>
        <p>已上传的文件列表</p>

        <table class="table table-striped">
          <thead>
          <tr>
            <th>文件本地名称</th>
            <th>文件 url</th>
          </tr>
          </thead>
          <tbody v-for="item in fileUploadSucList">
            <tr>
              <td>{{item.prevName}}</td>
              <td>{{item.currName}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button type="button" 
              class="btn btn-warning right" 
              @click="sendFile">
        提交新的文件
      </button>
    </div>

  </section>
</template>

<script>
  export default {
    data () {
      return {
        fileUploadSucList: [],
        fileInfo: {
          file_title: {text: "文件名称", val: ""},
          file_url: {text: "文件地址", val: ""}
        }
      }
    },
    methods: {
        testSubmit () {
        let fd = new FormData(document.getElementById("form-cont")),
            url = `http://localhost:8360/backend/index/uploadimg`;

        this.$http.post(url, fd)
        .then((res) => {
          console.log(`上传图片成功`);
          let data = {
            prevName: ``,
            currName: ``
          };
          data.prevName = res.data.data.prevName;
          data.currName = `http://localhost:8360/upload/${res.data.data.currName}`;
          this.fileUploadSucList.push(data);
        }, (res) => {
          console.log(`上传图片失败`);
        });

        /*
        *   testSubmit:
        *      上传图片 到图库文件夹
        */
      },
      sendFile () {
        let data = this.fileInfo;
        let url = `http://localhost:8360/backend/index/postfile`;

        data.file_type = document.querySelector("#type").value;
        data.file_title = this.fileInfo.file_title.val;
        data.file_url = this.fileInfo.file_url.val;
        
        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          if (res.status == 200) {
            console.log(`数据提交成功`);
              this.fileInfo = {
                file_title: {text: "文件名称", val: ""},
                file_url: {text: "文件地址", val: ""}
              };
          }
        }, (res) => {
          console.log(`上传失败`);
        });
      }
    }
  }
</script>
