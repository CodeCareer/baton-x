<template lang="pug">
  .overview
    .ov-today
      .overview-title 今日总览
      .ov-today-content
        .stock-width.fl
          .stock-width-pad
            .stock-product
              .stock-product-title 存量金额（元）
              .stock-product-num
                span {{23258838848.62 | ktCurrency}}
              .principal-interest
                label.interest.fl
                  span.interest-name 本金
                  span {{22358760178 | ktCurrency}}
                label.interest.fr
                  span.interest-name 利息
                  span {{12578670.62 | ktCurrency}}
        .stock-width.fl
          .stock-width-pad
            .acc-amount
              .stock-product-title 累计金额（元）
              .stock-product-num
                span {{435132838848.62 | ktCurrency}}
              .principal-interest
                label.interest.fl
                  span.interest-name 本金
                  span {{432258760178.00 | ktCurrency}}
                label.interest.fr
                  span.interest-name 利息
                  span {{42278670.62| ktCurrency}}
        .stock-width.fl
          .stock-width-pad
            .today-stock
              .stock-title
                .stock-title-name.fl 今日存量产品占比分析
                .stock-title-select.fr
                  el-select(v-model="name")
                    el-option(v-for="item in items", :key="item.value", :value="item.name",:disabled="item.disabled")
              .stock-echart
                kt-pie-chart(:chart-option="pieEchartOption")
    .ov-todo
      h3 待办事项
        //- .some-data.fr
        //-   span
        //-     em 1
        //-   | 条待审批，
        //-   span
        //-     em 12
        //-   | 条待执行，
        //-   span
        //-     em 2
        //-   | 条已执行，
        //-   span
        //-     em 3
        //-   | 条已过期
      .ov-todo-content
        .ov-content-title
          el-tabs(v-model='tab',type="border-card",@tab-click="tabClick")
            el-tab-pane.jd-bg(name="first")
              a(slot="label")
                img(src="../../assets/images/ov-jd.png")
                span {{filterProducts.length}}
              .ov-content-table
                table.ov-table-y
                  tbody
                    tr.first_tr(v-for="filterProduct of filterProducts")
                      td.first_td(width="200") {{filterProduct.name}}
                      td
                        table.ov-table-n
                          tbody
                            tr.first_tr(v-for="type in filterProduct.type")
                              td(width="50",:class="[type.assetType === '资金' ? 'capitalColor' : 'assetColor']",) {{type.assetType}}
                              td(width="50")
                                .afp(v-for="state of type.state") {{state}}
                                //- .redeem 赎回数据已更新
                              td(width="200")
                                .gs(v-for="company in type.company") {{company}}
                              td(width="150")
                                .afp-num(v-for="account in type.accounts") {{account | ktCurrency}}
                                //- .redeem-num {{16200234 | ktCurrency}}
                              td(style="text-align:center",width="50")
                                i.icon-batonx.icon-brackets(v-if="type.boole")
                              td(width="150").afp-num  {{type.Surplus | ktCurrency}}
                              td(width="70")
                                .in-approval(v-for="stated in type.stated")
                                  span(:class="stated | filterColor") {{stated}}
                                  i.icon-batonx.icon-shenpi(v-if="stated === '审批中'")
                                //- .executed.afp-num(v-if="false") 已执行
                                //- .unexecuted.redeem-num(v-if="false") 待执行
                              td 明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="findDialog(type,be=true)") 操作
                                .y-operation
                                  span(@click="assetsDialog(type,be=false)") 操作
                            //- tr
                            //-   td.ov-table-zc 资产
                            //-   td
                            //-     .afp 申购广发货币基金
                            //-     .redeem 卖出15北京城投债
                            //-   td
                            //-     .afp-num {{200184258 | ktCurrency}}
                            //-     .redeem-num {{16200234 | ktCurrency}}
                            //-   td
                            //-     i
                            //-   td
                            //-   td
                            //-     .in-approval(v-if="false")
                            //-       span 交款审批中
                            //-       i.icon-batonx.icon-shenpi(v-if="stated === '审批中'")
                            //-     .executed.afp-num(v-if="true") 已执行
                            //-     .unexecuted.redeem-num(v-if="true") 待执行
                            //-   td.afp 最晚明日12：00执行
                            //-   td.ov-table-last-td
                            //-     .n-operation
                            //-       span(@click="assetsDialog()") 操作
                            //-     .y-operation
                            //-       span(@click="assetsDialog()") 操作
                    //- tr
                    //-   td.first_td(width="200") 京东活期理财计划丰银宝b
                    //-   td
                    //-     table.ov-table-n
                    //-       tbody
                    //-         tr
                    //-           td.ov-table-zc 资产
                    //-           td
                    //-             .afp 申购广发货币基金
                    //-             .redeem 卖出15北京城投债
                    //-           td
                    //-             .afp-num {{200184258 | ktCurrency}}
                    //-             .redeem-num {{16200234 | ktCurrency}}
                    //-           td
                    //-             i
                    //-           td
                    //-           td
                    //-             .in-approval(v-if="false")
                    //-               span 交款审批中
                    //-               i.icon-batonx.icon-shenpi(v-if="stated === '审批中'")
                    //-             .executed.afp-num(v-if="true") 已执行
                    //-             .unexecuted.redeem-num(v-if="true") 待执行
                    //-           td.afp 最晚明日12：00执行
                    //-           td.ov-table-last-td
                    //-             .n-operation
                    //-               span(@click="assetsDialog()") 操作
                    //-             .y-operation
                    //-               span(@click="assetsDialog()") 操作
            el-tab-pane(name="second")
              a(slot="label")
                img(src="../../assets/images/ov-tc.png")
                span 2
              .ov-content-table
                table.ov-table-y
                  tbody
                    tr.first_tr(v-for="filterProduct of filterProducts")
                      td.first_td(width="200") {{filterProduct.name}}
                      td
                        table.ov-table-n
                          tbody
                            tr.first_tr(v-for="type in filterProduct.type")
                              td(width="50",:class="[type.assetType === '资金' ? 'capitalColor' : 'assetColor']",) {{type.assetType}}
                              td(width="50")
                                .afp(v-for="state of type.state") {{state}}
                                //- .redeem 赎回数据已更新
                              td(width="200")
                                .gs(v-for="company in type.company") {{company}}
                              td(width="150")
                                .afp-num(v-for="account in type.accounts") {{account | ktCurrency}}
                                //- .redeem-num {{16200234 | ktCurrency}}
                              td(style="text-align:center",width="50")
                                i.icon-batonx.icon-brackets(v-if="type.boole")
                              td(width="150").afp-num  {{type.Surplus | ktCurrency}}
                              td(width="70")
                                .in-approval(v-for="stated in type.stated")
                                  span(:class="stated | filterColor") {{stated}}
                                  i.icon-batonx.icon-shenpi(v-if="stated === '审批中'")
                                //- .executed.afp-num(v-if="false") 已执行
                                //- .unexecuted.redeem-num(v-if="false") 待执行
                              td 明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="findDialog(type,be=true)") 操作
                                .y-operation
                                  span(@click="assetsDialog(type,be=false)") 操作

            el-tab-pane(name="third")
              a(slot="label")
                img(src="../../assets/images/ov-tn.png")
                span 2
              .ov-content-table
                table.ov-table-y
                  tbody
                    tr.first_tr(v-for="filterProduct of filterProducts")
                      td.first_td(width="200") {{filterProduct.name}}
                      td
                        table.ov-table-n
                          tbody
                            tr.first_tr(v-for="type in filterProduct.type")
                              td(width="50",:class="[type.assetType === '资金' ? 'capitalColor' : 'assetColor']",) {{type.assetType}}
                              td(width="50")
                                .afp(v-for="state of type.state") {{state}}
                                //- .redeem 赎回数据已更新
                              td(width="200")
                                .gs(v-for="company in type.company") {{company}}
                              td(width="150")
                                .afp-num(v-for="account in type.accounts") {{account | ktCurrency}}
                                //- .redeem-num {{16200234 | ktCurrency}}
                              td(style="text-align:center",width="50")
                                i.icon-batonx.icon-brackets(v-if="type.boole")
                              td(width="150").afp-num  {{type.Surplus | ktCurrency}}
                              td(width="70")
                                .in-approval(v-for="stated in type.stated")
                                  span(:class="stated | filterColor") {{stated}}
                                  i.icon-batonx.icon-shenpi(v-if="stated === '审批中'")
                                //- .executed.afp-num(v-if="false") 已执行
                                //- .unexecuted.redeem-num(v-if="false") 待执行
                              td 明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="findDialog(type,be=true)") 操作
                                .y-operation
                                  span(@click="assetsDialog(type,be=false)") 操作
            el-tab-pane(name="fourth")
              a(slot="label")
                img(src="../../assets/images/ov-ncf.png")
                span 2
              .ov-content-table
                table.ov-table-y
                  tbody
                    tr.first_tr(v-for="filterProduct of filterProducts")
                      td.first_td(width="200") {{filterProduct.name}}
                      td
                        table.ov-table-n
                          tbody
                            tr.first_tr(v-for="type in filterProduct.type")
                              td(width="50",:class="[type.assetType === '资金' ? 'capitalColor' : 'assetColor']",) {{type.assetType}}
                              td(width="50")
                                .afp(v-for="state of type.state") {{state}}
                                //- .redeem 赎回数据已更新
                              td(width="200")
                                .gs(v-for="company in type.company") {{company}}
                              td(width="150")
                                .afp-num(v-for="account in type.accounts") {{account | ktCurrency}}
                                //- .redeem-num {{16200234 | ktCurrency}}
                              td(style="text-align:center",width="50")
                                i.icon-batonx.icon-brackets(v-if="type.boole")
                              td(width="150").afp-num  {{type.Surplus | ktCurrency}}
                              td(width="70")
                                .in-approval(v-for="stated in type.stated")
                                  span(:class="stated | filterColor") {{stated}}
                                  i.icon-batonx.icon-shenpi(v-if="stated === '审批中'")
                                //- .executed.afp-num(v-if="false") 已执行
                                //- .unexecuted.redeem-num(v-if="false") 待执行
                              td 明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="findDialog(type,be=true)") 操作
                                .y-operation
                                  span(@click="assetsDialog(type,be=false)") 操作
    .ov-remind
      h3 提醒
      .ov-remind-table
        table
          tbody
            tr(v-if="isclose",@click="toDetail('恒耀稳享5016期')")
              td.first-td 恒耀稳享5016期
              td
                .nature
                 | 开放
                .remarks
                  span 备注:预计净赎回五千万左右货币基金
              td
              td  3月01日12：00--3月02日11：00
            tr(@click="toDetail('恒耀稳享3006期')")
              td.first-td 恒耀稳享3006期
              td
                .nature
                 | 募集期
                .remarks
                  span 备注:预计净赎回五千万左右货币基金
              td
                .issue-amount 发行金额：
                  span.afp-num {{ 188184258 | ktCurrency}}
                .trial-amount(v-if="false") 试算金额：
                  span  {{ 200184258 | ktCurrency}}
              td 3月01日12：00--3月02日11：00
            tr(@click="toDetail('恒存金-灵活理财A')")
              td.first-td 恒存金-灵活理财A
              td
                .nature
                 | 到期
                .remarks
                  span 备注:预计净赎回五千万左右货币基金
              td
                .issue-amount 发行金额：
                  span.afp-num {{ 188184258 | ktCurrency}}
                .trial-amount(v-if="false") 试算金额：
                  span  {{ 200184258 | ktCurrency}}
              td 3月01日12：00--3月02日11：00
    .ov-calendar
      h3 日历
      .ov-calendar-content
        .calendar-top
          i.icon-batonx.icon-left(@click="addweek(-1)")
          span {{2}}月 &nbsp 第{{1}}周
          i.icon-batonx.icon-right(@click="addweek(+1)")
        .calendar-middle
          .calender-cell.fl 周日
          .calender-cell.fl  周一
          .calender-cell.fl 周二
          .calender-cell.fl  周三
          .calender-cell.fl  周四
          .calender-cell.fl  周五
          .calender-cell.fl  周六
        .calendar-bottom
          .calendar-bottom-y.fl(v-for="date in dates")
            .calendar-bottom-n(@click="findCalendar(date)")
              .calendar-num {{date.date}}
              .calendar-table
                table
                  tbody
                    tr(v-for="tableData in date.tableDatas")
                      td.td-left {{tableData.state}}
                      td.td-right {{tableData.num}}

    product-dialog(ref="productDialog")
    calendar-dialog(ref="calendarDialog")
    asset-dialog(ref="assetDialog")
