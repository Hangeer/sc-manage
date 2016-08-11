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
  .right {
    float: right;
  }
</style>

<template>
  <section class="album">
    <p class="bg-info title">我语科联</p>
    <!-- 我语科联 title -->
    
    <table class="table table-striped">
      <thead>
      <tr>
        <th> 文章 ID </th>
        <th> 文章标题 </th>
        <th> 上传时间 </th>
        <th> 所属部门 </th>
        <th> 操作 </th>
      </tr>
      </thead>
      <tbody v-for="item in articleList">
      <tr>
        <th scope="row"> {{item.id}} </th>
        <td> {{item.atc_title}} </td>
        <td> {{item.atc_time}} </td>
        <td> {{item.atc_type}} </td>
        <td>
          <button type="button" 
                  class="btn btn-danger" 
                  @click="deleteSingleActivity(item.id)">
            删除
          </button>
          <button type="button" 
                  class="btn btn-info" 
                  @click="modifySingleArticle(item.id)">
            编辑
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- 图片列表 -->

    <div class="wrapper">
      <nav>
        <ul class="pager">
          <li class="previous" 
              @click="prevPage">
            <span aria-hidden="true"> &larr; 上一页 </span>
          </li>
          <li class="next" 
              @click="nextPage">
            <span aria-hidden="true">下一页 &rarr; </span>
          </li>
        </ul>
        <div class="current-page">
          <span>当前第</span>
          <input type="text" 
                 class="form-control page-container" 
                 v-model="currentPage">
          <span> 页，一共 {{totalPage}} 页 </span>
          <button class="btn btn-default" 
                  type="button" 
                  @click="gotoPage">
            Go!
          </button>
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
              @click="createArticle">
        添加新的文章
      </button>
    </div>

    <detail-component v-if="isDetailShow" :modify-id="modifyArticleId"></detail-component>
  </section>
</template>

<script>
  import DetailComponent from './detail';

  export default {
    ready () {
      this.$options.methods.getArticleList.bind(this)();
    },
    data () {
      return {  
        isDetailShow: false,
        currentPage: 1,
        totalPage: 1,
        modifyArticleId: 1,
        articleList: {}
      }
    },
    methods: {
      getArticleList () {
        let data = {currentPage: this.currentPage};
        let url = `http://localhost:8360/backend/index/getarticlelist`;

        this.$http.post(url, data, {emulateJSON: true})
        .then((res) => {
          this.articleList = res.data.data.data;
          this.totalPage = res.data.data.totalPages;
          console.log(`获取文章列表成功`);
        }, (res) => {
          console.log(`获取文章列表失败`);
        });
      },
      modifySingleArticle (num) {
        this.modifyArticleId = num;
        this.isDetailShow == false 
        ? this.isDetailShow = true 
        : alert("请先关闭列表 再进行编辑");
        
        /*
        *  编辑单条数据
        */
        console.log()
      },
      createArticle () {
        this.modifyArticleId = -1;
        this.isDetailShow = true;
      },
      deleteSingleActivity (num) {
        let data = {
          id: num
        };
        let url = `http://localhost:8360/backend/index/deletearticle`;

        this.$http.post(url, data, { emulateJSON: true })
        .then((res) => {
          console.log(`删除成功`);
          this.$options.methods.getArticleList.bind(this)();
        }, (res) => {
          console.log(`删除失败`);
        });

        /*
        *  删除单条数据
        */
      },
      prevPage () {
        if (this.currentPage == 1) {
          alert("已经是第一页");
        } else {
          this.currentPage--;
          this.$options.methods.getArticleList.bind(this)();          
        }

        /*
        *   prevPage
        *   点击按钮翻上一页
        */

      },
      nextPage () {      
        if (this.currentPage == this.totalPage) {
          alert("已经是最后一页");
        } else {
          this.currentPage++;
          this.$options.methods.getArticleList.bind(this)();
        }

        /*
        *   nextPage
        *   点击按钮翻上一页
        */
      },
      gotoPage () {      
        this.currentPage >=1 && this.currentPage <= this.totalPage 
        ? this.$options.methods.getArticleList.bind(this)() 
        : alert("无效的页数");

        /*
        *   gotoPage
        *   去往指定的页数
        */
      },
      closeDetail () {
        this.isDetailShow = false;
      }
    },
    components: {
      DetailComponent
    }
  }
</script>
