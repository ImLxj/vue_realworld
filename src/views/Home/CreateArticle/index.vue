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
    <template>
      <div v-for="(count, index) in clickCount" :key="index">
        <Bounced v-if="isLogin" :message="message" />
      </div>
    </template>
  </div>
</template>

<script>
import { reqCreateArticle } from '@/api/axios'
import Bounced from '@/components/Bounced'
export default {
  name: 'CreateArticle',
  components: { Bounced },
  data() {
    return {
      article: { title: '', description: '', body: '', tagList: '' },
      isLogin: false,
      message: '请登录',
      clickCount: 0
    }
  },
  methods: {
    async createArticle() {
      this.rulesTitle()
      this.rulesDescription()
      this.rulesBody()
      const result = await reqCreateArticle(this.article)
      if (result.status === 200) {
        this.article.title = ''
        this.article.description = ''
        this.article.body = ''
        this.article.tagList = ''
        alert('发表文章成功')
        this.$router.push('/home/container')
      }
      // 销毁所有的弹框
      if (!result.data.errors) {
        this.isLogin = false
      }
    },
    // 判断题目是否为空
    rulesTitle() {
      const reg = /\S/
      if (!reg.test(this.article.title)) {
        this.message = '请输入文章题目'
        this.clickCount += 1
        this.isLogin = true
      }
    },
    // 判断摘要是否为空
    rulesDescription() {
      const reg = /\S/
      if (!reg.test(this.article.description)) {
        this.message = '请输入文章摘要'
        this.clickCount += 1
        this.isLogin = true
      }
    },
    // 判断文章内容是否为空
    rulesBody() {
      const reg = /\S/
      if (!reg.test(this.article.body)) {
        this.message = '请输入文章内容'
        this.clickCount += 1
        this.isLogin = true
      }
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
