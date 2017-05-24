<template lang="pug">
  .asset-detail
    .box
      .box-header
        h3 {{demo.name}}
        small 简称：{{demo.shortName}}
        small 资产代码：YZ0413
        .buttons
          el-button(type="primary", size="small", @click="editAsset")
            i.icon-batonx.icon-edit
            | 编辑
          el-button(type="gray", size="small", @click="deleteAsset")
            i.icon-batonx.icon-delete
            | 删除
      .box-content
        .box-section
          el-row(:gutter="20")
            el-col(:span="8")
              table(v-if="demo.type === 0")
                tr
                  th 利率：
                  td.em 6.5%
                tr
                  th 起购金额：
                  td ￥1000
                tr
                  th 发行平台：
                  td 恒大金服
                tr
                  th 增信机构：
                  td -
              table(v-if="demo.type === 1")
                tr
                  th 利率：
                  td.em 6.5%
                tr
                  th 起购金额：
                  td ￥1000
                tr
                  th 发行平台：
                  td 恒大金服
                tr
                  th 增信机构：
                  td -
            el-col(:span="8")
              table(v-if="demo.type === 0")
                tr
                  th 发行期限：
                  td.em 30天
                tr
                  th 递增金额：
                  td ￥100
                tr
                  th 产品类型：
                  td 理财计划
                tr
                  th 增信措施：
                  td 保险备用金
              table(v-if="demo.type === 1")
                tr
                  th 发行期限：
                  td.em 30天
                tr
                  th 递增金额：
                  td ￥100
                tr
                  th 产品类型：
                  td 理财计划
                tr
                  th 增信措施：
                  td 保险备用金
            el-col(:span="8")
              table(v-if="demo.type === 0")
                tr
                  th 风险等级：
                  td 低风险
                tr
                  th 托管机构：
                  td 平安银行
              .td-button(v-if="demo.type === 0")
                el-button(@click="goRegPro") 登记产品列表
                el-button(@click="goClient") 客户列表
              table(v-if="demo.type === 1")
                tr
                  th 风险等级：
                  td 低风险
                tr
                  th 托管机构：
                  td 平安银行
              .td-button(v-if="demo.type === 1")
                el-button(@click="goRegPro") 登记产品列表
                el-button(@click="goClient") 客户列表
        .box-section
          .attachments-box
            h3
              | 附件：
              small *最多支持添加20个文件，每个文件不得超过20M
              el-upload.upload-attachment(action='//jsonplaceholder.typicode.com/posts/', :file-list='demo.attachments')
                el-button(size='mini', type='primary') 增加
        .box-section
          kt-note-card(:passed-notes="demo.notes")
    .box.box-normal
      .box-header  待办事项
      .box-content
        .todo(v-if="demo.type === 0")
          table
            tbody
              tr.first-tr
                td.first-td-amount 资金
                td 发行数据已更新
                td
                  span ￥
                  span.amount-color 200,184,258.00
                td 缴款审批中
                  i.icon-batonx.icon-shenpi
                td 最晚明日12：00执行
                td
                  .y-operation
                    a(@click="productDetail") 操作
                  .n-operation(v-if="false")
                    a 操作
              tr
                td.first-td-asset 资产
                td
                  .asset-buy 申购广发货币基金
                  .asset-sell 卖出15北京城投债
                td
                  .asset-amount
                    span ￥
                    span.amount-color 245,742.00
                  .asset-amount
                    span ￥
                    span.amount-color 81,084,134.00
                td
                  .already 已执行
                  .not 未执行
                td
                  .state 最晚明日12：00执行
                  .state 最晚明日12：00执行
                td
                  .y-operation
                    a(@click="assetDatail") 操作
                  .n-operation
                    a(@click="assetDatail") 操作
        .todo(v-if="demo.type === 1")
          table
            tbody
              tr.first-tr
                td.first-td-amount 资金
                td
                  .apply-buy 申购数据已更新
                  .redeem 赎回数据已更新
                td
                  .apply-amount
                    span ￥
                    span.amount-color  200,184,258.00
                  .redeem-amount
                    span ￥
                    span.already  16,200,234.00
                td
                  span ￥
                  span.amount-color 183,984,024.00
                td 缴款审批中
                  i.icon-batonx.icon-shenpi
                td 最晚明日12：00执行
                td
                  .y-operation
                    a(@click="productDetail") 操作
                  .n-operation(v-if="false")
                    a 操作
              tr
                td.first-td-asset 资产
                td
                  .asset-buy 申购广发货币基金
                  .asset-sell 卖出15北京城投债
                td
                  .asset-amount
                    span ￥
                    span.amount-color 245,742.00
                  .asset-amount
                    span ￥
                    span.already 81,084,134.00
                td
                td
                  .already 已执行
                  .not 未执行
                td
                  .state 最晚明日12：00执行
                  .state 最晚明日12：00执行
                td
                  .n-operation
                    a(@click="assetDatail") 操作
                  .y-operation
                    a(@click="assetDatail") 操作
    .box.box-normal
      .box-header 关键日期
      .box-content
        .crux-date(v-if="demo.type === 0")
          img(src="../../assets/images/cruxDate.png")
        .crux-date(v-if="demo.type === 1")
          img(src="../../assets/images/cruxDate2.png")
    .box.box-normal
      .box-header 关键金额
      .box-content(v-if="demo.type === 0")
        .box-section
          .cruxamount
            el-row
              el-col(:span="8")
                dl
                  dd 实际募集金额：
                  dt
                    span.amount-f ￥
                    span.amount-c 124,500,000.00
              el-col(:span="8")
                dl
                  dd 计划募集金额：
                  dt
                    span.amount-f ￥
                    span.amount-c 128,500,000.00
              el-col(:span="8")
                dl
                  dd 未募集金额：
                  dt
                    span.amount-f ￥
                    span.amount-c 4,000,000.00
        .box-section
          .cruxamount-mes
            el-row
              el-col(:span="12")
                dl
                  dd
                    label 存续金额：
                    span.subsist-f ￥
                    span.subsist-c 245,742.00
                  dt
                    .part
                    .principal-interest
                      .principal
                        label 本金：
                        span ￥ 124,500,000.00
                      .interest
                        label 利息：
                        span ￥ 251,905,0
              el-col(:span="12")
                dl
                  dd
                    label 已兑付金额：
                    span.subsist-f ￥
                    span.subsist-c 0
                  dt
                    .part
                    .principal-interest
                      .principal
                        label 本金：
                        span ￥ 0
                      .interest
                        label 利息：
                        span ￥ 0
      .box-content(v-if="demo.type === 1")
        .box-section
          .cruxamount
            el-row
              el-col(:span="8")
                dl
                  dd 实际募集金额：
                  dt
                    span.amount-f ￥
                    span.amount-c 224,500,000.00
              el-col(:span="8")
                dl
                  dd 计划募集金额：
                  dt
                    span.amount-f ￥
                    span.amount-c 228,500,000.00
              el-col(:span="8")
                dl
                  dd 未募集金额：
                  dt
                    span.amount-f ￥
                    span.amount-c 4,000,000.00
        .box-section
          .cruxamount-mes
            el-row
              el-col(:span="12")
                dl
                  dd
                    label 存续金额：
                    span.subsist-f ￥
                    span.subsist-c 124,751,905.00
                  dt
                    .part
                    .principal-interest
                      .principal
                        label 本金：
                        span ￥ 124,500,000.00
                      .interest
                        label 利息：
                        span ￥ 251,905,0
              el-col(:span="12")
                dl
                  dd
                    label 已兑付金额：
                    span.subsist-f ￥
                    span.subsist-c  99,750,095.00
                  dt
                    .part
                    .principal-interest
                      .principal
                        label 本金：
                        span ￥ 99,548,674.80
                      .interest
                        label 利息：
                        span ￥ 201,420.152
    .box.box-normal
      .box-header 持有资产列表
        .history-record
          a(@click="historyDialog") 历史交易记录
      .box-content(v-if="demo.type === 0")
        .asset-list
          table
            thead
              tr
                th 名称
                th 金额
                th 比例
                th 今日收益
                th 累计收益
            tbody
              tr
                td 创元开发建设投资企业融资项目
                td ￥ 24,296,355.00
                td 100%
                td ￥ 1,336,299.52
                td ￥ 1,336,299.52
        el-dialog(title="历史交易记录",v-model="historyVisible")
          el-table(:data="historyDatas")
            el-table-column(property="time",label="时间")
            el-table-column(property="assetsName",label="资产名称")
            el-table-column(property="cztype",label="操作类型")
            el-table-column(label="变动金额(元)")
              template(scope='scope')
                span(:class="scope.row.change > 0 ? 'positive' : 'negative'") {{scope.row.change}}
      .box-content(v-if="demo.type === 1")
        .asset-list-current
          table
            thead
              tr
                th
                th 资产名称
                th 金额
                th 比例
                th 今日收益
                th 累计收益
            tbody
              tr
                td.first-td(rowspan="2") 流动性资产
                td 现金
                td ￥1,000,000.00
                td  0.54%
                td ￥30,000.00
                td ￥30,000.00
              tr.two-tr
                td 鹏华添利宝货币基金
                td ￥182,055,000.00
                td  55.5%
                td ￥61,258,800.00
                td ￥61,258,800.00
              tr
                td.first-td(rowspan="2") 其他资产
                td 小定宝-财富-南京某公司借款
                td ￥23,800,000.00
                td  12.96%
                td ￥14,280,000.00
                td ￥14,280,000.00
              tr
                td 小定宝-财富-海航商业控股项目
                td ￥102,098,000.00
                td  31%
                td ￥39,960,216.80
                td ￥39,960,216.80
        el-dialog(title="历史交易记录",v-model="historyVisible")
          el-table(:data="historyDatas")
            el-table-column(property="time",label="时间")
            el-table-column(property="assetsName",label="资产名称")
            el-table-column(property="cztype",label="操作类型")
            el-table-column(label="变动金额(元)")
              template(scope='scope')
                span(:class="scope.row.change > 0 ? 'positive' : 'negative'") {{scope.row.change}}
    .box.box-normal
      .box-header 费用列表
        .extract-record
          a(@click="extractDialog") 提取记录
      .box-content
        .cost-list(v-if="demo.type === 0")
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
                th 计费开始日期
                th 已记提费用
            tbody
              tr(v-for="costList in costLists")
                td {{costList.charge}}
                  span(:class="costList.profitType == '固定'? 'fixed':'float'") {{costList.profitType}}
                td {{costList.costtype}}
                td {{costList.billingMode}}
                td {{costList.rate}}
                td {{costList.billingDates}}
                td {{costList.costbase}}
                td {{costList.payfrequency}}
                td {{costList.startDate}}
                td {{costList.already}}
        .cost-list(v-if="demo.type === 1")
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
                th 计费开始日期
                th 已记提费用
            tbody
              tr(v-for="currentList in currentLists")
                td {{currentList.charge}}
                  span(:class="currentList.profitType == '固定'? 'fixed':'float'") {{currentList.profitType}}
                td {{currentList.costtype}}
                td {{currentList.billingMode}}
                td {{currentList.rate}}
                td {{currentList.billingDates}}
                td {{currentList.costbase}}
                td {{currentList.payfrequency}}
                td {{currentList.startDate}}
                td {{currentList.already}}
        el-dialog(title="提取记录",v-model="extractVisible")
          el-table(:data="extractDatas")
            el-table-column(property="time",label="时间")
            el-table-column(property="charge",label="收费主体")
            el-table-column(property="extract",label="提取金额")
            //- el-table-column(property="wait",label="待计提费用")
    .box.box-normal
      .box-header 账户列表
      .box-content
        .account-list(v-if="demo.type === 0")
          el-row
            el-col(:span="12",v-for="accountList in accountLists")
              .account-table
                .account-table-n
                  table
                    tr
                      th 账户类型：
                      td.account-type {{accountList.accountType}}
                    tr
                      th 账户名：
                      td {{accountList.accountName}}
                    tr
                      th 账户：
                      td.account-c {{accountList.account}}
                    tr
                      th 开户行：
                      td {{accountList.openAccount}}
        .account-list(v-if="demo.type === 1")
          el-row
            el-col(:span="12",v-for="accountList in accountLists")
              .account-table
                .account-table-n
                  table
                    tr
                      th 账户类型：
                      td.account-type {{accountList.accountType}}
                    tr
                      th 账户名：
                      td {{accountList.accountName}}
                    tr
                      th 账户：
                      td.account-c {{accountList.account}}
                    tr
                      th 开户行：
                      td {{accountList.openAccount}}
      .box.box-normal
        .box-header 审批流程管理
        .box-content
          .bpm
            el-row
              el-col(:span="8")
                dl
                  dd 审批流程名称
                  dt 资金清算审批流程B
              el-col(:span="8")
                dl
                  dd 流程详情
                  dt  项目组长  →  项目经理  →  项目总监
    kt-product-dialog(ref="prdialog")
    kt-asset-dialog(ref="assdialog")
