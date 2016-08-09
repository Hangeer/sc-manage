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
</style>

<template>
  <section class="album">
    <p class="bg-info title">相册管理界面</p>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>相册 ID</th>
        <th>名称</th>
        <th>所含图片数量</th>
        <th>点赞数</th>
        <th>封面图地址</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody v-for="item in getAlbumList">
      <tr>
        <th scope="row">{{item.id}}</th>
        <td>
          <input type="text" class="form-control" placeholder="相册名称" v-model="item.album_name">
        </td>
        <td>
          {{item.album_pages}}
        </td>
        <td>
          {{item.album_likes}}
        </td>
        <td>
          <input type="text" class="form-control" placeholder="封面链接" v-model="item.album_cover">
        </td>
        <td>
          <button type="button" class="btn btn-danger right" @click="deleteSingle(item.id)">删除</button>
          <button type="button" class="btn btn-info right" @click="updateSingle(item)">更新</button>
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
          <li class="next">
            <span aria-hidden="true" @click="nextPage">下一页 &rarr; </span>
          </li>
        </ul>
        <div style="width: 300px; margin: 0 auto">
          <span>当前第</span>
          <input type="text" class="form-control" style="width: 50px; display: inline-block; text-align: center" v-model="currentPage">
          <span>页，一共 {{totalPage}} 页</span>
          <button class="btn btn-default" type="button" @click="gotoPage">Go!</button>
        </div>
      </nav>
    </div>
    <div class="new-image">
      <p class="bg-success title">创建新的相册</p>

      <div class="input-group" v-for="item in albumInfo">
        <span class="input-group-addon">{{item.text}}</span>
        <input type="text" class="form-control" v-model="item.val">
        <!--<span class="input-group-addon">{{item.val}}</span>-->
      </div>
      <!--上传图片组件-->

      <button type="button" class="btn btn-warning right" @click="sendAlbum">创建相册</button>
    </div>
  </section>
</template>

<script>
  export default {
    ready () {
      this.$options.methods.getAlbumList.bind(this)();
    },
    data () {
      return {
        currentPage: 1,
        totalPage: 1,
        getAlbumList: [],
        albumInfo: {
          album_name: {text: "相册名称", val: ""},
          album_cover: {text: "封面图地址", val: ""}
        }
      }
    },
    methods: {
      refresh () {
        this.$options.methods.getAlbumList.bind(this)();  
      },
      getAlbumList () {
        let data = {
          currentPage: this.currentPage
        }
        this.$http.post('http://localhost:8360/backend/index/getalbum', data, {
          emulateJSON: true
        })
        .then((res) => {
          // console.log("Query sucess");
          this.getAlbumList = res.data.data.data;
          // console.log(this.getAlbumList);
          this.totalPage = res.data.data.totalPages;
        }, (res) => {
          console.log("failed");
        });
      },
      sendAlbum () {
        let data = {
          album_name: this.albumInfo.album_name.val,
          album_cover: this.albumInfo.album_cover.val
        };
        //  需要的数据重新封装
        this.$http.post('http://localhost:8360/backend/index/postalbum', data, {
          emulateJSON: true
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("提交数据成功");
            
            alert("创建成功");
            this.$options.methods.getAlbumList.bind(this)();  

            this.albumInfo = {
              album_name: {text: "相册名称", val: ""},
              album_cover: {text: "封面图地址", val: ""}
            };
            //  数据提交成功之后 可以继续添加 然后先清空上传表单的值
          }
        }, (res) => {
          console.log(res);
        });
      },
      deleteSingle (album_id) {
        let data = {
          id: album_id
        }
        this.$http.post('http://localhost:8360/backend/index/deletesinglealbum', data, {
          emulateJSON: true
        })
        .then((res) => {
          console.log("sucess");
          
          alert("删除成功");
          this.$options.methods.getAlbumList.bind(this)();

          //  数据操作搞完了需要刷新
        }, (res) => {
          console.log(res);
        });
      },
      updateSingle (item) {
        let data = {
          id: item.id,
          album_name: item.album_name,
          album_cover: item.album_cover,
        }
        this.$http.post('http://localhost:8360/backend/index/updatesinglealbum', data, {
          emulateJSON: true
        })
        .then((res) => {
          console.log("sucess");
          
          alert("修改成功");
          this.$options.methods.getAlbumList.bind(this)();
          //  数据操作搞完了需要刷新

        }, (res) => {
          console.log(res);
        });
      },
      prevPage () {
        if (this.currentPage == 1) {
          alert("已经是第一页");
        } else {
          this.currentPage--;
          this.$options.methods.getAlbumList.bind(this)();          
        }
      },
      nextPage () {      
        if (this.currentPage == this.totalPage) {
          alert("已经是最后一页");
        } else {
          this.currentPage++;
          this.$options.methods.getAlbumList.bind(this)();
        }
      },
      gotoPage () {      
        this.currentPage >=1 && this.currentPage <= this.totalPage ? this.$options.methods.getAlbumList.bind(this)() : alert("无效的页数");
      }
    }
  }
</script>
