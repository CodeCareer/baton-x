<template lang="pug">
.setting
  .box
    .box-header
      | 账户固定信息
    .box-content
      el-row
        el-col(:span="12")
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
        el-col(:span='12')
          el-form.elForm(:rules="rules",label-width="120px")
            el-form-item(label="上传名片：",prop="logo")
              el-upload.setting-upload(action="//jsonplaceholder.typicode.com/posts/",:show-file-list="false",:on-success="handleAvatarSuccess",:before-upload="beforeAvatarUpload")
                img.url(v-if="dome.url", :src="dome.url" ,class="avatar")
                i.ico(v-else ,class="el-icon-plus avatar-uploader-icon")
                .mask-setting(v-if="dome.url")
                  el-button(type="primary") 点击重新上传
                div.el-upload__setting(slot="tip") *支持JPG、JPEG、PNG格式，大小不超过2M
            el-form-item(label="修改密码：")
              span.setting-span 用于保护账号信息和登录安全
              i.icon-batonx.icon-edit(@click="passwordDialogVisible = true")
  //- .box.mt20
  //-   .box-header
  //-     | 账户其他信息
  //-   .box-content
  //-     .content-line
  //-       table
  //-         tr
  //-           th 账户密码：
  //-           td.color-blue 用于保护账号信息和登录安全
  //-           td
  //-             i.icon-batonx.icon-edit(@click="passwordDialogVisible = true")
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
    },
    handleAvatarSuccess(file) {
      this.dome.url = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const format = file.type === 'image/jpeg' || 'image/png' || 'image/jpg'
      const size = file.size / 1024 / 1024 < 2
      if (!format) {
        Message.error('文件只支持png/jpg/jpeg')
      }
      if (!size) {
        Message.error('文件不能大于2M')
      }
    }
  },
  data() {
    return {
      dome: {
        url: require('@/assets/images/jd.png'),
        shortName: name,
        type: '资金渠道',
        manageScope: ['金融信息服务', '计算机网络技术', '技术服务', '电子商务'],
        site: 'http://jr.jd.com',
        address: '北京市北京经济技术开发区科创十一街18号C座2层221室',
        tel: '010-89188467'
      },
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
.setting-upload{
  .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #20a0ff;
        .mask-setting {
          display: block;
        }
      }
    }
}
.url {
    width: 120px;
    height: 120px;
    display: block;
  }
.ico{
    width: 120px;
    height: 120px;
    display: block;
    color:#c9cdd1;
    font-size:30px;
    cursor:pointer;
    position: relative;
    &:before{
      position: absolute;
      top: 50%;
      transform: translate(-50%,-50%);

    }
}
.mask-setting{
  display: none;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
  button {
        margin-top: 40px;
      }
}
.el-upload__setting{
    font-size: 12px;
    color: #8391a5;
}
.elForm{
  padding:20px!important;
}
.setting-span{
  font-size:12px;
  color:#538cc0;
  vertical-align: 1px;
}
.icon-edit{
  margin-left: 10px;
  font-size:12px;
  color:#c9cdd1;
  cursor: pointer;
}
</style>
