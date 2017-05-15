<template lang="pug">
  .account-dialog
    el-dialog(:title="title", v-model="dialogVisible",  @open="onDialogOpen")
      el-form(:model='account', :rules="rules", ref="accountForm", :label-width='formLabelWidth')
        el-form-item(prop="belongto", label='所属方：')
          el-input(v-model='account.belongto', auto-complete='off', placeholder='请输入所属方')
        el-form-item(prop="name", label='账户名：')
          el-input(v-model='account.name', auto-complete='off', placeholder='请输入账户名')
        el-form-item(prop="bankNum", label='账户：')
          el-input(v-model='account.bankNum', auto-complete='off', placeholder='请输入账户')
        el-form-item(prop="bank", label='开户行：')
          el-input(v-model='account.bank', auto-complete='off', placeholder='请输入开户行')
        el-form-item(prop="type", label='账户类型：')
          el-select(v-model='account.type', placeholder='请选择账户类型')
            el-option(label='资产账户', value='资产账户')
            el-option(label='募集账户', value='募集账户')
            el-option(label='产品账户', value='产品账户')
            el-option(label='费用账户', value='费用账户')
            el-option(label='其他第三方账户', value='其他第三方账户')
        el-form-item.is-required(prop="relationProducts", label='关联产品：')
          input(type="hidden", v-model="account.relationProducts")
          .relation-products-tag(v-show="account.relationProducts && account.relationProducts.length")
            | 已选择：
            span(v-for="r in account.relationProducts")
              | {{r.name}}
              i.icon-batonx.icon-close(@click="removeRelationProduct(r)")
          product-list(:on-change="onProductCheckChange", :checked-list="account.relationProducts")
      .dialog-footer(slot="footer")
        el-button(type="primary", size="small", @click='accountSave') 确定
        el-button(type='gray', size="small", @click='dialogVisible = false') 取消
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import {
  mergeWith,
  merge,
  uniqueId,
  remove
} from 'lodash'
import {
  validateArray
} from '@/common/validator.js'
import {
  mergeArrayCover
} from '@/common/merge-rules.js'

export default {
  components: {
    ProductList
  },
  methods: {
    open(account = {
      id: null,
      name: '',
      belongto: '',
      bankNum: '',
      bank: '',
      type: '',
      relationProducts: []
    }) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.account = mergeWith({}, this.account, account, mergeArrayCover)
        this.title = account.id ? '新增账户' : '编辑账户'
      })
    },

    onDialogOpen() {
      this.$nextTick(() => this.$refs.accountForm.resetFields())
    },

    removeRelationProduct(product) {
      this.account.relationProducts = remove(this.account.relationProducts, v => v.name !== product.name)
    },

    onProductCheckChange(products) {
      this.account.relationProducts = merge([], products)
    },

    accountSave() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          this.dialogVisible = false
          if (!this.account.id) this.account.id = uniqueId('account_')
          this.$emit('account-save', this.account)
        }
      })
    }
  },

  data() {
    return {
      title: '新增账户',
      account: {
        id: null,
        name: '',
        belongto: '',
        bankNum: '',
        bank: '',
        type: '',
        relationProducts: []
      },
      rules: {
        belongto: [{
          required: true,
          message: '请输入账户所属方',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入账户名',
          trigger: 'blur'
        }],
        bankNum: [{
          required: true,
          message: '请输入账户',
          trigger: 'blur'
        }],
        bank: [{
          required: true,
          message: '请输开户行',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '请选择账户类型',
          trigger: 'change'
        }],
        relationProducts: [{
          validator: validateArray,
          fieldName: '关联产品',
          trigger: 'change'
        }]
      },
      formLabelWidth: '120px',
      dialogVisible: false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_vars.scss';
.relation-products-tag {
  font-size: 12px;
  span {
    padding: 5px 8px;
    border-radius: 3px;
    background: $border-color;
    margin-right: 10px;
    display: inline-block;
    line-height: 1;
    .icon-close {
      cursor: pointer;
      color: #929aa3;
      margin-left: 10px;
      display: inline-block;
      transform: scale(.7);
      &:hover {
        color: $color-blue;
      }
    }
  }
}
</style>
