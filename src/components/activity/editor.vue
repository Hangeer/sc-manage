<style scoped>
  .editor {
    padding:5px 10px;
    border: 1px solid #ccc;
    height: 200px;
    overflow: scroll;
  }
</style>

<template>
  <section id="editor-container">
    <h4>文章内容</h4>
    <p class="editor" id="editor" contenteditable="true">
      点击开始写作
      换行自动换加段落
      <br>
      若要添加图片 换行写个 img 标签加入链接
    </p>
    <div class="input-group">
      <span class="input-group-addon">输入链接 点击添加图片</span>
      <input type="text" class="form-control">
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>
