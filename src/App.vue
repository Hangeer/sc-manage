<style scoped>
  a {
    text-decoration: none;
    cursor: pointer;
  }

</style>

<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li v-for="item in links">
            <a v-link="{path: item.link}">
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view></router-view>
  <!--第二层 router-view 给'./app/*' 下的路由-->
</template>

<script>
  export default {
    ready () {
      this.$router.beforeEach(() => {
        if (sessionStorage.kjcx_name || sessionStorage.kjcx_code) {
          let data = {
            name: sessionStorage.kjcx_name,
            code: sessionStorage.kjcx_code
          }
          let url = `http://localhost:8360/backend/index/testlogin`;
          this.$http.post(url, data, { emulateJSON: true })
          .then((res) => {
            if (res.data.data.msg == 'success') {
              console.log(res.data.data.msg)
            } else {
              this.$router.go('login');  
            }
          }, (res) => {
            console.log(`验证失败`);
            this.$router.go('login');
          });
        } else {
          this.$router.go('login');
        }
      });
    },
    data () {
      return {
        links: [
          {
            text: "图库",
            link: "/app/gallery"
          },
          {
            text: "活动赛事",
            link: "/app/activity"

          },
          {
            text: "我语科联",
            link: "/app/sayings"

          },
          {
            text: "下载专区",
            link: "/app/download"

          },
          {
            text: "轮播图管理",
            link: "/app/slider"
          }
        ]
      }
    }
  }
</script>
