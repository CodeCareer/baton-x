<template lang="pug">
  .product-asset-dialog
    el-dialog(:title="dialogData.productName",v-model="visible")
      el-form
        .public-asset-dialog-body
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
      .dialog-footer(slot="footer")
        el-button(type="primary", size="small", @click="goEaa", v-if="!static") 确认审批
        el-button(type="gray", size="small", @click="closeDialog", v-if="!static") 驳回
        el-button(type="gray", size="small", @click="closeDialog", v-if="static") 关闭
</template>

<script>
import {
  Form
} from 'element-ui'
import {
  merge
} from 'lodash'
export default {
  props: {
    static: false // 是否只用来展示当前状态
  },

  components: {
    ElForm: Form
  },

  methods: {
    showDialog(data, boole) {
      console.log('1111')
      this.dialogData = merge({}, data)
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
      visible: false,
      dialogData: {}
    }
  }
}
</script>

<style lang="scss">
@import './product-asset-dialog.scss';
</style>
