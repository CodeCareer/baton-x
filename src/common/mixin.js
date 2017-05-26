// import _ from 'lodash'
let statuColors = {
  '待提交': 'waitC',
  '待确认': 'waitC',
  '待发布': 'waitC',
  '待执行': 'waitC',
  '已发布': 'ok1C',
  '销售完成': 'ok2C',
  '已确认确认书': 'ok2C'
}
let amountColors = {
  '已执行': 'yzx',
  '未执行': 'wzx',
  '审批中': 'spz'
}
export default {
  filters: {
    filterColor(value) {
      return statuColors[value]
    },
    filterAmountColor(value) {
      return amountColors[value]
    }
  }
}
