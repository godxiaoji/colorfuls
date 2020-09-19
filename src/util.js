/**
 * 是否数值，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
export function isNumber(object) {
  return typeof object === 'number' && isFinite(object)
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
export function num2Hex(num, width) {
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
