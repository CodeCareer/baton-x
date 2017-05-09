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
      .box-content
        .box-section
          el-row(:gutter="20")
            el-col(:span="8")
              table(v-if="demo.type === 0")
                tr
                  th 收益率：
                  td.em 8%
                tr
                  th 资产类型：
                  td 理财计划
                tr
                  th 资产起息日：
                  td 2017年01月01日
                tr
                  th 付息频率：
                  td 每周一次
                tr
                  th 发行方：
                  td {{demo.name}}
              table(v-if="demo.type === 1")
                tr
                  th 七日年化收益率：
                  td.em 3.77%
                tr
                  th 资产类型：
                  td 货币基金
                tr
                  th 发行方：
                  td {{demo.name}}
            el-col(:span="8")
              table(v-if="demo.type === 0")
                tr
                  th 期限：
                  td.em 90天
                tr
                  th 风险等级：
                  td 低风险
                tr
                  th 到期日：
                  td 2017年03月30日
                tr
                  th 下一付息日：
                  td 2017年06月30日
                tr
                  th 担保方：
                  td 恒大金服
              table(v-if="demo.type === 1")
                tr
                  th 万分年化收益率：
                  td.em 0.9882%
                tr
                  th 风险等级：
                  td 低风险
                tr
                  th 托管方：
                  td 中国民生银行
            el-col(:span="8")
              .other-list(v-if="demo.type === 0")
                dl
                  dt 流动性：
                  dd 无
                dl
                  dt 年化计息天数：
                  dd 365天
                dl
                  dt 托管方：
                  dd 中国银行
              .other-list(v-if="demo.type === 1")
                dl
                  dt 流动性：
                  dd 高
                dl
                  dt 年化计息天数：
                  dd 365天
        .box-section
          .attachments-box
            h3
              | 附件：
              small *最多支持添加20个文件，每个文件不得超过20M
              el-upload.upload-attachment(action='//jsonplaceholder.typicode.com/posts/', :file-list='demo.attachments')
                el-button(size='mini', type='primary') 增加
        .box-section
          .notes-box
            el-row
              el-col(:span="1")
                label 备注：
              el-col(:span="addNoteFocus ? 21 : 23")
                el-input(@focus="addNoteFocus = true", @keyup.enter="addNote", type="textarea", :rows="2", placeholder="点击添加备注", v-model="demo.newNote")
              el-col(:span="2", v-if="addNoteFocus")
                el-button.add-note-btn(size="small", type="primary", @click="addNote") 添加
            .notes(ref="notes")
              .note-line(v-for="note in showNotes")
                .note-time-line
                  | {{note.createdAt | moment('YYYY-MM-DD')}}
                  i.icon-circle
                  | {{note.createdAt | moment('HH:mm')}}
                .note-content
                  .operations
                    i.icon-batonx.icon-edit(@click="editNote(note)", v-show="!note.editActive")
                    i.icon-batonx.icon-success(@click="saveNote(note)", v-show="note.editActive")
                    i.icon-batonx.icon-close(@click="resetNote(note)", v-show="note.editActive")
                    i.icon-batonx.icon-close(@click="deleteNote(note)", v-show="!note.editActive")
                  .created-time(v-show='!note.editActive')
                    | 创建时间 {{note.create_at| moment('YYYY-MM-DD HH:mm')}}
                  el-input(type="textarea", :disabled="!note.editActive", :rows="3", v-model="note.textEdit", :id="'note_' + note.id")
            .more-note.text-center(@click="moreNote")
              span(v-show='noteVisibleCount < demo.notes.length')
                i.icon-batonx.icon-down
                | 显示更多备注信息
              span(v-show='noteVisibleCount >= demo.notes.length')
                | 没有更多了
    .box.box-normal
      .box-header  资产详情
      .box-content
        .asset-panel
          .asset-panel-dashboard
            el-row
              el-col(:span="8")
                .panel-cell 持有总金额：￥33,816,000.00
              el-col(:span="8")
                .panel-cell 总发行金额：￥200,897,170.00
              el-col(:span="8")
                .panel-cell 持有金额占总发行比：16.8%
            el-row
              el-col(:span="8")
                .panel-cell
                  | 今日总收益：￥
                  em 311,900.00
              el-col(:span="8")
                .panel-cell
                  | 累计总收益：￥
                  em 1,043,900.00
          .asset-panel-products
            .header
              | 持有产品列表
              .buttons
                el-button(type="text", icon="time", @click="historyDealVisible = true") 历史交易记录
            .table
              table
                thead
                  tr
                    th 产品名称
                    th 数量
                    th 金额（元）
                    th 比例
                    th 今日收益（元）
                    th 累计收益（元）
                tbody
                  tr(v-for="p in demo.products")
                    td {{p.name}}
                    td {{p.count}}
                    td {{p.amount | ktCurrency('')}}
                    td {{p.ratio}}
                    td {{p.todayEarning | ktCurrency('')}}
                    td {{p.totalEarning | ktCurrency('')}}
    .box.box-normal(v-if="demo.type === 1")
      .box-header 收益率走势
      .box-content
        .rate-chart
          kt-line-chart(:chart-option="demo.rateChartOpt")
    .box.box-normal
      .box-header 账户列表
      .box-content.accounts
        el-row(:gutter="20")
          el-col(:span="8")
            .account-card
              table
                tr
                  th 账户类型：
                  td.bd 资产账户
                tr
                  th 账户名：
                  td {{demo.name}}
                tr
                  th 账户：
                  td.em 2310 8372 6532 098
                tr
                  th 开户行：
                  td 招商银行天津滨海新区支行
    el-dialog(title='历史交易记录', v-model='historyDealVisible')
      el-table(:data='demo.historyDeals')
        el-table-column(label='时间')
          template(scope='scope') {{scope.row.dealAt | moment('YYYY-MM-DD')}}
        el-table-column(property='name', label='产品名称', width='200')
        el-table-column(property='opType', label='操作类型')
        el-table-column(label='变动金额')
          template(scope='scope')
            span.color-green(v-if="scope.row.opType === '卖出'") -{{scope.row.amount | ktCurrency('')}}
            span.color-red(v-if="scope.row.opType === '买入'") +{{scope.row.amount | ktCurrency('')}}

