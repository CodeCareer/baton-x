<template lang="pug">
  section.approve-list
    .box
      .box-tab-header
        el-button(type="primary", size="small", @click="openApproveDialog()")
          i.icon-batonx.icon-plus
          | 新增
      el-tabs(v-model='tab', type='card', @tab-click='tabClick')
        el-tab-pane(label='资金清算审批流程', name='资金清算流程')
          .filters
            el-input(placeholder='名称', icon='search', v-model.lazy='filter.name')
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='资产交易审批流程', name='资产交易流程')
          .filters
            el-input(placeholder='名称', icon='search', v-model.lazy='filter.name')
            el-button(size="small", type="primary", @click="clearFilter")  清除
    .table-container
      el-table(:data='filterApproves', style='width: 100%')
        el-table-column(prop='name', label='名称', width='220')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover' placement='top', )
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.name }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.name}}
        el-table-column(prop='detail', label='流程详情')
          template(scope="scope")
            span {{getFlowSimple(scope.row.flowList)}}
        el-table-column(label='操作', width='100')
          template(scope="scope")
            .operations
              i.icon-batonx.icon-edit(@click="openApproveDialog(scope.row)")
              i.icon-batonx.icon-delete(@click.stop="deleteApprove(scope.row)")
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='approves.length')
    approve-dialog(ref="approveDialog", @approve-save="onApproveSave")
</template>

<script>
import ApproveDialog from '@/components/ApproveDialog.vue'
import {
  remove,
  mergeWith,
  map,
  find,
  filter,
  each
} from 'lodash'
import {
  MessageBox
} from 'element-ui'
import {
  mergeArrayCover
} from '@/common/merge-rules.js'

export default {
  components: {
    ApproveDialog
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event)
    },

    clearFilter() {
      each(this.filter, (v, k) => {
        this.filter[k] = ''
      })
    },

    pageChange(val) {
      console.log(`分页${val}`)
    },

    pageSizeChange(val) {
      this.page.size = val
    },

    getFlowSimple(flowList) {
      return map(flowList, 'job').join('→')
    },

    openApproveDialog(approve) {
      this.$refs.approveDialog.open(approve)
    },

    onApproveSave(approve) {
      const activeApprove = find(this.approves, v => v.id === approve.id)
      if (activeApprove) {
        mergeWith(activeApprove, approve, mergeArrayCover)
      } else {
        this.approves.unshift(approve)
      }
    },

    deleteApprove(approve) {
      MessageBox.confirm('审批流程删除后将无法恢复，确认删除？', '提示', {
        type: 'warning'
      }).then(() => {
        this.approves = remove(this.approves, (v) => {
          return approve.id !== v.id
        })
      })
    }
  },

  computed: {
    filterApproves() {
      return filter(this.approves, v => {
        return ~v.name.indexOf(this.filter.name) && v.type === this.tab
      })
    }
  },

  data() {
    return {
      tab: '资金清算流程',
      filter: {
        name: ''
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      approves: [{
        id: 1,
        name: '资金清算审批流程A1',
        type: '资金清算流程',
        flowList: [{
          department: '业务发展部',
          hasError: false,
          job: '业务组长',
          approver: '王一'
        }, {
          department: '业务发展部',
          job: '业务经理',
          approver: '王二'
        }, {
          department: '业务发展部',
          job: '业务总监',
          approver: '王三'
        }],
        relationProducts: [{
          id: 1,
          name: '粤股交丰银宝理财计划A',
          amount: '￥ 78,613,007.00',
          platform: '京东金融'
        }, {
          id: 2,
          name: '粤股交丰银宝理财计划B',
          amount: '￥ 80,533,201.00',
          platform: '京东金融'
        }]
      }, {
        id: 2,
        name: '资产交易审批流程A1',
        type: '资产交易流程',
        flowList: [{
          department: '业务发展部',
          hasError: false,
          job: '业务经理',
          approver: '王二'
        }, {
          department: '业务发展部',
          job: '业务总监',
          approver: '王三'
        }],
        relationProducts: [{
          id: 1,
          name: '粤股交丰银宝理财计划A',
          amount: '￥ 78,613,007.00',
          platform: '京东金融'
        }, {
          id: 2,
          name: '粤股交丰银宝理财计划B',
          amount: '￥ 80,533,201.00',
          platform: '京东金融'
        }]
      }, {
        id: 3,
        name: '资产交易审批流程A2',
        type: '资产交易流程',
        flowList: [{
          department: '业务发展部',
          hasError: false,
          job: '业务经理',
          approver: '王二'
        }],
        relationProducts: [{
          id: 1,
          name: '粤股交丰银宝理财计划A',
          amount: '￥ 78,613,007.00',
          platform: '京东金融'
        }, {
          id: 2,
          name: '粤股交丰银宝理财计划B',
          amount: '￥ 80,533,201.00',
          platform: '京东金融'
        }]
      }, {
        id: 4,
        name: '资金清算审批流程A2',
        type: '资金清算流程',
        flowList: [{
          department: '业务发展部',
          hasError: false,
          job: '业务组长',
          approver: '王一'
        }, {
          department: '业务发展部',
          job: '业务经理',
          approver: '王二'
        }, {
          department: '合规风控部',
          job: '合规风控经理',
          approver: '李二'
        }],
        relationProducts: [{
          id: 1,
          name: '粤股交丰银宝理财计划A',
          amount: '￥ 78,613,007.00',
          platform: '京东金融'
        }, {
          id: 2,
          name: '粤股交丰银宝理财计划B',
          amount: '￥ 80,533,201.00',
          platform: '京东金融'
        }]
      }, {
        id: 5,
        name: '资金清算审批流程A3',
        type: '资金清算流程',
        flowList: [{
          department: '业务发展部',
          hasError: false,
          job: '业务总监',
          approver: '王三'
        }, {
          department: '合规风控部',
          job: '合规风控经理',
          approver: '李三'
        }],
        relationProducts: [{
          id: 1,
          name: '粤股交丰银宝理财计划A',
          amount: '￥ 78,613,007.00',
          platform: '京东金融'
        }, {
          id: 2,
          name: '粤股交丰银宝理财计划B',
          amount: '￥ 80,533,201.00',
          platform: '京东金融'
        }]
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
