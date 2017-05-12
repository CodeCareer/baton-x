<template lang="pug">
  .account-dialog
    el-dialog(:title="title", v-model="dialogVisible",  @open="onDialogOpen")
      el-form(:model='account', :rules="rules", ref="accountForm", :label-width='formLabelWidth')
        el-form-item(prop="name", label='账户名称：')
          el-input(v-model='account.name', auto-complete='off', placeholder='请输入账户名')
        el-form-item(prop="email", label='账户邮箱：')
          el-input(v-if="title === '新增账户'", v-model='account.email', auto-complete='off', placeholder='请输入邮箱')
          span(v-else="") {{account.email}}
          span.el-form-item-tip.color-red 账户邮箱注册后不可修改
        el-form-item(prop="department", label='所属部门：')
          el-select(v-model='account.department', placeholder='请选择所属部门')
            el-option(v-for="o in departments", :value="o.value", :label="o.name")
        el-form-item(prop="job", label='工作岗位：')
          el-select(v-model='account.job', placeholder='请选择工作岗位')
            el-option(v-for="o in jobs", :value="o.value", :label="o.name")
        el-form-item(prop="password", label='账户密码：')
          el-input(type="password", v-model='account.password', auto-complete='off', placeholder='请输入账户密码')
        el-form-item(prop="type", label='账户类型：')
          el-radio.radio(v-for="(o, index) in accountTypes", :value="o.value", v-model='account.type', :label='o.value') {{o.name}}

      .dialog-footer(slot="footer")
        el-button(type="primary", size="small", @click='accountSave') 确定
        el-button(type='gray', size="small", @click='dialogVisible = false') 取消
</template>

<script>
import {
  merge,
  uniqueId
} from 'lodash'

export default {
  methods: {
    open(account = {
      name: '',
      email: '',
      department: '',
      job: '',
      password: '',
      type: ''
    }) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.account = merge({}, this.account, account)
        this.title = !account.id ? '新增账户' : '编辑账户'
      })
    },

    onDialogOpen() {
      this.$nextTick(() => this.$refs.accountForm.resetFields())
    },

    accountSave() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          this.dialogVisible = false
          if (!this.account.id) this.account.id = uniqueId('account_')
          this.$emit('account-save', this.account)
        }
      })
    }
  },

  data() {
    return {
      title: '新增账户',
      account: {
        name: '',
        email: '',
        department: '',
        job: '',
        password: '',
        type: ''
      },
      rules: {
        departments: [{
          required: true,
          message: '请选择所属部门',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入账户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur,change'
        }],
        job: [{
          required: true,
          message: '请选择工作岗位',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '请选择账户类型',
          trigger: 'blur'
        }]
      },
      departments: [{
        name: '业务发展部',
        value: '业务发展部'
      }, {
        name: '合规风控部',
        value: '合规风控部'
      }, {
        name: '软件开发部',
        value: '软件开发部'
      }, {
        name: '电子商务部',
        value: '电子商务部'
      }],
      jobs: [{
        name: '专员',
        value: '专员'
      }, {
        name: '经理',
        value: '经理'
      }, {
        name: '总监',
        value: '总监'
      }],
      accountTypes: [{
        name: '业务专员类',
        value: '业务专员类'
      }, {
        name: '经理类',
        value: '经理类'
      }, {
        name: '总监类',
        value: '总监类'
      }, {
        name: '费用账户',
        value: '费用账户'
      }, {
        name: '其他第三方账户',
        value: '其他第三方账户'
      }],
      formLabelWidth: '120px',
      dialogVisible: false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_vars.scss';
.relation-products-tag {
  font-size: 12px;
  span {
    padding: 5px 8px;
    border-radius: 3px;
    background: $border-color;
    margin-right: 10px;
    display: inline-block;
    line-height: 1;
    .icon-close {
      cursor: pointer;
      color: #929aa3;
      margin-left: 10px;
      display: inline-block;
      transform: scale(.7);
      &:hover {
        color: $color-blue;
      }
    }
  }
}
</style>
