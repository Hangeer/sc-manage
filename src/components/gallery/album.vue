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
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>
          <input type="text" class="form-control" placeholder="相册名称">
        </td>
        <td>
          12
        </td>
        <td>
          13
        </td>
        <td>
          <input type="text" class="form-control" placeholder="封面链接">
        </td>
        <td>
          <button type="button" class="btn btn-danger right">删除</button>
          <button type="button" class="btn btn-info right">更新</button>
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