</template>

<script>
import {
  Message,
  MessageBox
} from 'element-ui'
import KtLineChart from '../../components/LineEchart.vue'
import {
  concat,
  map,
  merge,
  remove,
  uniqueId
} from 'lodash'
import Vue from 'vue'

export default {
  components: {
    KtLineChart
  },
  mounted: function() {
    this.demo.name = this.demo.shortName = this.$route.params.id
    this.demo.type = +this.$route.query.type || this.demo.type
    setTimeout(() => {
      this.demo.rateChartOpt = merge({}, this.demo.rateChartOpt, {
        color: ['#538cc0'],
        legend: {
          data: ['收益率']
        },
        tooltip: {
          formatter: (params, ticket, callback) => {
            if (!params.length) return
            return concat([`<table class="chart-tooltip"><tr><th colspan="2">${params[0].name}</th><tr>`],
              map(params, v => {
                return `<tr class="line">
                        <td class="left"><i class="circle" style="color:${v.color}"></i>${v.seriesName}：</td>
                        <td class="right">${Vue.filter('ktPercent')(v.value, 2, 1)}</td>
                      </tr>`
              }), '</table>').join('')
          }
        },
        xAxis: {
          data: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05']
        },
        series: [{
          name: '收益率',
          type: 'line',
          format: 'percent',
          data: [0.21, 0.32, 0.41, 0.34, 0.25],
          symbolSize: 5,
          symbol: 'circle'
        }]
      })
    }, 100)
  },

  methods: {
    editAsset() {
      this.$router.push({
        name: 'AssetForm',
        params: {
          id: this.demo.name
        }
      })
    },

    deleteAsset() {
      Message.info('Demo 资产不能删除哦！')
    },

    addNote() {
      if (this.demo.notes.length >= 50) {
        Message.warn('备注个数不得超过50个')
        return
      }

      if (!this.demo.newNote) {
        Message.error('备注不能为空!')
        return
      }

      this.demo.notes.unshift({
        id: uniqueId('new_note_'),
        editActive: false,
        text: this.demo.newNote,
        createdAt: new Date()
      })

      this.demo.newNote = ''
      this.addNoteFocus = false
    },

    saveNote(note) {
      note.text = note.textEdit
      note.editActive = false
    },

    moreNote() {
      if (this.noteVisibleCount >= this.demo.notes.length) {
        Message.info('没有更多了')
        return
      }
      this.noteVisibleCount += this.noteMoreStep
    },

    editNote(note) {
      note.editActive = true
      this.$nextTick(() => {
        const textarea = this.$refs.notes.querySelector(`#note_${note.id} textarea`)
        textarea.focus()
      })
    },

    resetNote(note) {
      note.textEdit = note.text
      note.editActive = false
    },

    deleteNote(note) {
      MessageBox.confirm('此操作将永久删除改批注, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.demo.notes = remove(this.demo.notes, (v) => {
          return note.id !== v.id
        })
      })
    }
  },

  computed: {
    showNotes() {
      return this.demo.notes.slice(0, this.noteVisibleCount)
    }
  },

  data() {
    return {
      historyDealVisible: false,
      addNoteFocus: false,
      noteVisibleCount: 2,
      noteMoreStep: 5,
      demo: {
        name: '天津旭达资产管理项目',
        shortName: '旭达资管',
        type: 0, // 0 非标 1 货币基金
        newNote: '',
        rateChartOpt: {},
        notes: [{
          id: 1,
          editActive: false,
          textEdit: '2017年02月28日提息。',
          text: '2017年02月28日提息。',
          createdAt: new Date()
        }, {
          id: 2,
          editActive: false,
          textEdit: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          text: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          createdAt: new Date()
        }, {
          id: 3,
          editActive: false,
          textEdit: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          text: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          createdAt: new Date()
        }, {
          id: 4,
          editActive: false,
          textEdit: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          text: '今日申购款未到账，今日利息最终由法务部门决定由京东金融贴息，预计款项两日后到账。',
          createdAt: new Date()
        }],
        attachments: [{
          name: '资产合同'
        }, {
          name: '资产说明书'
        }],
        products: [{
          name: '甜橙起航理财计划D2',
          count: 1000,
          amount: 4715000,
          ratio: 0.14,
          todayEarning: 30000,
          totalEarning: 150000
        }, {
          name: '甜橙起航理财计划C2',
          count: 300,
          amount: 3905000,
          ratio: 0.12,
          todayEarning: 28000,
          totalEarning: 168000
        }],
        historyDeals: [{
          dealAt: new Date(),
          name: '甜橙起航理财计划D2',
          opType: '卖出',
          amount: '100020'
        }, {
          dealAt: new Date(),
          name: '甜橙起航理财计划C2',
          opType: '买入',
          amount: '180623'
        }]
      }
    }
  }
}
</script>

