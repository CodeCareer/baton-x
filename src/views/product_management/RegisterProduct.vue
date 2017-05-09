<template lang="pug">
  section.asset-list
    .box
      .box-title
        h3 登记产品列表
      .box-screen
        .product_type
          .type_name.fl 产品类型：
          .type_all.fl
            ul
              li.fl(v-for="item in productNames",:class="{isActive:'active'}")
                a(@click="search(item.name)") {{item.name}}
        .issue_platfor
          .platform_name.fl 发行平台：
          .platform_all.fl
            ul
              li.fl(v-for="platform in platforms")
                a {{platform.name}}
      .box-find
        .box-find-input
          el-input(icon='search', placeholder="请输入产品代码",:on-icon-click="findproduct",v-model.lazy='filter.code')
    .table-container
      el-table(:data='filterTableData', style='width: 100%', @row-click='goToDetail')
        el-table-column(prop='code' label='产品代码')
        el-table-column(prop='amount' label='规模', width='150',:sortable='true')
        el-table-column(prop='rate' label='利率',:sortable='true')
        el-table-column(prop='term', label='期限', :sortable='true')
        el-table-column(prop='endDate' label='到期日',:sortable='true')
        el-table-column(prop='productType' label='产品类型',:sortable='true')
        el-table-column(prop='platform' label='发行平台', width="150",:sortable='true')
        el-table-column.last-td(prop='num' label='客户数量', width="150",:sortable='true')
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='tableData.length')

</template>

<script>
import {
  filter,
  each
} from 'lodash'
import {
  Message,
  Input
} from 'element-ui'
export default {
  components: {
    Message,
    ElInput: Input
  },
  methods: {
    search(index) {
      each(this.productNames, value => {
        if (value.name === index) {
          return (this.active = true)
        }
        return (this.active = false)
      })
    },
    findproduct() {
      Message.info('dome暂时不支持查找')
    },
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
        return ~v.code.indexOf(this.filter.code) && ~v.platform.indexOf(this.filter.platform) && ~v.rate.indexOf(this.filter.rate)
      })
    }
  },

  data() {
    return {
      active: null,
      tab: 'first',
      filter: {
        code: '',
        platform: '',
        rate: ''
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      productNames: [{
        name: '全部',
        active: '1'
      }, {
        name: '定期',
        active: '2'
      }, {
        name: '活期',
        active: '3'
      }],
      platforms: [{
        name: '全部',
        active: '1'
      }, {
        name: '财富宝',
        active: '2'
      }, {
        name: '360你财富',
        active: '3'
      }, {
        name: '甜橙理财',
        active: '4'
      }],
      tableData: [{
        note: '基金总额的30%需在2017年03月06日变现',
        code: 'F0000DWJ0101',
        amount: '¥ 10,300,000.00  ',
        rate: '3.00%',
        endDate: '2017-06-05',
        term: '96天',
        productType: '活期',
        platform: '京东金融',
        num: '146'
      }, {
        code: 'F0000CF0000D',
        amount: '¥ 11,000,080.00',
        rate: '5.10% ',
        endDate: '2017-07-05',
        term: '26天',
        productType: '活期',
        platform: '蚂蚁金服',
        num: '146'
      }, {
        code: 'WJ0101F0000CF00',
        amount: '¥ 12,860,000.00 ',
        rate: '3.60% ',
        endDate: '2017-04-20',
        term: '56天',
        productType: '活期',
        platform: '京东金融',
        num: '146'
      }, {
        code: 'WJ0101F0000C',
        amount: '¥ 13,090,000.00 ',
        rate: '4.90%',
        endDate: '2017-05-22',
        term: '87天',
        productType: '活期',
        platform: '蚂蚁金服',
        num: '146'
      }, {
        code: 'F0000DWJ0101',
        amount: '¥ 20,080,000.00',
        rate: ' 7.00% ',
        endDate: '2017-02-28',
        term: '4天',
        productType: '活期',
        platform: '京东金融',
        num: '146'
      }, {
        code: 'F0000CF0000D',
        amount: '¥ 14,030,000.00 ',
        rate: '  5.00%  ',
        endDate: '2017-06-30',
        term: '26天',
        productType: '活期',
        platform: '蚂蚁金服',
        num: '146'
      }, {
        code: 'WJ0101F0000C',
        amount: '¥ 16,098,050.00',
        rate: ' 5.02%  ',
        endDate: '2017-07-05',
        term: '31天',
        productType: '活期',
        platform: '京东金融',
        num: '146'
      }, {
        code: 'F0000DWJ0101',
        amount: '¥ 13,088,060.00',
        rate: '5.20%',
        endDate: '2017-04-15',
        term: '50天',
        productType: '活期',
        platform: '蚂蚁金服',
        num: '146'
      }, {
        code: 'F0000CF0000D',
        amount: '¥ 12,090,000.00 ',
        rate: '3.50%',
        endDate: '2017-03-18',
        term: '22天',
        productType: '活期',
        platform: '京东金融',
        num: '146'
      }, {
        code: 'WJ0101F0000CF00',
        amount: '¥ 13,060,090.00  ',
        rate: '4.30%',
        endDate: '2018-02-24',
        term: '10天',
        productType: '活期',
        platform: '蚂蚁金服',
        num: '146'
      }, {
        code: 'ER75551200D',
        amount: '¥ 24,036,090.00  ',
        rate: ' 5.50% ',
        endDate: '2018-02-24',
        term: '10天',
        productType: '活期',
        platform: '京东金融',
        num: '146'
      }, {
        code: 'WJ0101F0000C',
        amount: '¥ 26,000,020.00',
        rate: ' 6.80%',
        endDate: '2018-02-24',
        term: '10天',
        productType: '活期',
        platform: '蚂蚁金服',
        num: '146'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.box-title {
  h3 {
    height: 40px;
    line-height: 40px;
    background: #f3f6f8;
    font-size: 15px;
    padding: 0 20px;
    color: #54637a;
  }
}

.box-screen {
  padding: 15px 20px;
  overflow: hidden;
  .issue_platfor {
    margin-left: 300px;
  }
  .type_all,
  .platform_all {
    li {
      padding: 0 5px;
      color: #9b9ca4;
    }
    .isActive{
      a{
        background: #538cc0;
        color:#fff;
        padding:0 5px;
        border-radius: 3px;
      }
    }
  }
}

.box-find {
  border-top: 1px solid #e2e5e9;
  .box-find-input{
    padding:15px 20px;
    .el-input{
      width:250px;
      .el-input__inner{
        height:30px;
        border:none;
        background: #f3f6f8;
     }
    }
  }
}

.table-container {
  margin-top: 20px;
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  .last-td{
  color:#538cc0;
  }
}
</style>
