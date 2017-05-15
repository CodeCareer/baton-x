<template lang="pug">
  .company-account-authority
    el-button.top-button(type="primary", size="mini", @click="openAccountAuthorityDialog()")
      i.icon-batonx.icon-plus
      | 新增
    .box.mb20(v-for="account in accounts")
      .box-header
        h3 {{account.type}}
        .buttons
          i.icon-batonx.icon-edit(@click="openAccountAuthorityDialog(account)")
          i.icon-batonx.icon-close(@click="deleteAccount(account)")
      .box-content
        .authority-table.just-for-show(:class="{'short-view': shortView}")
          .permits-list
            span.title 权限：
            el-tag.mr10(v-for="p in account.permits", type="gray") {{p}}
          table
            //- tr.bd-b
              th(:colspan="2") 权限：
              td
                el-tag(v-for="p in account.permits", type="gray") {{p.name}}
            tr.bd-b
              th(:rowspan="account.checkModules.length+1") 可查看模块
              //- td
            tr(v-for="(module, index) in account.checkModules", :class="[isDisabled(account, '查看')]")
              th.bd-b
                el-checkbox.circle.mini(:disabled="true", @change="handleCheckAllChange($event, module)", :indeterminate="module.indeterminate" v-model="module.checked") {{module.name}}
              td.bd-b
                el-checkbox-group(v-model="module.checkedList", @change="handleCheckChange(module)")
                  el-checkbox.circle.mini(:disabled="true", v-for="o in module.children", :label="o.value") {{o.name}}
            tr.bd-b(:class="[isDisabled(account, '编辑')]")
              th 可编辑内容
              td.bd-t(:colspan="2")
                el-checkbox-group(v-model="account.editModules.checkedList", @change="handleCheckChange(account.editModules)")
                  el-checkbox.circle.mini(:disabled="true", v-for="o in account.editModules.children", :label="o.value") {{o.name}}
            tr.bd-b(:class="[isDisabled(account, '删除')]")
              th 可删除内容
              td(:colspan="2")
                el-checkbox-group(v-model="account.deleteModules.checkedList", @change="handleCheckChange(account.deleteModules)")
                  el-checkbox.circle.mini(:disabled="true", v-for="o in account.deleteModules.children", :label="o.value") {{o.name}}
        .more-toggle
          a(v-show="shortView", @click="shortView = false")
            i.icon-batonx.icon-down
            | 显示更多信息
          a(v-show="!shortView", @click="shortView = true")
            i.icon-batonx.icon-top
            | 收起更多信息
    account-authority-dialog(ref="accountAuthorityDialog", @account-save="onAccountSave")
</template>

<script>
import AccountAuthorityDialog from '@/components/AccountAuthorityDialog.vue'
import {
  mergeArrayCover
} from '@/common/merge-rules.js'
import {
  remove,
  includes,
  mergeWith,
  find
} from 'lodash'
import {
  MessageBox
} from 'element-ui'
import moment from 'moment'

