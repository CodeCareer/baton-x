<template lang="pug">
  section.inst-detail
    .box.mb20
      .inst-card
        .operations
          el-button(type="primary", size="small", @click="$router.push({name: 'InstForm', params: {id: inst.name}})")
            i.icon-batonx.icon-edit
            | 编辑
        el-row
          el-col(:span="6")
           figure
            figcaption {{inst.shortName}}
            a(:href="inst.site", target="_blank", rel="nofollow")
              img(:src="inst.logo")
          el-col(:span="18")
            .inst-info
              table
                tr
                  th 机构全称：
                  td {{inst.name}}
                tr
                  th 机构类型：
                  td {{inst.type}}
                tr
                  th 经营范围：
                  td
                    span.simple-tag(v-for="item in inst.manageScope") {{item}}
                tr
                  th 公司网址：
                  td
                    a.color-blue(:href="inst.site", target="_blank", rel="nofollow") {{inst.site}}
                tr
                  th 办公地址：
                  td {{inst.address}}
                tr
                  th 联系电话：
                  td {{inst.tel}}

    .box.box-normal
      el-tabs(v-model='tab', type='card', @tab-click='tabClick')
        el-tab-pane(label='产品信息', name='first')
        el-tab-pane(label='账户信息', name='second')
    .table-container(v-show="tab === 'first'")
      el-table(:data='filterProducts', style='width: 100%',@row-click="goDetail")
        el-table-column(property='name', label='产品名称')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover' placement='top', )
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.name }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.name}}
        el-table-column(property='amount', label='存续金额')
        el-table-column(property='rate', label='年化收益率')
        el-table-column(property='duration', label='期限')
        el-table-column(property='endDate', label='到期日')
        el-table-column(property='type', label='产品类型')
      el-pagination(@size-change='pageFirstSizeChange', @current-change='pageChange', :current-page='page.first.current', :page-sizes="page.first.sizes", :page-size="page.first.size", layout='total, prev, pager, next, jumper', :total='productDatas.length')
    .table-container(v-show="tab === 'second'")
      el-table(:data='filterAccounts', style='width: 100%')
        el-table-column(property='name', label='账户名')
          template(scope='scope')
            el-popover(v-if="scope.row.note", trigger='hover' placement='top', )
              p 提示: {{ scope.row.note }}
              .name-wrapper(slot='reference')
                | {{ scope.row.name }}
                i.icon-batonx.icon-explain
            span(v-if="!scope.row.note") {{scope.row.name}}
        el-table-column(property='bankNum', label='账户')
        el-table-column(property='bank', label='开户行')
        el-table-column(property='type', label='账户类型')
      el-pagination(@size-change='pageSecondSizeChange', @current-change='pageChange', :current-page='page.second.current', :page-sizes="page.second.sizes", :page-size="page.second.size", layout='total, prev, pager, next, jumper', :total='accounts.length')

</template>

