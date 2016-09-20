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
		<p class="bg-info title">轮播图 banner 管理界面</p>

		<div class="new-live">
			<p class="bg-success title">首页 banner</p>
			<div class="input-group" 
					v-for="item in banner">
				<span class="input-group-addon">{{item.id}}</span>
				<input type="text" 
						class="form-control" 
						v-model="item.url">
			</div>
		</div>

		<div class="new-live">
		<p class="bg-success title">活动页面轮播</p>
		<div class="input-group" 
				v-for="item in activity">
		<span class="input-group-addon">{{item.id}}</span>
		<input type="text" 
				class="form-control" 
				v-model="item.url">
		</div>
		</div>

		<button type="button" 
				class="btn btn-warning" 
				@click="updateSliderList">
			更新链接
		</button>
	</section>
</template>


<script>
export default {
	ready () {
		this.$options.methods.getSliderList.bind(this)();
	},
	data () {
		return {
			banner: [],
			activity: []
		}
	},
	methods: {
		getSliderList () {
			let url = `http://localhost:8360/backend/index/getsliderlist`;
			let data = {};

			this.$http.post(url, data, {
			emulateJSON: true
			})
			.then((res) => {
				this.banner = res.data.data.banner;
				this.activity = res.data.data.activity;
			}, (res) => {

			});
		},
		updateSliderList () {
			let url = `http://localhost:8360/backend/index/updatesliderlist`;
			let data = {
				banner: JSON.stringify(this.banner),
				activity: JSON.stringify(this.activity)
			};

			this.$http.post(url, data, {
				emulateJSON: true
			})
			.then((res) => {
				alert("更新成功");
			}, (res) => {
				alert("更新失败");
			});
		}
	}
}
</script>