</template>

<script>
import {
  Message,
  MessageBox
} from 'element-ui'
import KtLineChart from '@/components/LineEchart.vue'
import KtNoteCard from '@/components/NoteCard.vue'
import KtProductDialog from '@/components/ProductDialog.vue'
import KtAssetDialog from '@/components/AssetDialog.vue'
import {
  // concat,
  // map,
  // merge,
  remove,
  uniqueId
} from 'lodash'
import {
  updateCrumbs
} from '@/common/crossers.js'
// import Vue from 'vue'

export default {
  components: {
    KtLineChart,
    KtNoteCard,
    KtProductDialog,
    KtAssetDialog
  },
  mounted: function() {
    this.demo.name = this.demo.shortName = this.$route.params.id
    this.demo.type = +this.$route.query.type || this.demo.type
    updateCrumbs.$emit('update-crumbs', [{
      id: 'assetName',
      name: this.demo.name
    }])
    // setTimeout(() => {
    //   this.demo.rateChartOpt = merge({}, this.demo.rateChartOpt, {
    //     color: ['#f1b277'],
    //     legend: {
    //       data: ['收益率']
    //     },
    //     tooltip: {
    //       formatter: (params, ticket, callback) => {
    //         if (!params.length) return
    //         return concat([`<table class="chart-tooltip"><tr><th colspan="2">${params[0].name}</th><tr>`],
    //           map(params, v => {
    //             return `<tr class="line">
    //                     <td class="left"><i class="circle" style="color:${v.color}"></i>${v.seriesName}：</td>
    //                     <td class="right">${Vue.filter('ktPercent')(v.value, 2, 1)}</td>
    //                   </tr>`
    //           }), '</table>').join('')
    //       }
    //     },
    //     xAxis: {
    //       data: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05']
    //     },
    //     series: [{
    //       name: '收益率',
    //       type: 'line',
    //       format: 'percent',
    //       data: [0.21, 0.32, 0.41, 0.34, 0.25],
    //       symbolSize: 5,
    //       symbol: 'circle'
    //     }]
    //   })
    // }, 100)
  },

  methods: {
    goRegPro() {
      this.$router.push({
        name: 'RegisterProductList'
      })
    },
    goClient() {
      this.$router.push({
        name: 'ClientList'
      })
    },
    // closeMessage(file, fileList) {
    //   MessageBox.confirm('确定要删除文件吗？', '提示', {
    //     type: 'warning'
    //   }).then(() => {})
    //   console.log(file, fileList)
    // },
    extractDialog() {
      this.extractVisible = true
    },
    historyDialog() {
      this.historyVisible = true
    },
    productDetail() {
      this.$refs.prdialog.showDialog()
    },
    assetDatail() {
      this.$refs.assdialog.showDialog()
    },
    editAsset() {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: this.demo.name
        }
      })
    },

    deleteAsset() {
      Message.info('测试账号不支持此功能！')
    },

    addNote() {
      if (this.demo.notes.length >= 50) {
        Message.warn('备注个数不得超过50个')
        return
      }

      if (!this.demo.newNote) {
        Message.error('备注不能为空!')
        return
      }

      this.demo.notes.unshift({
        id: uniqueId('new_note_'),
        editActive: false,
        text: this.demo.newNote,
        createdAt: new Date()
      })

      this.demo.newNote = ''
      this.addNoteFocus = false
    },

    saveNote(note) {
      note.text = note.textEdit
      note.editActive = false
    },

    moreNote() {
      if (this.noteVisibleCount >= this.demo.notes.length) {
        Message.info('没有更多了')
        return
      }
      this.noteVisibleCount += this.noteMoreStep
    },

    editNote(note) {
      note.editActive = true
      this.$nextTick(() => {
        const textarea = this.$refs.notes.querySelector(`#note_${note.id} textarea`)
        textarea.focus()
      })
    },

    resetNote(note) {
      note.textEdit = note.text
      note.editActive = false
    },

    deleteNote(note) {
      MessageBox.confirm('此操作将永久删除改批注, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.demo.notes = remove(this.demo.notes, (v) => {
          return note.id !== v.id
        })
      })
    }
  },

  computed: {
    showNotes() {
      return this.demo.notes.slice(0, this.noteVisibleCount)
    }
  },

  data() {
    return {
      extractVisible: false,
      historyVisible: false,
      addNoteFocus: false,
      noteVisibleCount: 2,
      noteMoreStep: 5,
      demo: {
        name: '天津旭达资产管理项目',
        shortName: '旭达资管',
        type: 0, // 0 定期 1 活期
        newNote: '',
        rateChartOpt: {},
        notes: [{
          id: 1,
          editActive: false,
          remindActive: true,
          textEdit: '2017年02月28日提息。',
          text: '2017年02月28日提息。',
          createdAt: new Date()
        }, {
          id: 2,
          editActive: false,
          remindActive: true,
          textEdit: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          text: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          createdAt: new Date()
        }, {
          id: 3,
          editActive: false,
          remindActive: true,
          textEdit: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          text: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          createdAt: new Date()
        }, {
          id: 4,
          editActive: false,
          remindActive: true,
          textEdit: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          text: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          createdAt: new Date()
        }],
        attachments: [{
          name: '资产合同'
        }, {
          name: '资产说明书'
        }],
        products: [{
          name: '甜橙起航理财计划D2',
          count: 1000,
          amount: 4715000,
          ratio: 0.14,
          todayEarning: 30000,
          totalEarning: 150000
        }, {
          name: '甜橙起航理财计划C2',
          count: 300,
          amount: 3905000,
          ratio: 0.12,
          todayEarning: 28000,
          totalEarning: 168000
        }],
        historyDeals: [{
          dealAt: new Date(),
          name: '甜橙起航理财计划D2',
          opType: '卖出',
          amount: '100020'
        }, {
          dealAt: new Date(),
          name: '甜橙起航理财计划C2',
          opType: '买入',
          amount: '180623'
        }]
      },
      costLists: [{
        charge: '中国银行',
        costtype: '托管费',
        profitType: '固定',
        billingMode: '固定费用',
        rate: '0.2%',
        billingDates: '360',
        costbase: '产品规模',
        payfrequency: '每月',
        startDate: '2016-8-8',
        already: ' ￥ 546,28.93 '
      }, {
        charge: '民生银行',
        costtype: ' 投资顾问费 ',
        profitType: '浮动',
        billingMode: ' 超额费用',
        rate: '无',
        billingDates: '无',
        costbase: '无',
        payfrequency: '每季',
        startDate: '2016-8-8',
        already: '￥ 4,324,324.33 '
      }],
      currentLists: [{
        charge: '招商银行',
        costtype: '托管费',
        profitType: '浮动',
        billingMode: '固定费用',
        rate: '0.2%',
        billingDates: '360',
        costbase: '产品规模',
        payfrequency: '每月',
        startDate: ' 2016-8-8    12:00:00 AM  ',
        already: '  35462893 '
      }, {
        charge: '京东金融',
        costtype: ' 投资顾问费 ',
        profitType: '固定',
        billingMode: ' 超额费用',
        rate: '无',
        billingDates: '无',
        costbase: '无',
        payfrequency: '每季',
        startDate: '2016-8-8    14:00:00 PM ',
        already: '432432433'
      }],
      accountLists: [{
        accountType: '募集账户',
        accountName: '北京和丰永讯金融信息服务有限公司',
        account: '1109 2037 8610 201',
        openAccount: '招商银行股份有限公司北京亚运村支行'
      }, {
        accountType: '产品账户',
        accountName: '广东金融高新区股权交易中心 ',
        account: '2232 1937 8710 871',
        openAccount: '招商银行股份有限公司广州番禹区支行'
      }],
      historyDatas: [{
        time: '2017年01月10日',
        assetsName: '创元开发建设投资企业融资项目',
        cztype: '买入',
        change: '24296355.00'
      }, {
        time: '2017年01月10日',
        assetsName: '创元开发建设投资企业融资项目',
        cztype: '买入',
        change: '-24296355.00'
      }],
      extractDatas: [{
        time: '2017年1月18日',
        charge: '招商银行',
        extract: '￥ 124,324.33',
        wait: '￥ 102,894.22'
      }, {
        time: '2017年01月20日',
        charge: '京东金融',
        extract: '￥ 117,346.66 ',
        wait: '￥ 185,974.45'
      }]
    }
  }
}
</script>

