<template lang="pug">
  .asset-detail
    .box
      .box-header
        h3 {{demo.name}}
        small 简称：{{demo.shortName}}
        small 资产代码：YZ0413
        .buttons
          el-button(type="primary", size="small", @click="editAsset")
            i.icon-batonx.icon-edit
            | 编辑
          el-button(type="gray", size="small", @click="deleteAsset")
            i.icon-batonx.icon-delete
            | 删除
</template>

<script>
import {
  Message
} from 'element-ui'

export default {
  mounted: function() {
    this.demo.name = this.demo.shortName = this.$route.params.id
  },

  methods: {
    editAsset() {
      this.$router.push({
        name: 'AssetForm',
        id: this.demo.name
      })
    },
    deleteAsset() {
      Message.info('Demo 文件不能删除哦！')
    }
  },

  data() {
    return {
      demo: {
        name: '天津旭达资产管理项目',
        shortName: '旭达资管'
      }
    }
  }
}
</script>
