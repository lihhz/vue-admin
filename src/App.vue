<template>
  <div id="app">
    <header class="header">
      <span class="title">用户管理系统</span>
    </header>
    <article class="content" :style="{height:dynamicHeight}">
      <aside>
        <nav>
          <ul>
            <li class="menu-title"><span>系统管理</span></li>
            <ul class="menu-item">
              <router-link tag="li" to="/sysUser">用户管理</router-link>
              <router-link tag="li" to="/sysRole">角色管理</router-link>
              <router-link tag="li" to="/userRole">用户角色管理</router-link>
            </ul>
          </ul>
        </nav>
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        dynamicHeight:'30px'
      }
    },
    mounted(){
      let h = window.innerHeight;
      this.dynamicHeight = (h-80)+"px";
    }
  }
</script>

<style>
  @import "./assets/css/reset.css";
  /*@import "@/assets/css/reset.css";*/
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .header {
    width: 100%;
    background-image: url("./assets/img/bg.png");
    background-size: 100%;
    height: 6rem;

    display: flex;
    justify-content: space-between;
  }

  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .content > main {
    padding: 1rem 1rem;
  }

  .content > aside {
    width: 14%;
    background-color: #85bfeb;
  }

  .content > aside > nav li {
    list-style: none;
    color: white;
  }

  .menu-title {
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }

  .menu-item > li {
    text-align: left;
    padding-left: 1.2rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.4rem;
    cursor: pointer;
  }

  .menu-item > li:before {
    content: '·';
    color: #ffffff;
    margin-right: 1rem;
  }

  .content > main {
    flex: 1;
  }

  .title {
    margin-left: 2rem;
    text-shadow:5px 2px 6px #000;
    font-size: 2rem;
    height: 30%;
    color: white;
    align-self: center;
  }

  .h2 {
    font-size: 2rem;
  }

  th {
    text-align: center;
    font-weight: bold;
  }

  /*****form*******/
  .form-item {
    margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
  }

  form-item:after, form-item:before {
    content: "";
    display: table;
  }

  .form .form-item-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #515a6e;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
  }
  .form-item-content {
    position: relative;
    line-height: 32px;
    font-size: 12px;
  }
  .input-wrapper {
    display: inline-block;
    width: 100%;
    position: relative;
    vertical-align: middle;
    line-height: normal;
  }

  .input-wrapper > input,.input-wrapper > select {
    outline: none;
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
  }


  .router-link-active{
    color:yellow;
  }

  /*按钮*/
  .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  .btn-default {
    color: #333;
    background-color: #fff;
    border-color: #ccc;
  }
  .btn-primary {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }
</style>
