<template lang="pug">
  section.product-list
    .box
      .box-tab-header
        el-button(type="primary", size="small",@click="$router.push({name: 'ProductEdit', params: {id: 'add'}})")
          i.icon-batonx.icon-plus
          | 新增
        el-button.elButton(type="info",size="small",@click="importData")
          i.icon-batonx.icon-import
          | 导入
        a.inport-file 历史导入文件
      el-tabs(v-model='tab', type='card', @tab-click='tabClick')
        el-tab-pane(label='全部', name='first')
          .filters
            .filters-top
              .filter-checkbox
                .filter-top-left
                  | 产品类型：
                  el-radio-group.vertical(v-model="filter.productType")
                    el-radio(v-for="productType in productTypes",:label="productType.value") {{productType.name}}
                //- .filter-top-left
                //-   | 发行进度：
                //-   el-radio-group.vertical(v-model="filter.schedule")
                //-     el-radio(v-for="schedule in schedules",:label="schedule.value") {{schedule.name}}
                //- .filter-top-left
                //-   | 执行状态：
                //-   el-radio-group.vertical(v-model="filter.state")
                //-     el-radio(v-for="state in status",:label="state.value") {{state.name}}
            .filters-bottom.filter-checkbox
              | 发行平台：
              el-radio-group.vertical(v-model="filter.platform")
                el-radio(v-for="platform in platforms",:label="platform.value") {{platform.name}}
            .filters-search
              .search-input
                el-input(icon='search', placeholder="请输入产品名称",:on-icon-click="findproduct",v-model.lazy='filter.name')
        el-tab-pane(label='待发产品', name='second')
          .filters
            .filters-top
              .filter-checkbox
                .filter-top-left
                  | 产品类型：
                  el-radio-group.vertical(v-model="filter.productType")
                    el-radio(v-for="productType in productTypes",:label="productType.value") {{productType.name}}
                //- .filter-top-left
                //-   | 发行进度：
                //-   el-radio-group.vertical(v-model="filter.schedule")
                //-     el-radio(v-for="schedule in schedules",:label="schedule.value") {{schedule.name}}
                //- .filter-top-left
                //-   | 执行状态：
                //-   el-radio-group.vertical(v-model="filter.state")
                //-     el-radio(v-for="state in status",:label="state.value") {{state.name}}
            .filters-bottom.filter-checkbox
              | 发行平台：
              el-radio-group.vertical(v-model="filter.platform")
                el-radio(v-for="platform in platforms",:label="platform.value") {{platform.name}}
            .filters-search
              .search-input
                el-input(icon='search', placeholder="请输入产品名称",:on-icon-click="findproduct",v-model.lazy='filter.name')
        el-tab-pane(label='存续产品', name='third')
          .filters
            .filters-top
              .filter-checkbox
                .filter-top-left
                  | 产品类型：
                  el-radio-group.vertical(v-model="filter.productType")
                    el-radio(v-for="productType in productTypes",:label="productType.value") {{productType.name}}
                //- .filter-top-left
                //-   | 发行进度：
                //-   el-radio-group.vertical(v-model="filter.schedule")
                //-     el-radio(v-for="schedule in schedules",:label="schedule.value") {{schedule.name}}
                //- .filter-top-left
                //-   | 执行状态：
                //-   el-radio-group.vertical(v-model="filter.state")
                //-     el-radio(v-for="state in status",:label="state.value") {{state.name}}
            .filters-bottom.filter-checkbox
              | 发行平台：
              el-radio-group.vertical(v-model="filter.platform")
                el-radio(v-for="platform in platforms",:label="platform.value") {{platform.name}}
            .filters-search
              .search-input
                el-input(icon='search', placeholder="请输入产品名称",:on-icon-click="findproduct",v-model.lazy='filter.name')
        el-tab-pane(label='到期产品', name='fourth')
          .filters
            .filters-top
              .filter-checkbox
                .filter-top-left
                  | 产品类型：
                  el-radio-group.vertical(v-model="filter.productType")
                    el-radio(v-for="productType in productTypes",:label="productType.value") {{productType.name}}
                //- .filter-top-left
                //-   | 发行进度：
                //-   el-radio-group.vertical(v-model="filter.schedule")
                //-     el-radio(v-for="schedule in schedules",:label="schedule.value") {{schedule.name}}
                //- .filter-top-left
                //-   | 执行状态：
                //-   el-radio-group.vertical(v-model="filter.state")
                //-     el-radio(v-for="state in status",:label="state.value") {{state.name}}
            .filters-bottom.filter-checkbox
              | 发行平台：
              el-radio-group.vertical(v-model="filter.platform")
                el-radio(v-for="platform in platforms",:label="platform.value") {{platform.name}}
            .filters-search
              .search-input
                el-input(icon='search', placeholder="请输入产品名称",:on-icon-click="findproduct",v-model.lazy='filter.name')
    .table-container
      el-table(:data='filterTableData', style='width: 100%', @row-click='goToDetail')
        el-table-column(property='name', label='资产名称',width="260")
          template(scope='scope')
           span.asset-name {{scope.row.name}}
           span.current(v-if="scope.row.current") 活期
           //- span.regular(v-if="!scope.row.current") 定期
           i.icon-batonx.icon-date
        el-table-column(width="150")
          template(scope='scope')
            span.status_color(v-for="state in scope.row.status", :class="state | filterColor") {{state}}
        el-table-column(property='amount', label='实际募集金额',width="150")
        el-table-column(property='term' label='发行期限',width="90")
        el-table-column(property='startDate', label='起息日', :sortable='true')
        el-table-column(property='endDate' label='到期日')
        el-table-column(property='rates' label='发行利率',width="90")
        el-table-column(property='platforms' label='发行平台')
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
import exMixin from '@/common/mixin.js'
export default {
  mixins: [exMixin],
  methods: {
    importData() {
      Message.info('测试账号不支持此功能！')
    },
    findproduct() {
      Message.info('测试账号不支持此功能！')
    },
    tabClick(tab, event) {
      if (tab.name === 'first') {
        this.filter.id = null
        console.log(tab.name + this.filter.id)
      } else if (tab.name === 'second') {
        this.filter.id = 1
        console.log(tab.name)
      } else if (tab.name === 'third') {
        this.filter.id = 2
        console.log(tab.name)
      } else {
        this.filter.id = 3
        console.log(tab.name)
      }
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
        name: 'ProductDetail',
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
      const {
        productType,
        schedule,
        state,
        platform,
        name,
        id
      } = this.filter

      return filter(this.tableData, v => {
        return (productType === v.productType || productType === '全部') && (schedule === v.schedule || schedule === '全部') && (state === v.state || state === '全部') && ~v.name.indexOf(name) && (platform === v.platforms || platform === '全部') && (!id || id === v.id)
      })
    }
  },

  data() {
    return {
      tab: 'first',
      filter: {
        productType: '全部',
        schedule: '全部',
        state: '全部',
        platform: '全部',
        name: '',
        id: null
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      productTypes: [{
        value: '全部',
        name: '全部'
      }, {
        value: '定期',
        name: '定期'
      }, {
        value: '活期',
        name: '活期'
      }],
      schedules: [{
        value: '全部',
        name: '全部'
      }, {
        value: '待提交',
        name: '待提交'
      }, {
        value: '待确认',
        name: '待确认'
      }, {
        value: '待发布',
        name: '待发布'
      }, {
        value: '已发布',
        name: '已发布'
      }, {
        value: '销售完成',
        name: '销售完成'
      }, {
        value: '已确认确认书',
        name: '已确认确认书'
      }],
      status: [{
        value: '全部',
        name: '全部'
      }, {
        value: '已执行',
        name: '已执行'
      }, {
        value: '待执行',
        name: '待执行'
      }, {
        value: '不可执行',
        name: '不可执行'
      }, {
        value: '已过期',
        name: '已过期'
      }],
      platforms: [{
        value: '全部',
        name: '全部'
      }, {
        value: '恒大金服',
        name: '恒大金服'
      }, {
        value: '途牛金服',
        name: '途牛金服'
      }, {
        value: '京东金融',
        name: '京东金融'
      }],
      tableData: [{
        note: '基金总额的30%需在2017年03月06日变现',
        name: '恒耀稳享5016期',
        amount: '￥13,098,781.00',
        startDate: '2017-01-05',
        endDate: '2017-06-05',
        term: '151天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['待提交'],
        current: false,
        type: 0,
        id: 2,
        productType: '活期',
        schedule: '待发布',
        state: '待执行',
        platform: '财富宝'
      }, {
        name: '恒耀稳享3006期',
        amount: '￥20,231.00',
        startDate: '2017-01-13',
        endDate: '2017-07-05',
        term: '173天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['待确认'],
        type: 0,
        id: 2,
        productType: '定期',
        schedule: '已发布',
        state: '已执行',
        platform: '360你财富'
      }, {
        name: '恒存金-灵活理财A',
        amount: '￥45,632,98.00',
        startDate: '2017-01-20',
        endDate: '-',
        term: '-',
        rates: '6.5%',
        platforms: '恒大金服',
        status: [],
        type: 1,
        id: 1,
        current: true,
        productType: '定期',
        schedule: '已发布',
        state: '已执行',
        platform: '360你财富'
      }, {
        name: '恒耀稳享85期',
        amount: '￥870,654,256.00',
        startDate: '2017-01-22',
        endDate: '2017-05-22',
        term: '120天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['待发布'],
        current: false,
        type: 0,
        id: 2,
        productType: '定期',
        schedule: '已发布',
        state: '已执行',
        platform: '甜橙理财'
      }, {
        name: '普惠金交·牛稳赚3号理财计',
        amount: '￥12,098,653.00',
        startDate: '2017-01-28',
        endDate: '2017-02-28',
        term: '31天',
        rates: '6.5%',
        platforms: '途牛金服',
        status: ['销售完成', '待执行'],
        type: 0,
        id: 1,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }, {
        name: '恒耀稳享4358期',
        amount: '￥34,892.00',
        startDate: '2017-01-30',
        endDate: '2017-06-30',
        term: '151天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已确认确认书'],
        type: 0,
        id: 2,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }, {
        name: '恒耀稳享9746期',
        amount: '￥23,673,88.00',
        startDate: '2017-02-05',
        endDate: '2017-07-05',
        term: '150天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['待发布'],
        type: 0,
        id: 2,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }, {
        name: '恒存金-灵活理财C',
        amount: '￥12,872.00',
        startDate: '2017-02-15',
        endDate: '2017-04-15',
        term: '59天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已发布'],
        type: 0,
        id: 2,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }, {
        name: '恒耀稳享36期',
        amount: '￥76,897,882.00',
        startDate: '2017-02-18',
        endDate: '2017-03-18',
        term: '28天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['销售完成', '待执行'],
        current: false,
        type: 0,
        id: 1,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }, {
        name: '普惠金交·牛稳赚4号理财计划',
        amount: '￥27,653,21.00',
        startDate: '2017-02-24',
        endDate: '2018-02-24',
        term: '365天',
        rates: '6.5%',
        platforms: '途牛金服',
        status: ['已确认确认书'],
        type: 0,
        id: 2,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }, {
        name: '恒存金-灵活理财B',
        amount: '￥27,653,21.00',
        startDate: '2017-02-24',
        endDate: '2018-02-24',
        term: '365天',
        rates: '6.5%',
        platforms: '恒大金服',
        status: ['已确认确认书'],
        type: 0,
        id: 2,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }, {
        name: '丰银宝A',
        amount: '￥27,653,21.00',
        startDate: '2017-02-24',
        endDate: '-',
        term: '-',
        rates: '6.5%',
        platforms: '京东金融',
        status: ['已执行'],
        type: 1,
        id: 1,
        current: true,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }, {
        name: '丰银宝B',
        amount: '￥27,653,21.00',
        startDate: '2017-02-24',
        endDate: '-',
        term: '-',
        rates: '6.5%',
        platforms: '京东金融',
        status: ['已执行'],
        type: 1,
        id: 1,
        current: true,
        productType: '',
        schedule: '',
        state: '',
        platform: ''
      }]
    }
  }
}
</script>

