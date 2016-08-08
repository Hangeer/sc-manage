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
</style>

<template>
  <section class="album">
    <p class="bg-info title">图片管理界面</p>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>图片 ID</th>
        <th>所属图库 ID</th>
        <th>名称</th>
        <th>点赞数</th>
        <th>地址</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody v-for="item in getImgList">
      <tr>
        <th scope="row">{{item.id}}</th>
        <td>
          <input type="text" class="form-control" placeholder="图库 ID" v-model="item.album_id">
        </td>
        <td>
          <input type="text" class="form-control" placeholder="名称" v-model="item.pic_name">
        </td>
        <td>
          {{item.pic_likes}}
        </td>
        <td>
          <input type="text" class="form-control" placeholder="封面链接" v-model="item.pic_url">
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
      <p class="bg-info title">上传新的图片</p>

      <div class="input-group" v-for="item in imgInfo">
        <span class="input-group-addon">{{item.text}}</span>
        <input type="text" class="form-control" v-model="item.val">
        <!--<span class="input-group-addon">{{item.val}}</span>-->
      </div>
      <!--上传图片组件-->

      <form enctype="multipart/form-data" method="post" id="form-cont" style="overflow: hidden">
        <input type="file" class="btn btn-warning" name="image" style="margin: 10px 0;float: left" />
        <button type="button" class="btn btn-info" style="margin: 10px 10px;float: left" @click="testSubmit">点击上传图片</button>
      </form>

      <div class="input-group">
        <p>已上传的图片列表</p>
        <div v-for="item in imgUploadSucList">
          {{item}}
        </div>
      </div>

      <button type="button" class="btn btn-warning right" @click="sendImg">提交新的图片</button>
    </div>
  </section>
</template>

<script>
  export default {
    ready () {
      this.$options.methods.getImgList.bind(this)();
    },
    data () {
      return {
        currentPage: 1,
        totalPage: 1,
        getImgList: [],
        imgUploadSucList: [],
        imgInfo: {
          albumId: {text: "相册ID", val: ""},
          pic_name: {text: "照片名称", val: ""},
          pic_url: {text: "照片url", val: ""}
        }
      }
    },
    methods: {
      refresh () {
        this.$options.methods.getImgList.bind(this)();  
      },
      getImgList () {
        let data = {
          currentPage: this.currentPage
        }
        this.$http.post('http://localhost:8360/backend/index/getpic', data, {
          emulateJSON: true
        })
        .then((res) => {
          console.log("Query sucess");
          this.getImgList = res.data.data.data;
          this.totalPage = res.data.data.totalPages;
        }, (res) => {
          console.log("failed");
        });
      },
      deleteSingle (pic_id) {
        let data = {
          id: pic_id
        }
        this.$http.post('http://localhost:8360/backend/index/deletesingleimg', data, {
          emulateJSON: true
        })
        .then((res) => {
          console.log("sucess");
          
          alert("删除成功");
          this.$options.methods.getImgList.bind(this)();

          //  数据操作搞完了需要刷新
        }, (res) => {
          console.log(res);
        });
      },
      updateSingle (item) {
        let data = {
          id: item.id,
          album_id: item.album_id,
          pic_name: item.pic_name,
          pic_url: item.pic_url
        }
        this.$http.post('http://localhost:8360/backend/index/updatesingleimg', data, {
          emulateJSON: true
        })
        .then((res) => {
          console.log("sucess");
          
          alert("修改成功");
          this.$options.methods.getImgList.bind(this)();
          //  数据操作搞完了需要刷新

        }, (res) => {
          console.log(res);
        });
      },
      testSubmit () {
        let fd = new FormData(document.getElementById("form-cont"));
        this.$http.post('http://localhost:8360/backend/index/upload', fd)
        .then((res) => {
          this.imgUploadSucList.push(res.body);
        }, (res) => {
          console.log(res);
        });
      },
      sendImg () {
        let data = {
          album_id: this.imgInfo.albumId.val,
          pic_name: this.imgInfo.pic_name.val,
          pic_url: this.imgInfo.pic_url.val
        };
        //  需要的数据重新封装
        this.$http.post('http://localhost:8360/backend/index/postpic', data, {
          emulateJSON: true
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("提交数据成功");
            
            alert("添加成功");
            this.$options.methods.getImgList.bind(this)();

            this.imgInfo = {
                albumId: {text: "相册ID", val: ""},
                pic_name: {text: "照片名称", val: ""},
                pic_url: {text: "照片url", val: ""}
            };
            //  数据提交成功之后 可以继续添加 然后先清空上传表单的值
          }
        }, (res) => {
          console.log(res);
        });
      },
      prevPage () {
        if (this.currentPage == 1) {
          alert("已经是第一页");
        } else {
          this.currentPage--;
          this.$options.methods.getImgList.bind(this)();          
        }
      },
      nextPage () {      
        if (this.currentPage == this.totalPage) {
          alert("已经是最后一页");
        } else {
          this.currentPage++;
          this.$options.methods.getImgList.bind(this)();
        }
      },
      gotoPage () {      
        this.currentPage >=1 && this.currentPage <= this.totalPage ? this.$options.methods.getImgList.bind(this)() : alert("无效的页数");
      }
    }
  }
</script>
