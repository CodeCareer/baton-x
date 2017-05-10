<template lang="pug">
  .overview
    .ov-today
      .overview-title 今日总览
      .ov-today-content
        .stock-width.fl
          .stock-width-pad
            .stock-product
              .stock-product-title 存量产品（元）
              .stock-product-num
                span {{58838848.62 | ktCurrency}}
              .principal-interest
                label.interest.fl
                  span.interest-name 本金
                  span {{58760178 | ktCurrency}}
                label.interest.fr
                  span.interest-name 利息
                  span {{78670.62 | ktCurrency}}
        .stock-width.fl
          .stock-width-pad
            .acc-amount
              .stock-product-title 存量产品（元）
              .stock-product-num
                span {{132838848.62 | ktCurrency}}
              .principal-interest
                label.interest.fl
                  span.interest-name 本金
                  span {{58760178.00 | ktCurrency}}
                label.interest.fr
                  span.interest-name 利息
                  span {{78670.62| ktCurrency}}
        .stock-width.fl
          .stock-width-pad
            .today-stock
              .stock-title
                .stock-title-name.fl 今日存量产品占比分析
                .stock-title-select.fr
                  el-select(v-model="name")
                    el-option(v-for="item in items", :key="item.value", :value="item.name")
              .stock-echart
                kt-pie-chart(:chart-option="pieEchartOption")
    .ov-todo.all-padding
      h3 待办事项
        .some-data.fr
          span
            em 1
          | 条待审批，
          span
            em 12
          | 条待执行，
          span
            em 2
          | 条已执行，
          span
            em 3
          | 条已过期
      .ov-todo-content
        .ov-content-title
          el-tabs(type="border-card")
            el-tab-pane
              a(slot="label")
                img(src="../../assets/images/ov-jd.png")
                span 1
              .ov-content-table
                table.ov-table-y
                  tbody
                    tr.first_tr
                      td.first_td(width="200") 京东活期理财计划丰银宝a
                      td
                        table.ov-table-n
                          tbody
                            tr.first_tr
                              td.ov-table-zj 资金
                              td
                                .afp 申购数据已更新
                                .redeem 赎回数据已更新
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td.afp-num  {{183984024 | ktCurrency}}
                              td
                                .in-approval
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="false") 已执行
                                .unexecuted.redeem-num(v-if="false") 待执行
                              td 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="findDialog()") 操作
                                .y-operation
                                  span(@click="findDialog()") 操作
                            tr
                              td.ov-table-zc 资产
                              td
                                .afp 申购广发货币基金
                                .redeem 卖出15北京城投债
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td
                              td
                                .in-approval(v-if="false")
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="true") 已执行
                                .unexecuted.redeem-num(v-if="true") 待执行
                              td.afp 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="assetsDialog()") 操作
                                .y-operation
                                  span(@click="assetsDialog()") 操作
                    tr
                      td.first_td(width="200") 京东活期理财计划丰银宝b
                      td
                        table.ov-table-n
                          tbody
                            tr
                              td.ov-table-zc 资产
                              td
                                .afp 申购广发货币基金
                                .redeem 卖出15北京城投债
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td
                              td
                                .in-approval(v-if="false")
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="true") 已执行
                                .unexecuted.redeem-num(v-if="true") 待执行
                              td.afp 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="assetsDialog()") 操作
                                .y-operation
                                  span(@click="assetsDialog()") 操作
            el-tab-pane
              a(slot="label")
                img(src="../../assets/images/ov-tc.png")
                span 13
              .ov-content-table
                table.ov-table-y
                  tbody
                    tr.first_tr
                      td.first_td(width="200") 甜橙理财理财计划丰银宝a
                      td
                        table.ov-table-n
                          tbody
                            tr.first_tr
                              td.ov-table-zj 资金
                              td
                                .afp 申购数据已更新
                                .redeem 赎回数据已更新
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td.afp-num  {{183984024 | ktCurrency}}
                              td
                                .in-approval
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="false") 已执行
                                .unexecuted.redeem-num(v-if="false") 待执行
                              td 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="findDialog()") 操作
                                .y-operation
                                  span(@click="findDialog()") 操作
                            tr
                              td.ov-table-zc 资产
                              td
                                .afp 申购广发货币基金
                                .redeem 卖出15北京城投债
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td
                              td
                                .in-approval(v-if="false")
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="true") 已执行
                                .unexecuted.redeem-num(v-if="true") 待执行
                              td.afp 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="findDialog()") 操作
                                .y-operation
                                  span(@click="findDialog()") 操作
                    tr
                      td.first_td(width="200") 甜橙理财理财计划丰银宝b
                      td
                        table.ov-table-n
                          tbody
                            tr
                              td.ov-table-zc 资产
                              td
                                .afp 申购广发货币基金
                                .redeem 卖出15北京城投债
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td
                              td
                                .in-approval(v-if="false")
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="true") 已执行
                                .unexecuted.redeem-num(v-if="true") 待执行
                              td.afp 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span(@click="findDialog()") 操作
                                .y-operation
                                  span(@click="findDialog()") 操作

            el-tab-pane
              a(slot="label")
                img(src="../../assets/images/ov-tn.png")
                span 1
              .ov-content-table
                table.ov-table-y
                  tbody
                    tr.first_tr
                      td.first_td(width="200") 途牛金服理财计划丰银宝a
                      td
                        table.ov-table-n
                          tbody
                            tr.first_tr
                              td.ov-table-zj 资金
                              td
                                .afp 申购数据已更新
                                .redeem 赎回数据已更新
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td.afp-num  {{183984024 | ktCurrency}}
                              td
                                .in-approval
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="false") 已执行
                                .unexecuted.redeem-num(v-if="false") 待执行
                              td 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span 操作
                                .y-operation
                                  span 操作
                            tr
                              td.ov-table-zc 资产
                              td
                                .afp 申购广发货币基金
                                .redeem 卖出15北京城投债
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td
                              td
                                .in-approval(v-if="false")
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="true") 已执行
                                .unexecuted.redeem-num(v-if="true") 待执行
                              td.afp 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span 操作
                                .y-operation
                                  span 操作
                    tr
                      td.first_td(width="200") 途牛金服理财计划丰银宝b
                      td
                        table.ov-table-n
                          tbody
                            tr
                              td.ov-table-zc 资产
                              td
                                .afp 申购广发货币基金
                                .redeem 卖出15北京城投债
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td
                              td
                                .in-approval(v-if="false")
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="true") 已执行
                                .unexecuted.redeem-num(v-if="true") 待执行
                              td.afp 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span 操作
                                .y-operation
                                  span 操作
            el-tab-pane
              a(slot="label")
                img(src="../../assets/images/ov-ncf.png")
                span 1
              .ov-content-table
                table.ov-table-y
                  tbody
                    tr.first_tr
                      td.first_td(width="200") 你财富理财计划丰银宝a
                      td
                        table.ov-table-n
                          tbody
                            tr.first_tr
                              td.ov-table-zj 资金
                              td
                                .afp 申购数据已更新
                                .redeem 赎回数据已更新
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td.afp-num  {{183984024 | ktCurrency}}
                              td
                                .in-approval
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="false") 已执行
                                .unexecuted.redeem-num(v-if="false") 待执行
                              td 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span 操作
                                .y-operation
                                  span 操作
                            tr
                              td.ov-table-zc 资产
                              td
                                .afp 申购广发货币基金
                                .redeem 卖出15北京城投债
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td
                              td
                                .in-approval(v-if="false")
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="true") 已执行
                                .unexecuted.redeem-num(v-if="true") 待执行
                              td.afp 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span 操作
                                .y-operation
                                  span 操作
                    tr
                      td.first_td(width="200") 你财富理财计划丰银宝b
                      td
                        table.ov-table-n
                          tbody
                            tr
                              td.ov-table-zc 资产
                              td
                                .afp 申购广发货币基金
                                .redeem 卖出15北京城投债
                              td
                                .afp-num {{200184258 | ktCurrency}}
                                .redeem-num {{16200234 | ktCurrency}}
                              td
                                i.icon-batonx.icon-brackets
                              td
                              td
                                .in-approval(v-if="false")
                                  span 交款审批中
                                  i.icon-batonx.icon-shenpi
                                .executed.afp-num(v-if="true") 已执行
                                .unexecuted.redeem-num(v-if="true") 待执行
                              td.afp 最晚明日12：00执行
                              td.ov-table-last-td
                                .n-operation
                                  span 操作
                                .y-operation
                                  span 操作
    .ov-remind.all-padding
      h3 提醒
      .ov-remind-table
        table
          tbody
            tr
              td.first-td 京东活期理财计划丰银宝a
              td
                .nature
                 | 开放
                .remarks(v-if="isclose")
                  span 备注:预计净赎回五千万左右货币基金
                  i.icon-batonx.icon-close(@click="closeRemarks")
              td
              td  3月01日12：00--3月02日11：00
            tr
              td.first-td 京东活期理财计划丰银宝a
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
            tr
              td.first-td 京东活期理财计划丰银宝a
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
    .ov-calendar.all-padding
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
            .calendar-bottom-n(@click="findCalendar")
              .calendar-num {{date.date}}
              .calendar-table
                table
                  tbody
                    tr(v-for="tableData in date.tableDatas")
                      td.td-left {{tableData.faxing}}
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

