<template lang="pug">
.asset-form
  .box
    .box-header
      | 基本信息
    .box-content
      el-form(:model="demo", :rules="rules", ref="assetForm", label-width="120px")
        el-row
          el-col(:span="12")
            el-form-item(label="资产全称：", prop="name")
              el-input(type="text", placeholder="请输入资产全称", v-model="demo.name")
            el-form-item(label="销售平台：", prop="amount")
              el-input(type="text", placeholder="请输入销售平台", v-model="demo.sale")
            el-form-item(label="产品简称：", prop="ratio")
              el-input(type="text", placeholder="请输入产品简介", v-model="demo.productName")
            el-form-item(label="产品代码：", prop="startDate")
              el-input(type="text", placeholder="请输入产品代码", v-model="demo.productCode")

            el-form-item(label="发行利率：", prop="term")
              el-input(type="text", placeholder="请输入发行利率", v-model="demo.issueRate")
                template(slot="append") %
            el-form-item(label="起息日：", prop="payFrequency")
              el-date-picker(type="date", :value="demo.startDate", @input="handleStartDate", placeholder="请输入起息日")
              //- el-input(type="text", placeholder="请输入付息频率", v-model="demo.startDate")
            el-form-item(label="到期日：", prop="assetType")
              el-date-picker(type="date", :value="demo.endDate", @input="handleStartDate", placeholder="请输入到期日")
              //- el-input(type="text", placeholder="请输入资产类型", v-model="demo.endDate")
            el-form-item(label="发行期限：", prop="publisher")
              el-input(type="text", placeholder="请输入发行期限", v-model="demo.term")
                template(slot="append") 天
            //- el-form-item(label="到期日：", prop="trustee")
            //-   el-input(type="text", placeholder="请输入托管方", v-model="demo.trustee")
          el-col(:span="12")
            el-form-item(label="计划募集金额：", prop="shortName")
              el-input(type="text", placeholder="请输入计划募集金额：", v-model="demo.planAmount")
                template(slot="append") 元
            el-form-item(label="实际募集金额：", prop="issueAmount")
              el-input(type="text", placeholder="请输入实际募集金额", v-model="demo.actualAmount")
                template(slot="append") 元
            el-form-item(label="产品风险评级：", prop="rate")
              //- el-input(type="text", placeholder="请产品风险评级：", v-model="demo.riskRating")
              //-   template(slot="append") %
              el-select(v-model="risksRating",placeholder="请选择")
                el-option(v-for="risk in risks",:key="risk.value",:label="risk.label",:value="risk.value")
            el-form-item(label="上架日期：", prop="endDate")
              el-date-picker(type="date", :value="demo.sjDate", @input="handleEndDate", placeholder="请输入上架日期")
            el-form-item(label="下架日期：", prop="riskLevel")
              el-date-picker(type="date", :value="demo.xjDate", @input="handleEndDate", placeholder="请输入下架日期")
              //- el-select(v-model="demo.riskLevel")
              //-   el-option(v-for="o in riskLevels", :label="o.name", :value="o.value")
            el-form-item(label="募集期限：", prop="payDate")
              el-input(type="text", placeholder="请输入发行期限", v-model="demo.raiseTerm")
                template(slot="append") 天
              //- el-date-picker(type="date",  placeholder="请输入付息日", :value="demo.payDate", @input="handlePayDate",)
            el-form-item(label="结算时限：", prop="credit")
              el-input(type="text", placeholder="请输入增信措施", v-model="demo.balanceTerm")
            el-form-item(label="年化计息天数：", prop="gurantee")
              el-input(type="text", placeholder="请输入担保方", v-model="demo.yearNum")
            //- el-form-item(label="流动性：", prop="flow")
            //-   el-select(v-model="demo.flow")
                el-option(v-for="o in flows", :label="o.name", :value="o.value")
  .box.mt20
    .box-header 费用信息
    .box-content
      .cost-table
        table
          thead
            tr
              th 收费主体
              th 费用类型
              th 计费方式
              th 费率
              th 计费天数
              th 费用基数
              th 支付频率
              th 支付日期
              th 计费开始日期
          tbody
            tr(v-for="costList in costLists")
              td
                el-input(v-model="costList.charge")
              td
                el-input(v-model="costList.costType")
              td
                el-input(v-model="costList.chargingType")
              td
                el-input(v-model="costList.rate")
              td
                el-input(v-model="costList.chargingDays")
              td
                el-input(v-model="costList.costBase")
              td
                el-input(v-model="costList.payment")
              td
                el-input(v-model="costList.paymentDate")
              td
                el-input(v-model="costList.chargingstart")
            tr
              td.addMore(colspan="9")
                a(@click="addMore(costList)")
                  i.icon-batonx.icon-plus
                  span 添加更多费用信息
  account-card(:passed-accounts='demo.accounts')
  .box.mt20
    .box-header 审批流程
    .box-content
      .examine
        table(width="100%")
          thead
            tr
              th 审批流程名称
              th 详情
              th 操作
          tbody
            tr(v-for="Eaadata in filterEaa",v-if="filterEaa.length")
              td {{Eaadata.EaaName}}
              td
                span {{Eaadata.details}}
                i.icon-batonx.icon-shenpi
              td
                span(@click="EditDialog")
                  i.icon-batonx.icon-edit
                  | 编辑
                span(@click="CloseDialog(Eaadata)")
                  i.icon-batonx.icon-close
                  | 删除
            //- tr(v-if="!Eaadatas.lenght")
            //-   td(colspan="3") 没有数据！
  el-dialog(title="审批流程",v-model="Eaavisibel")
    .box
      .add-more
        el-button.fr(type="primary", size="small", @click="addEaa")
          i.icon-batonx.icon-plus
          | 新增
      .filters
        el-input(placeholder='输入账户名或者账户', icon='search', v-model.lazy='filter.name')
    el-table(:data='Eaadatas', ref="accountsTable")
      el-table-column(type="selection", width="45")
      el-table-column(property="EaaName", label='审批流程名称')
      el-table-column(property='process', label='审批流程')
      //- el-table-column(property='belongto', label='操作')
      //-   template(scope="scope")
      //-     i.icon-batonx.icon-edit
    .dialog-footer(slot="footer")
      el-button(type="primary", size="small", @click='Eaavisibel = false') 确定
  approve-dialog(ref="approveVisi",:eaa-show="eaaapp")
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
import AccountCard from '@/components/AccountCard.vue'
import ApproveDialog from '@/components/ApproveDialog.vue'
import moment from 'moment'
import {
  uniqueId,
  remove,
  each,
  filter
} from 'lodash'

