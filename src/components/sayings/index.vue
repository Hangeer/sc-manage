<style scoped>
  .activity-container {
    padding: 0 50px;
  }
  .btn-comtainer button {
    margin-right: 50px;
  }
  a {
    display: inline-block;
    color: #fff;
  }
</style>

<template>
  <section class="activity-container">
    <div class="btn-comtainer">
      <button type="button" class="btn btn-info">
        <a v-link="{path: '/app/sayings/list'}">
          文章管理
        </a>
      </button>
    </div>

    <router-view></router-view>
    <!--第三层 router-view 给'./app/sayings/*' 下的路由-->
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
