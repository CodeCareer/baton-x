<template lang="pug">
  .product-asset-dialog
    el-dialog(title="粤股交丰银宝理财计划B",v-model="visible")
      el-form
        .product-asset-dialog-body
          .product-mes
            .mes-title
              h4 产品信息
            .mes-body
              table
                tbody
                  tr
                    th 利率：
                    td.product-rate 6.5%
                    th 发行期限：
                    td 1天
                  tr
                    th 发行平台：
                    td 京东金融
                    th 结算方式：
                    td 净额计算
          .now-state
            .mes-title
              h4 当前状态
                span 交款审批中
                i.icon-batonx.icon-shenpi
            .mes-body
              table
                tbody
                  tr
                    th 申购数据：
                    td
                      span ￥
                      span.product-rate 200,184,258.00
                    th 已更新
                    td
                  tr
                    th 赎回数据：
                    td
                      span ￥
                      span.redeem 245,742.00
                    th 已更新
                    td
                  tr
                    th 申购数据：
                    td
                      span ￥
                      span.product-rate 183,184,258.00
                    th 已更新
                    td
          .account-info
            .account-title 账户信息
            .account-content
              .account-left
                .account-left-top 募集金额
                .account-left-middle
                  span 打款方向
                  i
                .account-left-bottom 产品账户
              .account-right
                .account-right-top
                  table
                    tbody
                      tr
                        th 账户名：
                        td 北京和丰永讯金融信息服务有限公司
                      tr
                        th 账户：
                        td.account-color 1109 2037 8610 201
                      tr
                        th 开户行：
                        td 招商银行股份有限公司北京亚运村支行
                .account-right-bottom
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
      .dialog-footer(slot="footer")
        el-button(type="primary", size="small", @click="goEaa", v-if="!static") 确认审批
        el-button(type="gray", size="small", @click="closeDialog", v-if="!static") 驳回
        el-button(type="gray", size="small", @click="closeDialog", v-if="static") 关闭
</template>

<script>
import {
  Form
} from 'element-ui'

export default {
  props: {
    static: false // 是否只用来展示当前状态
  },

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

<style lang="scss">
@import './product-asset-dialog.scss';
</style>