<script>
import {
  filter,
  each
} from 'lodash'
import {
  updateCrumbs
} from '@/common/crossers.js'
// import instList from '@/inst_management/instList.vue'
export default {
  mounted: function() {
    this.inst.shortName = this.inst.name = this.filter.name = this.$route.params.id
    updateCrumbs.$emit('update-crumbs', [{
      id: 'instName',
      name: this.inst.name
    }])
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event)
      // console.log(instList.productDatas)
    },
    goDetail(row) {
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

    clearFilter() {
      each(this.filter, (v, k) => {
        this.filter[k] = ''
      })
    },

    pageChange(val) {
      console.log(`分页${val}`)
    },

    pageFirstSizeChange(val) {
      this.page.first.size = val
    },

    pageSecondSizeChange(val) {
      this.page.second.size = val
    }
  },

  computed: {
    filterProducts() {
      return filter(this.productDatas, v => {
        return ~v.platform.indexOf(this.filter.name)
      })
    },
    filterAccounts() {
      return filter(this.accounts, v => {
        return ~v.platform.indexOf(this.filter.name)
      })
    }
  },

  data() {
    return {
      tab: 'first',
      filter: {
        name: ''
      },
      inst: {
        name: '京东金融信息服务有限公司',
        logo: '', //require('@/assets/images/jd.png'),
        shortName: '京东金融',
        type: '资金渠道',
        manageScope: ['金融信息服务', '计算机网络技术', '技术服务', '电子商务'],
        site: 'http://jr.jd.com',
        address: '北京市北京经济技术开发区科创十一街18号C座2层221室',
        tel: '010-89188467'
      },
      page: {
        first: {
          current: 1,
          size: 10,
          sizes: [10, 20, 30, 50]
        },
        second: {
          current: 1,
          size: 10,
          sizes: [10, 20, 30, 50]
        }
      },
      productDatas: [{
        name: '恒耀稳享5016期',
        amount: '￥ 25,550,000.11',
        rate: '6.40 %',
        duration: '167天',
        endDate: '2017-03-14',
        type: '定期',
        platform: '恒大金服'
      }, {
        name: '恒耀稳享1231期',
        amount: '¥ 100,000,203.25',
        rate: '6.50 %',
        duration: '170天',
        endDate: '2017-03-17',
        type: '定期',
        platform: '恒大金服'
      }, {
        name: '恒耀稳享1023期',
        amount: '¥ 55,330,000.88',
        rate: '6.80 %',
        duration: '182天',
        endDate: '2017-05-20',
        type: '活期',
        platform: '恒大金服'
      }, {
        name: '普惠金交·牛稳赚4号理财计',
        amount: '￥ 25,550,000.11',
        rate: '6.40 %',
        duration: '167天',
        endDate: '2017-03-14',
        type: '定期',
        platform: '途牛金服'
      }, {
        name: '普惠金交·牛稳赚1号理财计',
        amount: '¥ 100,000,203.25',
        rate: '6.50 %',
        duration: '170天',
        endDate: '2017-03-17',
        type: '定期',
        platform: '途牛金服'
      }, {
        name: '普惠金交·牛稳赚6号理财计',
        amount: '¥ 55,330,000.88',
        rate: '6.80 %',
        duration: '182天',
        endDate: '2017-05-20',
        type: '活期',
        platform: '途牛金服'
      }, {
        name: '丰银宝A',
        amount: '￥ 25,550,000.11',
        rate: '6.40 %',
        duration: '167天',
        endDate: '2017-03-14',
        type: '定期',
        platform: '京东金融'
      }, {
        name: '丰银宝B',
        amount: '¥ 100,000,203.25',
        rate: '6.50 %',
        duration: '170天',
        endDate: '2017-03-17',
        type: '定期',
        platform: '京东金融'
      }, {
        name: '丰银宝C',
        amount: '¥ 55,330,000.88',
        rate: '6.80 %',
        duration: '182天',
        endDate: '2017-05-20',
        type: '活期',
        platform: '京东金融'
      }],
      accounts: [{
        name: '北京和丰永讯金融信息服务有限公司',
        bankNum: '1109 2037 8610 0201',
        bank: '招商银行股份有限公司北京亚运村支行',
        type: '募集账户',
        platform: '恒大金服'
      }, {
        name: '京东金融信息服务有限公司',
        bankNum: '2401 1109 9210 321',
        bank: '中国银行股份有限公司三元桥支行',
        type: '费用账户',
        platform: '京东金服'
      }, {
        name: '途牛金融信息有限公司',
        bankNum: '2401 1109 9210 321',
        bank: '中国银行股份有限公司三元桥支行',
        type: '费用账户',
        platform: '途牛金服'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.inst-card {
  position: relative;
  .operations {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 99;
  }
  figure {
    padding: 25px;
    a {
      display: block;
      background: #f9fafb;
      border-radius: 4px;
      padding: 5px;
      height: 120px;
      width: 200px;
      position: relative;
      img {
        position: absolute;
        max-width: 95%;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
  figcaption {
    margin-bottom: 10px;
    font-size: 15px;
    color: #5c667d;
  }
  .simple-tag {
    margin-right: 10px;
  }
}

.inst-info {
  padding: 25px;
  font-size: 13px;
  color: #595f67;
  th {
    color: #929aa3;
  }
  th,
  td {
    padding: 5px 0;
    font-weight: normal;
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
