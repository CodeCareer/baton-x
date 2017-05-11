import { isArray } from 'lodash'

export function mergeArrayCover(objVal, srcVal) {
  if (isArray(objVal)) {
    return srcVal
  }
}
