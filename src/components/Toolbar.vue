<template>
    <div class="toolbar">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "toolbar"
    }
</script>

<style scoped>
.toolbar{
  width: 90%;
  height: 1.6rem;
  line-height: 1.6rem;
  background-color: #f5f5f5;
  text-align: left;
  border-radius:0.4rem;
  padding: 0 1rem;
}
  .toolbar >button{
    color: blue;
    border: none;
    font-size: 0.8rem;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }
</style>
