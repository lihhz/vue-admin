<template>
  <div class="modal" v-bind:style="{display:isShow}">
    <div class="modal-bg" v-bind:style="{display:isShow}"></div>
    <div class="modal-show" v-bind:style="{display:isShow,height:option.height}">
      <div class="modal-header">
        <h3>{{option.title}}</h3>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="modalClose('yes')" class="btn btn-primary">确定</button>
        <button @click="modalClose('no')" class="btn btn-default" style="margin-left: 2rem;">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "modal",
    data() {
      return {}
    },
    props: {
      isShow: {
        type: String,
        default: 'none'
      },
      option:{
        type:Object
      },
    },
    methods: {
      modalClose(action) {
        this.$emit(action);
      }
    }
  }
</script>

<style scoped>
  .modal {
    display: none;
  }

  .modal-bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 888;
    -moz-opacity: 0.3;
    opacity: .30;
    filter: alpha(opacity=30);
  }

  .modal-show {
    display: none;
    position: absolute;
    top: 25%;
    left: 32%;
    width: 33%;
    height: auto;
    /*padding: 8px;*/
    border: 8px solid #E8E9F7;
    background-color: white;
    z-index: 889;
    overflow: auto;
  }

  .modal-header {
    background: #F8F8F8;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
  }

  .modal-content {
    /*margin-top: 1rem;*/
    padding-top: 1rem;
    border-top: 1px solid lightgray;
    /*border-radius: 2px;*/
    text-align: left
  }

  .modal-footer {
    display: flex;
    justify-content: center;
  }

  .modal-footer .modal-footer-btn {
    background-color: #f1f1f1;
    height: 28px;
    line-height: 28px;
    margin: 6px 6px 0;
    padding: 0 15px;
    border: 1px solid #dedede;

    color: #333;
    border-radius: 2px;
    font-weight: 400;
    cursor: pointer;
    text-decoration: none;
  }

  .modal-footer .modal-footer-yes {
    margin-left: 2rem;
    border-color: #4898d5;
    background-color: #2e8ded;
    color: #fff;
  }

  .modal-footer .modal-footer-no {
    margin-left: 2rem;
  }
</style>
