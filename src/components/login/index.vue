<style scoped>
  .login-container {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -71px;
    width: 500px;
    height: 132px;
  }
</style>

<template>
  <section class="login-container">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">帐号</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputEmail3" placeholder="请输入帐号">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default">登录</button>
        </div>
      </div>
    </form>
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
