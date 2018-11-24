<template>
  <div class="data-content">
    <span v-if="tableCaption && tableCaption !== ''" class="table-caption">{{ tableCaption}}</span>
    <div class="data-table-content">
      <table>
        <thead>
        <tr>
          <th v-if="!!checkKey">请选择</th>
          <th v-for="(val,key) in tableTitle" :key="key">
            {{val}}
          </th>
        </tr>
        </thead>
        <tbody ref="mybox">
        <tr v-for="obj in tableData" @click="_cos(obj,$event)">
          <td v-if="!!checkKey" style="text-align: center">
            <input type="checkbox" v-model='checkValArr.indexOf(obj[checkKey]) > -1' @click.stop="checkClick($event,obj)"/>
          </td>
          <!--<td v-if="!!trCheck">-->
          <!--<input type="checkbox" v-model='!!trCheck.valArr && trCheck.valArr.indexOf(obj[trCheck.key]) > -1'/>-->
          <!--</td>-->
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
      //关于多选框的事件
      checkKey: String,
      checkValArr:Array,

      //table标题
      tableCaption: String,

      //清除高亮
      clearHigh: Boolean,

      //表格数据
      tableData: {
        type: Array,
        require: false
      },

      //表头
      tableTitle: {
        type: Object,
        require: true
      }
    },
    methods: {

      //行选中事件
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
      },

      //checkbox点击事件
      checkClick(ev,roleObj){
        this.$emit('checkClick',roleObj,ev.target.checked);
      }
    },

    watch: {
      //清除行选中事件
      clearHigh: function (newVal, oldVal) {
        if (newVal === true) {
          let trs = Array.from(this.$refs.mybox.children);
          trs.forEach(function (val) {
            val.style.background = 'transparent';
          });
          this.$emit('choose', null);
        }
      }
    }
  }
</script>

<style scoped>
  .data-content {
    display: flex;
    flex-direction: column;
    width: 98%;
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
