<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="auth-center col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center title">注册</h1>
          <p class="text-xs-center">
            <router-link to="/home/login">Have an account?</router-link>
          </p>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                autocomplete
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/user-style.css'
export default {
  name: 'Register'
}
</script>
<style lang="less" scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1,
p {
  text-align: center;
}

p a {
  color: #5cb85c;
}

p a:hover {
  color: green;
}

input {
  height: 55px !important;
  box-shadow: none !important;
  margin-top: 10px;
}

.btn {
  background: #5cb85c;
  border: none;
  float: right;
}

.btn:hover {
  background: green;
}
</style>
