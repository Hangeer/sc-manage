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
    width: 50px; 
    display: inline-block; 
    text-align: center;
  }
  .albums-section {
    border: 1px solid #aaa;
    margin-bottom: 20px;
  }
</style>

<template>
  <section class="album">
    <section class="albums-section">
      <p class="bg-info title">相册管理界面</p>
      <!-- 相册管理界面 title -->
    
      <table class="table table-striped">
        <thead>
        <tr>
          <th> 相册 ID </th>
          <th> 名称 </th>
          <th> 类型 </th>
          <th> 所含图片数量 </th>
          <th> 点赞数 </th>
          <th> 封面图地址 </th>
          <th> 操作 </th>
        </tr>
        </thead>
        <tbody v-for="item in albumList">
        <tr>
          <th scope="row"> {{item.id}} </th>
          <td>
            <input type="text" 
                   class="form-control" 
                   placeholder="相册名称" 
                   v-model="item.album_name">
          </td>
          <td> {{item.album_type}} </td>
          <td> {{item.album_pages}} </td>
          <td> {{item.album_likes}} </td>
          <td>
            <input type="text" 
                   class="form-control" 
                   placeholder="封面链接" 
                   v-model="item.album_cover">
          </td>
          <td>
            <button type="button" 
                    class="btn btn-danger right" 
                    @click="deleteSingleAlbum(item.id)">
              删除
            </button>
            <button type="button" 
                    class="btn btn-info right" 
                    @click="updateSingle(item)">
              更新
            </button>
            <button type="button" 
                    class="btn btn-warning right" 
                    @click="chooseDetail(item)">
              详情
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 当前页面相册列表 -->
      
      <div class="wrapper">
        <nav>
          <ul class="pager">
            <li class="previous" 
                @click="prevPage">
              <span aria-hidden="true"> &larr; 上一页 </span>
            </li>
            <li class="next">
              <span aria-hidden="true" 
                    @click="nextPage"> 下一页 &rarr; </span>
            </li>
          </ul>
          <div style="width: 300px; margin: 0 auto">
            <span>当前第</span>
            <input type="text" 
                   class="form-control current-page" 
                   v-model="currentPage">
            <span>页，一共 {{totalPage}} 页</span>
            <button class="btn btn-default" 
                    type="button" 
                    @click="gotoPage">
              Go!
            </button>
          </div>
        </nav>
      </div>
      <!-- 分页器 -->
    </section>

    <section class="albums-section" 
             v-show="detailId > 0">
      <div class="album-detail">
        <p class="bg-warning title">相册详情</p>

        <p>当前显示相册 ID: {{detailId}}</p>

        <table class="table table-striped">
        <thead>
        <tr>
          <th> 图片 ID </th>
          <th> 名称 </th>
          <th> 点赞数 </th>
          <th> 地址 </th>
          <th> 操作 </th>
        </tr>
        </thead>
        <tbody v-for="item in detailList">
        <tr>
          <th scope="row"> {{item.id}} </th>  
          <td>{{item.pic_name}}</td>
          <td>{{item.pic_likes}}</td>
          <td>{{item.pic_url}}</td>
          <td>
            <button type="button" 
                  class="btn btn-danger right" 
                  @click="deleteSingle(item.id)">
              删除
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 图片列表 -->
      </div>
    </section>

    <section class="albums-section">
      <div class="new-image">
        <p class="bg-success title">创建新的相册</p>

        <div class="input-group">
          <span class="input-group-addon">相册名称</span>
          <input type="text" 
                 class="form-control" 
                 v-model="albumInfo.album_name">              
        </div>
        <div class="input-group">
          <span class="input-group-addon">封面图地址</span>
          <input type="text" 
                 class="form-control" 
                 v-model="albumInfo.album_cover">
        </div>
        <select class="form-control" 
                v-model="albumInfo.album_type">
          <option value="重邮美景">重邮美景</option>
          <option value="讲座宣讲">讲座宣讲</option>
          <option value="科技竞赛">科技竞赛</option>
          <option value="活动展览">活动展览</option>
          <option value="内部活动">内部活动</option>
          <option value="趣味科技">趣味科技</option>
          <option value="文峰青年大讲堂">文峰青年大讲堂</option>
        </select>
        <button type="button" 
                class="btn btn-warning right" 
                @click="sendAlbum">
          创建相册
        </button>
      </div>
      <!-- 创建新的相册 -->
    </section>

  </section>
