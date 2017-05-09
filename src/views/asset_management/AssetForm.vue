<template lang="pug">
.asset-form
  .box
    .box-header
      | 基本信息
    .box-content
      form
        el-row
          el-col(:span="12")
            table
              tr
                th 资产全称：
                td
                  el-input(type="text", placeholder="请输入资产全称", v-model="demo.name")
              tr
                th 持有总金额：
                td
                  el-input(type="text", placeholder="请输入持有总金额", v-model="demo.amount")
                    template(slot="append") 元
              tr
                th 比例：
                td
                  el-input(type="text", placeholder="请输入比例", v-model="demo.ratio")
                    template(slot="append") %
              tr
                th 起息日：
                td
                  el-date-picker(type="date", :value="demo.startDate", @input="handleStartDate", placeholder="请输入起息日")
              tr
                th 发行期限：
                td
                  el-input(type="text", placeholder="请输入发行期限", v-model="demo.term")
                    template(slot="append") 天
              tr
                th 付息频率：
                td
                  el-input(type="text", placeholder="请输入付息频率", v-model="demo.payFrequency")
              tr
                th 资产类型：
                td
                  el-input(type="text", placeholder="请输入资产类型", v-model="demo.assetType")
              tr
                th 发行方：
                td
                  el-input(type="text", placeholder="请输入发行方", v-model="demo.publisher")
              tr
                th 托管方：
                td
                  el-input(type="text", placeholder="请输入托管方", v-model="demo.trustee")
          el-col(:span="12")
            table
              tr
                th 资产简称：
                td
                  el-input(type="text", placeholder="请输入资产简称", v-model="demo.shortName")
              tr
                th 总发行金额：
                td
                  el-input(type="text", placeholder="请输入总发行金额", v-model="demo.issueAmount")
                    template(slot="append") 元
              tr
                th 收益率：
                td
                  el-input(type="text", placeholder="请输入收益率", v-model="demo.rate")
                    template(slot="append") %
              tr
                th 到期日：
                td
                  el-date-picker(type="date", :value="demo.endDate", @input="handleEndDate", placeholder="请输入到期日")
              tr
                th 风险等级：
                td
                  el-select(v-model="demo.riskLevel")
                    el-option(v-for="o in riskLevels", :label="o.name", :value="o.value")
              tr
                th 付息日：
                td
                  el-date-picker(type="date",  placeholder="请输入付息日", :value="demo.payDate", @input="handlePayDate",)
              tr
                th 增信措施：
                td
                  el-input(type="text", placeholder="请输入增信措施", v-model="demo.credit")
              tr
                th 担保方：
                td
                  el-input(type="text", placeholder="请输入担保方", v-model="demo.gurantee")
              tr
                th 流动性：
                td
                  el-select(v-model="demo.flow")
                    el-option(v-for="o in flows", :label="o.name", :value="o.value")
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
  .bottom-buttons
    el-button(type="primary", size="small", @click="submitForm") 保存
    el-button(type="gray", size="small", @click="cancel") 取消
  el-dialog(title="编辑账户", v-model='editAccountVisible')
    el-form(:model='activeAccount')
      el-form-item(label='账户类型', :label-width='formLabelWidth')
        el-select(v-model='activeAccount.type', placeholder='请选择账户类型')
          el-option(label='资产账户', value='资产账户')
          el-option(label='募集账户', value='募集账户')
          el-option(label='产品账户', value='产品账户')
      el-form-item(label='所属方', placeholder='请输入所属方', :label-width='formLabelWidth')
        el-input(v-model='activeAccount.belongto' auto-complete='off')
      el-form-item(label='账户名', placeholder='请输入账户名', :label-width='formLabelWidth')
        el-input(v-model='activeAccount.name' auto-complete='off')
      el-form-item(label='账户', placeholder='请输入账户', :label-width='formLabelWidth')
        el-input(v-model='activeAccount.bankNum' auto-complete='off')
      el-form-item(label='开户行', placeholder='请输入开户行', :label-width='formLabelWidth')
        el-input(v-model='activeAccount.bank' auto-complete='off')
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
</template>

<script>
import {
  MessageBox,
  Message
} from 'element-ui'
import moment from 'moment'
import {
  filter,
  uniqueId,
  remove,
  find,
  each,
  map,
  includes
} from 'lodash'

