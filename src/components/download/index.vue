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
                <a v-link="{path: '/app/download/list'}">
                    文件列表
                </a>
            </button>
            <button type="button" class="btn btn-info">
                <a v-link="{path: '/app/download/upload'}">
                    上传文件
                </a>
            </button>
        </div>

        <router-view></router-view>
        <!--第三层 router-view 给'./app/download/*' 下的路由-->
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
