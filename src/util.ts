export function number2Percentage(number: number) {
  return (number * 100).toFixed(0) + '%'
}

/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
export function isNumeric(object: unknown) {
  return (
    (typeof object === 'number' && isFinite(object)) ||
    (typeof object === 'string' && !isNaN(parseFloat(object as string)) && isFinite(parseFloat(object as string)))
  )
}

/**
 * 是否百分比值
 * @param {any} object 值
 */
export function isPercentage(object: unknown) {
  return typeof object === 'string' && /^([\d.]+)%$/.test(object as string)
}

/**
 * 是否限制的百分比值
 * @param {any} object 值
 * @param {Number} min 最小范围
 * @param {Number} max 最大范围
 */
export function isLimitPercentage(object: unknown, min = 0, max = 100) {
  if (isPercentage(object)) {
    const value = parseFloat(object as string)
    return value >= min && value <= max
  }
  return false
}

/**
 * 数值转16进制
 * @param {Number} num 数值
 * @param {Number} width 多少位
 */
export function decimal2Hex(num: number, width: number) {
  num = Math.round(num * 255)

  const hex = '0123456789abcdef'
  let s = ''
  while (num) {
    s = hex.charAt(num % 16) + s
    num = Math.floor(num / 16)
  }
  if (typeof width === 'undefined' || width <= s.length) {
    return s.toUpperCase()
  }
  let delta = width - s.length
  let padding = ''
  while (delta-- > 0) {
    padding += '0'
  }
  return (padding + s).toUpperCase()
}

/**
 * 数值限定范围
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
export function numberRange(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

/**
 * 百分比转数值0-1
 * @param {String|number} value 100%/0.1
 */
export function percentage2Length(value: string | number) {
  if (isPercentage(value)) {
    return parseFloat(value as string) / 100
  }

  return parseFloat(value as string)
}