export default {
  mounted: function() {
    if (this.$route.params.id !== 'add') {
      const name = this.$route.params.id
      this.demo = {
        name: this.$route.params.id,
        amount: 33816000,
        ratio: 16.5,
        startDate: '2017-01-04',
        term: 90,
        payFrequency: '每周一次',
        assetType: '理财计划',
        publisher: '恒大金服',
        trustee: '光大保德信基金管理有限公司',
        shortName: name,
        issueAmount: 200897170,
        rate: 8,
        endDate: '2017-03-03',
        riskLevel: 'L',
        payDate: '2017-01-08',
        credit: '保险保证金',
        gurantee: name,
        flow: 'N',
        accounts: [{
          id: uniqueId(),
          checked: true,
          type: '资产账户',
          belongto: name,
          name: name,
          bankNum: '2310 8372 6532 098',
          bank: '招商银行天津滨海新区支行'
        }]
      }
    }
  },

  methods: {
    submitForm() {
      Message.info('不能保存！Demo，只是用来展示！')
    },
    cancel() {
      MessageBox.confirm('内容将会清楚，确定取消吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$router.back()
      })
    },
    handleStartDate(value) {
      if (!value) return
      this.demo.startDate = moment(value).format('YYYY-MM-DD')
    },
    handleEndDate(value) {
      if (!value) return
      this.demo.endDate = moment(value).format('YYYY-MM-DD')
    },
    handlePayDate(value) {
      if (!value) return
      this.demo.payDate = moment(value).format('YYYY-MM-DD')
    },
    deleteAccount(account) {
      MessageBox.confirm('此操作将永久删除改批注, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.demo.accounts = remove(this.demo.accounts, function(v) {
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
      this.activeAccount = Object.assign({}, account)
      this.editAccountVisible = true
    },
    activeAccountSave() {
      const account = find(this.demo.accounts, v => this.activeAccount.id === v.id)
      if (account) { // 编辑
        Object.assign(account, this.activeAccount)
      } else { // 新增
        this.activeAccount.id = uniqueId()
          // this.activeAccount.checked = false
        this.demo.accounts.unshift(this.activeAccount)
        this._tableCheckedUpdate()
      }
      this.editAccountVisible = false
    },
    addCheckedAccount() {
      this.accountListVisible = true
    },
    _tableCheckedUpdate() {
      each(this.demo.accounts, (v) => {
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
      each(this.demo.accounts, v => {
        v.checked = includes(ids, v.id)
      })
    },
    checkAccount(val) {
      this.accountListChecked = val
    }
  },

  computed: {
    checkedAccounts() {
      return filter(this.demo.accounts, v => v.checked)
    },
    filterAccountList() {
      if (!this.demo.accounts.length) return this.demo.accounts
      return filter(this.demo.accounts, v => {
        return ~v.name.indexOf(this.filter.name) || ~v.bankNum.indexOf(this.filter.name)
      })
    }
  },

  data() {
    return {
      formLabelWidth: '120px',
      editAccountVisible: false,
      accountListVisible: false,
      activeAccount: {},
      accountListChecked: [],
      filter: {
        name: ''
      },
      demo: {
        name: null,
        amount: null,
        ratio: null,
        startDate: null,
        term: null,
        payFrequency: null,
        assetType: null,
        publisher: null,
        trustee: null,
        shortName: null,
        issueAmount: null,
        rate: null,
        endDate: null,
        riskLevel: 'L',
        payDate: null,
        credit: null,
        gurantee: null,
        flow: 'N',
        accounts: []
      },
      pickOpt: {
        format: 'yyyy-MM-dd'
      },
      riskLevels: [{
        name: '低风险',
        value: 'L'
      }, {
        name: '较低风险',
        value: 'M'
      }, {
        name: '高风险',
        value: 'H'
      }],
      flows: [{
        name: '无',
        value: 'N'
      }, {
        name: '高',
        value: 'H'
      }, {
        name: '低',
        value: 'L'
      }]
    }
  }
}
</script>

<style lang="scss">
.accounts-list {
  .box {
    border: 0;
    padding: 10px 0;
    .box-tab-header {
      top: 12px;
      right: 0;
    }
    .filters {
      padding: 0;
    }
  }
}
</style>
