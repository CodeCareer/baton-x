export function validateArray(rule, value, cb) {
  if (!value || !value.length) {
    cb(new Error(`请选择${rule.fieldName}`))
  } else {
    cb()
  }
}
