<template lang="pug">
  .authority-dialog
    el-dialog(:title="title", v-model="dialogVisible",  @open="onDialogOpen", size="large")
      el-form(:model='account', :rules="rules", ref="accountForm", :label-width='formLabelWidth')
        el-form-item(prop="type", label='账户类别名称：')
          el-input(v-model='account.type', auto-complete='off', placeholder='请输入账户类别名称')
        el-form-item(prop="permits", label='账户权限：')
          el-checkbox-group(v-model="account.permits")
            el-checkbox.circle.mini(label="查看") 查看
            el-checkbox.circle.mini(label="编辑") 编辑
            el-checkbox.circle.mini(label="删除") 删除
        el-form-item(label='权限模块：')
          .authority-table.bd
            table
              tr.bd-b
                th(:rowspan="account.checkModules.length+1") 可查看模块
              tr(v-for="(module, index) in account.checkModules")
                th.bd-b
                  el-checkbox.circle.mini(:disabled="checkBoxDisableByPermit('查看')", @change="handleCheckAllChange($event, module)", :indeterminate="module.indeterminate" v-model="module.checked") {{module.name}}
                td.bd-b
                  el-checkbox-group(v-model="module.checkedList", @change="handleCheckChange(module)")
                    el-checkbox.circle.mini(:disabled="checkBoxDisableByPermit('查看')", v-for="o in module.children", :label="o.value") {{o.name}}
              tr.bd-b
                th 可编辑内容
                td.bd-t(:colspan="2")
                  el-checkbox-group(v-model="account.editModules.checkedList", @change="handleCheckChange(account.editModules)")
                    el-checkbox.circle.mini(:disabled="checkBoxDisableByPermit('编辑')", v-for="o in account.editModules.children", :label="o.value") {{o.name}}
              tr
                th 可删除内容
                td(:colspan="2")
                  el-checkbox-group(v-model="account.deleteModules.checkedList", @change="handleCheckChange(account.deleteModules)")
                    el-checkbox.circle.mini(:disabled="checkBoxDisableByPermit('删除')", v-for="o in account.deleteModules.children", :label="o.value") {{o.name}}
      .dialog-footer(slot="footer")
        el-button(type="primary", size="small", @click='accountSave') 确定
        el-button(type='gray', size="small", @click='dialogVisible = false') 取消
</template>

<script>
import AuthorityBase from '@/components/AuthorityBase.js'
import {
  mergeWith,
  map,
  uniqueId,
  includes
} from 'lodash'
// import {
//   validateArray
// } from '@/common/validator.js'
import {
  mergeArrayCover
} from '@/common/merge-rules.js'

export default {
  methods: {
    checkBoxDisableByPermit(permit) {
      return !includes(this.account.permits, permit)
    },

    handleCheckAllChange(event, module) {
      module.checkedList = event.target.checked ? map(module.children, 'value') : []
      module.indeterminate = false
    },

    handleCheckChange(module) {
      const checkedCount = module.checkedList.length
      module.checked = checkedCount === module.children.length
      module.indeterminate = checkedCount > 0 && checkedCount < module.children.length
    },

    open(account = mergeWith({}, AuthorityBase, mergeArrayCover)) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.account = mergeWith({}, this.account, account, mergeArrayCover)
        this.title = account.id ? '新增账户类别' : '编辑账户类别'
      })
    },

    onDialogOpen() {
      this.$nextTick(() => this.$refs.accountForm.resetFields())
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
      title: '新增账户类别',
      account: mergeWith({}, AuthorityBase, mergeArrayCover),
      rules: {
        type: [{
          required: true,
          message: '请输入账户类别名称',
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
.authority-dialog {}
</style>
