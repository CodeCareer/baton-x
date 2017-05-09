<template lang="pug">
.asset-form
  .box
    .box-header
      | 基本信息
    .box-content
      form
        el-row
          el-col(:span="12")
            table
              tr
                th 资产全称：
                td
                  el-input(type="text", placeholder="请输入资产全称", v-model="demo.name")
              tr
                th 持有总金额：
                td
                  el-input(type="text", placeholder="请输入持有总金额", v-model="demo.amount")
                    template(slot="append") 元
              tr
                th 比例：
                td
                  el-input(type="text", placeholder="请输入比例", v-model="demo.ratio")
                    template(slot="append") %
              tr
                th 起息日：
                td
                  el-date-picker(type="date", :value="demo.startDate", @input="handleStartDate", placeholder="请输入起息日")
              tr
                th 发行期限：
                td
                  el-input(type="text", placeholder="请输入发行期限", v-model="demo.term")
                    template(slot="append") 天
              tr
                th 付息频率：
                td
                  el-input(type="text", placeholder="请输入付息频率", v-model="demo.payFrequency")
              tr
                th 资产类型：
                td
                  el-input(type="text", placeholder="请输入资产类型", v-model="demo.assetType")
              tr
                th 发行方：
                td
                  el-input(type="text", placeholder="请输入发行方", v-model="demo.publisher")
              tr
                th 托管方：
                td
                  el-input(type="text", placeholder="请输入托管方", v-model="demo.trustee")
          el-col(:span="12")
            table
              tr
                th 资产简称：
                td
                  el-input(type="text", placeholder="请输入资产简称", v-model="demo.shortName")
              tr
                th 总发行金额：
                td
                  el-input(type="text", placeholder="请输入总发行金额", v-model="demo.issueAmount")
                    template(slot="append") 元
              tr
                th 收益率：
                td
                  el-input(type="text", placeholder="请输入收益率", v-model="demo.rate")
                    template(slot="append") %
              tr
                th 到期日：
                td
                  el-date-picker(type="date", :value="demo.endDate", @input="handleEndDate", placeholder="请输入到期日")
              tr
                th 风险等级：
                td
                  el-select(v-model="demo.riskLevel")
                    el-option(v-for="o in riskLevels", :label="o.name", :value="o.value")
              tr
                th 付息日：
                td
                  el-date-picker(type="date",  placeholder="请输入付息日", :value="demo.payDate", @input="handlePayDate",)
              tr
                th 增信措施：
                td
                  el-input(type="text", placeholder="请输入增信措施", v-model="demo.credit")
              tr
                th 担保方：
                td
                  el-input(type="text", placeholder="请输入担保方", v-model="demo.gurantee")
              tr
                th 流动性：
                td
                  el-select(v-model="demo.flow")
                    el-option(v-for="o in flows", :label="o.name", :value="o.value")
  account-card(:accounts='demo.accounts')
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
} from '../../common/crossers.js'
import AccountCard from '../../components/AccountCard.vue'
import moment from 'moment'
import {
  uniqueId
} from 'lodash'

export default {
  components: {
    AccountCard
  },
  mounted() {
    if (this.$route.params.id !== 'add') {
      const name = this.$route.params.id
      updateCrumbs.$emit('update-crumbs', [{
        id: 'assetName',
        name: name
      }])
      this.demo = {
        name: name,
        amount: 33816000,
        ratio: 16.5,
        startDate: '2017-01-04',
        term: 90,
        payFrequency: '每周一次',
        assetType: '理财计划',
        publisher: '恒大金服',
        trustee: '光大保德信基金管理有限公司',
        shortName: name,
        issueAmount: 200897170,
        rate: 8,
        endDate: '2017-03-03',
        riskLevel: 'L',
        payDate: '2017-01-08',
        credit: '保险保证金',
        gurantee: name,
        flow: 'N',
        accounts: [{
          id: uniqueId(),
          checked: true,
          type: '资产账户',
          belongto: name,
          name: name,
          bankNum: '2310 8372 6532 098',
          bank: '招商银行天津滨海新区支行'
        }]
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
      demo: {
        name: null,
        amount: null,
        ratio: null,
        startDate: null,
        term: null,
        payFrequency: null,
        assetType: null,
        publisher: null,
        trustee: null,
        shortName: null,
        issueAmount: null,
        rate: null,
        endDate: null,
        riskLevel: 'L',
        payDate: null,
        credit: null,
        gurantee: null,
        flow: 'N',
        accounts: []
      },
      pickOpt: {
        format: 'yyyy-MM-dd'
      },
      riskLevels: [{
        name: '低风险',
        value: 'L'
      }, {
        name: '较低风险',
        value: 'M'
      }, {
        name: '高风险',
        value: 'H'
      }],
      flows: [{
        name: '无',
        value: 'N'
      }, {
        name: '高',
        value: 'H'
      }, {
        name: '低',
        value: 'L'
      }]
    }
  }
}
</script>

<style lang="scss">
.accounts-list {
  .box {
    border: 0;
    padding: 10px 0;
    .box-tab-header {
      top: 12px;
      right: 0;
    }
    .filters {
      padding: 0;
    }
  }
}
</style>