<style lang="scss">
.asset-detail {
  .el-upload-list__item {
    float: left;
    width: auto;
    margin-top: 10px;
    font-size: 13px;
    &:first-child {
      margin-top: 10px;
    }
  }
  .el-upload-list {
    overflow: hidden;
    margin-bottom: -15px;
  }
  .el-textarea textarea {
    font-size: 13px;
  }
}

.attachments-box {
  font-size: 13px;
  .el-upload-list__item {
    float: left;
    width: auto;
  }
  h3 {
    font-size: 13px;
    small {
      color: #929aa3;
    }
  }
}

.notes-box {
  .notes {
    padding-top: 20px;
  }
  .note-line {
    margin-bottom: 20px;
    position: relative;
    &:last-of-type {
      overflow: hidden;
    }
  }
  .note-time-line {
    float: left;
    width: 170px;
    text-align: center;
    padding-top: 35px;
  }
  .note-content {
    overflow: hidden;
    .created-time {
      color: #929aa3;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .operations {
      margin-bottom: 5px;
      text-align: right;
      font-size: 12px;
      color: #c9cdd1;
      .icon-close {
        display: inline-block;
        transform: scale(.8);
      }
      .icon-batonx {
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          color: #538cc0;
        }
      }
    }
  }
  label {
    padding-top: 15px;
    display: inline-block;
  }
  .el-textarea.is-disabled {
    .el-textarea__inner {
      color: #595f67;
      border-color: #e2e5e9;
      cursor: auto;
      background: white;
    }
  }
  .add-note-btn {
    margin: 10px 0 0 10px;
  }
  .icon-circle {
    display: inline-block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background: #c5e4f1;
    vertical-align: -2px;
    margin: 0 5px 0 8px;
    position: relative;
    &:before {
      width: 4px;
      position: absolute;
      content: '';
      height: 9em;
      background: #c5e4f1;
      top: -1em;
      left: 5px;
    }
  }
  .more-note {
    color: #595f67;
    cursor: pointer;
    &:hover {
      color: #538cc0;
    }
    .icon-down {
      margin-right: 10px;
      color: #538cc0;
    }
    margin-bottom: 10px;
  }
}

