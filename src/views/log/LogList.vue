<template lang="pug">
  section.log-list
    .box
      .box-header
        h3 筛选条件
        .buttons
          el-button(type="primary", size="small", @click="download()")
            i.icon-batonx.icon-import
            | 导出
      .filters
        .filter-line
          el-date-picker(placeholder="起始时间", type="date", v-model="filter.startDate")
          el-date-picker(placeholder="结束时间", type="date", v-model="filter.endDate")
          el-input(placeholder='用户/电话/角色', icon='search', v-model.lazy='filter.userInfo')
        .filter-line
          .filter-checkbox
            .title
              | 类型：
            el-radio-group.checkboxes(v-model="filter.type")
              el-radio(v-for="type in types", :label="type.value") {{type.name}}
          el-button.fixed(size="small", type="primary", @click="clearFilter")  清除
    .table-container
      el-table.no-wrap-cell(:data='filterLogs', style='width: 100%')
        el-table-column(property='userName', label='用户', width='100')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover', placement='top')
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.userName }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.userName}}
        el-table-column(property='phone', label='电话', width='150')
        el-table-column(property='role', label='角色', width='150')
        el-table-column(property='type', label='类型', width='150')
        el-table-column(property='action', label='行为')
          template(scope="scope")
            span(v-html="scope.row.action")
        el-table-column(property='createDate', label='时间', width='150')
        el-table-column(label='明细', width='100')
          template(scope="scope")
            a(@click="showDetail(scope.row)", v-if="scope.row.addition") 查看
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='logs.length')
    product-dialog(ref="productDialog", :static="true")
    asset-dialog(ref="assetDialog", :static="true")

</template>

<script>
import {
  Message
} from 'element-ui'
import {
  filter,
  each
} from 'lodash'
import ProductDialog from '@/components/ProductDialog.vue'
import AssetDialog from '@/components/AssetDialog.vue'

export default {
  components: {
    ProductDialog,
    AssetDialog
  },
  methods: {
    clearFilter() {
      each(this.filter, (v, k) => {
        this.filter[k] = k === 'type' ? '全部' : ''
      })
    },

    showDetail(log) {
      if (!log || !log.addition) return
      if (log.addition === 'asset') {
        this.$refs.assetDialog.showDialog()
      } else if (log.addition === 'product') {
        this.$refs.productDialog.showDialog()
      }
    },

    download() {
      Message.info('测试账号不支持此功能！')
    },

    pageChange(val) {
      console.log(`分页${val}`)
    },

    pageSizeChange(val) {
      this.page.size = val
    },

    openProductDialog(log) {
      this.$refs.productDialog.open(log)
    }
  },

  computed: {
    filterLogs() {
      const {
        startDate,
        endDate,
        userInfo,
        type
      } = this.filter

      return filter(this.logs, v => {
        return ((startDate && +new Date(v.createDate) >= +new Date(startDate)) || !startDate) &&
          ((endDate && +new Date(v.createDate) <= +new Date(endDate)) || !endDate) &&
          (~v.userName.indexOf(userInfo) ||
            ~v.phone.indexOf(userInfo) ||
            ~v.role.indexOf(userInfo)) &&
          (type === '全部' || type === v.type)
      })
    }
  },

  data() {
    return {
      filter: {
        userInfo: '',
        startDate: '',
        endDate: '',
        type: '全部'
      },
      types: [{
        name: '全部',
        value: '全部'
      }, {
        name: '清算',
        value: '清算'
      }, {
        name: '审批',
        value: '审批'
      }, {
        name: '编辑产品/资产',
        value: '编辑产品/资产'
      }, {
        name: '删除产品/资产',
        value: '删除产品/资产'
      }, {
        name: '备注',
        value: '备注'
      }, {
        name: '提醒',
        value: '提醒'
      }, {
        name: '登录/退出',
        value: '登录/退出'
      }, {
        name: '其他',
        value: '其他'
      }],
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      logs: [{
        userName: '张二',
        phone: '13520552699',
        role: '运营人员',
        type: '备注',
        action: '为<em>粤股交丰银宝理财计划B</em>备注（创建时间   2017-02-20 21:25）设置了提醒，提醒时间：[空] → 2017-03-25 15:38:10',
        createDate: '2017-01-15 18:44:13'
      }, {
        userName: '张二',
        addition: 'asset',
        phone: '13520552699',
        role: '运营人员',
        type: '清算',
        action: '对<em>粤股交丰银宝理财计划B</em>执行了清算',
        createDate: '2016-12-07 18:22:27'
      }, {
        userName: '王一',
        addition: 'product',
        phone: '13520552698',
        role: '运营人员',
        type: '审批',
        action: '对<em>粤股交丰银宝理财计划B</em>执行了审批（审批流程：资金清算审批流程A1，审批角色：项目组长）',
        createDate: '2016-12-07 18:22:27'
      }, {
        userName: '王一',
        phone: '13520552698',
        role: '运营人员',
        type: '编辑产品/资产',
        action: '对<em>粤股交丰银宝理财计划B</em>执行了编辑： 产品名称: 典范-L-HNGJ-219-01 -> 典范-L-HNGJ-219-02 起息日: 2016-12-05 16:00:00 ,UTC -> 2016 - 12 - 08 16: 00: 00, UTC',
        createDate: '2016-12-07 18:19:40'
      }, {
        userName: '王一',
        phone: '13520552698',
        role: '市场人员',
        type: '其它',
        action: '最近登录: 2017-01-25 15:38:10 UTC 登录次数: 238 →239',
        createDate: '2016-12-07 17:59:47'
      }, {
        userName: '张三',
        phone: '13520552697',
        role: '市场人员',
        type: '其它',
        action: '最近退出: 2016-12-02 03:40:59 UTC 退出次数: 34 → 35',
        createDate: '2016-12-07 16:10:12'
      }, {
        userName: '张三',
        phone: '13520552697',
        role: '市场人员',
        type: '其它',
        action: '修改密码',
        createDate: '2016-12-06 16:10:10'
      }, {
        userName: '张三',
        phone: '13520552697',
        role: '管理员',
        type: '其它',
        action: '对 王一 执行了编辑： 部门: 运营部 →市场部 角色: 运营人员 →市场人员',
        createDate: '2016-12-06 16:10:12'
      }, {
        userName: '张三',
        phone: '13520552697',
        role: '运营人员',
        type: '编辑产品/资产',
        action: '对<em>粤股交丰银宝理财计划A</em>执行了编辑： 起息日： 2016-12-05 16:00:00 -> 2016-12-08 16:00:00',
        createDate: '2016-12-06 16:10:10'
      }, {
        userName: '张三',
        phone: '13520552697',
        role: '运营人员',
        type: '清算',
        action: '对<em>粤股交丰银宝理财计划A</em>执行了清算操作',
        createDate: '2016-12-05 16:10:10'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  border-radius: 4px;
}
</style>
