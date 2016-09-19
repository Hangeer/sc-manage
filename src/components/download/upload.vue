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
.new-image {
	margin-bottom: 50px;
}
.wrapper {
	margin: 50px 0;
}
.pager {
	overflow: hidden;
}
.current-page {
	width: 300px; 
	margin: 0 auto;
}
.page-container {
	width: 50px; 
	display: inline-block; 
	text-align: center;
}
</style>

<template>
	<section class="upload-container">
		<div class="new-image">
			<p class="bg-success title">上传文件</p>

			<div class="input-group">
			<span class="input-group-addon">文件名称</span>
			<input type="text" 
					class="form-control" 
					v-model="fileInfo.file_title">
			</div>

			<form enctype="multipart/form-data" 
					method="post" 
					id="form-cont" 
					style="overflow: hidden">
				<input type="file" 
					class="btn btn-warning" 
					name="image" 
					style="margin: 10px 0;float: left" />
				<button type="button" 
					class="btn btn-info" 
					style="margin: 10px 10px;float: left" 
					@click="testSubmit">
					点击上传文件到服务器
				</button>
			</form>

			<div class="input-group">
				<p>上传本地文件，请点击选择文件，上传成功会返回 url ，再将 url 填写到 文件地址 一栏</p>
				<p>已上传的文件列表</p>

				<table class="table table-striped">
					<thead>
						<tr>
							<th>文件本地名称</th>
							<th>文件 url</th>
						</tr>
					</thead>
					<tbody v-for="item in fileUploadSucList">
						<tr>
							<td>{{item.prevName}}</td>
							<td>{{item.currName}}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="input-group">
				<span class="input-group-addon">文件地址</span>
				<input type="text" 
						class="form-control" 
						v-model="fileInfo.file_url">
			</div>

			<p>文件类型</p>
			<select class="form-control" 
					v-model="fileInfo.file_type">
				<option value="word">word</option>
				<option value="ppt">ppt</option>
				<option value="excel">excel</option>
			</select>

			<p>活动类型</p>
			<select class="form-control" 
					v-model="fileInfo.type">
				<option value="赛事报名">赛事报名</option>
				<option value="影像资料">影像资料</option>
				<option value="内部资料">内部资料</option>
				<option value="其它">其它</option>
				<option value="文峰青年大讲堂">文峰青年大讲堂</option>
			</select>

			<button type="button" 
				class="btn btn-warning right" 
				@click="sendFile">
				提交新的文件
			</button>
		</div>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				prefix: 'http://localhost:8360',
				fileUploadSucList: [],
				fileInfo: {
					file_title: "",
					file_url: "",
					file_type: "word",
					type: "赛事报名"
				}
			}
		},
		methods: {
			testSubmit () {
				let fd = new FormData(document.getElementById("form-cont")),
				url = `${this.prefix}/backend/index/uploadimg`;

				this.$http.post(url, fd)
					.then((res) => {
						alert("上传文件成功");
						let data = {
							prevName: ``,
							currName: ``
						};
						data.prevName = res.data.data.prevName;
						data.currName = `${res.data.data.currName}`;
						this.fileUploadSucList.push(data);
					}, (res) => {
						alert("上传文件失败");
					});
			},
			//	上传文件到服务器上
			sendFile () {
				let data = this.fileInfo;
				let d = new Date();
				let url = `http://localhost:8360/backend/index/postfile`;

				data.file_time = d.toLocaleDateString().replace(/\//g, `-`);

				this.$http.post(url, data, { emulateJSON: true })
				.then((res) => {
					if (res.status == 200) {
						alert(`数据提交成功 请在文件列表中查看`);
						this.fileInfo = {
							file_title: "",
							file_url: "",
							file_type: "word",
							type: "赛事报名"
						}
					}
				}, (res) => {
					alert(`上传失败`);
				});
			}
			//	上传文件的数据
		}
	}
</script>
