<template lang="pug">
  section.account-list
    .box
      .box-tab-header
        el-button(type="primary", size="small", @click="$router.push({name: 'AccountForm', params: {id: 'add'}})")
          i.icon-batonx.icon-plus
          | 新增
      el-tabs(v-model='tab', type='card', @tab-click='tabClick')
        el-tab-pane(label='资金账户', name='first')
          .filters
            el-input(placeholder='所属方', icon='search', v-model.lazy='filter.belongto')
            el-input(placeholder='账户名', icon='search', v-model.lazy='filter.name')
            el-input(placeholder='账户', icon='search', v-model.lazy='filter.bankNum')
            el-select(v-model="filter.type", placeholder="账户类型")
              el-option(v-for="t in accountTypes", :value="t.value", :label="t.name")
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='资产账户', name='second')
          .filters
            el-input(placeholder='所属方', icon='search', v-model.lazy='filter.belongto')
            el-input(placeholder='账户名', icon='search', v-model.lazy='filter.name')
            el-input(placeholder='账户', icon='search', v-model.lazy='filter.bankNum')
            el-select(v-model="filter.type", placeholder="账户类型")
              el-option(v-for="t in accountTypes", :value="t.value", :label="t.name")
            el-button(size="small", type="primary", @click="clearFilter")  清除
    .table-container
      el-table(:data='filterAccounts', style='width: 100%')
        el-table-column(prop='belongto', label='所属方', width='220')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover' placement='top', )
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.belongto }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.belongto}}
        el-table-column(prop='type', label='账户类型', width='100')
        el-table-column(prop='name', label='账户名', width='220')
        el-table-column(prop='bankNum', label='账户', width='220')
        el-table-column(prop='bank', label='开户行', width='220')
        el-table-column(label='关联产品', width='100')
          template(scope="scope")
            a
              i.icon-batonx.icon-relation
        el-table-column(prop='updateDate', label='更新时间', width='120')
        el-table-column(label='操作', fixed="right", width='100')
          template(scope="scope")
            .operations
              i.icon-batonx.icon-edit(@click.stop="$router.push({name: 'AccountForm', params: {id: scope.row.name}})")
              i.icon-batonx.icon-delete(@click.stop="deleteAccount(scope.row)")
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='accounts.length')

</template>

<script>
import {
  remove,
  filter,
  each
} from 'lodash'
import {
  MessageBox
} from 'element-ui'

export default {
  methods: {
    tabClick(tab, event) {
      console.log(tab, event)
    },

    clearFilter() {
      each(this.filter, (v, k) => {
        this.filter[k] = ''
      })
    },

    goToDetail(row) {
      this.$router.push({
        name: 'AccountDetail',
        params: {
          id: row.id || row.name
        },
        query: {
          type: row.type
        }
      })
    },

    pageChange(val) {
      console.log(`分页${val}`)
    },

    pageSizeChange(val) {
      this.page.size = val
    },

    deleteAccount(account) {
      console.log(account)
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
        return ~v.belongto.indexOf(this.filter.belongto) && ~v.name.indexOf(this.filter.name) && ~v.bankNum.indexOf(this.filter.bankNum) && ~v.type.indexOf(this.filter.type)
      })
    }
  },

  data() {
    return {
      tab: 'first',
      filter: {
        belongto: '',
        name: '',
        bankNum: '',
        type: ''
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      accountTypes: [{
        name: '募集账户',
        value: '募集账户'
      }, {
        name: '产品账户',
        value: '产品账户'
      }, {
        name: '资产账户',
        value: '资产账户'
      }, {
        name: '费用账户',
        value: '费用账户'
      }, {
        name: '其他第三方账户',
        value: '其他第三方账户'
      }],
      accounts: [{
        belongto: '恒大金服有限公司',
        type: '募集账户',
        name: '恒大金服有限公司',
        bankNum: '0967 8022 6182 299',
        bank: '杭州银行股份有限公司南京河支行',
        updateDate: '2016-03-10'
      }, {
        belongto: '广东金融高新区股权交易中心',
        type: '产品账户',
        name: '广东金融高新区股权交易中心',
        bankNum: '0200 0033 2925 001012',
        bank: '中国工商银行北京市长安支行',
        updateDate: '2016-04-01'
      }, {
        belongto: '京东金融有限公司',
        type: '募集账户',
        name: '京东金融有限公司',
        bankNum: '1101 3875 7940 002',
        bank: '平安银行北京亚运村支行',
        updateDate: '2016-05-19'
      }, {
        belongto: '国美在线有限公司',
        type: '募集账户',
        name: '国美在线有限公司',
        bankNum: '8701 9981 0981 736',
        bank: '广发银行北京三元桥支行',
        updateDate: '2016-06-10'
      }, {
        belongto: '途牛金服有限公司',
        type: '募集账户',
        name: '途牛金服有限公司',
        bankNum: '4352 3892 6713 011',
        bank: '交通银行北京马甸桥支行',
        updateDate: '2016-07-01'
      }, {
        belongto: '天津旭达有限公司',
        type: '募集账户',
        name: '天津旭达有限公司',
        bankNum: '2310 8372 6532 098',
        bank: '招商银行天津滨海新区支行',
        updateDate: '2016-08-19'
      }, {
        belongto: '江苏开汇资产管理有限公司',
        type: '募集账户',
        name: '江苏开汇资产管理有限公司',
        bankNum: '4367 8022 6182 200',
        bank: '杭州银行股份有限公司南京河支行',
        updateDate: '2016-09-19'
      }, {
        belongto: '天翼电子商务有限公司',
        type: '募集账户',
        name: '天翼电子商务有限公司客户备付金',
        bankNum: '0033 2925 0000 532',
        bank: '中国工商银行北京市长安支行',
        updateDate: '2016-10-10'
      }, {
        belongto: '深圳前海子午金融服务有限公司',
        type: '募集账户',
        name: '深圳前海子午金融服务有限公司',
        bankNum: '1101 4805 7940 002',
        bank: '平安银行天津北辰支行',
        updateDate: '2016-07-08'
      }, {
        belongto: '北京永丰金融信息服务有限公司',
        type: '募集账户',
        name: '北京北陀资产管理有限公司',
        bankNum: '8701 9981 0981 736',
        bank: '渤海银行北京三元桥支行',
        updateDate: '2016-08-25'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 20px;
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  .icon-relation {
    font-size: 15px;
  }
}
</style>
