import Big from 'big.js/big.mjs'

/**
 * 是否数值，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
export function isNumber(object) {
  return typeof object === 'number' && isFinite(object)
}

/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
export function isNumeric(object) {
  return object != null && !isNaN(parseFloat(object))
}

/**
 * 是否字符串
 * @param {any} object 值
 */
export function isString(object) {
  return typeof object === 'string'
}

/**
 * 是否对象，包含常见的{}/[]，不含null
 * @param {any} object 值
 */
export function isObject(object) {
  return typeof object === 'object' && object !== null
}

/**
 * 是否数组
 * @param {any} object 值
 */
export function isArray(object) {
  return Array.isArray(object)
}

/**
 * 是否undefined
 * @param {any} object 值
 */
export function isUndefined(object) {
  return typeof object === 'undefined'
}

/**
 * 是否百分比值
 * @param {any} object 值
 */
export function isPercentage(object) {
  return isString(object) && /^(\d+)%$/.test(object)
}

/**
 * 是否限制的百分比值
 * @param {any} object 值
 * @param {Number} min 最小范围
 * @param {Number} max 最大范围
 */
export function isLimitPercentage(object, min = 0, max = 100) {
  if (isPercentage(object)) {
    const value = parseFloat(object)
    return value >= min && value <= max
  }
  return false
}

/**
 * 数值转16进制
 * @param {Number} num 数值
 * @param {Number} width 多少位
 */
export function decimal2Hex(num, width) {
  num = Math.round(num * 255)

  let hex = '0123456789abcdef'
  let s = ''
  while (num) {
    s = hex.charAt(num % 16) + s
    num = Math.floor(num / 16)
  }
  if (typeof width === 'undefined' || width <= s.length) {
    return s
  }
  let delta = width - s.length
  let padding = ''
  while (delta-- > 0) {
    padding += '0'
  }
  return padding + s
}

/**
 * 数值限定范围
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
export function numberRange(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

/**
 * 数值限定范围
 * @param {Big} value
 * @param {Number} min
 * @param {Number} max
 */
export function bigNumberRange(value, min = 0, max = 1) {
  if (value.gt(max)) {
    return new Big(max)
  } else if (value.lt(min)) {
    return new Big(min)
  }

  return value
}

/**
 * 百分比转数值0-1
 * @param {String|number} value 100%/0.1
 */
export function percentage2Length(value) {
  if (isString(value) && value.endsWith('%')) {
    return parseFloat(value) / 100
  }

  return parseFloat(value)
}
