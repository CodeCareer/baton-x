<template lang="pug">
.setting
  .box
    .box-header
      | 账户固定信息
    .box-content
      el-row
        el-col(:span="12", :offset="6")
          .form-inner.center
            table
              tr
                th 账户名称：
                td Demo账户
              tr
                th 账户邮箱：
                td demo@ktjr.com
              tr
                th 所属部门：
                td 业务发展部
              tr
                th 工作岗位：
                td 专员
              tr
                th 账户类型：
                td 业务专员类
  .box.mt20
    .box-header
      | 账户其他信息
    .box-content
      .content-line
        table
          tr
            th 账户密码：
            td.color-blue 用于保护账号信息和登录安全
            td
              i.icon-batonx.icon-edit(@click="passwordDialogVisible = true")
  el-dialog(v-model="passwordDialogVisible", title="修改密码")
    el-form(:model='user', :rules="rules", ref="passwordForm", :label-width='formLabelWidth')
      el-form-item(prop="password", label='旧密码：')
        el-input(type="password", v-model='user.password', auto-complete='off', placeholder='请输入旧密码')
      el-form-item(prop="newPassword", label='新密码：')
        el-input(type="password", v-model='user.newPassword', auto-complete='off', placeholder='请输入新密码')
      el-form-item(prop="confirmPassword", label='确认新密码：')
        el-input(type="password", v-model='user.confirmPassword', auto-complete='off', placeholder='请再次输入新密码')
    .dialog-footer(slot="footer")
      el-button(type="primary", size="small", @click='submitPassword') 确定
      el-button(type='gray', size="small", @click='passwordDialogVisible = false') 取消
</template>

<script>
import {
  Message
} from 'element-ui'
import {
  validateEqual
} from '@/common/validator.js'

export default {
  methods: {
    submitPassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          Message.info('密码更改成功！')
          this.passwordDialogVisible = false
        }
      })
    }
  },

  data() {
    return {
      formLabelWidth: '120px',
      passwordDialogVisible: false,
      user: {
        password: '12345678',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        password: [{
          required: true,
          message: '请输入旧密码',
          trigger: 'blur'
        }],
        newPassword: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }],
        confirmPassword: [{
          required: true,
          message: '请再次输入新密码',
          trigger: 'blur'
        }, {
          validator: validateEqual.bind(this),
          compare: 'user.newPassword',
          compareName: '密码',
          trigger: 'blur'
        }]
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/_vars.scss';
.setting {
  .form-inner {
    th,
    td {
      padding: 15px!important;
    }
    table {
      margin: 20px 0;
    }
  }
  .content-line {
    th {
      font-weight: normal;
      width: 100px;
    }
    th,
    td {
      text-align: left;
      padding: 10px;
    }
    padding: 15px;
    .icon-edit {
      color: #c9cdd1;
      cursor: pointer;
      &:hover {
        color: $color-blue;
      }
    }
    table {}
  }
}
</style>