export default {
  components: {
    AccountCard,
    ApproveDialog
  },
  mounted() {
    if (this.$route.params.id !== 'add') {
      const name = this.$route.params.id
      console.log(name)
      updateCrumbs.$emit('update-crumbs', [{
        id: 'assetName',
        name: name
      }])
      this.demo = {
        name: name,
        sale: '京东金融',
        productName: '丰赢宝B',
        productCode: 'YZ0408~YZ0413',
        issueRate: '6.5%',
        startDate: '2017-01-04',
        endDate: '2017-04-03',
        term: 90,
        planAmount: '124,534,253.00',
        actualAmount: '124,534,253.00',
        riskRating: '低风险',
        sjDate: '2017-01-01',
        xjDate: '2017-01-02',
        raiseTerm: '1',
        balanceTerm: '12:00',
        yearNum: '365',
        // payFrequency: '每周一次',
        // assetType: '理财计划',
        // publisher: '恒大金服',
        // trustee: '光大保德信基金管理有限公司',
        // shortName: name,
        // issuePlatform: '京东金融',
        // rate: 8,

        // riskLevel: 'L',
        // payDate: '2017-04-03',
        // credit: '保险保证金',
        // gurantee: name,
        // flow: 'N',
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
    addEaa() {
      this.$refs.approveVisi.open()
    },
    EditDialog() {
      this.Eaavisibel = true
      this.$nextTick(() => {
        each(this.Eaadatas, v => {
          if (v.EaaName === this.EaaDefault.EaaName) {
            this.$refs.accountsTable.toggleRowSelection(v, true)
          }
        })
      })
    },
    CloseDialog(eaa) {
      MessageBox.confirm('确定要删除此流程吗？是否继续！', '提示', {
        type: 'warning'
      }).then(() => {
        this.Eaadatas = remove(this.Eaadatas, v => {
          return eaa.EaaName !== v.EaaName
        })
      })
    },
    addMore(data) {
      this.costLists.push(this.emptyObj)
    },
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
  computed: {
    filterEaa() {
      return filter(this.Eaadatas, v => {
        return ~v.EaaName.indexOf(this.EaaDefault.EaaName)
      })
    }
  },

  data() {
    return {
      eaaapp: true,
      EaaDefault: {
        EaaName: '资金流程审批A1',
        process: ''
      },
      Eaavisibel: false,
      risksRating: '',
      filter: {
        name: ''
      },
      risks: [{
        value: '1',
        label: '低风险'
      }, {
        value: '2',
        label: '较高风险'
      }, {
        value: '3',
        label: '高风险'
      }],
      rules: {},
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
      }],
      costLists: [{
        charge: '招商银行',
        costType: '托管费',
        chargingType: '固定费用 ',
        rate: '0.2%',
        chargingDays: '360',
        costBase: '产品规模',
        payment: ' 每月 ',
        paymentDate: '2016-8-8    12:00:00 AM ',
        chargingstart: '￥ 23,533,09.00'
      }, {
        charge: '京东金融 ',
        costType: '投资顾问费',
        chargingType: '超额费用',
        rate: '无 ',
        chargingDays: '无 ',
        costBase: '无 ',
        payment: ' 每季 ',
        paymentDate: '2016-8-8    14:00:00 PM',
        chargingstart: '￥ 123,533,09.00'
      }],
      emptyObj: {
        charge: '',
        costType: '',
        chargingType: '',
        rate: ' ',
        chargingDays: '',
        costBase: '',
        payment: '',
        paymentDate: '',
        chargingstart: ''
      },
      Eaadatas: [{
        EaaName: '资金流程审批A1',
        details: '审批',
        process: '项目组长 → 项目经理 → 项目总监'
      }, {
        EaaName: '资金流程审批B1',
        details: '审批',
        process: '项目经理审批'
      }, {
        EaaName: '资金流程审批C1',
        details: '审批',
        process: '项目经理 → 项目总监'
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
    // .box-tab-header {
    //   top: 15px;
    //   right: 0;
    // }
    .filters {
      padding: 0;
    }
  }
}

.cost-table {
  table {
    width: 100%;
    tr {
      border-bottom: 1px solid #e2e5e9;
      &:last-child {
        border-bottom: none;
      }
    }
    th {
      padding: 10px 8px;
      background: #c6e3f1;
      font-weight: normal;
      text-align: left;
    }
    td {
      &.addMore {
        padding: 10px 0;
        text-align: center;
        i {
          color: #538cc0;
        }
        span {
          margin-left: 5px;
        }
      }
    }
    .el-input {
      .el-input__inner {
        border: none;
      }
    }
  }
}

.examine {
  padding: 15px;
  table {
    width: 100%;
    th {
      font-weight: normal;
      color: #abb1b8;
      // text-align: left;
    }
    td {
      padding: 10px 0;
      text-align: center;
      i {
        color: #c9cdd1;
      }
      span {
        cursor: pointer;
        margin-right: 10px;
        i {
          display: inline-block;
          margin-right: 5px;
          transform: scale(0.8);
          vertical-align: 0;
          color: #c9cdd1;
        }
      }
    }
  }
}
 .add-more{
      position: absolute;
      top:15px;
      right:15px;
    }
</style>