.upload-attachment {
  display: inline;
  margin-left: 10px;
}

.asset-panel {
  border-radius: 4px;
  // border: 1px solid #e7eaed;
  em {
    color: #de3569;
  }
}

.asset-panel-dashboard {
  .el-row {
    border-bottom: 1px solid #e7eaed;
    &:last-child {
      border-bottom: none;
    }
  }
  .panel-cell {
    padding: 35px;
  }
}

.asset-panel-products {
  .header {
    background: #e2f1f8;
    padding-left: 15px;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: #364f77;
    .buttons {
      float: right;
      button {
        font-size: 13px;
        margin-right: 10px;
      }
    }
  }
  table {
    width: 100%;
    th,
    td {
      color: #929aa3;
      font-weight: normal;
      text-align: left;
      padding: 15px;
      border-bottom: 1px solid #e7eaed;
    }
    tbody tr:last-child {
      th,
      td {
        border-bottom: 0;
      }
    }
  }
}

.td-button {
  padding: 5px 55px;
  .el-button {
    border: none;
    background: #538cc0;
    color: #fff;
    &:hover,
    &:focus {
      color: #fff;
      background: #538cc0;
    }
  }
}

.rate-chart {
  padding-top: 20px;
  border-radius: 4px;
  // border: 1px solid #e7eaed;
  width: 100%;
  height: 350px;
}

