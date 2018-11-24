<template>
  <div class="sys-user">
    <Toolbar>
      <button @click="initTable">查询</button>
      <button @click="add(false)">新增</button>
      <button @click="add(true)">修改</button>
      <button @click="del">删除</button>
    </Toolbar>
    <!--:clearChoose="clearChooseTr"-->
    <DataTable :tableData="roleList" :tableTitle="tableTitle" @choose="chooseTr" :clearHigh="clearHigh" tableCaption="角色列表">
    </DataTable>
    <Pagination :pages="pageObj.pages" :total="pageObj.total" :param="queryParam" @pageclik="initTable"></Pagination>
    <Modal :isShow="addShow" :option='{title:"新增角色",height:"20rem"}' @yes="addModalYes"
           @no="addModalNo">
      <form class="form">
        <FormInput iptLabel="编码" itemWidth="48%" :inline="true" v-model="sysRole.code"></FormInput>
        <FormInput iptLabel="名称" itemWidth="48%" :inline="true" v-model="sysRole.name"></FormInput>
        <FormInput iptLabel="描述" itemWidth="98%" :inline="true" v-model="sysRole.description"></FormInput>
      </form>
    </Modal>
  </div>
</template>

<script>
  import DataTable from '../../components/DataTable.vue'
  import FormInput from '../../components/form/FormInput.vue'
  import Toolbar from '../../components/Toolbar.vue'
  import FormSelect from '../../components/form/FormSelect.vue'
  import Modal from '../../components/Modal.vue'
  import Pagination from '../../components/Pagination.vue'

  export default {
    name: "SysRole",
    components: {
      DataTable,
      Toolbar,
      FormInput,
      FormSelect,
      Modal, Pagination
    },
    data() {
      return {
        clearHigh:false,

        // clearChooseTr:false,
        pageObj: {pages: 0, total: 0},
        queryParam: {pageSize: 10, currentPage: 1},

        tableTitle: {code: '编码', name: '名称', description: '描述'},
        roleList: [{}],

        addShow: 'none',
        sysRole: {
          id: '',
          code: '',
          name: '',
          description: '',
        },
      }
    },
    methods: {
      initTable(ev, pageSize) {
        this.clearHigh = true;
        if (pageSize) {
          this.queryParam.pageSize = pageSize;
        }
        console.log('pageSize', this.queryParam.pageSize);
        let that = this;
        that.$http.post('/sysRole/select', that.queryParam).then(function (val) {
          that.roleList = val.data.list;
          that.pageObj.pages = val.data.pages;
          that.pageObj.total = val.data.total;
        }).catch(function (e) {
          that.$layer.msg('发生错误！错误码：' + e.response.status);
          console.log(e);
        })
      },

      chooseTr(val) {
        //归位
        if(!val){
          this.clearHigh = false;
          for (let key in this.sysRole) {
            if (val.hasOwnProperty(key)) {
              this.sysRole[key] = '';
            }
          }
          return;
        }
        //深拷贝，以防止原始数据被更改
        for (let key in val) {
          if (val.hasOwnProperty(key)) {
            this.sysRole[key] = val[key];
          }
        }
      },

      add(isUpd) {
        if (!isUpd) {
          for (let key in this.sysRole) {
            if (this.sysRole.hasOwnProperty(key)) {
              this.sysRole[key] = '';
            }
          }
        } else {
          if (this.sysRole.id === '') {
            this.$layer.alert('请选择要修改的记录！');
            return;
          }
        }
        this.addShow = 'block';
      },
      del() {
        let layer = this.$layer, that = this;
        if (this.sysRole.id === '') {
          layer.msg('请选择要修改的记录！');
          return;
        }

        let index = layer.open({
          type: 0, title: '删除角色',
          content: '确定删除角色【' + this.sysRole.code + '】？',
          icon: -1,
          btn: '确定',
          time: 0,
          shade: true,//是否显示遮罩
          yes: function () {
            that.$http.post('/sysRole/del', that.sysRole).then(function (val) {
              if (val.data.success) {
                layer.msg('删除成功！');
                that.initTable();
                layer.close(index);
              } else {
                layer.alert('删除失败！失败原因：' + val.data.message);
              }
            })
          },
          cancel: function () {
            layer.close(index);
          },
        });
        // this.$layer.confirm('确定删除角色【' + this.sysRole.code + '】？', {
        //   yes:function () {
        //     alert(1);
        //   },
        //   no:function () {
        //     alert(2);
        //   }
        // });
      },

      addModalYes() {
        if (!/[a-zA-Z0-9]{3,10}/.test(this.sysRole.code)) {
          this.$layer.msg('编码必须由3~10位字母数字组成！');
          return;
        }
        let that = this;
        that.$http.post('/sysRole/save', that.sysRole).then(function (res) {
          let state = res.data;
          if (!state.success) {
            that.$layer.alert(state.message);
            return;
          }
          that.$layer.msg('保存成功！');
          that.whenClose();
          that.initTable();
        });
      },
      addModalNo() {
        this.whenClose();
      },

      whenClose() {
        // this.clearChooseTr = true;
        this.addShow = 'none';
      },
    },

    //生命周期
    mounted() {
      this.initTable();
    }
  }
</script>

<style scoped>
  .sys-user {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .add-user input {
    display: inline-block;
    width: 100%;
    height: 1rem;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 1rem;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
  }
</style>
