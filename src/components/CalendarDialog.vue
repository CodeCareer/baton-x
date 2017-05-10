<template lang="pug">
  .calendar-dialog
    el-dialog(title="2月2日星期四 日历详情",v-model="visible")
      .unified-style(v-for="calendarData in calendarDatas")
        .unified-title {{calendarData.title}}
          .unified-num {{calendarData.num + '条'}}
        .unified-table
          table
            tbody
              tr(v-for="tableData in calendarData.tableDatas")
                td {{tableData.name}}
                td {{tableData.amount}}
                td {{tableData.platform}}
                td
                  i.icon-batonx.icon-remind
                    el-date-picker(type="datetime",v-model="value")
</template>
<script>
export default {
  data() {
    return {
      value: '',
      visible: false,
      calendarDatas: [{
        title: '发行',
        num: '2',
        tableDatas: [{
          name: '智鑫2号”理财计划',
          amount: '',
          platform: '京东金融'
        },
        {
          name: '京禾宝”理财计划',
          amount: '',
          platform: '途牛金服'
        }
        ]
      }, {
        title: '开放',
        num: '1',
        tableDatas: [{
          name: '美信宝-粤盈6期3号',
          amount: '',
          platform: '美易理财'
        }]
      }, {
        title: '提费',
        num: '3',
        tableDatas: [{
          name: '美信宝-粤盈6期4号',
          amount: '￥78,840.00',
          platform: '美易理财'
        },
        {
          name: '牛稳赚GZEEC719001',
          amount: '￥78,840.00',
          platform: '苏宁金服'
        },
        {
          name: '融通宝系列产品第061期',
          amount: '￥56,098.21',
          platform: '绿地金服'
        }
        ]
      },
      {
        title: '付息',
        num: '4',
        tableDatas: [{
          name: '凤溢盈-PHZL-6个月',
          amount: '￥78,840.00',
          platform: '美易理财'
        },
        {
          name: '凤溢盈-PHZL-12个月',
          amount: '￥48,287.21',
          platform: '苏宁金服'
        },
        {
          name: '财富赢-普惠235A期 ',
          amount: '￥56,098.21',
          platform: '绿地金服'
        },
        {
          name: '海信宝587期21-270 ',
          amount: '￥981,562.21',
          platform: '聚宝汇'
        }
        ]
      },
      {
        title: '试算',
        num: '1',
        tableDatas: [{
          name: '万惠金-月月尊-11552',
          amount: '￥70,094,192.00',
          platform: '万达财富'
        }]
      }]
    }
  },
  methods: {
    lookDialog() {
      this.visible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .calendar-dialog{
    .unified-style{
      .unified-title {
        padding:5px 0;
        font-size:15px;
        color:#595f67;
        .unified-num{
          float:right;
          color:#de3569;
          font-size:13px;
        }
      }
      .unified-table{
        padding:10px 40px;
        table{
          width:100%;
          table-layout: fixed;
          td{
            padding:5px 0;
            i{
              color:#558dc1;
              position:relative;
              .el-input{
                width:1px;
                height:1px;
                position: absolute;
                top:0;
                right:15px;
                opacity:0;
              }
              .el-input__inner{
                padding:none;
                height:0;
                line-height: 0;
                border:none;
                // opacity:0;
              }
              .el-picker-panel__footer{
                .el-picker-panel__link-btn{
                  display: inline;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