.todo {
  // padding:15px 0;
  table {
    table-layout: fixed;
    width: 100%;
    .first-tr {
      border-bottom: 1px solid #f3f6f8;
    }
    th,td{
      text-align: center;
    }
    td {
      padding: 25px 0;
      &.first-td-amount {
        padding-left: 15px;
        color: #f55923;
        font-weight: bold;
      }
      &.first-td-asset {
        padding-left: 15px;
        color: #1f98d9;
        font-weight: bold;
      }
      .amount-color {
        color: #de3569;
      }
      .y-operation {
        padding: 2px 0;
        a {
          display: inline;
          padding: 2px 5px;
          background: #538cc0;
          color: #fff;
          border-radius: 3px;
        }
      }
      .n-operation {
        padding: 2px 0;
        a {
          display: inline;
          padding: 2px 5px;
          background: #f3f6f8;
          border-radius: 3px;
        }
      }
      .already {
        color: #60b896;
      }
      .not {
        color: #de3569;
      }
    }
  }
}

.crux-date {
  padding: 15px;
  width:950px;
  margin:0 auto;
  img {
    width:100%;
    // height: 200px;
  }
}

.cruxamount {
  // padding:15px;
  dl {
    width: 200px;
    margin: 0 auto;
    dd,
    dt {
      padding: 5px;
    }
    dt {
      font-size: 18px;
      .amount-f {
        color: #d3d4d6;
      }
      .amount-c {
        color: #c0c9d4;
      }
    }
  }
}

