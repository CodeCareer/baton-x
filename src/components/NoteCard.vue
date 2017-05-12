<template lang="pug">
 .notes-box
    el-row
      el-col(:span="1")
        label 备注：
      el-col(:span="addNoteFocus ? 21 : 23")
        el-input(@focus="addNoteFocus = true", @keyup.enter="addNote", type="textarea", :rows="2", placeholder="点击添加备注", v-model="newNote")
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
            i.icon-batonx.icon-remind(v-show="note.remindActive")
              el-date-picker(type="datetime")
            i.icon-batonx.icon-close(@click="resetNote(note)", v-show="note.editActive")
            i.icon-batonx.icon-close(@click="deleteNote(note)", v-show="!note.editActive")
          .created-time(v-show='!note.editActive')
            | 创建时间 {{note.create_at| moment('YYYY-MM-DD HH:mm')}}
          el-input(type="textarea", :disabled="!note.editActive", :rows="3", v-model="note.textEdit", :id="'note_' + note.id")
    .more-note.text-center(@click="moreNote")
      span(v-show='noteVisibleCount < notes.length')
        i.icon-batonx.icon-down
        | 显示更多备注信息
      span(v-show='noteVisibleCount >= notes.length')
        | 没有更多了
</template>

<script>
import {
  remove,
  merge,
  uniqueId
} from 'lodash'
import {
  Message,
  MessageBox
} from 'element-ui'

export default {
  props: {
    passedNotes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    addNote() {
      if (this.notes.length >= 50) {
        Message.warn('备注个数不得超过50个')
        return
      }

      if (!this.newNote) {
        Message.error('备注不能为空!')
        return
      }

      this.notes.unshift({
        id: uniqueId('new_note_'),
        editActive: false,
        text: this.newNote,
        textEdit: this.newNote,
        createdAt: new Date()
      })

      this.newNote = ''
      this.addNoteFocus = false
    },

    saveNote(note) {
      note.text = note.textEdit
      note.editActive = false
    },

    moreNote() {
      if (this.noteVisibleCount >= this.notes.length) {
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
        this.notes = remove(this.notes, (v) => {
          return note.id !== v.id
        })
      })
    }
  },

  computed: {
    showNotes() {
      return this.notes.slice(0, this.noteVisibleCount)
    }
  },

  data() {
    return {
      notes: merge([], this.passedNotes),
      newNote: '',
      addNoteFocus: false,
      noteVisibleCount: 2,
      noteMoreStep: 5
    }
  }
}
</script>

<style lang="scss">
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
      .icon-remind{
          font-size:15px;
          color:#c9cdd1;
          position: relative;
          display: inline-block;
          font-weight: bold;
           .el-input{
                width:100%;
                height:100%;
                position: absolute;
                top:0px;
                right:0px;
                opacity:0;
                cursor: pointer;
              }
              .el-input__inner{
                padding:none;
                height:0;
                line-height: 0;
                border:none;
                // opacity:0;
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
</style>
