import { rgba2RGBA, Color } from './color'
import { isUndefined, numberRange, percentage2Value } from './util'

/**
 * 混合颜色
 * @param {String} color1 颜色值或者实例1
 * @param {String} color2 颜色值或者实例2
 * @param {String|Number} weight 权重 0.5/50%
 * @see https://sass-lang.com/documentation/values/colors
 */
export default function mix(color1, color2, weight) {
  const c1 = Color(color1).rgba()
  const c2 = Color(color2).rgba()

  const p = isUndefined(weight) ? 0.5 : numberRange(percentage2Value(weight))
  const w = 2 * p - 1
  const a = c1.alpha() - c2.alpha()
  const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
  const w2 = 1 - w1

  return rgba2RGBA({
    r: w1 * c1.red() + w2 * c2.red(),
    g: w1 * c1.green() + w2 * c2.green(),
    b: w1 * c1.blue() + w2 * c2.blue(),
    a: c1.alpha() * p + c2.alpha() * (1 - p)
  })
}
