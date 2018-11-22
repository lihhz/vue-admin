<template>
  <div style="width: 100%;">
    <span>共 <span>{{pages}}</span> 页</span>
    <select  v-model="param.pageSize" class="page-size" @change="pageSizeChange">
      <option value="10">10条/页</option>
      <option value="20">20条/页</option>
      <option value="100">100条/页</option>
    </select>
    <ul class="pager">
      <template v-if="startPage !== endPage">
        <li style="margin-right: -5px" v-if="pageArr[0] !== 1" @click="changeTool(-1)">
          <a href="javascript:void(0)"><<</a>
        </li>
        <li v-for="n in pageArr" v-bind:class="{active: n === param.currentPage }">
          <a href="javascript:void(0)" @click="liClick(n)">{{n}}</a>
        </li>
        <li style="margin-left: -5px" v-if="pageArr[pageArr.length-1] !== pages">
          <a href="javascript:void(0)" @click="changeTool(1)">>></a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    data() {
      return {
        pageArr: []
      }
    },
    props: {
      pages: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      },
      param: Object
    },
    watch : {
      pages : {
        handler (newVal,oldVal) {
          this.updatePageArr();
        },
        deep:true
      }
    },
    methods: {
      pageSizeChange(){
        this.$emit('pageclik')
      },
      liClick(n){
        this.param.currentPage=n;
        this.$emit('pageclik')
        // this.$emit('pageclik',n)
      },
      changeTool(flag) {
        this.updatePageArr(flag);
      },
      endPage(flag) {
        if (!this.pages || this.pages < 1) {
          return 0;
        }
        if (!flag) {
          let cPage = this.param.currentPage, v = cPage % 10, tempInt = parseInt(cPage / 10);
          return v === 0 ? cPage : (tempInt * 10 > this.pages) ? this.pages : tempInt === 0 ? 10 : tempInt * 10;
        } else {
          if (flag === 1) {
            let tempArr = this.pageArr;
            return (tempArr[tempArr.length - 1] + 10) > this.pages ? this.pages : (tempArr[tempArr.length - 1] + 10);
          } else {
            return this.pageArr[this.pageArr.length - 1] === this.pages ? this.pages - v : this.pageArr[this.pageArr.length - 1] - 10;
          }
        }
      },
      startPage(flag) {
        if (!this.pages || this.pages < 1) {
          return 0;
        }
        if (!flag) {
          let cPage = this.param.currentPage, v = cPage % 10, tempInt = parseInt(cPage / 10);
          return v === 0 ? (cPage - 9) : tempInt === 0 ? 1 : tempInt * 10 + 1;
        } else {
          return flag === 1 ? this.pageArr[0] + 10 : this.pageArr[0] - 10;
        }
      },
      updatePageArr(flag) {
        let startPage = this.startPage(flag), endPage = this.endPage(flag), ret = [];
        if (startPage === endPage) {
          return;
        }
        for (let i = startPage; i <= endPage; i++) {
          ret.push(i);
        }
        this.pageArr = ret;
      }
    },
    // mounted() {
    //   this.updatePageArr();
    // },
    computed: {
      // pageArr : {
      //   get : function () {
      //     let startPage = this.startPage(), endPage = this.endPage(), ret = [];
      //     if (startPage === endPage) {
      //       return ret;
      //     }
      //     for (let i = startPage; i < endPage; i++) {
      //       ret.push(i);
      //     }
      //     return ret;
      //   },
      //   set : function (newVal) {
      //     console.log('newVal',newVal);
      //     // this.pageArr = newVal;
      //   }
      // },
      // pageArr()
      // {
      //   let startPage = this.startPage(), endPage = this.endPage(), ret = [];
      //   if (startPage === endPage) {
      //     return ret;
      //   }
      //   for (let i = startPage; i < endPage; i++) {
      //     ret.push(i);
      //   }
      //   return ret;
      // }
    }
  }
</script>

<style scoped>
  .page-size{
    border: 1px solid lightgray;
    border-radius: 2px;
    height: 30px;
  }
  .pager {
    display: inline-block;
    width: 500px;
  }

  .pager > li {
    list-style: none;
    display: inline-block;
    width: 40px;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-left: 1px solid lightgray;
    margin: 0;
    padding: 0;
    color: lightblue;
  }

  .pager > li > a {
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: block;
  }

  .pager > li.active {
    border-color: blue;
    background-color: blue;
  }

  .pager > li.active > a {
    color: white;
  }

  .pager > li:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .pager > li:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right: 1px solid lightgray;
  }
</style>
