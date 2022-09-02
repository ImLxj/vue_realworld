<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row editor-content">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <h1 class="text-xs-center">创建文章</h1>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="文章标题"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="这篇文章是关于什么的?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="把你的文章写下下来"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="输入标签,各个标签之间用逗号隔开"
                  v-model="article.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="createArticle"
              >
                发表文章
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCreateArticle } from '@/api/axios'
export default {
  name: 'CreateArticle',
  data() {
    return {
      article: { title: '', description: '', body: '', tagList: '' },
    }
  },
  methods: {
    createArticle() {
      this.$message({
        message: '确定',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.editor-page {
  margin-bottom: 20px;
  .page {
    .editor-content {
      display: flex;
      justify-content: center;
      align-items: center;
      h1 {
        text-align: center;
        color: #5cb85c;
        margin-bottom: 20px;
      }
      input {
        outline: none;
        box-shadow: none;
        height: 50px;
      }
      textarea {
        resize: none; // 禁止拖拽大小
        outline: none;
        box-shadow: none;
      }
      .btn {
        float: right;
        background-color: #5cb85c;
        border: none;
        outline: none;
      }

      .btn:hover {
        background-color: green;
      }

      .btn::after {
        clear: both;
      }
    }
  }
}
</style>
