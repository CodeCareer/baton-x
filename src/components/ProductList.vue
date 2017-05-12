<template lang="pug">
.product-list
  .table-header.clfix
    el-input.fl(placeholder='输入产品名称', icon='search', v-model.lazy='filter.name')
    el-select.fr(placeholder="按平台筛选", v-model="filter.platform")
      el-option(v-for="o in platforms", :label="o.name", :value="o.value")
  el-table(:data="filterProducts", height="250", ref="productsTable", @selection-change="checkProduct")
    el-table-column(type="selection", width="45")
    el-table-column(property="name", label='产品名称')
    el-table-column(property='platform', label='平台')
</template>

<script>
import {
  each,
  map,
  merge,
  includes,
  filter
} from 'lodash'

export default {
  props: {
    onChange: {
      type: Function,
      default: function() {

      }
    },
    checkedList: {
      type: Array,
      default () {
        return []
      }
    }
  },

  watch: {
    checkedList: {
      immediate: true,
      handler() {
        this.checkedListClone = merge([], this.checkedList)
        this._updateCheckedStatus()
        this._tableCheckedUpdate()
      }
    }
  },

  methods: {
    _updateCheckedStatus() {
      const names = map(this.checkedListClone, 'name')
      each(this.products, v => {
        v.checked = includes(names, v.name)
      })
    },

    _tableCheckedUpdate() {
      this.$nextTick(() => {
        each(this.products, (v) => {
          this.$refs.productsTable.toggleRowSelection(v, v.checked)
        })
      })
    },

    checkProduct(val) {
      if (this.filterStatus) {
        this.filterStatus = false
        return
      }

      this.checkedListClone = val
      this.onChange(this.checkedListClone)
    }
  },

  computed: {
    filterProducts() {
      this.filterStatus = true
      this._tableCheckedUpdate()
      return filter(this.products, v => {
        return ~v.name.indexOf(this.filter.name) && ~v.platform.indexOf(this.filter.platform)
      })
    }
  },

  data() {
    return {
      filterStatus: false, //此状态控制checkProduct被反复执行， 筛选状态下，表格会清空筛选，并emit select-change事件，导致选中的平台被清空
      checkedListClone: [],
      filter: {
        name: '',
        platform: ''
      },
      platforms: [{
        name: '全部平台',
        value: ''
      }, {
        name: '京东金融',
        value: '京东金融'
      }, {
        name: '恒大金服',
        value: '恒大金服'
      }, {
        name: '360你财富',
        value: '360你财富'
      }, {
        name: '甜橙理财',
        value: '甜橙理财'
      }, {
        name: '途牛金服',
        value: '途牛金服'
      }],
      products: [{
        name: '粤股交丰银宝理财计划A',
        amount: '￥ 78,613,007.00',
        checked: false,
        platform: '京东金融'
      }, {
        name: '粤股交丰银宝理财计划B',
        amount: '￥ 78,613,007.00',
        checked: false,
        platform: '京东金融'
      }, {
        name: '“智鑫1号”理财计划',
        amount: '￥ 78,613,007.00',
        checked: false,
        platform: '京东金融'
      }, {
        name: '“润鑫1号”理财计划',
        amount: '￥ 78,613,007.00',
        checked: false,
        platform: '360你财富'
      }, {
        name: '京禾宝理财计划',
        amount: '￥ 78,613,007.00',
        checked: false,
        platform: '途牛金服'
      }, {
        name: '甜橙起航理财计划D2',
        amount: '￥ 78,613,007.00',
        checked: false,
        platform: '恒大金服'
      }, {
        name: '粤股交鼎鑫360理财计划1号',
        amount: '￥ 78,613,007.00',
        checked: false,
        platform: '甜橙理财'
      }, {
        name: '恒耀安益5001期',
        amount: '￥ 78,613,007.00',
        checked: false,
        platform: '恒大金服'
      }]
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_vars.scss';
.el-form-item.is-error .table-header {
  .el-input__inner,
  .el-textarea__inner {
    border-color: $border-color;
  }
}

.table-header {
  padding: 8px 5px;
  background: #f3f6f8;
  border: 1px solid $border-color;
  border-bottom: 0;
  .el-input,
  .el-select {
    max-width: 150px;
  }
}
</style>
