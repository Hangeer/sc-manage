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
.file-info {
	margin-bottom: 30px;
}
</style>

<template>
	<section class="album">
		<p class="bg-info title">图片管理界面</p>
		<!-- 图片管理界面 title -->

		<table class="table table-striped">
			<thead>
				<tr>
					<th> 图片 ID </th>
					<th> 所属图库 ID </th>
					<th> 名称 </th>
					<th> 点赞数 </th>
					<th> 地址 </th>
					<th> 操作 </th>
				</tr>
			</thead>
			<tbody v-for="item in imgList">
				<tr>
					<th scope="row"> {{item.id}} </th>
					<td>
						<input type="text" 
								class="form-control" 
								placeholder="图库 ID" 
								v-model="item.album_id">
					</td>
					<td>
						<input type="text" 
								class="form-control" 
								placeholder="名称" 
								v-model="item.pic_name">
					</td>
					<td>{{item.pic_likes}}</td>
					<td>
						<input type="text" 
								class="form-control" 
								placeholder="封面链接" 
								v-model="item.pic_url">
					</td>
					<td>
						<button type="button" 
								class="btn btn-danger right" 
								@click="deleteSingle(item.id)">
							删除
						</button>
						<button type="button" 
								class="btn btn-info right" 
								@click="updateSingle(item)">
							更新
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 图片列表 -->

		<div class="wrapper">
			<nav>
				<ul class="pager">
					<li class="previous" 
						@click="prevPage">
						<span aria-hidden="true"> &larr; 上一页 </span>
					</li>
					<li class="next" 
						@click="nextPage">
						<span aria-hidden="true">下一页 &rarr; </span>
					</li>
				</ul>
				<div class="current-page">
					<span>当前第</span>
					<input type="text" 
							class="form-control page-container" 
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
		<!-- 图片列表分页器 -->

		<div class="new-image">
			<p class="bg-success title">上传新的图片</p>

			<div class="input-group">
				<span class="input-group-addon">相册 ID</span>
				<input type="text" 
						class="form-control" 
						v-model="imgInfo.album_id">
			</div>

			<div class="input-group">
				<span class="input-group-addon">照片名称</span>
				<input type="text" 
						class="form-control" 
						v-model="imgInfo.pic_name">
			</div>

			<form enctype="multipart/form-data" 
					method="post" 
					id="form-cont" 
					style="overflow: hidden">
				<input type="file" 
						class="btn btn-warning" 
						id = "image"
						name="image" 
						style="margin: 10px 0;float: left" 
						@change="showFileInfo"/>
				<button type="button" 
						class="btn btn-info" 
						style="margin: 10px 10px;float: left" 
						@click="testSubmit">
					点击上传图片
				</button>
			</form>
			
			<div class="file-info">
				<p>
					<span>文件大小: {{fileInfo.size}}</span>
				</p>
				<p>
					<span>文件类型: {{fileInfo.type}}</span>
				</p>
			</div>

			<div class="input-group">
				<p>提示：若需要上传本地图片，请点击选择文件，上传成功会返回 url ，再将 url 填写</p>
				<p>已上传的图片列表</p>

				<table class="table table-striped">
					<thead>
						<tr>
							<th>图片本地名称</th>
							<th>照片 url (在需要填写 url 的地方填这个)</th>
						</tr>
					</thead>
					<tbody v-for="item in imgUploadSucList">
						<tr>
							<td>{{item.prevName}}</td>
							<td style="background-color: #fff">{{item.currName}}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="input-group">
				<span class="input-group-addon">照片链接</span>
				<input type="text" 
						class="form-control" 
						v-model="imgInfo.pic_url">
			</div>

			<button type="button" 
					class="btn btn-warning right" 
					@click="sendImg">
				提交新的图片
			</button>
		</div>
		<!-- 提交新的图片 -->

	</section>
</template>

<script>
export default {
	ready () {
		this.$options.methods.getImgList.bind(this)();
	},
	data () {
		return {
			currentPage: 1,
			totalPage: 1,
			imgList: [],
			imgUploadSucList: [],
			imgInfo: {
				albumId: "",
				pic_name: "",
				pic_url: ""
			},
			fileInfo: {
				name: '',
				type: ''
			}
		}
	},
	methods: {
		getImgList () {
			let data = { currentPage: this.currentPage },
			url = `http://localhost:8360/backend/index/getpic`;

			this.$http.post(url, data, { emulateJSON: true })
			.then((res) => {
				this.imgList = res.data.data.data;
				this.totalPage = res.data.data.totalPages;
			}, (res) => {
				alert("获取图片列表信息失败");
			});
		},
		deleteSingle (pic_id) {
			let data = { id: pic_id },
			url = `http://localhost:8360/backend/index/deletesingleimg`;

			this.$http.post(url, data, { emulateJSON: true })
			.then((res) => {
				// console.log(`删除单条信息成功`);
				this.$options.methods.getImgList.bind(this)();
			}, (res) => {
				alert(`删除单条信息失败`);
			});
		},
		updateSingle (item) {
			let data = {
				id: item.id,
				album_id: item.album_id,
				pic_name: item.pic_name,
				pic_url: item.pic_url
			};
			let url = `http://localhost:8360/backend/index/updatesingleimg`;

			if (data.album_id && data.pic_name && data.pic_url) {
				this.$http.post(url, data, { emulateJSON: true })
				.then((res) => {
					alert(`更新单条数据成功`);
					this.$options.methods.getImgList.bind(this)();
				}, (res) => {
					alert(`更新单条数据失败`);
				});
			} else {
				alert(`失败 原因可能是信息没有填写完整`);
			}
		},
		testSubmit () {
			let fd = new FormData(document.getElementById("form-cont")),
				url = `http://localhost:8360/backend/index/uploadimg`;

			this.$http.post(url, fd)
			.then((res) => {
				console.log(`上传图片成功`);
				let data = {
					prevName: ``,
					currName: ``
				};
				data.prevName = res.data.data.prevName;
				data.currName = res.data.data.currName;
				this.imgUploadSucList.push(data);
			}, (res) => {
				alert(`上传图片失败`);
			});
		},
		sendImg () {
			let data = this.imgInfo;
			let url = `http://localhost:8360/backend/index/postpic`;

			this.$http.post(url, data, { emulateJSON: true })
			.then((res) => {
				if (res.status == 200) {
					this.$options.methods.getImgList.bind(this)();
					if (!!res.data.data) {
							alert(`数据提交成功`);
							this.imgInfo = {
								albumId: "",
								pic_name: "",
								pic_url: ""
							};
					} else {
						alert("提交数据失败 原因可能是没有填写正确的相册 id");
					}
				}
			}, (res) => {
				alert(`上传失败`);
			});
		},
		showFileInfo () {
			let file = document.querySelector('#image');
			this.fileInfo = {
				size: ~~file.files[0].size/1000 + ' KB',
				type: file.files[0].type
			}

		},
		prevPage () {
			if (this.currentPage == 1) {
				alert("已经是第一页");
			} else {
				this.currentPage--;
				this.$options.methods.getImgList.bind(this)();          
			}
		},
		nextPage () {      
			if (this.currentPage == this.totalPage) {
				alert("已经是最后一页");
			} else {
				this.currentPage++;
				this.$options.methods.getImgList.bind(this)();
			}
		},
		gotoPage () {      
			this.currentPage >=1 && this.currentPage <= this.totalPage 
			? this.$options.methods.getImgList.bind(this)() 
			: alert("无效的页数");
		}
	}
}
</script>
