<template lang="pug">
  section.client-list
    .box
      .box-header
        h3 筛选条件
      .filters
        el-input(placeholder='客户名称或证件号码', icon='search', v-model.lazy='filter.name')
        el-button(size="small", type="primary", @click="clearFilter")  清除
    .table-container
      el-table(:data='filterClients', style='width: 100%', @sort-change="customSort")
        el-table-column(prop='name', label='客户名称', width='220')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover' placement='top', )
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.name }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.name}}
        el-table-column(prop='certificate', label='证件类型')
        el-table-column(prop='IDNumber', label='证件号码')
        el-table-column(prop='count', label='持有产品数量', sortable='custom')
          template(scope="scope")
            a(@click="showProducts(scope.row)") {{scope.row.count}}
        el-table-column(prop='amount', label='持有产品金额', :sortable='true')
      el-pagination(@size-change='pageSizeChange', @current-change='pageChange', :current-page='page.current', :page-sizes="page.sizes", :page-size="page.size", layout='total, prev, pager, next, jumper', :total='clients.length')
    el-dialog(title='持有产品', v-model='ownProductDialogVisible')
      el-table(:data='ownProductList')
        el-table-column(prop='name', label='产品名称', width='200')
        el-table-column(prop="amount", label='持有金额')
        el-table-column(prop='ratio', label='持有金额占比')
        el-table-column(prop="subscribeDate", label='认购时间')

</template>

<script>
import {
  filter,
  each
} from 'lodash'

export default {
  methods: {
    clearFilter() {
      each(this.filter, (v, k) => {
        this.filter[k] = ''
      })
    },

    customSort(data) {
      console.log(data)
    },

    showProducts(client) {
      this.ownProductList = client.products
      this.ownProductDialogVisible = true
    },

    pageChange(val) {
      console.log(`分页${val}`)
    },

    pageSizeChange(val) {
      this.page.size = val
    }
  },

  computed: {
    filterClients() {
      return filter(this.clients, v => {
        return ~v.name.indexOf(this.filter.name) || ~v.IDNumber.indexOf(this.filter.name)
      })
    }
  },

  data() {
    return {
      ownProductList: [],
      ownProductDialogVisible: false,
      filter: {
        name: ''
      },
      page: {
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 50]
      },
      clients: [{
        id: 1,
        name: '张梦来',
        certificate: '身份证',
        IDNumber: '220112198809012345',
        amount: '￥15,000.00',
        count: 3,
        products: [{
          name: '恒耀稳享5029期',
          amount: '￥3,000.00',
          ratio: '20%',
          subscribeDate: '2017-02-02'
        }, {
          name: '0910恒大大赢家5001期',
          amount: '￥3,000.00',
          ratio: '20%',
          subscribeDate: '2017-03-02'
        }, {
          name: '普惠金交·牛稳赚8号理财计划',
          amount: '￥9,000.00',
          ratio: '60%',
          subscribeDate: '2017-04-02'
        }]
      }, {
        id: 2,
        name: '张东雨',
        certificate: '身份证',
        IDNumber: '220112198809012346',
        amount: '￥12,000.00',
        count: 1,
        products: [{
          name: '恒耀稳享5029期',
          amount: '￥12,000.00',
          ratio: '100%',
          subscribeDate: '2017-02-02'
        }]
      }, {
        id: 3,
        name: '王琦',
        certificate: '身份证',
        IDNumber: '327422198809012900',
        amount: '￥12,000.00',
        count: 2,
        products: [{
          name: '恒耀稳享5029期',
          amount: '￥3,000.00',
          ratio: '25%',
          subscribeDate: '2017-02-02'
        }, {
          name: '0910恒大大赢家5001期',
          amount: '￥9,000.00',
          ratio: '75%',
          subscribeDate: '2017-03-02'
        }]
      }, {
        id: 4,
        name: '刘旭',
        certificate: '身份证',
        IDNumber: '763112198809000983',
        amount: '￥3,000,000.00',
        count: 1,
        products: [{
          name: '恒耀稳享5029期',
          amount: '￥3,000,000.00',
          ratio: '100%',
          subscribeDate: '2017-02-02'
        }]
      }, {
        id: 5,
        name: '周瑾',
        certificate: '身份证',
        IDNumber: '839522198809012901',
        amount: '￥5,000.00',
        count: 1,
        products: [{
          name: '恒耀稳享5029期',
          amount: '￥5,000.00',
          ratio: '100%',
          subscribeDate: '2017-02-02'
        }]
      }, {
        id: 6,
        name: '夏欢',
        certificate: '身份证',
        IDNumber: '494112198809019405',
        amount: '￥190,000.00',
        count: 1,
        products: [{
          name: '恒耀稳享5029期',
          amount: '￥190,000.00',
          ratio: '100%',
          subscribeDate: '2017-02-02'
        }]
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
