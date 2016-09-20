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
.new-live {
    margin-bottom: 50px;
}
.wrapper{
    margin: 50px 0;
}
.pager {
    overflow: hidden;
}
.current-page {
    width: 50px; 
    display: inline-block; 
    text-align: center;
}
</style>

<template>
    <section class="album">
        <p class="bg-info title">直播管理界面</p>
        <button type="button" 
                class="btn btn-info"
                @click="startLive">
            清空所有直播
        </button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>消息 ID</th>
                    <th>活动 ID</th>
                    <th>直播消息内容</th>
                    <th>配图地址</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-for="item in liveList">
                <tr>
                    <th scope="row">{{item.id}}</th>
                    <th scope="row">{{item.hd_id}}</th>
                    <td>
                        <input type="text" 
                                class="form-control" 
                                placeholder="消息内容" 
                                v-model="item.message">
                    </td>
                    <td>
                        <input type="text" 
                                class="form-control" 
                                placeholder="图片链接" 
                                v-model="item.img">
                    </td>
                    <td>
                        <button type="button" 
                                class="btn btn-danger" 
                                @click="deleteLive(item)">
                        删除
                    </button>
                    <button type="button" 
                            class="btn btn-info" 
                            @click="updateLive(item)">
                        更新
                    </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="wrapper">
            <nav>
                <ul class="pager">
                    <li class="previous" 
                        @click="prevPage">
                        <span aria-hidden="true">&larr; 上一页</span>
                    </li>
                    <li class="next" 
                        @click="nextPage">
                        <span aria-hidden="true">下一页 &rarr; </span>
                    </li>
                </ul>
                <div style="width: 300px; margin: 0 auto">
                    <span>当前第</span>
                    <input type="text" 
                            class="form-control current-page"  
                            v-model="currentPage">
                    <span>页，一共 {{totalPage}} 页</span>
                    <button class="btn btn-default" 
                            type="button" 
                            @click="gotoPage">
                        Go!
                    </button>
                </div>
            </nav>
        </div>

        <div class="new-live">
            <p class="bg-success title">推送直播内容</p>

            <div class="input-group">
                <span class="input-group-addon">消息内容</span>
                <input type="text" 
                        class="form-control" 
                        v-model="liveInfo.message">
            </div>

            <div class="input-group">
                <span class="input-group-addon">配图地址</span>
                <input type="text" 
                        class="form-control" 
                        v-model="liveInfo.img">
            </div>

            <div class="input-group">
                <span class="input-group-addon">对应活动 id</span>
                <input type="text" 
                        class="form-control" 
                        v-model="liveInfo.hd_id">
            </div>

            <button type="button" 
                    class="btn btn-warning" 
                    @click="postLive">
                推送直播
            </button>
        </div>
    </section>
</template>

<script>
export default {
    ready () {
        this.$options.methods.getLiveList.bind(this)();
    },
    data () {
        return {
            currentPage: 1,
            liveList: [],
            currentPage: 1,
            totalPage: 1,
            liveInfo: {
                message: "",
                img: "",
                hd_id: ""
            }
        }
    },
    methods: {
        getLiveList () {
            let data = {
                currentPage: this.currentPage
            };
            let url = `http://localhost:8360/backend/index/getlivelist`;

            this.$http.post(url, data, {
                emulateJSON: true
            })
            .then((res) => {
                this.liveList = res.data.data.data;
                this.totalPage = res.data.data.totalPages;
                console.log(`获取列表成功`);
            }, (res) => {
                alert(`获取列表失败`);
            });
        },
        postLive () {
            let data = this.liveInfo;
            let url = `http://localhost:8360/backend/index/postlive`;
            let d = new Date();

            data.time = d.toLocaleDateString().replace(/\//g, `-`) 
                            + ' ' 
                            + d.toTimeString().replace(/\//g, `-`).replace(/G.+/g, '').trim();

            this.$http.post(url, data, {
                emulateJSON: true
            })
            .then((res) => {
                alert(`发送直播消息成功`);
                this.liveInfo = {
                    message: "",
                    img: "",
                    hd_id: ""
                }
                this.$options.methods.getLiveList.bind(this)();
            }, (res) => {
                alert(`发送直播消息失败`);
            });
        },
        deleteLive (item) {
            let data = {
                id: item.id
            };
            let url = `http://localhost:8360/backend/index/deletelive`;
            
            this.$http.post(url, data, {
                emulateJSON: true
            })
            .then((res) => {
                alert(`删除该条直播内容成功`);
                this.$options.methods.getLiveList.bind(this)();
            }, (res) => {
                alert(`删除该条直播内容失败`);
            });
        },
        updateLive (item) {
            let url = `http://localhost:8360/backend/index/updatelive`;
            let data = {
                id: item.id,
                message: item.message,
                img: item.img
            };

            this.$http.post(url, data, {
                emulateJSON: true
            })
            .then((res) => {
                alert(`更新成功`);
                this.$options.methods.getLiveList.bind(this)();
            }, (res) => {
                alert(`更新失败`);
            });
        },
        startLive () {
            let url = `http://localhost:8360/backend/index/startlive`;
            this.$http.post(url, {}, {
                emulateJSON: true
            })
            .then((res) => {
                alert('清空直播表');
                this.$options.methods.getLiveList.bind(this)();
            }, (res) => {
                alert('清空直播表失败');
            });
        },
        prevPage () {
            if (this.currentPage == 1) {
                alert("已经是第一页");
            } else {
                this.currentPage--;
                this.$options.methods.getLiveList.bind(this)();          
            }
        },
        nextPage () {      
            if (this.currentPage == this.totalPage) {
                alert("已经是最后一页");
            } else {
                this.currentPage++;
                this.$options.methods.getLiveList.bind(this)();
            }
        },
        gotoPage () {      
            this.currentPage >=1 && this.currentPage <= this.totalPage 
            ? this.$options.methods.getLiveList.bind(this)() 
            : alert("无效的页数");
        }
    }
}
</script>
