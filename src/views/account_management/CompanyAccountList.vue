<template lang="pug">
  section.company-account-list
    .box
      .box-header
        h3 筛选条件
        .buttons
          el-button(type="primary", size="small", @click="openAccountDialog()")
            i.icon-batonx.icon-plus
            | 添加
      .filters
        el-input(placeholder='账户名称', icon='search', v-model.lazy='filter.name')
        el-date-picker(placeholder="创建时间", type="date", v-model="filter.createdDate")
        el-select(placeholder="账户类型", v-model="filter.type")
          el-option(v-for="o in accountTypes", :value="o.value", :label="o.name")
        el-select(placeholder="所属部门", v-model="filter.department")
          el-option(v-for="o in departments", :value="o.value", :label="o.name")
        el-button(size="small", type="primary", @click="clearFilter")  清除
    .table-container
      el-table(:data='filterAccounts', style='width: 100%')
        el-table-column(property='name', label='账户名称', width='100')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover', placement='top')
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.name }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.name}}
        el-table-column(property='type', label='账户类型', width='150')
        el-table-column(property='department', label='所属部门', width='150')
        el-table-column(property='job', label='工作岗位', width='100')
        el-table-column(property='email', label='注册邮箱', width='200')
        el-table-column(property='updatedDate', label='更新时间',width='150')
        el-table-column(property='creator', label='创建人', width='100')
        el-table-column(property='updator', label='最后更新人', width='100')
        el-table-column(label='操作', :fixed="fixed", width='100')
          template(scope="scope")
            .operations
              i.icon-batonx.icon-edit(@click="openAccountDialog(scope.row)")
              i.icon-batonx.icon-delete(@click.stop="deleteAccount(scope.row)")
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='accounts.length')
    company-account-dialog(ref="accountDialog", @account-save="onAccountSave")

</template>

<script>
import {
  MessageBox
} from 'element-ui'
import {
  filter,
  remove,
  find,
  merge,
  each
} from 'lodash'
import CompanyAccountDialog from '@/components/CompanyAccountDialog.vue'
import moment from 'moment'

export default {
  components: {
    CompanyAccountDialog
  },
  methods: {
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

    onAccountSave(account) {
      const activeAccount = find(this.accounts, v => v.id === account.id)
      merge(account, {
        updatedDate: moment().format('YYYY-MM-DD'),
        createdDate: moment().format('YYYY-MM-DD'),
        creator: '刘建明',
        updator: '刘建明'
      })
      if (activeAccount) {
        merge(activeAccount, account)
      } else {
        this.accounts.unshift(account)
      }
    },

    openAccountDialog(account) {
      this.$refs.accountDialog.open(account)
    },

    deleteAccount(account) {
      MessageBox.confirm('账户删除后将无法再使用，确认删除？', '提示', {
        type: 'warning'
      }).then(() => {
        this.accounts = remove(this.accounts, (v) => {
          return account.name !== v.name
        })
      })
    }
  },

  computed: {
    filterAccounts() {
      return filter(this.accounts, v => {
        return ~v.name.indexOf(this.filter.name) && ~v.createdDate.indexOf(this.filter.createdDate) && ~v.department.indexOf(this.filter.department) && ~v.type.indexOf(this.filter.type)
      })
    }
  },

  data() {
    return {
      fixed: window.innerWidth - 180 - 12 * 2 > 1150 ? false : 'right', // 180 左侧菜单宽度，12 section的padding
      ownProductList: [],
      ownProductDialogVisible: false,
      filter: {
        name: '',
        createdDate: '',
        type: '',
        department: ''
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      departments: [{
        name: '业务发展部',
        value: '业务发展部'
      }, {
        name: '合规风控部',
        value: '合规风控部'
      }, {
        name: '软件开发部',
        value: '软件开发部'
      }, {
        name: '电子商务部',
        value: '电子商务部'
      }],
      accountTypes: [{
        name: '业务专员类',
        value: '业务专员类'
      }, {
        name: '经理类',
        value: '经理类'
      }, {
        name: '总监类',
        value: '总监类'
      }, {
        name: '费用账户',
        value: '费用账户'
      }, {
        name: '其他第三方账户',
        value: '其他第三方账户'
      }],
      accounts: [{
        id: 1,
        name: '王一',
        type: '业务专员类',
        password: '12345678',
        department: '业务发展部',
        job: '专员',
        email: 'wangyi@gdotc.com',
        updatedDate: '2017-01-12',
        createdDate: '2017-01-12',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 2,
        name: '周东',
        type: '业务专员类',
        password: '12345678',
        department: '业务发展部',
        job: '专员',
        email: 'zhoudong@gdotc',
        updatedDate: '2017-01-14',
        createdDate: '2017-01-14',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 3,
        name: '刘方波',
        type: '经理类',
        password: '12345678',
        department: '合规风控部',
        job: '经理',
        email: 'liufangbo@gdotc.com',
        updatedDate: '2017-01-17',
        createdDate: '2017-01-17',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 4,
        name: '陈明珠',
        type: '总监类',
        password: '12345678',
        department: '合规风控部',
        job: '总监',
        email: 'chenmingzhu@gdotc.com',
        updatedDate: '2017-01-25',
        createdDate: '2017-01-25',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 5,
        name: '陈敏',
        type: '经理类',
        password: '12345678',
        department: '软件开发部',
        job: '经理',
        email: 'chenmin@gdotc.com',
        updatedDate: '2017-02-09',
        createdDate: '2017-02-09',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 6,
        name: '罗玉柱',
        type: '业务专员类',
        password: '12345678',
        department: '电子商务部',
        job: '专员',
        email: 'luoyuzhu@gdotc.com',
        updatedDate: '2017-02-10',
        createdDate: '2017-02-10',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 7,
        name: '左明',
        type: '业务专员类',
        password: '12345678',
        department: '业务发展部',
        job: '专员',
        email: 'zuoming@gdotc.com',
        updatedDate: '2017-02-10',
        createdDate: '2017-02-10',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 8,
        name: '齐一鸣',
        type: '业务专员类',
        password: '12345678',
        department: '合规风控部',
        job: '专员',
        email: 'qiyiming@gdotc.com',
        updatedDate: '2017-02-10',
        createdDate: '2017-02-10',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 9,
        name: '赵中锋',
        type: '业务专员类',
        password: '12345678',
        department: '业务发展部',
        job: '专员',
        email: 'zhaozhongfeng@gdotc.com',
        updatedDate: '2017-02-10',
        createdDate: '2017-02-10',
        creator: '刘建明',
        updator: '刘建明'
      }, {
        id: 10,
        name: '李洛曼',
        type: '经理类',
        password: '12345678',
        department: '电子商务部',
        job: '经理',
        email: 'liluoman@gdotc.com',
        updatedDate: '2017-02-12',
        createdDate: '2017-02-12',
        creator: '刘建明',
        updator: '刘建明'
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
