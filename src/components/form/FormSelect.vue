<template>
  <div class="form-item"
       :style="{width:/[0-9]{0,3}%/.test(itemWidth)?itemWidth:(itemWidth+'rem'),display:(inline?'inline-block':'block')}">
    <label class="form-item-label" style="width:80px;">{{iptLabel}}</label>
    <div class="form-item-content" style="margin-left:80px;">
      <div class="input-wrapper">
        <select>
          <option v-for="(val,key) in optionArr" :value="val.key" :key="val.key">
            {{val.value}}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "form-select",
    props: {
      iptLabel: String,
      itemWidth: String,
      inline: Boolean,
      value: String,
      optionArr: Array
    },
    // model: {
    //   prop: 'value',
    //   event: 'test'
    // },
    methods: {},
  }
</script>

<style scoped>

</style>