<style lang="scss">
.product-list {
  .el-button--info {
    padding: 7px 9px;
    background: #96a3ba;
    border-color: #96a3ba;
  }
  .inport-file {
    display: inline-block;
    margin-left: 10px;
    color: #538cc0;
  }
  .filters {
    .filters-top {
      // padding: 10px 0;
      overflow: hidden;
      .filter-top-left {
        padding: 10px 0;
      }
    }
    .filters-bottom {
      overflow: hidden;
      padding: 10px 0;
    }
    .filters-search {
      margin: 0 -15px;
      border-top: 1px solid #e7eaed;
      .search-input {
        padding: 15px 15px 0 15px;
      }
    }
    .el-input {
      margin-right: 20px;
    }
  }
  .table-container {
    margin-top: 20px;
    overflow-x: auto;
    .current {
      padding: 0 3px;
      background: #e55a6c;
      color: #fff;
      margin-left: 8px;
      border-radius: 3px;
    }
    .icon-date {
      margin-left: 8px;
    }
    .status_color {
      padding: 0 5px;
      border-right: 1px solid #f4f5f7;
      &:last-child {
        border-right: none;
      }
    }
    .waitC {
      color: #eb7c72;
    }
    .ok1C {
      color: #18b8ba;
    }
    .ok2C {
      color: #538cc0;
    }
    .el-pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
  .active {
    a {
      background: #538cc0;
      color: #fff;
    }
  }
}

.vertical {
  vertical-align: 0;
}
</style>
