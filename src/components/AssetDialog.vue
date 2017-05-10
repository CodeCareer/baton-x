<template lang="pug">
  .public_dialog
    el-dialog(title="天津旭达资产管理项目",v-model="visible")
      el-form
        .public_body
          .product-mes
            .mes-title
              h4 资产信息
            .mes-body
              table
                tbody
                  tr
                    th 利率：
                    td.product-rate 8.00%
                    th 期限：
                    td 90天
                  tr
                    th 发行方：
                    td 恒大金服
                    th
                    td
          .now-state
            .mes-title
              h4 当前状态
                span 审批中
                i.icon-batonx.icon-shenpi
            .mes-body
              table
                tbody
                  tr
                    th 买入金额：
                    td
                      span ￥
                      span.product-rate 33,816,000.00
                    th 已更新
                    td
                  //- tr
                  //-   th 赎回数据：
                  //-   td
                  //-     span ￥
                  //-     span.redeem 245,742.00
                  //-   th 已更新
                  //-   td
                  //- tr
                  //-   th 申购数据：
                  //-   td
                  //-     span ￥
                  //-     span.product-rate 183,184,258.00
                  //-   th 已更新
                  //-   td
          .account-info
            .account-title 账户信息
            .account-content
              .account-left
                .account-left-top 产品账户
                .account-left-middle
                  span 打款方向
                  i
                .account-left-bottom 资产账户
              .account-right
                .account-right-top
                  table
                    tbody
                      tr
                        th 账户名：
                        td 广东金融高新区股权交易中心
                      tr
                        th 账户：
                        td.account-color 2232 1937 8710 871
                      tr
                        th 开户行：
                        td 招商银行股份有限公司广州番禹区支行
                .account-right-bottom
                  table
                    tbody
                      tr
                        th 账户名：
                        td 天津旭达过桥有限公司
                      tr
                        th 账户：
                        td.account-color 2310 8372 6532 098
                      tr
                        th 开户行：
                        td 招商银行天津滨海新区支行
      .public_footer(slot="footer")
        el-button.success(@click="goEaa") 确认审批
        el-button.error(@click="closeDialog") 驳回
</template>
<script>
import {
  Form
} from 'element-ui'

export default {
  // props: ['visibleShow'],

  components: {
    ElForm: Form
  },

  methods: {
    showDialog() {
      this.visible = true
    },
    goEaa() {
      this.visible = false
    },
    closeDialog() {
      this.visible = false
    }
  },

  data() {
    return {
      visible: false
    }
  }
}
</script>
<style lang="scss" scoped>
.public_dialog {
  .el-dialog__header {
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid #e2e5e9;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  .public_body {
    .now-state {
      padding: 20px 0;
      h4 {
        span {
          margin: 0 5px;
          font-weight: normal;
        }
        i {
          color: #d8dadd;
          font-size: 13px;
        }
      }
    }
    .mes-title {
      padding-bottom: 10px;
      h4 {
        font-size: 15px;
        color: #595f67;
        font-weight: 500;
      }
    }
    .mes-body {
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e5e9;
      table {
        table-layout: fixed;
        width: 100%;
        th,
        td {
          font-weight: normal;
          padding: 5px 0;
          color: #84888d;
        }
        .product-rate {
          color: #de3569;
        }
        .redeem {
          color: #16a474;
        }
      }
    }
    .account-info {
      .account-title{
        padding-bottom: 10px;
        h4{
        font-size: 15px;
        color: #595f67;
        font-weight: 500;
        }
      }
      .account-content{
        padding:0 40px;
        height:280px;
        // overflow: hidden;
        position: relative;
        .account-left{
          position:absolute;
          left:80px;
          top:50%;
          transform:translateY(-50%);
          .account-left-top,.account-left-bottom{
            padding:5px 0;
            color:#595f67;
            font-size:13px;
            font-weight: bold;
          }
          .account-left-middle{
            span{
              display: inline-block;
              width:1rem;
              // height:70px;
              // line-height: 1rem;
            }
            i{
              margin-left:15px;
              display: inline-block;
              height:75px;
              width:4px;
              border-radius: 4px;
              background: #badbeb;
              position: relative;
              &:before{
                content: '';
                position: absolute;
                bottom:0;
                right:0;
                width:13px;
                height:4px;
                background: #badbeb;
                border-radius: 4px;
                transform:rotate(45deg);
              }
              &:after{
                content:'';
                position: absolute;
                bottom:0;
                left:0;
                width:13px;
                height:4px;
                background: #badbeb;
                border-radius: 4px;
                transform:rotate(-45deg);
              }
            }
          }
        }
        .account-right{
          position:absolute;
          left:50%;
          top:0;
          transform:translateX(-50%);
          .account-right-top,.account-right-bottom{
            padding:15px 25px;
            border:1px solid #e2e5e9;
            border-radius: 5px;
            margin:10px 0;
            th{
              font-weight: normal;
              text-align: right;
            }
            th,td{
              padding:5px 0;
            }
            .account-color{
              color:#538cc0;
            }
          }
        }
      }
    }
  }
  .el-dialog__footer{
    .public_footer{
      text-align: center;
    }
    .success{
      border:none;
      background: #9fbedb;
      color:#fff;
      font-weight: bold;
    }
    .error{
      border:none;
      background: #badbec;
      color:#fff;
      font-weight: bold;
    }
  }
}
</style>
