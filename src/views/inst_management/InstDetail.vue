<template lang="pug">
  section.inst-list
    .box
      .box-tab-header
        el-button(type="primary", size="small", @click="$router.push({name: 'AssetForm', params: {id: 'add'}})")
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
        el-tab-pane(label='增信机构', name='fifth')
          .filters
            el-input(placeholder='机构名称', icon='search', v-model.lazy='filter.name')
            el-button(size="small", type="primary", @click="clearFilter")  清除
    .table-container
      el-table(:data='filterTableData', style='width: 100%', @row-click='goToDetail')
        el-table-column(prop='name' label='机构名称', width='220')
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
        name: 'InstDetail',
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
        return ~v.name.indexOf(this.filter.name)
      })
    }
  },

  data() {
    return {
      tab: 'first',
      filter: {
        name: ''
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
        amountRate: '25.4%'
      }, {
        name: '途牛金服',
        amount: '￥20,231.00',
        count: 80,
        amountRate: '26.4%'
      }, {
        name: '和聚宝',
        amount: '￥45,632,98.00',
        count: 70,
        amountRate: '15.4%'
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
