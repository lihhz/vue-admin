<template>
  <div class="sys-user">
    <Toolbar>
      <button @click="initTable">查询</button>
      <button @click="add(false)">新增</button>
      <button @click="add(true)">修改</button>
      <button @click="del">删除</button>
    </Toolbar>
    <!--:clearChoose="clearChooseTr"-->
    <DataTable :tableData="userList" :tableTitle="tableTitle" @choose="chooseTr" :clearHigh="clearHigh" tableCaption="用户列表">
    </DataTable>
    <Pagination :pages="pageObj.pages" :total="pageObj.total" :param="queryParam" @pageclik="initTable"></Pagination>
    <Modal :isShow="addShow" :option='{title:"新增用户",height:"28rem"}' @yes="addModalYes"
           @no="addModalNo">
      <form class="form">
        <FormInput iptLabel="账号" itemWidth="48%" :inline="true" v-model="sysUser.account"></FormInput>
        <FormInput iptLabel="姓名" itemWidth="48%" :inline="true" v-model="sysUser.name"></FormInput>
        <FormSelect iptLabel="性别" itemWidth="48%" :inline="true" v-model="sysUser.sex"
                    :optionArr="[{key:'0',value:'女'},{key:'1',value:'男'}]"></FormSelect>
        <FormInput iptLabel="email" itemWidth="48%" :inline="true" v-model="sysUser.email"></FormInput>
        <FormInput iptLabel="手机号码" itemWidth="48%" :inline="true" v-model="sysUser.mobile"></FormInput>
        <FormInput iptLabel="家庭地址" itemWidth="48%" :inline="true" v-model="sysUser.address"></FormInput>
        <FormInput iptLabel="个人描述" itemWidth="98%" :inline="true" v-model="sysUser.description"></FormInput>
      </form>
    </Modal>
  </div>
</template>

<script>
  import DataTable from '../../components/DataTable.vue'
  import Toolbar from '../../components/Toolbar.vue'
  import FormInput from '../../components/form/FormInput.vue'
  import FormSelect from '../../components/form/FormSelect.vue'
  import Modal from '../../components/Modal.vue'
  import Pagination from '../../components/Pagination.vue'

  export default {
    name: "SysUser",
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

        tableTitle: {account: '账号', name: '姓名', sex: '性别', email: '电子邮件', mobile: '手机号码', address: '地址'},
        userList: [{}],

        addShow: 'none',
        sysUser: {
          id: '',
          account: '',
          name: '',
          email: '',
          mobile: '',
          sex: '',
          address: '',
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
        that.$http.post('/sysUser/select', that.queryParam).then(function (val) {
          that.userList = val.data.list;
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
          for (let key in this.sysUser) {
            if (val.hasOwnProperty(key)) {
              this.sysUser[key] = '';
            }
          }
          return;
        }
        //深拷贝，以防止原始数据被更改
        for (let key in val) {
          if (val.hasOwnProperty(key)) {
            this.sysUser[key] = val[key];
          }
        }
      },

      add(isUpd) {
        if (!isUpd) {
          for (let key in this.sysUser) {
            if (this.sysUser.hasOwnProperty(key)) {
              this.sysUser[key] = '';
            }
          }
        } else {
          if (this.sysUser.id === '') {
            this.$layer.alert('请选择要修改的记录！');
            return;
          }
        }
        this.addShow = 'block';
      },
      del() {
        let layer = this.$layer, that = this;
        if (this.sysUser.id === '') {
          layer.msg('请选择要修改的记录！');
          return;
        }

        let index = layer.open({
          type: 0, title: '删除用户',
          content: '确定删除用户【' + this.sysUser.account + '】？',
          icon: -1,
          btn: '确定',
          time: 0,
          shade: true,//是否显示遮罩
          yes: function () {
            that.$http.post('/sysUser/del', that.sysUser).then(function (val) {
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
        // this.$layer.confirm('确定删除用户【' + this.sysUser.account + '】？', {
        //   yes:function () {
        //     alert(1);
        //   },
        //   no:function () {
        //     alert(2);
        //   }
        // });
      },

      addModalYes() {
        if (!/[a-zA-Z0-9]{3,10}/.test(this.sysUser.account)) {
          this.$layer.msg('账号必须由3~10位字母数字组成！');
          return;
        }
        if (this.sysUser.mobile !== '' && !/1[0-9]{10}/.test(this.sysUser.mobile)) {
          this.$layer.msg('手机号码格式不正确！');
          return;
        }
        if (this.sysUser.email !== '' && !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.sysUser.email)) {
          this.$layer.msg('电子邮件格式不正确！');
          return;
        }
        let that = this;
        that.$http.post('/sysUser/save', that.sysUser).then(function (res) {
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

  /*.add-user  input {*/
  /*border: 0.1rem solid lightgray;*/
  /*border-radius: 0.2rem;*/
  /*outline: none;*/
  /*}*/
</style>
