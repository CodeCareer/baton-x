<template lang="pug">
  .approve-dialog
    el-dialog(:title="title", v-model="dialogVisible",  @open="onDialogOpen")
      el-form(:model='approve', :rules="rules", ref="approveForm", :label-width='formLabelWidth')
        el-form-item(prop="name", label='审批流程名称：')
          el-input(v-model='approve.name', auto-cameomplete='off', placeholder='请输入流程名称')
        el-form-item(prop="type", label='审批流程类型：')
          el-radio.radio(v-model='approve.type', label='资金清算流程') 资金清算流程
          el-radio.radio(v-model='approve.type', label='资产交易流程',v-if="!eaashow") 资产交易流程
        el-form-item.is-required(prop="relationProducts", label='适用范围：',v-if="!eaashow")
          input(type="hidden", v-model="approve.relationProducts")
          .relation-products-tag(v-show="approve.relationProducts && approve.relationProducts.length")
            | 已选择：
            span(v-for="r in approve.relationProducts")
              | {{r.name}}
              i.icon-batonx.icon-close(@click="removeRelationProduct(r)")
          product-list(:on-change="onProductCheckChange", :checked-list="approve.relationProducts")
        el-form-item(prop="relationProducts",label="使用范围：")
          el-radio.radio(label="粤股交风赢宝理财计划B",v-if="eaashow")
        el-form-item.is-required.flows.custom-error(prop="flowList", label='审批流程：')
          .flow(v-for="(flow, index) in approve.flowList", :class="{'has-error': flow.hasError}")
            el-select.mr5(style="width:130px;", v-model="flow.department", placeholder="审批部门")
              el-option(v-for="d in departments", :value="d.value", :label="d.name")
            el-select.mr5(style="width:130px;", v-model="flow.job", placeholder="审批岗位")
              el-option(v-for="j in filterJobs(flow)", :value="j.value", :label="j.name")
            el-select(style="width:130px;", v-model="flow.approver", placeholder="审批人")
              el-option(v-for="a in filterApprovers(flow)", :value="a.value", :label="a.name")
            i.icon-batonx.icon-close(@click="removeFlow(index)", v-show="approve.flowList.length > 1")
          input(type="hidden", v-model="approve.flowList")
        el-form-item(label='')
          el-button(type="text", @click="addFlow")
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
  mergeWith,
  uniqueId,
  filter,
  find,
  map,
  includes,
  isUndefined,
  remove
} from 'lodash'
import {
  validateArray,
  validateArrayDeep
} from '@/common/validator.js'
import {
  mergeArrayCover
} from '@/common/merge-rules.js'

export default {
  components: {
    ProductList
  },
  props: ['eaaShow'],
  methods: {
    open(approve = {
      id: null,
      name: '',
      type: '',
      flowList: [],
      relationProducts: []
    }) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.title = approve.id ? '新增审批流程' : '编辑审批流程'
        setTimeout(() => {
          this.approve = mergeWith({}, this.approve, approve, mergeArrayCover)
        })
      })
    },

    onDialogOpen() {
      this.$nextTick(() => {
        this.$refs.approveForm.resetFields()
        setTimeout(() => {
          if (!this.approve.id) {
            this.approve.flowList.push({
              department: '',
              job: '',
              approver: '',
              hasError: false
            })
          }
        })
      })
    },

    removeRelationProduct(product) {
      this.approve.relationProducts = remove(this.approve.g, v => v.name !== product.name)
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

    removeFlow(index) {
      this.approve.flowList.splice(index, 1)
    },

    addFlow() {
      this.approve.flowList.push({
        hasError: false,
        department: '',
        job: '',
        approver: ''
      })
    },

    filterJobs(flow = {}) {
      const department = find(this.departments, d => d.name === flow.department)
      if (!department) {
        flow.job = ''
        flow.approver = ''
        return []
      }

      const jobs = filter(this.jobs, j => j.department === department.id)
      if (!includes(map(jobs, 'name'), flow.job)) {
        flow.job = ''
        flow.approver = ''
      }
      return jobs
    },

    filterApprovers(flow) {
      const job = find(this.jobs, d => d.name === flow.job)
      if (!job) {
        flow.approver = ''
        return []
      }

      const approvers = filter(this.approvers, j => j.job === job.id)

      // isUndefined 目前不清楚为什么选择审批人会重新进入此方法，而且flow.approver还是undefined?，hack一下
      if (!isUndefined(flow.approver) && !includes(map(approvers, 'name'), flow.approver)) {
        flow.approver = ''
      }
      return approvers
    }
  },

  data() {
    return {
      eaashow: this.eaaShow,
      title: '',
      approve: {
        id: null,
        name: '',
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
        value: '王一',
        job: 1
      }, {
        name: '王二',
        value: '王二',
        job: 2
      }, {
        name: '王三',
        value: '王三',
        job: 3
      }, {
        name: '李一',
        value: '李一',
        job: 4
      }, {
        name: '李二',
        value: '李二',
        job: 5
      }, {
        name: '李三',
        value: '李三',
        job: 6
      }, {
        name: '张一',
        value: '张一',
        job: 7
      }, {
        name: '张二',
        value: '张二',
        job: 8
      }, {
        name: '张三',
        value: '张三',
        job: 9
      }, {
        name: '赵一',
        value: '赵一',
        job: 10
      }, {
        name: '赵二',
        value: '赵二',
        job: 11
      }, {
        name: '赵三',
        value: '赵三',
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
        }],
        flowList: [{
          validator: validateArrayDeep,
          fieldName: '审批流程',
          arrayKeys: {
            department: {
              required: true,
              message: '审批部门不能为空'
            },
            job: {
              required: true,
              message: '审批岗位不能为空'
            },
            approver: {
              required: true,
              message: '审批人不能为空'
            }
          },
          trigger: 'blur'
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
.approve-dialog {
  .flows {
    counter-reset: flows 0;
    .flow {
      counter-increment: flows;
      &:before {
        content: counter(flows) '. ';
      }
      .icon-close {
        display: inline-block;
        color: #c9cdd1;
        cursor: pointer;
        margin-left: 5px;
        font-size: 12px;
        &:hover {
          color: $color-blue;
        }
      }
    }
  }
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
}
</style>
