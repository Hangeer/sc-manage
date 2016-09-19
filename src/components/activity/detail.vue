<style scoped>
.album {
    margin-top: 20px;
}
.title {
    line-height: 50px;
    padding: 0 10px;
    font-size: 20px;
}
.input-group, .editor-container {
    margin-bottom: 10px;
}
.editor {
    padding:5px 10px;
    border: 1px solid #ccc;
    height: 200px;
    overflow: scroll;
}
.submit-container {
    margin: 50px 0;
    overflow: hidden;
}
</style>

<template>
    <section class="album">
        <p class="bg-success title">活动内容</p>

        <div class="input-group">
            <span class="input-group-addon">活动标题</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_title">
        </div>

        <div class="input-group">
            <span class="input-group-addon">封面图链接</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_cover">
        </div>

        <div class="input-group">
            <span class="input-group-addon">活动地点</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_place">
        </div>

        <div class="input-group">
            <span class="input-group-addon">活动时间</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_time">
        </div>

        <div class="input-group">
            <span class="input-group-addon">抢票时间</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_getTicket_time">
        </div>

        <div class="input-group">
            <span class="input-group-addon">抢票地点</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_getTicket_place">
        </div>

        <div class="input-group">
            <span class="input-group-addon">主办单位</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_unit">
        </div>

        <div class="input-group">
            <span class="input-group-addon">培训时间</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_peixun">
        </div>

        <div class="input-group">
            <span class="input-group-addon">标签</span>
            <input type="text" 
                    class="form-control" 
                    v-model="currentActivity.hd_tags">
        </div>

        <section>
            <h4> 活动详情 </h4>
            <p>提示：上传图片请不要用此编辑器的上传按钮，请先上传本地图片获取 URL 或者插入网络图片，使用添加 URL 的方式上传</p> 
            <editor :content.sync="currentActivity.hd_detail" 
                    :height="500" 
                    :z-index="1000" 
                    :auto-height="true" 
                    :disable-full-screen="true">            
            </editor>
        </section>

        <section>
            <h4> 演讲人详情 </h4>
            <p>提示：上传图片请不要用此编辑器的上传按钮，请先上传本地图片获取 URL 或者插入网络图片，使用添加 URL 的方式上传</p> 
            <editor :content.sync="currentActivity.hd_compere" 
                    :height="500" 
                    :z-index="1000" 
                    :auto-height="true" 
                    :disable-full-screen="true">            
            </editor>
        </section>

        <p> 活动状态 </p>
        <select class="form-control" id="status">
                <option value="等待上线">等待上线</option>
                <option value="已结束">已结束</option>
                <option value="直播间">直播间</option>
        </select>

        <p> 活动类型 </p>
        <select class="form-control" id="type">
            <option value="讲座">讲座</option>
            <option value="竞赛">竞赛</option>
            <option value="展览">展览</option>
            <option value="内部">内部</option>
            <option value="其他">其他</option>
        </select>

        <p>相关链接</p>
        <div class="relative-links" 
                v-for="item in relaviteLinks">
            <form class="form-inline">
                <div class="form-group">
                    显示文字：
                    <input type="text" 
                            class="form-control" 
                            placeholder="文字" 
                            v-model="item.related_title">
                </div>
                <div class="form-group">
                    链接地址
                    <input type="text" 
                            class="form-control" 
                            placeholder="链接地址" 
                            v-model="item.related_url">
                </div>
                <div class="form-group">
                    链接类型
                    <input type="text" 
                            class="form-control" 
                            placeholder="链接类型" 
                            v-model="item.related_type">
                </div>
            </form>
            </div>
            <button class="btn btn-default" 
                    @click="addLink">
                添加链接
            </button>

            <div class="submit-container">
            <button type="button" 
                    class="btn btn-warning" 
                    @click="submitActivity">
                    提交
            </button>

            <p>提交状态：{{submit_status}}</p>
            <p>提示：提交之后点上方 关闭列表 按钮关闭此列表</p>
        </div>
    </section>
</template>

<script>
export default {
    props: [
        'modifyId'
    ],
    ready () {
        this.$options.methods.getActivity.bind(this)();
        this.$options.methods.getLinks.bind(this)();
    },
    data () {
        return {
            currentActivity: {
                hd_title: "",
                hd_cover: "",
                hd_place: "",
                hd_time: "",
                hd_getTicket_time: "",
                hd_getTicket_place: "",
                hd_unit: "",
                hd_peixun: "",
                hd_tags: ""
            },
            relaviteLinks: [],
            submit_status: `未提交`
        }
    },
    methods: {
        getActivity () {
            if (this.modifyId > 0 ) {
                // console.log("传入的 id " + this.modifyId + " 有效情况");
                let data = {
                    hd_id: this.modifyId
                };
                let url = `http://localhost:8360/backend/index/getsingleactivity`;
                this.$http.post(url, data, {
                    emulateJSON: true
                })
                .then((res) => {
                    this.currentActivity = res.data.data;
                    document.querySelector('#status').value = this.currentActivity.hd_state;
                    document.querySelector('#type').value = this.currentActivity.hd_type;
                }, (res) => {
                    alert("获取单条信息失败");
                });
            } else {
                // console.log("新建活动");
            }  
        },
        getLinks () {
            if (this.modifyId > 0) {
                let data = {
                    hd_id: this.modifyId
                };
                let url = `http://localhost:8360/backend/index/getlinks`;
                this.$http.post(url, data, {
                    emulateJSON: true
                })
                .then((res) => {
                    this.relaviteLinks = res.data.data;
                }, (res) => {
                    alert("获取单条信息失败");
                });
            }
        },
        submitActivity () {
            let hd_state = document.getElementById("status").value;
            let hd_type = document.getElementById("type").value;
            let data = this.currentActivity;
            let hd_url = ``;
            let flag = 0;

            this.submit_status = `正在提交，请稍等`;
            data.hd_state = hd_state;
            data.hd_type = hd_type;

            if (this.modifyId > 0) {
                hd_url = `http://localhost:8360/backend/index/updateactivity`;
            } else {
                hd_url = `http://localhost:8360/backend/index/createactivity`;
            }

            this.$http.post(hd_url, data, { emulateJSON: true })
            .then((res) => {
                if (flag < 1) {
                    flag++;
                    // console.log(flag);
                } else {
                    this.submit_status = `提交成功`;
                }
            }, (res) => {
                this.submit_status = `提交失败`;
            });

            let links_data = {
                arr: this.relaviteLinks          
            };
            links_data = JSON.stringify(links_data);

            let links_url = `http://localhost:8360/backend/index/submitlinks`;

            this.$http.post(links_url, {data: links_data}, {emulateJSON: true})
            .then((res) => {
                if (flag < 1) {
                    flag++;
                    // console.log(flag);
                } else {
                    this.submit_status = `提交成功`;
                }
            }, (res) => {
                this.submit_status = `提交失败`;
            });
        },
        addLink () {
            let data = {
                id: -1,
                activity_id: this.modifyId,
                related_title: '',
                related_url: '',
                related_type: ''
            };
            this.relaviteLinks.push(data);
        }
    }
}
</script>
