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
              table
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
            el-col(:span="8")
              table
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
            el-col(:span="8")
              .other-list
                dl
                  dt 流动性：
                  dd 无
                dl
                  dt 年化计息天数：
                  dd 365天
                dl
                  dt 托管方：
                  dd 中国银行
        .box-section
          .attachments-box
            h3
              | 附件：
              small *最多支持添加20个文件，每个文件不得超过20M
              el-upload.upload-attachment(action='//jsonplaceholder.typicode.com/posts/' :file-list='demo.attachments')
                el-button(size='mini' type='primary') 增加
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
      .box-header 资产详情
      .box-content
</template>

<script>
import {
  Message,
  MessageBox
} from 'element-ui'
import {
  remove,
  uniqueId
} from 'lodash'

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

        console.log(this.demo.notes, note)
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
      addNoteFocus: false,
      noteVisibleCount: 2,
      noteMoreStep: 5,
      demo: {
        name: '天津旭达资产管理项目',
        shortName: '旭达资管',
        newNote: '',
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

.el-upload-list__item {
  float: left;
  width: auto;
}
</style>