export default {
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

  methods: {
    findDialog() {
      this.$refs.productDialog.showDialog()
    },
    findCalendar() {
      this.$refs.calendarDialog.lookDialog()
    },
    assetsDialog() {
      this.$refs.assetDialog.showDialog()
    },
    closeRemarks() {
      this.isclose = false
    }
  },

  data() {
    return {
      dialogShow: false,
      year: 2017,
      moment: 5,
      isclose: true,
      dates: [{
        date: '30',
        tableDatas: [{
          faxing: '发行',
          num: '66'
        }]
      }, {
        date: '30',
        tableDatas: [{
          faxing: '发行',
          num: '66'
        }]
      }, {
        date: '30',
        tableDatas: [{
          faxing: '发行',
          num: '66'
        }]
      }, {
        date: '30',
        tableDatas: [{
          faxing: '发行',
          num: '66'
        }]
      }, {
        date: '30',
        tableDatas: [{
          faxing: '发行',
          num: '66'
        }]
      }, {
        date: '30',
        tableDatas: [{
          faxing: '发行',
          num: '66'
        }]
      }, {
        date: '30',
        tableDatas: [{
          faxing: '发行',
          num: '66'
        }]
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
        value: '选项2'
      }, {
        name: '期限分布',
        value: '选项3'
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
    padding: 10px 5px;
  }
  h3 {
    font-size: 15px;
    color: #595f67;
    padding: 10px 0;
  }
  .afp-num {
    color: #e98da4;
  }
  .redeem-num {
    color: #82c5aa;
  }
  .all-padding {
    padding: 0 5px;
  }
  .ov-today-content {
    overflow: hidden;
    width: 100%;
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
          table-layout: fixed;
          border-collapse: collapse;
          td {
            padding: 10px 0;
          }
          .ov-table-zj {
            color: #f55923;
          }
          .ov-table-zc {
            color: #1f98d9;
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
      padding: 15px 20px;
      border-radius: 5px;
      table {
        width: 100%;
        table-layout: fixed;
        .first-td {
          font-size: 13px;
          color: #595f67;
          font-weight: bold;
        }
        td {
          padding: 5px 0;
          color: #595f67;
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
            margin-left: 20px;
            vertical-align: -1px;
            cursor: pointer;
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
        span {}
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
              }
            }
          }
        }
      }
    }
  }
}
</style>
