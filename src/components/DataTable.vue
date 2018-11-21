<template>
  <div class="data-content">
    <span class="table-caption">用户列表</span>
    <div class="data-table-content">
      <table>
        <thead>
        <tr>
          <th v-for="(val,key) in tableTitle" :key="key">
            {{val}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="obj in tableData" @click="_cos(obj,$event)">
          <td v-for="(val,key) in tableTitle" :key="key">
            {{obj[key]}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "data-table-content",
    props: {
      // clearChoose: {
      //   type: Boolean,
      //   require: true
      // },
      tableData: {
        type: Array,
        require: false
      },
      tableTitle: {
        type: Object,
        require: true
      }
    },
    methods: {
      _cos(obj, ev) {
        let target = ev.srcElement || ev.target;
        if (target.tagName.toLowerCase() === 'td') {
          target = target.parentElement;
        }
        let trs = Array.from(target.parentElement.children);
        trs.forEach(function (val) {
          val.style.background = 'transparent';
        });
        target.style.background = 'yellow';
        this.$emit('choose', obj);
      }
    },

    // watch:{
    //   clearChoose:function (newVal,oldVal) {
    //     if(newVal === true){
    //
    //     }
    //   }
    // }
  }
</script>

<style scoped>
  .data-content {
    display: flex;
    flex-direction: column;
    width: 90%;
  }

  .table-caption {
    text-align: center;
    color: black;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
    padding: 0.8rem 0;
  }

  .data-table-content {
    display: flex;
    justify-content: center;
  }

  .data-table-content > table {
    width: 100%;
    border: 1px solid #ddd;
  }

  /*.data-table-content > table > thead > tr , .data-table-content > tbody > tr, .data-table-content > table > tfoot > tr {*/
  /*height:0.8rem;*/
  /*}*/

  tr {
    height: 0.8rem;
  }

  .data-table-content > table > thead > tr > th, .data-table-content > tbody > tr > th, .data-table-content > table > tfoot > tr > th, .data-table-content > table > thead > tr > td, .data-table-content > table > tbody > tr > td, .data-table-content > table > tfoot > tr > td {
    border: 1px solid #ddd;
    padding: 8px;
    word-break: break-all;
  }

  .data-table-content > table > tbody > tr > td {
    text-align: left;
    cursor: pointer;
  }
</style>
