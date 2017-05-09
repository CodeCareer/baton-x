<template lang="pug">
  .public_dialog
    el-dialog(:visible.sync="visibleShow")
      el-form
        .public_header
          h3 粤股交丰银宝理财计划B
        .public_body
          .product-mes
            .mes-title
              h4 产品信息
            .mes-body
              table
                tbody
                  tr
                    th 利率：
                    td 6.5%
                    th 发行期限：
                    td 1天
                  tr
                    th 发行平台：
                    td 京东金融
                    th 结算方式：
                    td 净额计算
          .now-state
          .account-info
        .public_footer

</template>
<script>
import {
  Form
} from 'element-ui'

export default {
  props: ['visibleShow'],
  components: {
    ElForm: Form
  }
}
</script>
<style lang="scss"></style>
