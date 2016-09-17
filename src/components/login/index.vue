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
        <label for="inputEmail3" 
               class="col-sm-2 control-label">
           帐号
         </label>
        <div class="col-sm-10">
          <input type="text" 
                 class="form-control" 
                 id="inputEmail3" 
                 placeholder="请输入帐号" 
                 v-model="user.name">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" 
               class="col-sm-2 control-label">
         密码
       </label>
        <div class="col-sm-10">
          <input type="password" 
                 class="form-control" 
                 id="inputPassword3" 
                 placeholder="请输入密码" 
                 v-model="user.code">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button class="btn btn-default" 
                  @click="verify">
            登录
          </button>
        </div>
      </div>
    </form>
    <p>{{notify}}</p>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        notify: '',
        user: {
          name: '',
          code: ''
        }
      }
    },
    methods: {
      verify () {
        let e = event || window.event;
        e.preventDefault();

        let data = this.user;
        let url = `http://localhost:8360/backend/index/testuser`;
        
        this.$http.post(url, data, { 
          emulateJSON: true 
        })
        .then((res) => {
          if (res.data.data.msg == 'success') {
            this.notify = '登录成功';
            sessionStorage.kjcx_name = `${this.user.name}`;
            sessionStorage.kjcx_code = `${this.user.code}`;
            this.$router.go('/app');
          } else {
            this.notify = '帐号密码有错误';  
          }
        }, (res) => {
          this.notify = '网络出现了问题';
        });
      }
    }
  }
</script>