</template>

<script>
  export default {
    ready () {
      this.$options.methods.getAlbumList.bind(this)();
      
      /* 
      *   页面刷新时候的时候调用 
      *   getAlbumList 方法   
      *   更新照片列表
      */
    },
    data () {
      return {
        currentPage: 1,
        totalPage: 1,
        albumList: [],
        albumInfo: {
          album_name: "",
          album_cover: "",
          album_type: "重邮美景"
        },
        detailId: 0,
        detailList: []
        
        /*
        *   @params:
        *     { currentPage }: 当前所在页数
        *     { totalPage }: 总页数
        *     { albumList }: 获取的当前页数相册列表
        *     { imgInfo }: 待上传的照片信息
        */
      }
    },
    methods: {
      getAlbumList () {
        let data = { currentPage: this.currentPage },
            url = `http://localhost:8360/backend/index/getalbum`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          console.log(`获取相册列表成功`);
          this.albumList = res.data.data.data;
          this.totalPage = res.data.data.totalPages;
        }, (res) => {
          console.log(`获取相册列表失败`);
        });

        /*
        *   getAlbumList:
        *     根据页数 请求相册列表
        */
      },
      sendAlbum () {
        let data = {
          album_name: this.albumInfo.album_name,
          album_cover: this.albumInfo.album_cover,
          album_type: this.albumInfo.album_type
        };
        let url = `http://localhost:8360/backend/index/postalbum`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          if (res.status == 200) {
            alert("创建相册成功");
            this.$options.methods.getAlbumList.bind(this)();  
            this.albumInfo = {
              album_name: "",
              album_cover: "",
              album_type: "重邮美景"
            };
          }
        }, (res) => {
          alert("创建相册失败");
        });

        /*
        *   sendAlbum:
        *     新建相册
        */
      },
      deleteSingleAlbum (album_id) {
        let data = { id: album_id },
            url = `http://localhost:8360/backend/index/deletesinglealbum`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          alert("删除相册成功");
          this.$options.methods.getAlbumList.bind(this)();
        }, (res) => {
          alert("删除相册失败");
        });

        /*
        *   deleteSingle
        *     删除相册
        */
      },
      updateSingle (item) {
        let data = {
          id: item.id,
          album_name: item.album_name,
          album_cover: item.album_cover,
        };
        let url = `http://localhost:8360/backend/index/updatesinglealbum`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          alert(`更新相册信息成功`);
          this.$options.methods.getAlbumList.bind(this)();
        }, (res) => {
          alert(`更新相册信息失败`);
        });

        /*
        *   updateSingle
        *     更新相册信息
        */
      },
      chooseDetail (item) {
        this.detailId = item.id;
        let data = {
          id: this.detailId
        };
        let url = `http://localhost:8360/backend/index/detailbyid`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          this.detailList = res.data.data.data;
          console.log(this.detailList);
        }, (res) => {

        });
      },
      deleteSingle (pic_id) {
        let data = { id: pic_id },
            url = `http://localhost:8360/backend/index/deletesingleimg`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          alert(`删除单条信息成功`);
          //  数据操作搞完了需要刷新
        }, (res) => {
          alert(`删除单条信息失败`);
        });

        /*
        *   deleteSingle:
        *      删除单条数据
        */
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
        this.currentPage >=1 && this.currentPage <= this.totalPage 
        ? this.$options.methods.getAlbumList.bind(this)() 
        : alert("无效的页数");
      }
    }
  }
</script>
