<template>
  <div class="pagebar">
    <div class="pagebar-desc">
      <span>共 <span>{{pages}}</span> 页</span>
      <select v-model="param.pageSize" class="page-size" @change="pageSizeChange($event,$event.target.value)">
        <option value="10">10条/页</option>
        <option value="20">20条/页</option>
        <option value="100">100条/页</option>
      </select>
    </div>
    <ul class="pager">
      <template v-if="startPage !== endPage">
        <li style="margin-right: -5px" v-if="!pageArr && pageArr[0] !== 1" @click="changeTool(-1)">
          <a href="javascript:void(0)">&lt;&lt;</a>
        </li>
        <li v-for="n in pageArr" v-bind:class="{active: n === param.currentPage }">
          <a href="javascript:void(0)" @click="liClick(n)">{{n}}</a>
        </li>
        <li style="margin-left: -5px" v-if="!pageArr && pageArr[pageArr.length-1] !== pages">
          <a href="javascript:void(0)" @click="changeTool(1)">&gt;&gt;</a>
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
    watch: {
      pages: {
        handler(newVal, oldVal) {
          this.updatePageArr();
        },
        deep: true
      }
    },
    methods: {
      pageSizeChange(ev,pageSize) {
        this.$emit('pageclik',ev,pageSize)
      },
      liClick(n) {
        this.param.currentPage = n;
        this.$emit('pageclik')
        // this.$emit('pageclik',n)
      },
      changeTool(flag) {
        this.updatePageArr(flag);
      },
      //1-10这样翻页
      //updatePageArr传递过来的flag
      endPage(flag) {
        if (!this.pages || this.pages < 1) {
          return 0;
        }
        if (!flag) {
          //m：是否剩余一页
          let cPage = this.param.currentPage, m = cPage % 10, tempInt = parseInt(cPage / 10);
          return m === 0 ? cPage : (tempInt * 10 > this.pages) ? this.pages : tempInt === 0 ? this.pages : tempInt * 10;
        } else {
          if (flag === 1) {
            let tempArr = this.pageArr;
            return (tempArr[tempArr.length - 1] + 10) > this.pages ? this.pages : (tempArr[tempArr.length - 1] + 10);
          } else {
            return this.pageArr[this.pageArr.length - 1] === this.pages ? this.pages - (this.param.currentPage % 10) : this.pageArr[this.pageArr.length - 1] - 10;
          }
        }
      },
      //updatePageArr传递过来的flag
      startPage(flag) {
        if (!this.pages || this.pages < 1) {
          return 0;
        }
        if (!flag) {
          let cPage = this.param.currentPage, m = cPage % 10, tempInt = parseInt(cPage / 10);
          return m === 0 ? (cPage - 9) : tempInt === 0 ? 1 : tempInt * 10 + 1;
        } else {
          return flag === 1 ? this.pageArr[0] + 10 : this.pageArr[0] - 10;
        }
      },
      updatePageArr(flag) {
        let startPage = this.startPage(flag), endPage = this.endPage(flag), ret = [];
        if (startPage === endPage) {
          this.pageArr = [1];
          return;
        }
        for (let i = startPage; i <= endPage; i++) {
          ret.push(i);
        }
        this.pageArr = ret;
      }
    },
    computed: {
    }
  }
</script>

<style scoped>
  .pagebar {
    width: 98%;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
  .pagebar > .pagebar-desc{

  }

  .page-size {
    border: 1px solid lightgray;
    border-radius: 2px;
    width: 6rem;
    height: 2.4rem;
    line-height: 2.4rem;
  }

  .pager {
    display: inline-block;
    margin-left: 3rem;
  }

  .pager > li {
    list-style: none;
    display: inline-block;
    width: 3rem;
    height: 2.4rem;
    line-height: 2.4rem;
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
