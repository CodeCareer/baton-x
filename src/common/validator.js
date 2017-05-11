import {
  get
} from 'lodash'

export function validateArray(rule, value, cb) {
  if (!value || !value.length) {
    cb(new Error(`请选择${rule.fieldName}`))
  } else {
    cb()
  }
}

export function validateEqual(rule, value, cb) {
  if (value !== get(this, rule.compare)) {
    cb(new Error(`请输入相同的${rule.compareName}`))
  } else {
    cb()
  }
}
