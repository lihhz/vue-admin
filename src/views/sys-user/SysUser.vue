<template>
  <div class="sys-user">
    <Toolbar>
      <button @click="initTable">查询</button>
      <button @click="add(false)">新增</button>
      <button @click="add(true)">修改</button>
      <button @click="del">删除</button>
    </Toolbar>
    <!--:clearChoose="clearChooseTr"-->
    <DataTable :tableData="userList" :tableTitle="tableTitle" @choose="chooseTr">
    </DataTable>
    <Pagination :pages="pageObj.pages" :total="pageObj.total" :param="{pageSize:15}" :pageclik="initTable"></Pagination>
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
      Modal,Pagination
    },
    data() {
      return {
        // clearChooseTr:false,
        pageObj : {pages:0,total:0},

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
      initTable() {
        let that = this;
        that.$http.post('/sysUser/select', {
          currentPage: 0,
          pageSize: 15
        }).then(function (val) {
          that.userList = val.data.list;
          that.pageObj.pages = val.data.pages;
        })
      },

      chooseTr(val) {
        //深拷贝，以防止原始数据被更改
        for(let key in val){
          if(val.hasOwnProperty(key)){
            this.sysUser[key] = val[key];
          }
        }
      },

      add(isUpd) {
        if(!isUpd){
          for (let key in this.sysUser) {
            if (this.sysUser.hasOwnProperty(key)) {
              this.sysUser[key] = '';
            }
          }
        }else{
          if(this.sysUser.id===''){
            this.$layer.alert('请选择要修改的记录！');
            return;
          }
        }
        this.addShow = 'block';
      },

      addModalYes() {
        if (!/[a-zA-Z0-9]{3,10}/.test(this.sysUser.account)) {
          this.$layer.msg('账号必须由3~10位字母数字组成！');
          return;
        }
        if(this.sysUser.mobile!=='' && !/1[0-9]{10}/.test(this.sysUser.mobile)){
          this.$layer.msg('手机号码格式不正确！');
          return;
        }
        if(this.sysUser.email!=='' && !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.sysUser.email)){
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

      whenClose(){
        // this.clearChooseTr = true;
        this.addShow = 'none';
      },


      del() {
        this.$layer.alert('删除');
      }
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
