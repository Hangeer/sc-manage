<style scoped>
  .album {
    margin-top: 20px;
  }
  .title {
    line-height: 50px;
    padding: 0 10px;
    font-size: 20px;
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
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>
          【活动】今晚小树林 约吗
        </td>
        <td>
          <button type="button" class="btn btn-danger right">删除</button>
          <button type="button" class="btn btn-info right">
            <a v-link="{path: '/app/activity/detail'}">
              编辑
            </a>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="wrapper">
      <nav>
        <ul class="pager">
          <li class="previous">
            <a href="#"><span aria-hidden="true">&larr;</span> 上一页</a>
          </li>
          <li class="next">
            <a href="#">下一页 <span aria-hidden="true">&rarr;</span></a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>