</template>

<script>
import CalendarDialog from '@/components/CalendarDialog.vue'
import AssetDialog from '@/components/AssetDialog.vue'
import KtPieChart from '@/components/PieEchart'
import ProductDialog from '@/components/ProductDialog.vue'
import exMixin from '@/common/mixin.js'
// import moment from 'moment'
import {
  filter
} from 'lodash'
export default {
  mixins: [exMixin],
  components: {
    KtPieChart,
    CalendarDialog,
    ProductDialog,
    AssetDialog
  },
  // computed: {
  //   weeks() {
  //     let date = new Date(`${this.year}/${this.month + 1}/1`)
  //     let first = date.getDay() // 第一天星期几
  //     let done = false // 本月是否已遍历完成
  //     let weeks = [1, 2, 3, 4, 5, 6].map((week, weekIndex) => { // 一月最多6周
  //       return [1, 2, 3, 4, 5, 6, 7].map((day, dayIndex) => { // 每周7天
  //         // 如果是本月1日之前
  //         if ((weekIndex === 0 && dayIndex < first) || done) {
  //           return null
  //         }

  //         let today = new Date(date.getTime())
  //         today.setDate(today.getDate() + weekIndex * 7 + dayIndex - first)

  //         let dayNumber = today.getDate()

  //         if (dayNumber === 1 && weekIndex > 0) {
  //           done = true
  //           return null
  //         } else {
  //           return dayNumber
  //         }
  //       })
  //     }).filter(week => week.filter(day => day).length > 0) // 过滤空数组，因为不是每个月都能有6周
  //     console.warn(weeks)
  //     return weeks
  //   }
  //   },
  computed: {
    filterProducts() {
      return filter(this.needDatas, v => {
        return this.filter.id === v.id
      })
    }
  },
  methods: {
    toDetail(str) {
      this.$router.push({
        name: 'ProductDetail',
        params: {
          id: str || ''
        },
        query: {
          type: '0'
        }
      })
    },
    findDialog(data, boole) {
      this.$refs.productDialog.showDialog(data, boole)
    },
    findCalendar(data) {
      // this.calendardatas = data
      this.$refs.calendarDialog.lookDialog(data)
    },
    assetsDialog(data, boole) {
      this.$refs.assetDialog.showDialog(data, boole)
    },
    closeRemarks() {
      this.isclose = false
    },
    tabClick(tab) {
      if (tab.name === 'first') {
        this.filter.id = 0
      } else if (tab.name === 'second') {
        this.filter.id = 1
      } else if (tab.name === 'third') {
        this.filter.id = 2
      } else {
        this.filter.id = 3
      }
    }
  },

  data() {
    return {
      tab: 'first',
      filter: {
        id: 0
      },
      // calendardatas: null,
      dialogShow: false,
      year: 2017,
      moment: 5,
      isclose: true,
      needDatas: [{
        name: '丰银宝A',
        id: 0,
        type: [{
          productName: '丰银宝A',
          assetType: '资金',
          state: ['已更新', '已更新'],
          company: [],
          accounts: [1235325236, 435346632],
          Surplus: 799978640,
          boole: true,
          stated: ['审批中']
        }, {
          productName: '丰银宝A',
          assetType: '资产',
          state: ['申购', '赎回'],
          company: ['广发货币基金', '天弘余额宝'],
          accounts: [34573477, 484456825],
          Surplus: '',
          stated: ['待执行', '已执行']
        }]
      }, {
        name: '丰银宝B',
        id: 0,
        type: [{
          productName: '丰银宝B',
          assetType: '资产',
          state: ['买入', '赎回'],
          company: ['宝信国际ABS集合信托', '广发货币基金'],
          accounts: [2343526536, 35434546],
          Surplus: '',
          stated: ['已执行', '待执行']
        }]
      }, {
        name: '甜橙宝',
        id: 1,
        type: [{
          productName: '甜橙宝',
          assetType: '资金',
          state: ['已更新', '未更新'],
          company: [],
          accounts: [124535236, '-'],
          Surplus: '-',
          stated: ['待执行']
        }, {
          productName: '甜橙宝',
          assetType: '资产',
          state: ['申购', '赎回'],
          company: ['天弘余额宝', '易方达货币基金'],
          accounts: [3467573477, 2484456825],
          Surplus: '',
          stated: ['待执行', '已执行']
        }]
      }, {
        name: '甜橙定期尊享3001',
        id: 1,
        type: [{
          productName: '甜橙定期尊享3001',
          assetType: '资产',
          state: ['买入'],
          company: ['天津旭达过桥资管计划1号'],
          accounts: [8565858768],
          Surplus: '',
          stated: ['审批中']
        }]
      }, {
        name: '途牛灵活宝',
        id: 2,
        type: [{
          productName: '途牛灵活宝',
          assetType: '资金',
          state: ['已更新', '已更新'],
          company: [],
          boole: true,
          accounts: [7454352636, 9674573456],
          Surplus: 2220220820,
          stated: ['已执行']
        }, {
          productName: '途牛灵活宝',
          assetType: '资产',
          state: ['申购', '赎回'],
          company: ['盛京银行协议存款', '华夏货币基金'],
          accounts: [34573477, 484456825],
          Surplus: '',
          stated: ['审批中', '审批中']
        }]
      }, {
        name: '牛稳赚3号理财计划',
        id: 2,
        type: [{
          productName: '牛稳赚3号理财计划',
          assetType: '资产',
          state: ['赎回'],
          company: ['广发货币基金'],
          accounts: [35434546],
          Surplus: '',
          stated: ['待执行']
        }]
      }, {
        name: '财富变现通',
        id: 3,
        type: [{
          productName: '财富变现通',
          assetType: '资金',
          state: ['未更新', '已更新'],
          company: [],
          accounts: ['-', 3743536632],
          Surplus: '-',
          stated: ['待执行']
        }, {
          productName: '财富变现通',
          assetType: '资产',
          state: ['申购', '赎回'],
          company: ['天弘余额宝', '广发货币基金'],
          accounts: [34567347, 5844576825],
          Surplus: '',
          stated: ['待执行', '已执行']
        }]
      }, {
        name: '360聚财88期',
        id: 3,
        type: [{
          productName: '360聚财88期',
          assetType: '资产',
          state: ['到期', '买入'],
          company: ['广西中小担-象翌融资信托计划3号', '易方达货币基金'],
          accounts: [243526536, 65434546],
          Surplus: '',
          stated: ['审批中', '审批中']
        }]
      }],
      dates: [{
        date: '31',
        time: '5月22日' + '星期日'
          // tableDatas: [
          //   {
          //     state: '发行',
          //     num: '1',
          //     fxdatas: [{
          //       name: '智鑫2号”理财计划',
          //       platform: '京东金服'
          //     }]
          //   },
          //   {
          //     state: '到期',
          //     num: '2',
          //     dqdatas: [{
          //       name: '凤溢盈-PHZL-6个月',
          //       platform: '美易理财'
          //     }, {
          //       name: '凤溢盈-PHZL-6个月',
          //       platform: '苏宁金融'
          //     }]
          //   },
          //   {
          //     state: '开放',
          //     num: '1',
          //     kfdatas: [{
          //       name: '万惠金-月月尊-11552',
          //       platform: '万达财富'
          //     }]
          //   },
          //   {
          //     state: '提费',
          //     num: '1',
          //     tfdatas: [{
          //       name: '美信宝-粤盈6期4号',
          //       platform: '美易理财'
          //     }]
          //   },
          //   {
          //     state: '付息',
          //     num: '2',
          //     fxdatas: [{
          //       name: '财富赢-普惠235A期',
          //       platform: ' 绿地金服'
          //     }, {
          //       name: '海信宝587期21-270',
          //       platform: '聚宝汇'
          //     }]
          //   },
          //   {
          //     state: '试算',
          //     num: '1',
          //     ssdatas: [{
          //       name: '京禾宝”理财计划',
          //       platform: ' 途牛金服'
          //     }]
          //   }
          // ]
      }, {
        date: '1',
        time: '5月23日' + '星期一',
        tableDatas: [{
          state: '发行',
          num: '1',
          datas: [{
            name: '智鑫2号”理财计划',
            amount: '￥123，850，01.91',
            platform: '京东金服'
          }]
        }, {
          state: '到期',
          num: '1',
          datas: [{
            name: '凤溢盈-PHZL-6个月',
            amount: '￥123，850.1',
            platform: '美易理财'
          }]
        }, {
          state: '开放',
          num: '1',
          datas: [{
            name: '万惠金-月月尊-11552',
            amount: '',
            platform: '万达财富'
          }]
        }, {
          state: '提费',
          num: '1',
          datas: [{
            name: '美信宝-粤盈6期4号',
            amount: '￥910，90',
            platform: '美易理财'
          }]
        }, {
          state: '付息',
          num: '2',
          datas: [{
            name: '财富赢-普惠235A期',
            amount: '￥1231',
            platform: ' 绿地金服'
          }, {
            name: '海信宝587期21-270',
            amount: '￥123，850，01.91',
            platform: '聚宝汇'
          }]
        }]
      }, {
        date: '2',
        time: '5月24日' + '星期二',
        tableDatas: [{
          state: '发行',
          num: '1',
          datas: [{
            name: '智鑫2号”理财计划',
            amount: '￥123，850',
            platform: '京东金服'
          }]
        }, {
          state: '到期',
          num: '2',
          datas: [{
            name: '凤溢盈-PHZL-6个月',
            amount: '￥123，891',
            platform: '美易理财'
          }, {
            name: '凤溢盈-PHZL-12个月',
            amount: '￥850，01.91',
            platform: '苏宁金融'
          }]
        }, {
          state: '提费',
          num: '1',
          datas: [{
            name: '美信宝-粤盈6期4号',
            amount: '￥123，8501',
            platform: '美易理财'
          }]
        }, {
          state: '付息',
          num: '2',
          datas: [{
            name: '财富赢-普惠235A期',
            amount: '￥1',
            platform: ' 绿地金服'
          }, {
            name: '海信宝587期21-270',
            amount: '￥123，85',
            platform: '聚宝汇'
          }]
        }, {
          state: '试算',
          num: '1',
          datas: [{
            name: '京禾宝”理财计划',
            amount: '￥1201.91',
            platform: ' 途牛金服'
          }]
        }]
      }, {
        date: '3',
        time: '5月25日' + '星期三',
        tableDatas: [{
          state: '发行',
          num: '1',
          datas: [{
            name: '智鑫2号”理财计划',
            amount: '￥1230，01.91',
            platform: '京东金服'
          }]
        }, {
          state: '到期',
          num: '2',
          datas: [{
            name: '凤溢盈-PHZL-6个月',
            amount: '￥123.91',
            platform: '美易理财'
          }, {
            name: '凤溢盈-PHZL-12个月',
            amount: '￥850，01.91',
            platform: '美易理财'
          }]
        }, {
          state: '开放',
          num: '1',
          datas: [{
            name: '万惠金-月月尊-11552',
            amount: '￥123，81',
            platform: '万达财富'
          }]
        }]
      }, {
        date: '4',
        time: '5月26日' + '星期四',
        tableDatas: [{
          state: '开放',
          num: '1',
          datas: [{
            name: '万惠金-月月尊-11552',
            amount: '￥1201.91',
            platform: '万达财富'
          }]
        }, {
          state: '提费',
          num: '1',
          datas: [{
            name: '美信宝-粤盈6期4号',
            amount: '￥12391',
            platform: '美易理财'
          }]
        }, {
          state: '付息',
          num: '2',
          datas: [{
            name: '财富赢-普惠235A期',
            amount: '￥12391',
            platform: ' 绿地金服'
          }, {
            name: '海信宝587期21-270',
            amount: '￥121',
            platform: '聚宝汇'
          }]
        }, {
          state: '试算',
          num: '1',
          datas: [{
            name: '京禾宝”理财计划',
            amount: '￥1291',
            platform: ' 途牛金服'
          }]
        }]
      }, {
        date: '5',
        time: '5月27日' + '星期五',
        tableDatas: [{
          state: '发行',
          num: '1',
          datas: [{
            name: '智鑫2号”理财计划',
            amount: '￥1232321',
            platform: '京东金服'
          }]
        }, {
          state: '付息',
          num: '2',
          datas: [{
            name: '财富赢-普惠235A期',
            amount: '￥482834',
            platform: ' 绿地金服'
          }, {
            name: '海信宝587期21-270',
            amount: '￥9495030',
            platform: '聚宝汇'
          }]
        }, {
          state: '试算',
          num: '1',
          datas: [{
            name: '京禾宝”理财计划',
            amount: '￥2343434',
            platform: ' 途牛金服'
          }]
        }]
      }, {
        date: '6',
        time: '5月28日' + '星期六'
          // tableDatas: [
          //   {
          //     state: '发行',
          //     num: '1',
          //     fxdatas: [{
          //       name: '智鑫2号”理财计划',
          //       platform: '京东金服'
          //     }]
          //   },
          //   {
          //     state: '到期',
          //     num: '2',
          //     dqdatas: [{
          //       name: '凤溢盈-PHZL-6个月',
          //       platform: '美易理财'
          //     }, {
          //       name: '凤溢盈-PHZL-6个月',
          //       platform: '苏宁金融'
          //     }]
          //   },
          //   {
          //     state: '开放',
          //     num: '1',
          //     kfdatas: [{
          //       name: '万惠金-月月尊-11552',
          //       platform: '万达财富'
          //     }]
          //   },
          //   {
          //     state: '提费',
          //     num: '1',
          //     tfdatas: [{
          //       name: '美信宝-粤盈6期4号',
          //       platform: '美易理财'
          //     }]
          //   },
          //   {
          //     state: '付息',
          //     num: '2',
          //     fxdatas: [{
          //       name: '财富赢-普惠235A期',
          //       platform: ' 绿地金服'
          //     }, {
          //       name: '海信宝587期21-270',
          //       platform: '聚宝汇'
          //     }]
          //   },
          //   {
          //     state: '试算',
          //     num: '1',
          //     ssdatas: [{
          //       name: '京禾宝”理财计划',
          //       platform: ' 途牛金服'
          //     }]
          //   }
          // ]
      }],
      pieEchartOption: {
        legend: {
          data: [
            '京东金融',
            '甜橙理财',
            '网金社',
            '乐视金融',
            '恒大金融',
            '线下认购'
          ]
        },
        series: [{
          name: '',
          type: 'pie',
          center: ['70%', '50%'],
          radius: ['50%', '80%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '25',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 330,
            name: '京东金融'
          }, {
            value: 330,
            name: '甜橙理财'
          }, {
            value: 330,
            name: '网金社'
          }, {
            value: 330,
            name: '乐视金融'
          }, {
            value: 330,
            name: '恒大金融'
          }, {
            value: 330,
            name: '线下认购'
          }]
        }]
      },
      items: [{
        name: '平台分布',
        value: '选项1'
      }, {
        name: '产品类型分布',
        value: '选项2',
        disabled: true
      }, {
        name: '期限分布',
        value: '选项3',
        disabled: true
      }],
      name: '平台分布'
    }
  }
}
</script>
<style lang="scss">
.overview {
  .overview-title {
    font-size: 15px;
    color: #595f67;
    padding-bottom: 10px;
  }
  h3 {
    font-size: 15px;
    color: #595f67;
    padding: 10px 0;
  }
  .afp-num {
    color: #e98da4;
    &:last-child{
      color:#82c5aa;
    }
  }
  .redeem-num {
    color: #82c5aa;
  }
  .ov-today-content {
    overflow: hidden;
    margin: 0 -5px;
    .stock-width {
      width: 33.3%;
      .stock-width-pad {
        padding: 0 5px;
      }
    }
    .stock-product,
    .acc-amount,
    .today-stock {
      border: 1px solid #e2e5e9;
      border-radius: 3px;
      width: 100%;
      // padding:0 5px;
    }
    .stock-product-title {
      padding: 10px 10px 0 10px;
    }
    .stock-product-num {
      text-align: center;
      font-size: 18px;
      color: #627d9a;
      padding: 40px;
    }
    .principal-interest {
      padding: 15px 10px;
      background: #f3f6f8;
      overflow: hidden;
    }
    .interest-name {
      font-size: 13px;
      color: #595f67;
      font-weight: bold;
      margin-right: 5px;
    }
    .acc-amount {
      // margin: 0 1.5%;
    }
    .today-stock {
      height: 187px;
      .stock-title {
        overflow: hidden;
        padding: 10px 10px 0 10px;
        .el-input__inner {
          height: auto;
          width: 140px;
          background: #f3f6f8;
        }
      }
      .stock-echart {
        padding: 10px;
        position: relative;
      }
    }
  }
  .ov-todo {
    .some-data {
      font-size: 13px;
      color: #d1d4d7;
      em {
        font-style: normal;
        color: #627d9a;
        margin-right: 5px;
      }
    }
    .ov-todo-content {
      border-radius: 5px;
      border: 1px solid #e3e6ea;
      // .el-tabs__header{
      //   border-bottom: none;
      // }
      .el-tabs--border-card {
        box-shadow: none;
        border: none;
      }
    }
    .ov-content-title {
      .el-tabs__header {
        background: #f3f6f8;
      }
      .el-tabs__content {
        padding: 15px 0;
      }
      .el-tabs__item {
        &:first-child {
          &.is-active {
            border-radius: 4px 0 0 0;
          }
        }
        img {
          width: 75px;
          height: 17px;
          vertical-align: middle;
        }
        span {
          padding: 1px 4px;
          border-radius: 3px;
          color: #fff;
          background: #538cc0;
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      .ov-content-table {
        .first_tr {
          border-bottom: 1px solid #f3f6f8;
          &:last-child{
            border:none;
          }
        }
        .first_td {
          padding-left: 20px;
          font-size: 13px;
          color: #595f67;
          font-weight: bold;
        }
        .ov-table-y {
          width: 100%;
          border-collapse: collapse;
        }
        .ov-table-n {
          width: 100%;
          // table-layout: fixed;
          border-collapse: collapse;
          td {
            padding: 10px 0;
          }
          .icon-brackets {
            font-size: 25px;
            color: #d8dadd;
          }
          .capitalColor {
            color: #f55923;
            width:50px;
          }
          .assetColor {
            color: #1f98d9;
            width:50px;
          }
          .afp,
          .redeem {
            color: #595f67;
          }
          .ov-table-last-td {
            .n-operation {
              padding: 2px 0;
              span {
                padding: 2px 5px;
                background: #538cc0;
                cursor: pointer;
                color: #fff;
                border-radius: 3px;
              }
            }
            .y-operation {
              padding: 2px 0;
              span {
                padding: 2px 5px;
                cursor: pointer;
                border-radius: 3px;
                background: #f3f6f8;
              }
            }
          }
        }
      }
    }
  }
  .ov-remind {
    .ov-remind-table {
      border: 1px solid #e3e6ea;
      // padding: 15px 20px;
      border-radius: 5px;
      table {
        width: 100%;
        table-layout: fixed;
        .first-td {
          font-size: 13px;
          color: #595f67;
          font-weight: bold;
          padding-left: 15px;
        }
        tr:hover {
          background: #f3f6f8;
        }
        td {
          padding: 15px 0;
          color: #595f67;
          cursor: pointer;
        }
        .remarks {
          background: #f3f6f8;
          padding: 0px 5px;
          display: inline-block;
          border-radius: 3px;
          margin: 5px 0;
          i {
            font-size: 12px;
            color: #929aa3;
            margin-left: 10px;
            vertical-align: -1px;
            cursor: pointer;
            display: inline-block;
            transform: scale(0.8);
          }
        }
      }
    }
  }
  .ov-calendar {
    .ov-calendar-content {
      border: 1px solid #f3f6f8;
      border-radius: 5px;
      .calendar-top {
        background: #f3f6f8;
        height: 40px;
        line-height: 40px;
        text-align: center;
        i {
          padding: 0 20px;
          font-size: 12px;
          color: #939ba4;
          cursor: pointer;
          &:hover,
          &:focus {
            color: #538cc0;
          }
        }
      }
      .calendar-middle {
        width: 100%;
        overflow: hidden;
        height: 40px;
        line-height: 40px;
      }
      .calender-cell {
        width: 14.28%;
        text-align: center;
      }
      .calendar-bottom {
        overflow: hidden;
        padding-bottom: 20px;
        .calendar-bottom-y {
          width: 14.28%;
          padding: 1px 1px;
        }
        .calendar-bottom-n {
          padding: 10px;
          border-radius: 3px;
          background: #f3f6f8;
          height: 200px;
          &:hover {
            cursor: pointer;
            background: #c5e4f1;
          }
          .calendar-num {
            padding: 5px 0;
            text-align: right;
          }
          .calendar-table {
            table {
              width: 100%;
              table-layout: fixed;
              .td-left {
                text-align: left;
              }
              .td-right {
                text-align: right;
                color: #e85b51;
              }
            }
          }
        }
      }
    }
  }
}
.jd-bg {
  border-radius: 5px 0 0 0;
}
.waitC {
      color: #eb7c72;
    }
.ok1C {
  color: #18b8ba;
}
.ok2C {
  color: #538cc0;
}
</style>
