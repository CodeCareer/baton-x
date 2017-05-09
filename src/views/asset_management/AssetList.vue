<template lang="pug">
  section.asset-list
    .box
      .box-tab-header
        el-button(type="primary", size="small")
          i.icon-batonx.icon-plus
          | 新增
      el-tabs(v-model='tab', type='card', @tab-click='tabClick')
        el-tab-pane(label='非标资产', name='first')
          .filters
            el-input(placeholder='资产名称', icon='search', v-model.lazy='filter.name')
            el-input(placeholder='发行方', icon='search', v-model.lazy='filter.publisher')
            el-input(placeholder='增信措施', icon='search', v-model.lazy='filter.credit')
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='基金', name='second')
          .filters
            el-input(placeholder='资产名称', icon='search', v-model.lazy='filter.name')
            el-input(placeholder='发行方', icon='search', v-model.lazy='filter.publisher')
            el-input(placeholder='增信措施', icon='search', v-model.lazy='filter.credit')
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='股票', name='third')
          .filters
            el-input(placeholder='资产名称', icon='search', v-model.lazy='filter.name')
            el-input(placeholder='发行方', icon='search', v-model.lazy='filter.publisher')
            el-input(placeholder='增信措施', icon='search', v-model.lazy='filter.credit')
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='债权', name='fourth')
          .filters
            el-input(placeholder='资产名称', icon='search', v-model.lazy='filter.name')
            el-input(placeholder='发行方', icon='search', v-model.lazy='filter.publisher')
            el-input(placeholder='增信措施', icon='search', v-model.lazy='filter.credit')
            el-button(size="small", type="primary", @click="clearFilter")  清除
    .table-container
      el-table(:data='filterTableData', style='width: 100%', @row-click='goToDetail')
        el-table-column(prop='name' label='资产名称', width='220')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover' placement='top', )
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.name }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.name}}
        el-table-column(prop='amount' label='持有金额', width='150')
        el-table-column(prop='start_date' label='起息日')
        el-table-column(prop='end_date', label='到期日', :sortable='true')
        el-table-column(prop='term' label='剩余期限')
        el-table-column(prop='publisher' label='发行方', width='180')
        el-table-column(prop='credit' label='增信措施', width="150")
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='tableData.length')

</template>

<script>
import {
  filter,
  each
} from 'lodash'

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
        name: 'AssetDetail',
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
    }
  },

  computed: {
    filterTableData() {
      return filter(this.tableData, v => {
        return ~v.name.indexOf(this.filter.name) && ~v.publisher.indexOf(this.filter.publisher) && ~v.credit.indexOf(this.filter.credit)
      })
    }
  },

  data() {
    return {
      tab: 'first',
      filter: {
        name: '',
        publisher: '',
        credit: ''
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      tableData: [{
        note: '基金总额的30%需在2017年03月06日变现',
        name: '中信信托回购项目',
        amount: '￥13,098,781.00',
        start_date: '2017-01-05',
        end_date: '2017-06-05',
        term: '96天',
        type: 1,
        publisher: '中信集团',
        credit: '责任担保'
      }, {
        name: '广西中小担-象翌融资项目',
        amount: '￥20,231.00',
        start_date: '2017-01-13',
        end_date: '2017-07-05',
        term: '26天',
        type: 0,
        publisher: '广西中小担保有限公司',
        credit: '平台风险备用金'
      }, {
        name: '武汉新港城建设投资企业融资项目',
        amount: '￥45,632,98.00',
        start_date: '2017-01-20',
        end_date: '2017-04-20',
        term: '56天',
        type: 0,
        publisher: '武汉新港城建设投资企业',
        credit: '到期回购'
      }, {
        name: '广西万宁投资集团融资项目',
        amount: '￥870,654,256.00',
        start_date: '2017-01-22',
        end_date: '2017-05-22',
        term: '87天',
        type: 0,
        publisher: '广西万宁投资集团',
        credit: '全额回购担保'
      }, {
        name: '创元开发建设投资企业融资项目',
        amount: '￥12,098,653.00',
        start_date: '2017-01-28',
        end_date: '2017-02-28',
        term: '4天',
        type: 0,
        publisher: '创元开发建设投资企业',
        credit: '连带责任担保'
      }, {
        name: '宝信国际ABS集合信托项目',
        amount: '￥34,892.00',
        start_date: '2017-01-30',
        end_date: '2017-06-30',
        term: '26天',
        type: 0,
        publisher: '宝信国际有限公司',
        credit: '风险保证金'
      }, {
        name: '武汉信用-福州郑和发展融资项目',
        amount: '￥23,673,88.00',
        start_date: '2017-02-05',
        end_date: '2017-07-05',
        term: '31天',
        type: 0,
        publisher: '福州郑和发展有限公司',
        credit: '承诺回购'
      }, {
        name: '天津旭达过桥资金项目',
        amount: '￥12,872.00',
        start_date: '2017-02-15',
        end_date: '2017-04-15',
        term: '50天',
        type: 0,
        publisher: '天津旭达有限公司',
        credit: '到期还款'
      }, {
        name: '阳光城保证金基金项目',
        amount: '￥76,897,882.00',
        start_date: '2017-02-18',
        end_date: '2017-03-18',
        term: '22天',
        type: 0,
        publisher: '阳光城责任有限公司',
        credit: '无限责任担保'
      }, {
        name: '沂山实业企业融资项目',
        amount: '￥27,653,21.00',
        start_date: '2017-02-24',
        end_date: '2018-02-24',
        term: '10天',
        type: 0,
        publisher: '沂山实业责任有限公司',
        credit: '风险保证金'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  .el-input {
    margin-right: 20px;
  }
}

.table-container {
  margin-top: 20px;
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
