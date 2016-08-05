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
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>
          <input type="text" class="form-control" placeholder="图库 ID">
        </td>
        <td>
          <input type="text" class="form-control" placeholder="名称">
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
    <upload></upload>
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
    <div class="new-image">
      <p class="bg-info title">上传新的图片</p>
      <div class="input-group">
        <span class="input-group-addon">所属图库 ID</span>
        <input type="text" class="form-control">
      </div>
      <div class="input-group">
        <span class="input-group-addon">名称</span>
        <input type="text" class="form-control">
      </div>
      <!--上传图片组件-->
      <button type="button" class="btn btn-info right">上传</button>
    </div>
  </section>
</template>

<script>
  import upload from './upload'

  export default {
    data () {
      return {

      }
    },
    components: {
      upload
    }
  }
</script>
