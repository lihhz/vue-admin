<template>
  <div class="user-role">
    <div class="user panel">
      <div class="panel-title">用户列表</div>
      <div class="panel-body form">
        <FormInput iptLabel="用户名或账号" itemWidth="80%" :inline="true" labelWidth="30%"
                   v-model="queryParam.name"></FormInput>
        <button @click="queryUser" class="btn btn-primary">搜索</button>
        <DataTable :tableData="userList" :tableTitle="userTableTitle" @choose="chooseUserTr"
                   :clearHigh="clearUserHigh"></DataTable>
        <Pagination :pages="pageObj.pages" :total="pageObj.total" :param="queryParam"
                    @pageclik="queryUser"></Pagination>
      </div>
    </div>
    <div class="role panel">
      <div class="panel-title">角色列表</div>
      <div class="panel-body form">
        <DataTable :tableData="roleList" :tableTitle="roleTableTitle" @choose="chooseRoleTr" :clearHigh="clearRoleHigh"
                   checkKey="id" :checkValArr="checkValArr" @checkClick="add">
        </DataTable>
      </div>
    </div>

  </div>
</template>

<script>
  import DataTable from '../../components/DataTable.vue'
  import FormInput from '../../components/form/FormInput.vue'
  import Pagination from '../../components/Pagination.vue'

  export default {
    name: "user-role",
    data: function () {
      return {
        selUser: {
          id: '',
          account: '',
          name: '',
          email: '',
          mobile: '',
          sex: '',
          address: '',
          description: '',
        },

        userTableTitle: {account: '账号', name: '姓名', sex: '性别', email: '电子邮件', mobile: '手机号码'},
        roleTableTitle: {code: '角色编码', name: '角色名称'},

        pageObj: {pages: 0, total: 0},
        queryParam: {pageSize: 10, currentPage: 1, name: '', account: ''},

        userList: [],
        roleList: [],

        clearUserHigh: false,
        clearRoleHigh: false,

        checkValArr: []

      }
    },
    methods: {
      //新增绑定
      add: function (roleObj, isSel) {
        let that = this;
        if (that.selUser.id === '') {
          that.$layer.msg('请选择用户！');
          return;
        }
        if (isSel !== true && isSel !== false) {
          that.$layer.msg('无效状态！');
          return;
        }
        let tip = (isSel ? '添加' : '删除');
        that.$layer.confirm('确定' + tip + '绑定【' + that.selUser.name + '】【' + roleObj.name + '】', {},
          function (index) {
            that.$http.post('/sysUserRole/'+(isSel?'save':'delete'),{userId:that.selUser.id,roleId:roleObj.id}).then(function (ret) {
              if(ret.data.success){
                that.$layer.alert(tip+'成功！');
                that.chooseUserTr(that.selUser);
                that.$layer.close(index);
              }else{
                that.$layer.alert(tip+'失败！失败原因：'+ret.data.message);
              }
            });
          });
      },
      //查询用户信息
      queryUser: function () {
        if (this.queryParam.name === '') {
          this.$layer.msg('请输入用户名或账号！');
          return;
        }
        let that = this;
        this.clearUserHigh = true;
        let keys = Object.keys(this.selUser);
        for (let i = 0, l = keys.length; i < l; i++) {
          that.selUser[keys[i]] = '';
        }
        this.queryParam.account = this.queryParam.name;
        that.$http.post('/sysUser/select', that.queryParam).then(function (val) {
          that.userList = val.data.list;
          that.pageObj.pages = val.data.pages;
          that.pageObj.total = val.data.total;
        }).catch(function (e) {
          that.$layer.msg('发生错误！错误码：' + JSON.stringify(e));
          console.log(e);
        })
      },
      queryRole: function () {
      },

      //选中一行用户记录事件
      chooseUserTr: function (val) {
        if (!val) {
          return;
        }
        let that = this;
        let keys = Object.keys(val);
        for (let i = 0, l = keys.length; i < l; i++) {
          that.selUser[keys[i]] = val[keys[i]];
        }
        that.checkValArr = [];
        that.$http.post('/sysUserRole/selectByUserId', {userId: val.id}).then(function (val) {
          if (val.data.data && val.data.data.length > 0) {
            val.data.data.forEach(function (v) {
              that.checkValArr.push(v.id);
            })
          }
        })

      },
      chooseRoleTr: function () {

      }
    },
    mounted() {
      let that = this;
      that.$http.post('/sysRole/all', null).then(function (val) {
        that.roleList = val.data
      }).catch(function (e) {
        that.$layer.msg('发生错误！');
      })
    },
    components: {
      DataTable,
      FormInput,
      Pagination
    }
  }
</script>

<style scoped>
  .user-role {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .user {
    width: 48%;
  }

  .role {
    width: 48%;
  }

  .panel {
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  }

  .panel > .panel-title {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;

    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

</style>