export default {
  components: {
    AccountAuthorityDialog
  },
  methods: {
    openAccountAuthorityDialog(account) {
      this.$refs.accountAuthorityDialog.open(account)
    },

    onAccountSave(account) {
      const activeAccount = find(this.accounts, v => v.id === account.id)
      if (activeAccount) {
        account.updateDate = moment().format('YYYY-MM-DD')
        mergeWith(activeAccount, account, mergeArrayCover)
      } else {
        this.accounts.unshift(account)
      }
    },

    deleteAccount(account) {
      MessageBox.confirm('账户删除后将无法再使用，确认删除？', '提示', {
        type: 'warning'
      }).then(() => {
        this.accounts = remove(this.accounts, (v) => {
          return account.id !== v.id
        })
      })
    },

    isDisabled(account, type) {
      return includes(account.permits, type) ? '' : 'disabled'
    }
  },

  data() {
    return {
      shortView: true,
      accounts: [{
        id: 1,
        type: '业务专员类账户',
        permits: ['查看'],
        editModules: {
          checkedList: ['产品信息', '资产信息'],
          children: [{
            name: '产品信息',
            value: '产品信息'
          }, {
            name: '资产信息',
            value: '资产信息'
          }, {
            name: '资金账户信息',
            value: '资金账户信息'
          }, {
            name: '审批流程信息',
            value: '审批流程信息'
          }, {
            name: '公司账户信息',
            value: '公司账户信息'
          }]
        },
        deleteModules: {
          checkedList: ['产品信息'],
          children: [{
            name: '产品信息',
            value: '产品信息'
          }, {
            name: '资产信息',
            value: '资产信息'
          }, {
            name: '资金账户信息',
            value: '资金账户信息'
          }, {
            name: '审批流程信息',
            value: '审批流程信息'
          }, {
            name: '公司账户信息',
            value: '公司账户信息'
          }]
        },
        checkModules: [{
          name: '总览页',
          value: '总览页',
          checkedList: ['存续金额模块', '占比分析模块'],
          checked: false,
          indeterminate: true,
          children: [{
            name: '存续金额模块',
            value: '存续金额模块'
          }, {
            name: '占比分析模块',
            value: '占比分析模块'
          }, {
            name: '当前状态模块',
            value: '当前状态模块'
          }, {
            name: '日历模块',
            value: '日历模块'
          }, {
            name: '趋势图模块',
            value: '趋势图模块'
          }]
        }, {
          name: '产品总列表页',
          value: '产品总列表页',
          checkedList: [],
          checked: true,
          indeterminate: false,
          children: []
        }, {
          name: '登记产品总列表页',
          value: '登记产品总列表页',
          checkedList: [],
          checked: true,
          indeterminate: false,
          children: []
        }, {
          name: '产品详情页',
          value: '产品详情页',
          checkedList: ['附件', '待办事项-资金'],
          checked: false,
          indeterminate: true,
          children: [{
            name: '附件',
            value: '附件'
          }, {
            name: '待办事项-资金',
            value: '待办事项-资金'
          }, {
            name: ' 待办事项-资产',
            value: ' 待办事项-资产'
          }, {
            name: '持仓详情',
            value: '持仓详情'
          }, {
            name: '客户列表',
            value: '客户列表'
          }, {
            name: '登记产品列表',
            value: '登记产品列表'
          }, {
            name: '费用详情',
            value: '费用详情'
          }]
        }, {
          name: '资产总列表',
          value: '资产总列表',
          checkedList: [],
          checked: false,
          indeterminate: false,
          children: []
        }, {
          name: '资产详情页',
          value: '资产详情页',
          checkedList: ['持有产品列表', '待办事项'],
          checked: false,
          indeterminate: true,
          children: [{
            name: '附件',
            value: '附件'
          }, {
            name: '基础信息与备注',
            value: '基础信息与备注'
          }, {
            name: '持有产品列表',
            value: '持有产品列表'
          }, {
            name: '待办事项',
            value: '待办事项'
          }, {
            name: '行情信息',
            value: '行情信息'
          }, {
            name: '平台列表页',
            value: '平台列表页',
            children: []
          }, {
            name: '客户列表',
            value: '客户列表',
            children: []
          }]
        }]
      }, {
        id: 2,
        type: '市场经理类账户',
        permits: ['查看', '编辑', '删除'],
        editModules: {
          checkedList: ['产品信息', '资产信息'],
          children: [{
            name: '产品信息',
            value: '产品信息'
          }, {
            name: '资产信息',
            value: '资产信息'
          }, {
            name: '资金账户信息',
            value: '资金账户信息'
          }, {
            name: '审批流程信息',
            value: '审批流程信息'
          }, {
            name: '公司账户信息',
            value: '公司账户信息'
          }]
        },
        deleteModules: {
          checkedList: ['产品信息'],
          children: [{
            name: '产品信息',
            value: '产品信息'
          }, {
            name: '资产信息',
            value: '资产信息'
          }, {
            name: '资金账户信息',
            value: '资金账户信息'
          }, {
            name: '审批流程信息',
            value: '审批流程信息'
          }, {
            name: '公司账户信息',
            value: '公司账户信息'
          }]
        },
        checkModules: [{
          name: '总览页',
          value: '总览页',
          checkedList: ['存续金额模块', '占比分析模块', '当前状态模块', '日历模块'],
          checked: false,
          indeterminate: true,
          children: [{
            name: '存续金额模块',
            value: '存续金额模块'
          }, {
            name: '占比分析模块',
            value: '占比分析模块'
          }, {
            name: '当前状态模块',
            value: '当前状态模块'
          }, {
            name: '日历模块',
            value: '日历模块'
          }, {
            name: '趋势图模块',
            value: '趋势图模块'
          }]
        }, {
          name: '产品总列表页',
          value: '产品总列表页',
          checkedList: [],
          checked: true,
          indeterminate: false,
          children: []
        }, {
          name: '登记产品总列表页',
          value: '登记产品总列表页',
          checkedList: [],
          checked: true,
          indeterminate: false,
          children: []
        }, {
          name: '产品详情页',
          value: '产品详情页',
          checkedList: ['附件', '待办事项-资金'],
          checked: false,
          indeterminate: true,
          children: [{
            name: '附件',
            value: '附件'
          }, {
            name: '待办事项-资金',
            value: '待办事项-资金'
          }, {
            name: ' 待办事项-资产',
            value: ' 待办事项-资产'
          }, {
            name: '持仓详情',
            value: '持仓详情'
          }, {
            name: '客户列表',
            value: '客户列表'
          }, {
            name: '登记产品列表',
            value: '登记产品列表'
          }, {
            name: '费用详情',
            value: '费用详情'
          }]
        }, {
          name: '资产总列表',
          value: '资产总列表',
          checkedList: [],
          checked: false,
          indeterminate: false,
          children: []
        }, {
          name: '资产详情页',
          value: '资产详情页',
          checkedList: ['持有产品列表', '待办事项'],
          checked: false,
          indeterminate: true,
          children: [{
            name: '附件',
            value: '附件'
          }, {
            name: '基础信息与备注',
            value: '基础信息与备注'
          }, {
            name: '持有产品列表',
            value: '持有产品列表'
          }, {
            name: '待办事项',
            value: '待办事项'
          }, {
            name: '行情信息',
            value: '行情信息'
          }, {
            name: '平台列表页',
            value: '平台列表页',
            children: []
          }, {
            name: '客户列表',
            value: '客户列表',
            children: []
          }]
        }]
      }]
    }
  }
}
</script>


