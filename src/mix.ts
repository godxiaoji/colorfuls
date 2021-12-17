import { rgb2RGBColor, Color, ColorOptions, PercentageLike } from './color'
import { numberRange, percentage2Length } from './util'

/**
 * 混合颜色
 * @param {String} color1 颜色值或者实例1
 * @param {String} color2 颜色值或者实例2
 * @param {String|Number} weight 权重 0.5/50%
 * @see https://sass-lang.com/documentation/values/colors
 */
export function mix(color1: ColorOptions, color2: ColorOptions, weight?: PercentageLike) {
  const c1 = Color(color1).rgb()
  const c2 = Color(color2).rgb()

  const p = typeof weight === 'undefined' ? 0.5 : numberRange(percentage2Length(weight))

  const w = p * 2 - 1
  const a = c1.getRawAlpha() - c2.getRawAlpha()
  // const w1 = (
  //   w.times(a).eq(-1) ? w : w.plus(a).div(w.times(a).plus(1)).plus(1)
  // ).div(2.0)

  const w1 = (w * a === -1 ? w : (w + a) / (w * a + 1) + 1) / 2
  const w2 = 1 - w1

  return rgb2RGBColor({
    r: w1 * c1.getRed() + w2 * c2.getRed(),
    g: w1 * c1.getGreen() + w2 * c2.getGreen(),
    b: w1 * c1.getBlue() + w2 * c2.getBlue(),
    a: c1.getRawAlpha() * p + c2.getRawAlpha() * (1 - p)
  })
}
