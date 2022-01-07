import { Color } from './color'
import type { ColorOptions } from './color'
import { rgb2Gray } from './util'

/**
 * 反色
 * @param value 颜色值
 * @returns Color实例
 */
export function invert(value: ColorOptions) {
  const color = Color(value).rgb()

  return color
    .setRed(255 - color.getRed())
    .setGreen(255 - color.getGreen())
    .setBlue(255 - color.getBlue())
}

/**
 * 补色
 * @param value 颜色值
 * @returns Color实例
 */
export function complement(value: ColorOptions) {
  return Color(value).hsl().rotate(180)
}

/**
 * 相近色
 * @param value 颜色值
 * @returns Color实例
 */
export function nears(value: ColorOptions) {
  return [Color(value).hsl().rotate(-30), Color(value).hsl().rotate(30)]
}

/**
 * 对比色
 * @param value 颜色值
 * @returns Color实例
 */
export function contrasts(value: ColorOptions) {
  return [Color(value).hsl().rotate(-120), Color(value).hsl().rotate(120)]
}

/**
 * 是否深色调
 * @param value 颜色值
 */
export function isDark(value: ColorOptions) {
  return Color(value).isDark()
}

/**
 * 是否浅色调
 * @param value 颜色值
 */
export function isLight(value: ColorOptions) {
  return Color(value).isLight()
}

/**
 * 转为灰度色
 * @param value 颜色值
 * @returns Color实例
 */
export function grayscale(value: ColorOptions) {
  const color = Color(value).rgb()
  const gray = Math.round(rgb2Gray(color.getRed(), color.getGreen(), color.getBlue()))

  return color.setRed(gray).setGreen(gray).setBlue(gray)
}
