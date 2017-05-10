<template lang="pug">
.inst-form
  .box
    .box-header
      | 基本信息
    .box-content
      el-form(:model="demo", :rules="rules", ref="instForm", label-width="120px")
        el-row
          el-col(:span="12", :offset="6")
            .form-inner.center
              el-form-item(label="机构类型：", prop="type")
                el-select(v-model="demo.type", placeholder="请选择机构类型")
                  el-option(v-for="o in instTypes", :label="o.name", :value="o.value")
              el-form-item(label="机构全称：", prop="name")
                el-input(type="text", placeholder="请输入机构全称", v-model="demo.name")
              el-form-item(label="机构简称：", prop="shortName")
                el-input(type="text", placeholder="请输入机构简称", v-model="demo.shortName")
              el-form-item(label="经营范围：", prop="manageScope")
                el-select(v-model="demo.manageScope", multiple, placeholder="请选择经营范围")
                  el-option(v-for="o in manageScopes", :label="o.name", :value="o.value")
              el-form-item(label="公司网址：", prop="site")
                el-input(type="text", placeholder="请输入公司网址", v-model="demo.site")
              el-form-item(label="办公地址：", prop="address")
                el-input(type="text", placeholder="请输入办公地址", v-model="demo.address")
              el-form-item(label="联系电话：", prop="tel")
                el-input(type="text", placeholder="请输入联系电话", v-model="demo.tel")
              el-form-item(label="机构LOGO：", prop="logo")
                el-upload.logo-uploader(action='//jsonplaceholder.typicode.com/posts/', :show-file-list="false", :on-success="onLogoSuccess", :on-error="onLogoError", :before-upload="beforeUploadLogo")
                  img.logo(v-if='demo.logo', :src='demo.logo')
                  i.el-icon-plus.logo-uploader-icon(v-else='')
                  .mask
                    el-button(type="primary") 点击重新上传
                  div.el-upload__tip(slot="tip") 支持JPG、JPEG、PNG格式，大小不超过2M
    .bottom-buttons
      el-button(type="primary", size="small", @click="submitForm") 保存
      el-button(type="gray", size="small", @click="cancel") 取消

</template>

<script>
import {
  MessageBox,
  Message,
  Loading
} from 'element-ui'
import {
  updateCrumbs
} from '@/common/crossers.js'
import moment from 'moment'

export default {
  mounted: function() {
    if (this.$route.params.id !== 'add') {
      const name = this.$route.params.id
      updateCrumbs.$emit('update-crumbs', [{
        id: 'assetName',
        name: name
      }])
      this.demo = {
        name: name,
        logo: require('@/assets/images/jd.png'),
        shortName: name,
        type: '资金渠道',
        manageScope: ['金融信息服务', '计算机网络技术', '技术服务', '电子商务'],
        site: 'http://jr.jd.com',
        address: '北京市北京经济技术开发区科创十一街18号C座2层221室',
        tel: '010-89188467'
      }
    }
  },

  methods: {
    submitForm() {
      Message.info('不能保存！Demo，只是用来展示！')
    },

    cancel() {
      MessageBox.confirm('内容将会清楚，确定取消吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$router.back()
      })
    },

    handleStartDate(value) {
      if (!value) return
      this.demo.startDate = moment(value).format('YYYY-MM-DD')
    },

    handleEndDate(value) {
      if (!value) return
      this.demo.endDate = moment(value).format('YYYY-MM-DD')
    },

    handlePayDate(value) {
      if (!value) return
      this.demo.payDate = moment(value).format('YYYY-MM-DD')
    },

    onLogoSuccess(res, file) {
      this.loadingInstance.close()
      this.demo.logo = URL.createObjectURL(file.raw)
    },

    onLogoError(res) {
      console.error(res)
      Message.error('上传失败!')
      this.loadingInstance.close()
    },

    beforeUploadLogo(file) {
      this.loadingInstance = Loading.service({
        target: '.logo-uploader .el-upload'
      })
    }
  },

  data() {
    return {
      loadingInstance: {
        close() {}
      },
      rules: {
        type: [{
          required: true,
          message: '请选择机构类型',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入机构全称',
          trigger: 'blur'
        }],
        shortName: [{
          required: true,
          message: '请输入机构简称',
          trigger: 'blur'
        }]
      },
      demo: {
        type: null,
        manageScope: [],
        name: null,
        shortName: null,
        site: null,
        address: null,
        tel: '',
        logo: ''
      },
      instTypes: [{
        name: '资金渠道',
        value: '0'
      }, {
        name: '资产渠道',
        value: '1'
      }, {
        name: '托管机构',
        value: '2'
      }, {
        name: '增信机构',
        value: '3'
      }, {
        name: '投资顾问',
        value: '4'
      }],
      manageScopes: [{
        name: '金融信息服务',
        value: '0'
      }, {
        name: '计算机网络技术',
        value: '1'
      }, {
        name: '技术服务',
        value: '2'
      }, {
        name: '增信机构',
        value: '3'
      }, {
        name: '投资顾问',
        value: '4'
      }]
    }
  }
}
</script>

<style lang="scss">
.inst-form {
  .logo-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #20a0ff;
        .mask {
          display: block;
        }
      }
    }
    .mask {
      display: none;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .3);
      button {
        margin-top: 70px;
      }
    }
  }
  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .logo {
    width: 178px;
    height: 178px;
    display: block;
  }
  .bottom-buttons {
    margin: 0 0 20px;
  }
}
</style>
