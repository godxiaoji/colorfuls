import { Color, ColorOptions } from './color'

/**
 * 计算灰阶值
 * @param {Number} r red
 * @param {Number} g green
 * @param {Number} b blue
 * @see https://www.cnblogs.com/zhangjiansheng/p/6925722.html
 */
function rgb2Gray(r: number, g: number, b: number) {
  // 著名的心理学公式
  // return (r * 299 + g * 587 + b * 114) / 1000
  return (r * 38 + g * 75 + b * 15) >> 7
}

export function invert(value: ColorOptions) {
  const color = Color(value).rgb()

  return color
    .setRed(255 - color.getRed())
    .setGreen(255 - color.getGreen())
    .setBlue(255 - color.getBlue())
}

export function complement(value: ColorOptions) {
  return Color(value).hsl().rotate(180)
}

export function nears(value: ColorOptions) {
  return [Color(value).hsl().rotate(-30), Color(value).hsl().rotate(30)]
}

export function contrasts(value: ColorOptions) {
  return [Color(value).hsl().rotate(-120), Color(value).hsl().rotate(120)]
}

/**
 * 是否深色调
 * @param {String} value
 */
export function isDark(value: ColorOptions) {
  const color = Color(value).rgb()

  return rgb2Gray(color.getRed(), color.getGreen(), color.getBlue()) < 128
}

/**
 * 是否浅色调
 * @param {String} value
 */
export function isLight(value: ColorOptions) {
  return !isDark(value)
}

export function grayscale(value: ColorOptions) {
  const color = Color(value).rgb()
  const gray = Math.round(rgb2Gray(color.getRed(), color.getGreen(), color.getBlue()))

  return color.setRed(gray).setGreen(gray).setBlue(gray)
}
