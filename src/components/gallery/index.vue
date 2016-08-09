<style scoped>
  .gallery-container {
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
  <section class="gallery-container">
    <div class="btn-comtainer">
      <button type="button" class="btn btn-info">
        <a v-link="{path: '/app/gallery/album'}">
          相册管理
        </a>
      </button>
      <button type="button" class="btn btn-info">
        <a v-link="{path: '/app/gallery/image'}">
          图片管理
        </a>
      </button>
    </div>

    <router-view></router-view>
    <!--第三层 router-view 给'./app/gallery/*' 下的路由-->
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