<style lang="scss">
.asset-detail {
  .el-upload-list__item {
    float: left;
    width: auto;
    margin-top: 10px;
    font-size: 13px;
    &:first-child {
      margin-top: 10px;
    }
  }
  .el-upload-list {
    overflow: hidden;
    margin-bottom: -15px;
  }
  .el-textarea textarea {
    font-size: 13px;
  }
}

.attachments-box {
  font-size: 13px;
  .el-upload-list__item {
    float: left;
    width: auto;
  }
  h3 {
    font-size: 13px;
    small {
      color: #929aa3;
    }
  }
}

.notes-box {
  .notes {
    padding-top: 20px;
  }
  .note-line {
    margin-bottom: 20px;
    position: relative;
    &:last-of-type {
      overflow: hidden;
    }
  }
  .note-time-line {
    float: left;
    width: 170px;
    text-align: center;
    padding-top: 35px;
  }
  .note-content {
    overflow: hidden;
    .created-time {
      color: #929aa3;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .operations {
      margin-bottom: 5px;
      text-align: right;
      font-size: 12px;
      color: #c9cdd1;
      .icon-close {
        display: inline-block;
        transform: scale(.8);
      }
      .icon-batonx {
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          color: #538cc0;
        }
      }
    }
  }
  label {
    padding-top: 15px;
    display: inline-block;
  }
  .el-textarea.is-disabled {
    .el-textarea__inner {
      color: #595f67;
      border-color: #e2e5e9;
      cursor: auto;
      background: white;
    }
  }
  .add-note-btn {
    margin: 10px 0 0 10px;
  }
  .icon-circle {
    display: inline-block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background: #c5e4f1;
    vertical-align: -2px;
    margin: 0 5px 0 8px;
    position: relative;
    &:before {
      width: 4px;
      position: absolute;
      content: '';
      height: 9em;
      background: #c5e4f1;
      top: -1em;
      left: 5px;
    }
  }
  .more-note {
    color: #595f67;
    cursor: pointer;
    &:hover {
      color: #538cc0;
    }
    .icon-down {
      margin-right: 10px;
      color: #538cc0;
    }
    margin-bottom: 10px;
  }
}

.upload-attachment {
  display: inline;
  margin-left: 10px;
}

.asset-panel {
  border-radius: 4px;
  // border: 1px solid #e7eaed;
  em {
    color: #de3569;
  }
}

.asset-panel-dashboard {
  .el-row {
    border-bottom: 1px solid #e7eaed;
    &:last-child {
      border-bottom: none;
    }
  }
  .panel-cell {
    padding: 35px;
  }
}

.asset-panel-products {
  .header {
    background: #e2f1f8;
    padding-left: 15px;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: #364f77;
    .buttons {
      float: right;
      button {
        font-size: 13px;
        margin-right: 10px;
      }
    }
  }
  table {
    width: 100%;
    th,
    td {
      color: #929aa3;
      font-weight: normal;
      text-align: left;
      padding: 15px;
      border-bottom: 1px solid #e7eaed;
    }
    tbody tr:last-child {
      th,
      td {
        border-bottom: 0;
      }
    }
  }
}

.rate-chart {
  padding-top: 20px;
  border-radius: 4px;
  // border: 1px solid #e7eaed;
  width: 100%;
  height: 350px;
}
</style>
