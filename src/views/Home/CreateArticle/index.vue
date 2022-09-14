<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row editor-content">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <h1 class="text-xs-center">创建文章</h1>
          <el-form
            :model="article"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="文章描述" prop="description">
              <el-input v-model="article.description"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="body">
              <textarea
                class="form-control"
                rows="3"
                v-model="article.body"
                cols=""
              ></textarea>
            </el-form-item>
            <el-form-item label="文章标签" prop="tagList">
              <el-input v-model="article.tagList"></el-input>
            </el-form-item>
            <el-form-item
              style="
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
              "
            >
              <el-button type="success" @click="submitForm('ruleForm')"
                >立即创建</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
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
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
        body: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        tagList: [{ required: false, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await reqCreateArticle(this.article)
          if (res.status === 200) {
            this.$router.push('/')
            return this.$message({
              message: '创建成功',
              type: 'success'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
