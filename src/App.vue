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