<style lang="scss">
@import '../../assets/scss/_vars.scss';
.company-account-authority {
  .more-toggle {
    text-align: center;
    padding: 15px;
    a {
      &:hover {
        color: $color-blue;
      }
    }
    .icon-batonx {
      color: $primary-color;
      cursor: pointer;
      margin-right: 5px;
    }
  }
  .permits-list {
    padding: 15px;
    font-size: 12px;
    border-bottom: 1px solid $border-color;
    .title {
      padding-right: 20px;
    }
  }
}

.authority-table {
  width: 100%;
  font-size: 12px;
  &.just-for-show {
    .el-checkbox__input.is-disabled {
      &+.el-checkbox__label {
        color: #54637a;
      }
      &.is-checked .el-checkbox__inner {
        background-color: $primary-color;
        border-color: $primary-color;
        cursor: auto;
      }
    }
    .el-checkbox {
      cursor: auto;
    }
    tr.disabled {
      .el-checkbox__input.is-disabled {
        &+.el-checkbox__label {
          color: #bbb;
        }
        &.is-checked .el-checkbox__inner {
          background-color: #d1dbe5;
          border-color: #d1dbe5;
          cursor: not-allowed;
        }
      }
      .el-checkbox {
        cursor: auto;
      }
    }
  }
  &.bd {
    border: 1px solid $border-color;
  }
  table {
    width: 100%;
  }
  &.short-view {
    max-height: 250px;
    overflow: hidden;
  }
  .bd-b {
    th,
    td {
      border-bottom: 1px solid $border-color;
    }
  }
  th,
  td {
    padding: 12px 10px;
  }
  th {
    color: #54637a;
    // font-weight: normal;
    max-width: 160px;
    // padding-left: 20px;
    text-align: left;
    .el-checkbox {
      color: #54637a;
    }
  }
}
</style>
