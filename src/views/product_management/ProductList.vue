<template lang="pug">
  section.asset-list
    .box
      .box-tab-header
        el-button(type="primary", size="small")
          i.icon-batonx.icon-plus
          | 新增
        el-button.elButton(type="info",size="small")
          i.icon-batonx.icon-import
          | 导入
        a.inport-file 历史导入文件
      el-tabs(v-model='tab', type='card', @tab-click='tabClick')
        el-tab-pane(label='全部', name='first')
          .filters
            .filters-top
              .filter-top-left.fl
                label.fl 产品类型：
                ul.fl
                  li.fl(v-for="(type,$index) in productTypes",:class="{active: type.defaultColor}")
                    a(@click="searchFilter($index)") {{type.value}}
              .filter-top-middle.fl
                label.fl 发行进度：
                ul.fl
                  li.fl(v-for="schedule in schedules")
                    a {{schedule.value}}
              .filter-top-right.fl
                label.fl 执行状态：
                ul.fl
                  li.fl(v-for="statu in status")
                    a {{statu.value}}
            .filters-bottom
                label.fl 发行平台:
                ul.fl
                  li.fl(v-for="platform in platforms")
                    a {{platform.value}}
            .filters-search
              .search-input
                el-input(icon='search', placeholder="请输入产品名称",:on-icon-click="findproduct",v-model.lazy='filter.name')
        el-tab-pane(label='待发产品', name='second')
          .filters
            .filters-top
              .filter-top-left.fl
                label.fl 产品类型：
                ul.fl
                  li.fl(v-for="type in productTypes")
                    a {{type.value}}
              .filter-top-middle.fl
                label.fl 发行进度：
                ul.fl
                  li.fl(v-for="schedule in schedules")
                    a {{schedule.value}}
              .filter-top-right.fr
                label.fl 执行状态：
                ul.fl
                  li.fl(v-for="statu in status")
                    a {{statu.value}}
            .filters-bottom
                label.fl 发行平台:
                ul.fl
                  li.fl(v-for="platform in platforms")
                    a {{platform.value}}
            .filters-search
              .search-input
                el-input(icon='search', placeholder="请输入产品代码",:on-icon-click="findproduct")
        el-tab-pane(label='存续产品', name='third')
          .filters
            .filters-top
              .filter-top-left.fl
                label.fl 产品类型：
                ul.fl
                  li.fl(v-for="type in productTypes")
                    a {{type.value}}
              .filter-top-middle.fl
                label.fl 发行进度：
                ul.fl
                  li.fl(v-for="schedule in schedules")
                    a {{schedule.value}}
              .filter-top-right.fr
                label.fl 执行状态：
                ul.fl
                  li.fl(v-for="statu in status")
                    a {{statu.value}}
            .filters-bottom
                label.fl 发行平台:
                ul.fl
                  li.fl(v-for="platform in platforms")
                    a {{platform.value}}
            .filters-search
              .search-input
                el-input(icon='search', placeholder="请输入产品代码",:on-icon-click="findproduct")
        el-tab-pane(label='到期产品', name='fourth')
          .filters
            .filters-top
              .filter-top-left.fl
                label.fl 产品类型：
                ul.fl
                  li.fl(v-for="type in productTypes")
                    a {{type.value}}
              .filter-top-middle.fl
                label.fl 发行进度：
                ul.fl
                  li.fl(v-for="schedule in schedules")
                    a {{schedule.value}}
              .filter-top-right.fr
                label.fl 执行状态：
                ul.fl
                  li.fl(v-for="statu in status")
                    a {{statu.value}}
            .filters-bottom
                label.fl 发行平台:
                ul.fl
                  li.fl(v-for="platform in platforms")
                    a {{platform.value}}
            .filters-search
              .search-input
                el-input(icon='search', placeholder="请输入产品代码",:on-icon-click="findproduct")
    .table-container
      el-table(:data='tableData', style='width: 100%', @row-click='goToDetail')
        el-table-column(property='name', label='资产名称', width='320')
          template(scope='scope')
           span.asset-name {{scope.row.name}}
           span.current(v-if="scope.row.current") 活期
           span.regular(v-if="!scope.row.current") 定期
           i.icon-batonx.icon-date
        el-table-column
          template(scope='scope')
            span.status_color(v-for="state in scope.row.status", :class="state | filterColor") {{state}}
        el-table-column(property='amount', label='实际募集金额', width='150')
        el-table-column(property='term' label='发行期限')
        el-table-column(property='startDate', label='起息日', :sortable='true')
        el-table-column(property='endDate' label='到期日')
        el-table-column(property='rates' label='发行利率', width='180')
        el-table-column(property='platforms' label='发行平台', width="150")
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='tableData.length')

</template>

