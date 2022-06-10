<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row setting-center">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">修改信息</h1>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-text"
                  type="text"
                  placeholder="头像的路径"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-text form-control-lg"
                  type="text"
                  placeholder="用户名"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="简短的个人简介"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-text form-control-lg"
                  type="text"
                  placeholder="邮箱"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-text form-control-lg"
                  type="password"
                  placeholder="密码"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                确定修改
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting'
}
</script>

<style lang="less" scoped>
// 我的信息设置
.settings-page {
  .page {
    margin-bottom: 20px;

    .setting-center {
      display: flex;
      justify-content: center;
      align-items: center;

      h1 {
        color: #5cb85c;
        text-align: center;
        padding: 5px 0 5px 0;
        margin-bottom: 17px;
      }

      .form-control {
        outline: none;
        box-shadow: none;
      }

      .form-text {
        height: 50px;
      }

      textarea {
        resize: none; // 禁止拖拽大小
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
