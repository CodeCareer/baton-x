<template lang="pug">
.box.mt20
  .box-header 账户信息
  .box-content.accounts
    el-row(:gutter="20")
      el-col(:span="8", v-for="account in checkedAccounts")
        .account-card
          .operations
            i.icon-batonx.icon-edit(@click="editAccount(account)")
            i.icon-batonx.icon-close(@click="deleteAccount(account)")
          table
            tr
              th 账户类型：
              td.bd {{account.type}}
            tr
              th 账户名：
              td {{account.name}}
            tr
              th 账户：
              td.em {{account.bankNum}}
            tr
              th 开户行：
              td {{account.bank}}
      el-col(:span="8")
        .account-card.add-new-account(@click="addCheckedAccount")
  el-dialog(title="编辑账户", v-model='editAccountVisible')
    el-form(:model='activeAccount', :label-width='formLabelWidth')
      el-form-item(label='账户类型：')
        el-select(v-model='activeAccount.type', placeholder='请选择账户类型')
          el-option(label='资产账户', value='资产账户')
          el-option(label='募集账户', value='募集账户')
          el-option(label='产品账户', value='产品账户')
      el-form-item(label='所属方：')
        el-input(v-model='activeAccount.belongto', auto-complete='off', placeholder='请输入所属方')
      el-form-item(label='账户名：')
        el-input(v-model='activeAccount.name', auto-complete='off', placeholder='请输入账户名')
      el-form-item(label='账户：')
        el-input(v-model='activeAccount.bankNum', auto-complete='off', placeholder='请输入账户')
      el-form-item(label='开户行：')
        el-input(v-model='activeAccount.bank', auto-complete='off', placeholder='请输入开户行')
    .dialog-footer(slot="footer")
      el-button(type="primary", size="small", @click='activeAccountSave') 确定
      el-button(type='gray', size="small", @click='editAccountVisible = false') 取消
  el-dialog.accounts-list(title='账户信息', v-model='accountListVisible', size="large", @open="accountListOpen", @close="accountListClose")
    .box
      .box-tab-header
        el-button(type="primary", size="small", @click="addAccount")
          i.icon-batonx.icon-plus
          | 新增
      .filters
        el-input(placeholder='输入账户名或者账户', icon='search', v-model.lazy='filter.name')
    el-table(:data='filterAccountList', ref="accountsTable", @selection-change="checkAccount")
      el-table-column(type="selection", width="45")
      el-table-column(property="type", label='账户类型')
      el-table-column(property='belongto', label='所属方')
      el-table-column(property='name', label='账户名')
      el-table-column(property='bankNum', label='账户')
      el-table-column(property='bank', label='开户行')
    .dialog-footer(slot="footer")
      el-button(type="primary", size="small", @click='accountListVisible = false') 确定
</template>

<script>
import {
  MessageBox
} from 'element-ui'
import {
  filter,
  uniqueId,
  remove,
  find,
  each,
  merge,
  map,
  includes
} from 'lodash'

export default {
  props: {
    accounts: {
      type: Array,
      default: []
    }
  },

  methods: {
    deleteAccount(account) {
      MessageBox.confirm('此操作将永久删除改批注, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.accounts = remove(this.accounts, function(v) {
          return v.id !== account.id
        })
      })
    },
    addAccount() {
      this.activeAccount = {
        type: '',
        name: '',
        belongto: '',
        checked: false,
        bankNum: '',
        bank: ''
      }
      this.editAccountVisible = true
    },
    editAccount(account) {
      this.activeAccount = merge({}, account)
      this.editAccountVisible = true
    },
    activeAccountSave() {
      const account = find(this.accounts, v => this.activeAccount.id === v.id)
      if (account) { // 编辑
        merge(account, this.activeAccount)
      } else { // 新增
        this.activeAccount.id = uniqueId()
          // this.activeAccount.checked = false
        this.accounts.unshift(this.activeAccount)
        this._tableCheckedUpdate()
      }
      this.editAccountVisible = false
    },
    addCheckedAccount() {
      this.accountListVisible = true
    },
    _tableCheckedUpdate() {
      each(this.accounts, (v) => {
        this.$nextTick(() => {
          this.$refs.accountsTable.toggleRowSelection(v, v.checked)
        })
      })
    },
    accountListOpen() {
      this._tableCheckedUpdate()
    },
    accountListClose() {
      const ids = map(this.accountListChecked, 'id')
      each(this.accounts, v => {
        v.checked = includes(ids, v.id)
      })
    },
    checkAccount(val) {
      this.accountListChecked = val
    }
  },

  computed: {
    checkedAccounts() {
      return filter(this.accounts, v => v.checked)
    },
    filterAccountList() {
      if (!this.accounts.length) return this.accounts
      return filter(this.accounts, v => {
        return ~v.name.indexOf(this.filter.name) || ~v.bankNum.indexOf(this.filter.name)
      })
    }
  },

  data() {
    return {
      filter: {
        name: ''
      },
      formLabelWidth: '120px',
      editAccountVisible: false,
      accountListVisible: false,
      activeAccount: {},
      accountListChecked: []
    }
  }
}
</script>