<script>
import {
  // filter,
  each
} from 'lodash'
import {
  Message
} from 'element-ui'
import exMixin from '@/common/mixin.js'
export default {
  mixins: [exMixin],
  methods: {
    findproduct() {
      Message.info('dome暂时不支持查找')
    },
    tabClick(tab, event) {
      console.log(tab, event)
    },
    searchFilter(index) {
      this.productTypes[index].defaultColor = true
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
    // filterTableData() {
    //   return filter(this.tableData, v => {
    //     return ~v.name.indexOf(this.filter.name) && ~v.rates.indexOf(this.filter.publisher) && ~v.amount.indexOf(this.filter.amount)
    //   })
    // }
  },

  data() {
    return {
      tab: 'first',
      filter: {
        name: '',
        rates: '',
        amount: ''
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      productTypes: [
        {
          value: '全部',
          defaultColor: false
        },
        {
          value: '定期',
          defaultColor: false
        },
        {
          value: '活期',
          defaultColor: false
        }
      ],
      schedules: [
        {
          value: '全部'
        },
        {
          value: '待提交'
        },
        {
          value: '待确认'
        },
        {
          value: '待发布'
        },
        {
          value: '已发布'
        },
        {
          value: '销售完成'
        },
        {
          value: '已确认确认书'
        }
      ],
      status: [
        {
          value: '全部'
        },
        {
          value: '已执行'
        },
        {
          value: '待执行'
        },
        {
          value: '不可执行'
        },
        {
          value: '已过期'
        }
      ],
      platforms: [
        {
          value: '全部'
        },
        {
          value: '财富宝'
        },
        {
          value: '360你财富'
        },
        {
          value: '甜橙理财'
        }
      ],
      tableData: [{
        note: '基金总额的30%需在2017年03月06日变现',
        name: '恒耀稳享5016期',
        amount: '￥13,098,781.00',
        startDate: '2017-01-05',
        endDate: '2017-06-05',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['待提交'],
        current: true
      }, {
        name: '恒耀稳享3006期',
        amount: '￥20,231.00',
        startDate: '2017-01-13',
        endDate: '2017-07-05',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['待确认']
      }, {
        name: '恒存金-灵活理财A',
        amount: '￥45,632,98.00',
        startDate: '2017-01-20',
        endDate: '2017-04-20',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: []
      }, {
        name: '恒耀稳享85期',
        amount: '￥870,654,256.00',
        startDate: '2017-01-22',
        endDate: '2017-05-22',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['待发布'],
        current: true
      }, {
        name: '普惠金交·牛稳赚3号理财计',
        amount: '￥12,098,653.00',
        startDate: '2017-01-28',
        endDate: '2017-02-28',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['销售完成', '待执行']
      }, {
        name: '恒耀稳享4358期',
        amount: '￥34,892.00',
        startDate: '2017-01-30',
        endDate: '2017-06-30',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已确认确认书']
      }, {
        name: '恒耀稳享9746期',
        amount: '￥23,673,88.00',
        startDate: '2017-02-05',
        endDate: '2017-07-05',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['待发布']
      }, {
        name: '恒存金-灵活理财C',
        amount: '￥12,872.00',
        startDate: '2017-02-15',
        endDate: '2017-04-15',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已发布']
      }, {
        name: '恒耀稳享36期',
        amount: '￥76,897,882.00',
        startDate: '2017-02-18',
        endDate: '2017-03-18',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['销售完成', '待执行'],
        current: true
      }, {
        name: '普惠金交·牛稳赚4号理财计划',
        amount: '￥27,653,21.00',
        startDate: '2017-02-24',
        endDate: '2018-02-24',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已确认确认书']
      }, {
        name: '恒存金-灵活理财B',
        amount: '￥27,653,21.00',
        startDate: '2017-02-24',
        endDate: '2018-02-24',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已确认确认书']
      }, {
        name: '恒耀稳享4866期',
        amount: '￥27,653,21.00',
        startDate: '2017-02-24',
        endDate: '2018-02-24',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已确认确认书']
      }, {
        name: '普惠金交·牛稳赚5号理365划',
        amount: '￥27,653,21.00',
        startDate: '2017-02-24',
        endDate: '2018-02-24',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已确认确认书']
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button--info{
  padding:7px 9px;
  background: #96a3ba;
  border-color: #96a3ba;
}
.inport-file{
  display: inline-block;
  margin-left:10px;
  color:#538cc0;
}
.filters {
  .filters-top{
    padding:10px 0;
    overflow: hidden;
    label{
      width:65px;
      color:#54637a;
    }
    li{
      // padding:0 5px;
      a{
        border-radius: 3px;
        padding:0 5px;
      }
    }
   .filter-top-middle,.filter-top-right{
    margin-left:50px;
   }
   .filter-top-middle,.filter-top-left,.filter-top-right{
    // width:33%;
    .active{
      a{
        background: #538cc0;
        color:#fff;
      }
    }
   }
  }
  .filters-bottom{
    overflow: hidden;
    padding:15px 0;
    label{
      width:65px;
      color:#54637a;
    }
    li{
      // padding:0 5px;
      a{
        padding:0 5px;
      }
    }
  }
  .filters-search{
    margin:0 -15px;
    border-top:1px solid #e7eaed;
    .search-input{
      padding:15px 15px 0 15px;
    }
  }
  .el-input {
    margin-right: 20px;
  }
}

.table-container {
  margin-top: 20px;
  table{
    table-layout: auto;
  }
  .el-table_1_column_1{
    .current{
      padding:0 3px;
      background: #e55a6c;
      color:#fff;
      margin-left:8px;
      border-radius: 3px;
  }
  .icon-date{
    margin-left:8px;
  }
}
.el-table_1_column_2{
     .status_color{
        padding:0 5px;
        border-right:1px solid #f4f5f7;
        &:last-child{
          border-right:none;
        }
    }
    .waitC{
        color:#eb7c72;
      }
    .ok1C{
        color:#18b8ba;
      }
    .ok2C{
        color:#538cc0;
      }

}
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