.cruxamount-mes {
  dl {
    width: 300px;
    margin: 0 auto;
    dd {
      padding: 5px;
      .subsist-f {
        color: #c1c3c6;
      }
      .subsist-c {
        margin-left: 5px;
        color: #de3569;
      }
    }
    dt {
      margin-left: 30px;
      padding: 5px;
      // position: relative;
      .part {
        float: left;
        position: relative;
        // top:10px;
        left: 10px;
        // transform:translateY(-50%);
        height: 50px;
        width: 4px;
        background: #c5e4f1;
        &:before {
          content: '';
          position: absolute;
          width: 25px;
          height: 4px;
          background: #c5e4f1;
          top: 12px;
        }
        &:after {
          content: '';
          position: absolute;
          width: 25px;
          height: 4px;
          background: #c5e4f1;
          bottom: 0px;
          left: 0px;
        }
      }
      .principal-interest {
        float: left;
        margin-left: 40px;
        .principal {
          padding: 5px 0;
        }
        .interest {
          padding: 5px 0;
        }
      }
    }
  }
}

.history-record {
  float: right;
  a {
    color: #538cc0;
    font-size: 12px;
    font-weight: normal;
  }
}

.asset-list {
  padding: 15px;
  table {
    table-layout: fixed;
    width: 100%;
    th {
      text-align: left;
      font-weight: normal;
      color: #9ba2aa;
    }
    td {
      padding: 10px 0;
    }
  }
}
.asset-list-current{
  table{
    table-layout: fixed;
    width:100%;
    .first-tr{
      border-top:1px solid #e7eaed;
    }
    .two-tr{
      border-bottom:1px solid #e7eaed;
    }
    th{
      text-align: left;
      font-weight: normal;
      color:#9ba2aa;
      padding:10px 0;
      &:not(:first-child){
        border-bottom: 1px solid #e7eaed;
      }
    }
    td{
      padding:10px 0;
      &.first-td{
        padding-left:20px;
        font-size:13px;
        font-weight: bold;
      }
    }
  }
}
.extract-record{
  float:right;
  a{
    color: #538cc0;
    font-size: 12px;
    font-weight: normal;
  }
}
.cost-list{
  padding:15px;
  table{
    table-layout:fixed;
    width:100%;
    th{
      text-align: left;
      font-weight: normal;
      color:#9ba2aa;
    }
    td{
      padding:10px 0;
      .fixed{
        padding:0 3px;
        color:#fff;
        background: #acccd9;
        border-radius: 2px;
        margin-left:3px;
      }
      .float{
        padding:0 3px;
        color:#fff;
        background: #eea7b9;
        border-radius: 2px;
        margin-left:3px;
      }
    }
  }
}
.account-list{
  .account-table{
    padding:40px 30px;
    .account-table-n{
      border:1px solid #e7eaed;
      border-radius: 4px;
      padding:15px;
        .account-type{
          color:#595f67;
          font-size:13px;
          font-weight: bold;
        }
        .account-c{
          color:#538cc0;
        }
    }
  }
}
.bpm{
  padding:15px;
  dl{
    width:260px;
    margin:0 auto;
    dd{
      color:#abb1b8;
    }
    dt{
      padding:10px 0;
      color:#595f67;
      font-size:14px;
    }
  }
}
.positive{
  color:#de3569;
}
.negative{
  color:#16a474;
}
</style>
