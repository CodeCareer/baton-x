<template lang="pug">
.inst-form
  .box
    .box-header
      | 基本信息
    .box-content
      el-form(:model="demo", :rules="rules", ref="instForm", label-width="120px")
        el-row
          el-col(:span="12", :offset="6")
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
    .bottom-buttons
      el-button(type="primary", size="small", @click="submitForm") 保存
      el-button(type="gray", size="small", @click="cancel") 取消

</template>

<script>
import {
  MessageBox,
  Message
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
    }
  },

  data() {
    return {
      rules: {
        type: [{
          required: true,
          message: '请输入机构全称',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入机构全称',
          trigger: 'blur'
        }],
        shortName: [{
          required: true,
          message: '请输入机构全称',
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
  .bottom-buttons {
    margin: 0 0 20px;
  }
}
</style>
