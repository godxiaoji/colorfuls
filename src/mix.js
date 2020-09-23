import { rgba2RGBA, Color } from './color'
import { isUndefined, numberRange, percentage2Length } from './util'
<<<<<<< HEAD
=======
import Big from 'big.js/big.mjs'
>>>>>>> big

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

<<<<<<< HEAD
  const p = isUndefined(weight) ? 0.5 : numberRange(percentage2Length(weight))
  const w = 2 * p - 1
  const a = c1.alpha() - c2.alpha()
  const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
  const w2 = 1 - w1
=======
  const p = new Big(
    isUndefined(weight) ? 0.5 : numberRange(percentage2Length(weight))
  )

  const w = p.times(2).minus(1)
  const a = c1._a.minus(c2._a)
  const w1 = (w.times(a).eq(-1)
    ? w
    : w.plus(a).div(w.times(a).plus(1)).plus(1)
  ).div(2.0)
  const w2 = new Big(1).minus(w1)
>>>>>>> big

  return rgba2RGBA({
    r: parseFloat(w1.times(c1.red()).plus(w2.times(c2.red()))),
    g: parseFloat(w1.times(c1.green()).plus(w2.times(c2.green()))),
    b: parseFloat(w1.times(c1.blue()).plus(w2.times(c2.blue()))),
    a: c1._a.times(p).plus(c2._a.times(new Big(1).minus(p)))
  })
}
