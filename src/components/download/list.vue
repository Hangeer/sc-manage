<style scoped>
  .album {
    margin-top: 20px;
  }
  .title {
    line-height: 50px;
    padding: 0 10px;
    font-size: 20px;
  }
  .right {
    float: right;
  }
</style>

<template>
  <section class="album">
    <p class="bg-info title">已上传的文件列表</p>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>文件 ID</th>
        <th>名称</th>
        <th>上传时间</th>
        <th>文件类型</th>
        <th>下载链接</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody v-for="item in fileList">
      <tr>
        <th scope="row">{{item.id}}</th>
        <td>
           <input type="text" 
               class="form-control" 
               placeholder="文件名称" 
               v-model="item.file_title">
        </td>
        <td>
            {{item.file_time}}
        </td>
        <td>
            {{item.file_type}}
        </td>
        <td>
           <input type="text" 
               class="form-control" 
               placeholder="下载链接" 
               v-model="item.file_url">
        </td>
        <td>
          <button type="button" class="btn btn-danger" @click="deleteFile(item.id)">
            删除
          </button>
          <button type="button" class="btn btn-info" @click="updateFile(item)">
            更新
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    
    <div class="wrapper" style="margin: 50px 0;">
      <nav>
        <ul class="pager" style="overflow: hidden">
          <li class="previous" @click="prevPage">
            <span aria-hidden="true">&larr; 上一页</span>
          </li>
          <li class="next" @click="nextPage">
            <span aria-hidden="true">下一页 &rarr; </span>
          </li>
        </ul>
        <div style="width: 300px; margin: 0 auto">
          <span>当前第</span>
          <input type="text" 
                 class="form-control" 
                 style="width: 50px; display: inline-block; text-align: center" 
                 v-model="currentPage">
          <span>页，一共 {{totalPage}} 页</span>
          <button class="btn btn-default" 
                  type="button" 
                  @click="gotoPage">
          Go!</button>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
  export default {
    ready () {
      this.$options.methods.getFileList.bind(this)();
    },
    data () {
      return {
        currentPage: 1,
        totalPage: 1,
        fileList: {}
      }
    },
    methods: {
      getFileList () {
        let data = {
          currentPage: this.currentPage
        };
        let url = `http://localhost:8360/backend/index/getfilelist`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          console.log(`获取文件列表成功`);
          this.fileList = res.data.data.data;
          this.totalPage = res.data.data.totalPages;
        }, (res) => {
          console.log(`获取文件列表失败`);
        });
        /*
        *  获取列表
        */
      },
      deleteFile (num) {
        let data = { id: num };
        console.log(data);
        let url = `http://localhost:8360/backend/index/deletefile`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          console.log(`删除成功`);
          this.$options.methods.getFileList.bind(this)();
        }, (res) => {
          console.log(`删除失败`);
        });

      },
      updateFile (item) {
        let data = {
          id: item.id,
          file_title: item.file_title,
          file_url: item.file_url
        },
            url = `http://localhost:8360/backend/index/updatefile`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          console.log(`更新成功`);
          this.$options.methods.getFileList.bind(this)();
        }, (res) => {
          console.log(`更新失败`);
        });

      },
      prevPage () {
        if (this.currentPage == 1) {
          alert("已经是第一页");
        } else {
          this.currentPage--;
          this.$options.methods.getFileList.bind(this)();
        }
      },
      nextPage () {      
        if (this.currentPage == this.totalPage) {
          alert("已经是最后一页");
        } else {
          this.currentPage++;
          this.$options.methods.getFileList.bind(this)();
        }
      },
      gotoPage () {      
        this.currentPage >=1 && this.currentPage <= this.totalPage 
        ? this.$options.methods.getFileList.bind(this)() 
        : alert("无效的页数");
      }
    }
  }
</script>
