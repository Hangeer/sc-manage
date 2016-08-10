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
    <p class="bg-info title">活动管理界面</p>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>活动 ID</th>
        <th>名称</th>
        <th>点赞数</th>
        <th>活动单位</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody v-for="item in activityList">
      <tr>
        <th scope="row">{{item.id}}</th>
        <td>
            {{item.hd_title}}
        </td>
        <td>
            {{item.hd_likes}}
        </td>
        <td>
            {{item.hd_unit}}
        </td>
        <td>
          <button type="button" class="btn btn-danger" @click="deleteSingleActivity(item.id)">
            删除
          </button>
          <button type="button" class="btn btn-info" @click="modifySingleActivity(item.id)">
            编辑
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

    <div style="overflow: hidden">
      <button type="button" 
              class="btn btn-danger" 
              @click="closeDetail"
              v-show="isDetailShow">
        关闭列表
      </button>
      <span v-show="isDetailShow">(若未提交不会修改数据)</span>
      <button type="button" 
              class="btn btn-success right"
              @click="createActivity">
        添加新的活动
      </button>
    </div>
    
    <detail-component v-if="isDetailShow" :modify-id="modifyActivityId"></detail-component>
  </section>
</template>

<script>
  import DetailComponent from './detail';

  export default {
    ready () {
      this.$options.methods.getActivityList.bind(this)();
    },
    components: {
      DetailComponent
    },
    data () {
      return {
        isDetailShow: false,
        currentPage: 1,
        totalPage: 1,
        activityList: [],
        modifyActivityId: 1
      }
    },
    methods: {
      getActivityList () {
        let data = {
          currentPage: this.currentPage
        };
        let url = `http://localhost:8360/backend/index/getactivitylist`;

        this.$http.post(url, data, {
          emulateJSON: true
        })
        .then((res) => {
          this.activityList = res.data.data.data;
          this.totalPage = res.data.data.totalPages;
        }, (res) => {
          console.log(`获取活动列表失败`);
        });
        /*
        *  获取列表
        */
      },
      modifySingleActivity (num) {
        this.modifyActivityId = num;
        this.isDetailShow == false 
        ? this.isDetailShow = true 
        : alert("请先关闭列表 再进行编辑");
        /*
        *  编辑单条数据
        */
      },
      deleteSingleActivity (num) {
        let data = {
          id: num
        };
        let url = `http://localhost:8360/backend/index/deleteactivity`;
        this.$http.post(url, data, {
          emulateJSON: true
        })
        .then((res) => {
          alert(`删除成功`);
          this.$options.methods.getActivityList.bind(this)();
        }, (res) => {
          alert(`删除失败`);
        });
        /*
        *  删除单条数据
        */
      },
      createActivity () {
        this.modifyActivityId = -1;
        this.isDetailShow = true;
      },
      prevPage () {
        if (this.currentPage == 1) {
          alert("已经是第一页");
        } else {
          this.currentPage--;
          this.$options.methods.getActivityList.bind(this)();          
        }
      },
      nextPage () {      
        if (this.currentPage == this.totalPage) {
          alert("已经是最后一页");
        } else {
          this.currentPage++;
          this.$options.methods.getActivityList.bind(this)();
        }
      },
      gotoPage () {      
        this.currentPage >=1 && this.currentPage <= this.totalPage ? this.$options.methods.getActivityList.bind(this)() : alert("无效的页数");
      },
      closeDetail () {
        this.isDetailShow = false;
      }
    }
  }
</script>
