<template>
  <div id="login">
    <div class="be-content pren">

      <div class="ioc_text">
        <img src="i/login/logo.png" alt="">
        <span>请登录您的用户</span>
      </div>

      <div>
        <form action="">
          <div class="br-content">

            <div class="input-group mb-4 bootint">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-user"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Username">
            </div>

            <div class="input-group mb-4 bootint">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-unlock-alt"></i></span>
              </div>
              <input type="password" class="form-control" placeholder="Your Password">
            </div>

            <div class="br-text">
              <p>
                <span>忘记密码?</span>
                <a href="">找回</a>
              </p>
            </div>
            <div style="padding-top: 10px">
              <input type="button" class="btn" value="登录">
            </div>
            <div class="be-con">
              <span>Copyright © 2018 - 2019 <a href="">系统登陆</a></span>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "login"
  }
</script>

<style scoped>

</style>
