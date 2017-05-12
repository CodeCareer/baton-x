<template lang="pug">
  .approve-dialog
    el-dialog(:title="title", v-model="dialogVisible",  @open="onDialogOpen")
      el-form(:model='approve', :rules="rules", ref="approveForm", :label-width='formLabelWidth')
        el-form-item(prop="name", label='审批流程名称：')
          el-input(v-model='approve.name', auto-cameomplete='off', placeholder='请输入流程名称')
        el-form-item(prop="type", label='审批流程类型：')
          el-radio.radio(v-model='approve.type', label='资金清算流程') 资金清算流程
          el-radio.radio(v-model='approve.type', label='资产交易流程') 资产交易流程
        el-form-item.is-required(prop="relationProducts", label='适用范围：')
          input(type="hidden", v-model="approve.relationProducts")
          .relation-products-tag(v-show="approve.relationProducts && approve.relationProducts.length")
            | 已选择：
            span(v-for="r in approve.relationProducts")
              | {{r.name}}
              i.icon-batonx.icon-close(@click="removeRelationProduct(r)")
          product-list(:on-change="onProductCheckChange", :checked-list="approve.relationProducts")
        el-form-item(prop="flows", label='审批流程：')
          .flow(v-for="flow in approve.flowList")
            el-select(v-model="approve.department", placeholder="请选择审批流程")
              el-option(v-for="d in departments", :value="d.value", :label="d.name")
            el-select(v-model="approve.job", placeholder="请选择审批流程")
              el-option(v-for="j in filterJobs(flow)", :value="j.value", :label="j.name")
            el-select(v-model="approve.approver", placeholder="请选择审批流程")
              el-option(v-for="a in filterApprovers(flow)", :value="a.value", :label="a.name")
        el-form-item(label='')
          el-button(type="text")
            i.icon-batonx.icon-plus
            | 添加更多审批
      .dialog-footer(slot="footer")
        el-button(type="primary", size="small", @click='approveSave') 确定
        el-button(type='gray', size="small", @click='dialogVisible = false') 取消
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import {
  merge,
  uniqueId,
  filter,
  remove
} from 'lodash'
import {
  validateArray
} from '@/common/validator.js'

export default {
  components: {
    ProductList
  },
  methods: {
    open(approve = {
      name: '',
      type: '',
      flowList: [],
      relationProducts: []
    }) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.approve = merge({}, this.approve, approve)
        this.title = approve.id ? '新增审批流程' : '编辑审批流程'
      })
    },

    onDialogOpen() {
      this.$nextTick(() => this.$refs.approveForm.resetFields())
    },

    removeRelationProduct(product) {
      this.approve.relationProducts = remove(this.approve.relationProducts, v => v.name !== product.name)
    },

    onProductCheckChange(products) {
      this.approve.relationProducts = merge([], products)
    },

    approveSave() {
      this.$refs.approveForm.validate(valid => {
        if (valid) {
          this.dialogVisible = false
          if (!this.approve.id) this.approve.id = uniqueId('approve_')
          this.$emit('approve-save', this.approve)
        }
      })
    },

    filterJobs(flow) {
      if (!flow.department) return []
      const department = find(this.departments, d => d.name === flow.department)
      return filter(this.jobs, j => j.department === department.id)
    },

    filterApprovers(flow) {
      if (!flow.job) return []
      const job = find(this.jobs, d => d.name === flow.job)
      return filter(this.approvers, j => j.job === job.id)
    }
  },

  data() {
    return {
      title: '',
      approve: {
        name: '',
        job: '',
        type: '',
        flowList: [],
        relationProducts: []
      },
      departments: [{
        id: 1,
        name: '业务发展部',
        value: '业务发展部'
      }, {
        id: 2,
        name: '合规风控部',
        value: '合规风控部'
      }, {
        id: 3,
        name: '软件开发部',
        value: '软件开发部'
      }, {
        id: 4,
        name: '电子商务部',
        value: '电子商务部'
      }],
      jobs: [{
        id: 1,
        department: 1,
        name: '业务组长',
        value: '业务组长'
      }, {
        id: 2,
        department: 1,
        name: '业务经理',
        value: '业务经理'
      }, {
        id: 3,
        department: 1,
        name: '业务总监',
        value: '业务总监'
      }, {
        id: 4,
        department: 2,
        name: '合规风控组长',
        value: '合规风控组长'
      }, {
        id: 5,
        department: 2,
        name: '合规风控经理',
        value: '合规风控经理'
      }, {
        id: 6,
        department: 2,
        name: '合规风控总监',
        value: '合规风控总监'
      }, {
        id: 7,
        department: 3,
        name: '软件开发组长',
        value: '软件开发组长'
      }, {
        id: 8,
        department: 3,
        name: '软件开发经理',
        value: '软件开发经理'
      }, {
        id: 9,
        department: 3,
        name: '软件开发总监',
        value: '软件开发总监'
      }, {
        id: 10,
        department: 4,
        name: '电子商务组长',
        value: '电子商务组长'
      }, {
        id: 11,
        department: 4,
        name: '电子商务经理',
        value: '电子商务经理'
      }, {
        id: 12,
        department: 4,
        name: '电子商务总监',
        value: '电子商务总监'
      }],
      approvers: [{
        name: '王一',
        job: 1
      }, {
        name: '王二',
        job: 2
      }, {
        name: '王三',
        job: 3
      }, {
        name: '李一',
        job: 4
      }, {
        name: '李二',
        job: 5
      }, {
        name: '李三',
        job: 6
      }, {
        name: '张一',
        job: 7
      }, {
        name: '张二',
        job: 8
      }, {
        name: '张三',
        job: 9
      }, {
        name: '赵一',
        job: 10
      }, {
        name: '赵二',
        job: 11
      }, {
        name: '赵三',
        job: 12
      }],
      rules: {
        name: [{
          required: true,
          message: '请输入账户名',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '请选择审批流程类型',
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
