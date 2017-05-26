<template lang="pug">
  section.inst-list
    .box
      .box-tab-header
        el-button(type="primary", size="small", @click="$router.push({name: 'InstForm', params: {id: 'add'}})")
          i.icon-batonx.icon-plus
          | 新增
      el-tabs(v-model='tab', type='card', @tab-click='tabClick')
        el-tab-pane(label='资金渠道', name='first')
          .filters
            el-input(placeholder='机构名称', icon='search', v-model.lazy='filter.name')
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='资产渠道', name='second')
          .filters
            el-input(placeholder='机构名称', icon='search', v-model.lazy='filter.name')
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='托管机构', name='third')
          .filters
            el-input(placeholder='机构名称', icon='search', v-model.lazy='filter.name')
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='增信机构', name='fourth')
          .filters
            el-input(placeholder='机构名称', icon='search', v-model.lazy='filter.name')
            el-button(size="small", type="primary", @click="clearFilter")  清除
        el-tab-pane(label='投资顾问', name='fifth')
          .filters
            el-input(placeholder='机构名称', icon='search', v-model.lazy='filter.name')
            el-button(size="small", type="primary", @click="clearFilter")  清除
    .table-container
      el-table(:data='filterTableData', style='width: 100%', @row-click='goToDetail')
        el-table-column(prop='name', label='机构名称', width='220')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover' placement='top', )
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.name }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.name}}
        el-table-column(prop='count', label='存量产品数量')
        el-table-column(prop='amount', label='存量产品金额', :sortable='true')
        el-table-column(prop='amountRate', label='存量产品金额占比', :sortable='true')
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='tableData.length')

</template>

<script>
import {
  filter,
  each
} from 'lodash'
import {
  Message
} from 'element-ui'
export default {
  methods: {
    tabClick(tab, event) {
      if (tab.name === 'first') {
        this.filter.type = 0
      } else if (tab.name === 'second') {
        this.filter.type = 1
      } else if (tab.name === 'third') {
        this.filter.type = 2
      } else if (tab.name === 'fourth') {
        this.filter.type = 3
      } else {
        this.filter.type = 4
      }
    },

    clearFilter() {
      each(this.filter, (v, k) => {
        this.filter[k] = ''
      })
    },

    goToDetail(row) {
      if (row.type > 0) {
        Message.info('测试账号不支持点击功能')
      } else {
        this.$router.push({
          name: 'InstDetail',
          params: {
            id: row.id || row.name
          },
          query: {
            type: row.type
          }
        })
      }
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
        return (~v.name.indexOf(this.filter.name)) && (this.filter.type === v.type)
      })
    }
  },

  data() {
    return {
      tab: 'first',
      filter: {
        name: '',
        type: 0
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      tableData: [{
        name: '恒大金服',
        amount: '￥13,098,781.00',
        count: 100,
        type: 0,
        amountRate: '25.4%'
      }, {
        name: '途牛金服',
        amount: '￥20,231.00',
        count: 80,
        type: 0,
        amountRate: '26.4%'
      }, {
        name: '京东金融',
        amount: '￥45,632,98.00',
        count: 70,
        type: 0,
        amountRate: '15.4%'
      }, {
        name: '广西万宁投资集团',
        amount: '￥398,781.00',
        count: 50,
        type: 1,
        amountRate: '20.4%'
      }, {
        name: '天津旭达有限公司',
        amount: '￥13,781.00',
        count: 80,
        type: 1,
        amountRate: '15.8%'
      }, {
        name: '阳光城责任有限公司',
        amount: '￥13,098,781.00',
        count: 90,
        type: 1,
        amountRate: '26.3%'
      }, {
        name: '浦发银行',
        amount: '￥13,098,781.00',
        count: 100,
        type: 2,
        amountRate: '18.4%'
      }, {
        name: '光大银行',
        amount: '￥20,231.00',
        count: 80,
        type: 2,
        amountRate: '9.5%'
      }, {
        name: '建设银行',
        amount: '￥45,632,98.00',
        count: 70,
        type: 2,
        amountRate: '10.1%'
      }, {
        name: '中国人寿',
        amount: '￥1,381.00',
        count: 100,
        type: 3,
        amountRate: '5.4%'
      }, {
        name: '新华保险',
        amount: '￥20,231.00',
        count: 80,
        type: 3,
        amountRate: '26.4%'
      }, {
        name: '中合担保',
        amount: '￥45,698.00',
        count: 70,
        type: 3,
        amountRate: '21.9%'
      }, {
        name: '九州金融控股有限公司',
        amount: '￥113,098,781.00',
        count: 100,
        type: 4,
        amountRate: '5.4%'
      }, {
        name: '蓝芩金融有限公司',
        amount: '￥20,231.00',
        count: 80,
        type: 4,
        amountRate: '26.4%'
      }, {
        name: '贝林有限公司',
        amount: '￥45,632,98.00',
        count: 70,
        type: 4,
        amountRate: '15.4%'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
