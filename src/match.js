import { Color } from './color'

/**
 * 计算灰阶值
 * @param {Number} r red
 * @param {Number} g green
 * @param {Number} b blue
 * @see https://www.cnblogs.com/zhangjiansheng/p/6925722.html
 */
function rgb2Gray(r, g, b) {
  // 著名的心理学公式
  // return (r * 299 + g * 587 + b * 114) / 1000
  return (r * 38 + g * 75 + b * 15) >> 7
}

export function invert(value) {
  const color = Color(value).rgba()

  return color
    .red(255 - color.red())
    .green(255 - color.green())
    .blue(255 - color.blue())
}

export function complement(value) {
  return Color(value).hsla().rotate(180)
}

export function nears(value) {
  return [Color(value).hsla().rotate(-30), Color(value).hsla().rotate(30)]
}

export function contrasts(value) {
  return [Color(value).hsla().rotate(-120), Color(value).hsla().rotate(120)]
}

/**
 * 是否深色调
 * @param {String} value
 */
export function isDark(value) {
  const color = Color(value).rgba()

  return rgb2Gray(color.red(), color.green(), color.blue()) < 128
}

/**
 * 是否浅色调
 * @param {String} value
 */
export function isLight(value) {
  return !isDark(value)
}

export function grayscale(value) {
  const color = Color(value).rgba()
  const gray = Math.round(rgb2Gray(color.red(), color.green(), color.blue()))

  return color.red(gray).green(gray).blue(gray)
}
