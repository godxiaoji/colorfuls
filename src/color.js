import {
  isNumeric,
  isObject,
  isString,
  decimal2Hex,
  numberRange,
  isLimitPercentage,
  percentage2Length,
  isUndefined,
  bigRange,
  big,
  isBig,
  big2Percentage,
  bigMax,
  bigMin
} from './util'

// PS：不会写比较骚的正则，这个虽然长，但是容易看懂
const hexaReg = /^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i
const rgbaReg = /^rgb[a]?[(][\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,[\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,[\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,?[\s]*(0?\.\d{1,16}|1|0|100%|[0-9]{1,2}%)?[)];?$/i
const hslaReg = /^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,16}|1|0|100%|[0-9]{1,2}%)?[)];?$/i

const num0 = big(0)
const num1 = big(1)

/**
 * 是否hex/hexa
 * @param {string} color
 * @returns boolean
 */
export function isHexa(color) {
  return hexaReg.test(color.trim())
}

/**
 * 是否rgb/rgba
 * @param {string} color
 * @returns boolean
 */
export function isRgba(color) {
  return rgbaReg.test(color.trim())
}

/**
 * 是否hsl/hsla
 * @param {string} color
 * @returns boolean
 */
export function isHsla(color) {
  return hslaReg.test(color.trim())
}

function _rgb2hsl(r, g, b) {
  const max = bigMax(r, g, b)
  const min = bigMin(r, g, b)

  let h
  let s
  let l = max.plus(min).div(2)

  if (max.eq(min)) {
    h = s = 0 // achromatic
  } else {
    let d = max.minus(min)
    s = l.gt(0.5) ? d.div(big(2).minus(max).minus(min)) : d.div(max.plus(min))

    if (max.eq(r)) {
      h = g
        .minus(b)
        .div(d)
        .plus(g.lt(b) ? 6 : 0)
    } else if (max.eq(g)) {
      h = b.minus(r).div(d).plus(2)
    } else {
      h = r.minus(g).div(d).plus(4)
    }

    h = h.div(6)
  }

  return {
    h,
    s,
    l
  }
}

function _rgb2hsv(r, g, b) {
  let h = num0
  let s = num0
  let v = num0

  const max = bigMax(r, g, b)
  const min = bigMin(r, g, b)

  v = max

  if (max.eq(0)) {
    s = num0
  } else {
    s = num1.minus(min.div(max))
  }

  if (max.eq(min)) {
    h = num0
  } else if (max.eq(r) && g.gte(b)) {
    h = g.minus(b).div(max.minus(min)).times(60).plus(0)
  } else if (max.eq(r) && g.lt(b)) {
    h = g.minus(b).div(max.minus(min)).times(60).plus(360)
  } else if (max.eq(g)) {
    h = b.minus(r).div(max.minus(min)).times(60).plus(120)
  } else if (max.eq(b)) {
    h = r.minus(g).div(max.minus(min)).times(60).plus(240)
  }

  h = h.div(360)

  return {
    h,
    s,
    v
  }
}

function _hsv2rgb(h, s, v) {
  let r = num0
  let g = num0
  let b = num0

  const i = Math.floor(h.times(6).mod(6))
  const f = h.times(6).minus(i)
  const p = v.times(num1.minus(s))
  const q = v.times(num1.minus(s.times(f)))
  const t = v.times(num1.minus(num1.minus(f).times(s)))

  switch (i) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
    default:
      break
  }

  return {
    r,
    g,
    b
  }
}

function _hsv2hsl(h, s, v) {
  return {
    h,
    s: s.times(v).div((h = big(2).minus(s).times(v)).lt(num1) ? h : big(2).minus(h)) || num0,
    l: h.div(2)
  }
}

function _rgb2hex(r, g, b) {
  r = Math.round(r.times(255))
  g = Math.round(g.times(255))
  b = Math.round(b.times(255))

  let str = ((r << 16) | (g << 8) | b).toString(16)

  for (let i = 0, len = 6 - str.length; i < len; i++) {
    str = '0' + str
  }

  return '#' + str.toUpperCase()
}

function _hsl2rgb(h, s, l) {
  let r, g, b
  if (s.eq(0)) {
    r = g = b = l
  } else {
    const p2 = l.lt(0.5) ? l.times(s.plus(1)) : l.plus(s).minus(l.times(s))
    const p1 = l.times(2).minus(p2)

    r = hue2rgb(p1, p2, h.plus(1 / 3))
    g = hue2rgb(p1, p2, h)
    b = hue2rgb(p1, p2, h.minus(1 / 3))
  }

  return {
    r,
    g,
    b
  }
}

function _cmyk2rgb(c, m, y, k) {
  const t = num1.minus(k)

  return {
    r: num1.minus(c).times(t),
    g: num1.minus(m).times(t),
    b: num1.minus(y).times(t)
  }
}

function _rgb2cmyk(r, g, b) {
  const k = num1.minus(Math.max(r, g, b))

  return {
    c: num1.minus(r).minus(k).div(num1.minus(k)),
    m: num1.minus(g).minus(k).div(num1.minus(k)),
    y: num1.minus(b).minus(k).div(num1.minus(k)),
    k
  }
}

function parseAlpha(value) {
  let opacity = 1

  if (isBig(value)) {
    return value
  }

  if (isNumeric(value)) {
    opacity = numberRange(percentage2Length(value))
  }

  return big(opacity)
}

function channelLength(value) {
  return bigRange(big(percentage2Length(value)))
}

function channelDown(channel, ratio) {
  if (!isNumeric(ratio)) {
    throwPercentageLikeError(ratio)
  }

  return bigRange(channel.times(num1.minus(percentage2Length(ratio))))
}

function channelUp(channel, ratio) {
  if (!isNumeric(ratio)) {
    throwPercentageLikeError(ratio)
  }

  return bigRange(channel.times(num1.plus(percentage2Length(ratio))))
}

function throwPercentageLikeError(value) {
  throw new Error(`parameter should be number/percentage instead of ${typeof value}`)
}

function getOrSetRatio(color, key, value) {
  if (isUndefined(value)) {
    return big2Percentage(color[key])
  } else if (isNumeric(value)) {
    color[key] = channelLength(value)
  } else {
    throwPercentageLikeError(value)
  }
  return color
}

function value2Binary(value) {
  if (isString(value) && value.substr(value.length - 1, 1) === '%') {
    value = channelLength(value)
  } else {
    value = bigRange(big(parseFloat(value)).div(255))
  }
  return value
}

function getOrSetChanel(color, key, value) {
  if (isUndefined(value)) {
    return Math.round(color[key].times(255))
  } else if (isBig(value)) {
    color[key] = value
  } else if (isNumeric(value)) {
    color[key] = value2Binary(value)
  } else {
    throwPercentageLikeError(value)
  }
  return color
}

class BaseColor {
  /**
   * 获取/设置透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  alpha(value) {
    if (isUndefined(value)) {
      return parseFloat(this._a.round(2))
    } else if (isNumeric(value) || isBig(value)) {
      this._a = parseAlpha(value)
    } else {
      throwPercentageLikeError(value)
    }
    return this
  }

  getRawAlpha() {
    return parseFloat(this._a)
  }

  /**
   * 增加透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeOut(ratio) {
    this._a = channelDown(this._a, ratio)
    return this
  }

  /**
   * 降低透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeIn(ratio) {
    this._a = channelUp(this._a, ratio)
    return this
  }

  /**
   * 增加透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fade(ratio) {
    return this.fadeOut(ratio)
  }

  /**
   * 降低透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  opaque(ratio) {
    return this.fadeIn(ratio)
  }

  rgba() {
    return this
  }

  hsla() {
    return this
  }

  hsva() {
    return this
  }

  hexa() {
    return this
  }

  cmyk() {
    return this
  }

  toRgb() {
    return this.rgba().toRgb()
  }

  toRgba() {
    return this.rgba().toRgba()
  }

  toHex() {
    return this.hexa().toHex()
  }

  toHexa() {
    return this.hexa().toHexa()
  }

  toHsl() {
    return this.hsla().toHsl()
  }

  toHsla() {
    return this.hsla().toHsla()
  }

  toHsv() {
    return this.hsva().toHsv()
  }

  toHsva() {
    return this.hsva().toHsva()
  }

  toCmyk() {
    return this.cmyk().toCmyk()
  }
}

/**
 * RGBA 构造
 */
class RGBA extends BaseColor {
  /**
   * 构造器
   * @param {Number} r 红色通道
   * @param {Number} g 绿色通道
   * @param {Number} b 蓝色通道
   * @param {Number|String} a 透明通道
   */
  constructor(r, g, b, a) {
    super()

    this.red(r)
    this.green(g)
    this.blue(b)
    this.alpha(isNumeric(a) || isBig(a) ? a : 1)
  }

  /**
   * 获取/设置红色通道
   * @param {Number|Sring?} value
   */
  red(value) {
    return getOrSetChanel(this, '_r', value)
  }

  /**
   * 获取/设置绿色通道
   * @param {Number|Sring?} value
   */
  green(value) {
    return getOrSetChanel(this, '_g', value)
  }

  /**
   * 获取/设置蓝色通道
   * @param {Number|Sring?} value
   */
  blue(value) {
    return getOrSetChanel(this, '_b', value)
  }

  hsla() {
    const { h, s, l } = _rgb2hsl(this._r, this._g, this._b)

    return new HSLA(h, s, l, this._a)
  }

  hsva() {
    const { h, s, v } = _rgb2hsv(this._r, this._g, this._b)

    return new HSVA(h, s, v, this._a)
  }

  hexa() {
    return new HEXA(this._r, this._g, this._b, this._a)
  }

  cmyk() {
    const { c, m, y, k } = _rgb2cmyk(this._r, this._g, this._b)

    return new CMYK(c, m, y, k, this._a)
  }

  toRgb() {
    return `rgb(${this.red()}, ${this.green()}, ${this.blue()})`
  }

  toRgba() {
    return `rgba(${this.red()}, ${this.green()}, ${this.blue()}, ${this.alpha()})`
  }

  toString() {
    return this.toRgba()
  }

  toArray() {
    return [this.red(), this.green(), this.blue(), this.alpha()]
  }

  toObject() {
    const [r, g, b, a] = this.toArray()
    return { r, g, b, a }
  }

  toRawArray() {
    return [parseFloat(this._r), parseFloat(this._g), parseFloat(this._b), parseFloat(this._a)]
  }

  toRawObject() {
    const [r, g, b, a] = this.toRawArray()
    return { r, g, b, a }
  }
}

/**
 * HSA 构造
 */
class HSA extends BaseColor {
  /**
   * 构造器
   * @param {Number} h 色相 0-360
   * @param {Number|String} s 饱和度 0-100%
   * @param {Number} a 透明通道
   */
  constructor(h, s, a) {
    super()

    this.hue(h)
    this.saturation(s)
    this.alpha(isNumeric(a) || isBig(a) ? a : 1)
  }

  /**
   * 获取/设置色相
   * @param {Number} degree 角度值
   */
  hue(degree) {
    if (isUndefined(degree)) {
      return this._h.times(360).round() + '°'
    } else if (isBig(degree)) {
      this._h = degree
    } else if (isNumeric(degree)) {
      this._h = big(numberRange(parseFloat(degree), 0, 360)).div(360)
    } else {
      throw new Error(`parameter should be number instead of ${typeof degree}`)
    }
    return this
  }

  /**
   * 获取/设置饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  saturation(value) {
    return getOrSetRatio(this, '_s', value)
  }

  /**
   * 调整色相
   * @param {Number} degree 加权角度值
   */
  rotate(degree) {
    if (isNumeric(degree)) {
      this._h = this._h.plus(big(parseFloat(degree)).div(360).plus(1)).mod(1)
    } else {
      throw new Error(`parameter should be number instead of ${typeof degree}`)
    }
    return this
  }

  /**
   * 增加饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  saturate(ratio) {
    this._s = channelUp(this._s, ratio)
    return this
  }

  /**
   * 降低饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  desaturate(ratio) {
    this._s = channelDown(this._s, ratio)
    return this
  }

  hexa() {
    return this.rgba().hexa()
  }

  cmyk() {
    return this.rgba().cmyk()
  }
}

/**
 * HSLA 构造
 */
class HSLA extends HSA {
  /**
   * 构造器
   * @param {Number} h 色相 0-360
   * @param {Number|String} s 饱和度 0-100%
   * @param {Number|String} l 亮度 0-100%
   * @param {Number} a 透明通道
   */
  constructor(h, s, l, a) {
    super(h, s, a)

    this.lightness(l)
  }

  /**
   * 获取/设置亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  lightness(value) {
    return getOrSetRatio(this, '_l', value)
  }

  /**
   * 增加亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  lighten(ratio) {
    this._l = channelUp(this._l, ratio)
    return this
  }

  /**
   * 降低亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  darken(ratio) {
    this._l = channelDown(this._l, ratio)
    return this
  }

  rgba() {
    const { r, g, b } = _hsl2rgb(this._h, this._s, this._l)

    return new RGBA(r, g, b, this._a)
  }

  hsva() {
    return this.rgba().hsva()
  }

  toHsl() {
    return `hsl(${parseInt(this.hue())}, ${this.saturation()}, ${this.lightness()})`
  }

  toHsla() {
    return `hsla(${parseInt(this.hue())}, ${this.saturation()}, ${this.lightness()}, ${this.alpha()})`
  }

  toString() {
    return this.toHsla()
  }

  toArray() {
    return [this.hue(), this.saturation(), this.lightness(), this.alpha()]
  }

  toObject() {
    const [h, s, l, a] = this.toArray()

    return { h, s, l, a }
  }

  toRawArray() {
    return [parseFloat(this._h), parseFloat(this._s), parseFloat(this._l), this.getRawAlpha()]
  }

  toRawObject() {
    const [h, s, l, a] = this.toRawArray()

    return { h, s, l, a }
  }
}

/**
 * HSVA 构造
 */
class HSVA extends HSA {
  /**
   * 构造器
   * @param {Number} h 色相 0-360
   * @param {Number|String} s 饱和度 0-100%
   * @param {Number|String} v 色调 0-100%
   * @param {Number} a 透明通道
   */
  constructor(h, s, v, a) {
    super(h, s, a)

    this.value(v)
  }

  /**
   * 获取/设置色调
   * @param {Number|String} ratio 比值 0.5/50%
   */
  value(value) {
    return getOrSetRatio(this, '_v', value)
  }

  rgba() {
    const { r, g, b } = _hsv2rgb(this._h, this._s, this._v)

    return new RGBA(r, g, b, this._a)
  }

  hsla() {
    const { h, s, l } = _hsv2hsl(this._h, this._s, this._v)
    return new HSLA(h, s, l, this._a)
  }

  toHsv() {
    return `${this.hue()}, ${this.saturation()}, ${this.value()}`
  }

  toHsva() {
    return this.toArray().join(', ')
  }

  toString() {
    return this.toHsva()
  }

  toArray() {
    return [this.hue(), this.saturation(), this.value(), this.alpha()]
  }

  toObject() {
    const [h, s, v, a] = this.toArray()

    return { h, s, v, a }
  }

  toRawArray() {
    return [parseFloat(this._h), parseFloat(this._s), parseFloat(this._v), this.getRawAlpha()]
  }

  toRawObject() {
    const [h, s, v, a] = this.toRawArray()

    return { h, s, v, a }
  }
}

/**
 * HEX 构造器
 */
class HEXA extends BaseColor {
  constructor(r, g, b, a) {
    super()

    this._r = r
    this._g = g
    this._b = b
    this._hex = _rgb2hex(r, g, b)
    this.alpha(a)
  }

  alphaHex(value) {
    if (isUndefined(value)) {
      return decimal2Hex(this._a, 2)
    } else {
      this.alpha(parseFloat(parseInt('0x' + value) / 255))
    }
    return this
  }

  rgba() {
    return new RGBA(this._r, this._g, this._b, this._a)
  }

  hsla() {
    return this.rgba().hsla()
  }

  hsva() {
    return this.rgba().hsva()
  }

  cmyk() {
    return this.rgba().cmyk()
  }

  toHex() {
    return this._hex
  }

  toHexa() {
    return this._hex + this.alphaHex()
  }

  toString() {
    return this.toHexa()
  }

  toArray() {
    return [this._hex.slice(1, 3), this._hex.slice(3, 5), this._hex.slice(5, 7), this.alphaHex()]
  }

  toObject() {
    const [r, g, b, a] = this.toArray()
    return { r, g, b, a }
  }

  toRawArray() {
    return [parseFloat(this._r), parseFloat(this._g), parseFloat(this._b), parseFloat(this._a)]
  }

  toRawObject() {
    const [r, g, b, a] = this.toRawArray()
    return { r, g, b, a }
  }
}

class CMYK extends BaseColor {
  constructor(c, m, y, k, a) {
    super()

    this.cyan(c)
    this.magenta(m)
    this.yellow(y)
    this.black(k)

    // cmyk没有透明通道，存储只是为了防止转化丢失
    this.alpha(isNumeric(a) || isBig(a) ? a : 1)
  }

  /**
   * 获取/设置
   * @param {Number|String} ratio 比值 0.5/50%
   */
  cyan(value) {
    return getOrSetRatio(this, '_c', value)
  }

  /**
   * 获取/设置
   * @param {Number|String} ratio 比值 0.5/50%
   */
  magenta(value) {
    return getOrSetRatio(this, '_m', value)
  }

  /**
   * 获取/设置
   * @param {Number|String} ratio 比值 0.5/50%
   */
  yellow(value) {
    return getOrSetRatio(this, '_y', value)
  }

  /**
   * 获取/设置
   * @param {Number|String} ratio 比值 0.5/50%
   */
  black(value) {
    return getOrSetRatio(this, '_k', value)
  }

  rgba() {
    const { r, g, b } = _cmyk2rgb(this._c, this._m, this._y, this._k)

    return new RGBA(r, g, b, this._a)
  }

  hsla() {
    return this.rgba().hsla()
  }

  hsva() {
    return this.rgba().hsva()
  }

  hexa() {
    return this.rgba().hexa()
  }

  toCmyk() {
    return this.toArray().join(', ')
  }

  toString() {
    return this.toCmyk()
  }

  toArray() {
    return [this.cyan(), this.magenta(), this.yellow(), this.black()]
  }

  toObject() {
    const [c, m, y, k] = this.toArray()

    return { c, m, y, k }
  }

  toRawArray() {
    return [parseFloat(this._c), parseFloat(this._m), parseFloat(this._y), parseFloat(this._k)]
  }

  toRawObject() {
    const [c, m, y, k] = this.toRawArray()

    return { c, m, y, k }
  }
}

/**
 * rgb/rgba色值转为RGBA对象
 * @param {string|{r:Number,g:Number,b:Number,a?:Number}} rgba rgb(255,0,0)/rgba(255,0,0,.5)
 */
export function rgba2RGBA(rgba) {
  let matches

  if (isObject(rgba) && isNumeric(rgba.r) && isNumeric(rgba.g) && isNumeric(rgba.b)) {
    matches = [null, rgba.r, rgba.g, rgba.b, isBig(rgba.a) || isNumeric(rgba.a) ? rgba.a : 1]
  } else if (isRgba(rgba)) {
    matches = rgbaReg.exec(rgba.trim())
  } else {
    throw new Error('It is not a valid rgb/rgba string')
  }

  return new RGBA(...matches.slice(1, 5))
}

/**
 * hex/hexa色值转为HEXA对象
 * @param {string} hex #ff0000/#ff000080
 */
export function hexa2HEXA(hexa) {
  if (!isHexa(hexa)) {
    throw new Error('It is not a valid hex/hexa string')
  }

  let rH, gH, bH, aH

  hexa = hexa.trim()

  if (hexa.length === 4) {
    // #fff
    rH = hexa.slice(1, 2) + hexa.slice(1, 2)
    gH = hexa.slice(2, 3) + hexa.slice(2, 3)
    bH = hexa.slice(3, 4) + hexa.slice(3, 4)
  } else {
    rH = hexa.slice(1, 3)
    gH = hexa.slice(3, 5)
    bH = hexa.slice(5, 7)
  }

  if (hexa.length === 9) {
    aH = hexa.slice(7, 9)
  } else {
    aH = 'ff'
  }

  return new HEXA(hex2Length(rH), hex2Length(gH), hex2Length(bH), hex2Length(aH))
}

function hex2Length(channel) {
  return big(parseInt('0x' + channel)).div(255)
}

function hue2rgb(p1, p2, hue) {
  if (hue.lt(0)) hue = hue.plus(1)
  if (hue.gt(1)) hue = hue.minus(1)
  if (hue.times(6).lt(1)) return p1.plus(p2.minus(p1).times(6).times(hue))
  if (hue.times(2).lt(1)) return p2
  if (hue.times(3).lt(2))
    return p1.plus(
      p2.minus(p1).times(
        big(2 / 3)
          .minus(hue)
          .times(6)
      )
    )
  return p1
}

/**
 * hsl/hsla色值转为HSLA对象
 * @param {String|{h:String|Number,s:String|Number,l:String|Number,a?:Number}} hsla 颜色值
 */
export function hsla2HSLA(hsla) {
  let matches

  if (isObject(hsla) && isNumeric(hsla.h) && isNumeric(hsla.s) && isNumeric(hsla.l)) {
    matches = [null, hsla.h, hsla.s, hsla.l, isNumeric(hsla.a) ? hsla.a : 1]
  } else if (isHsla(hsla)) {
    matches = hslaReg.exec(hsla.trim())
  } else {
    throw new Error('It is not a valid hsl/hsla string')
  }

  return new HSLA(...matches.slice(1, 5))
}

/**
 * hsv/hsva色值转为HSVA对象
 * @param {String|{h:String|Number,s:String|Number,v:String|Number,a?:Number}} hsva 颜色值
 */
export function hsva2HSVA(hsva) {
  if (isObject(hsva) && isNumeric(hsva.h) && isNumeric(hsva.s) && isNumeric(hsva.v)) {
    return new HSVA(hsva.h, hsva.s, hsva.v, isNumeric(hsva.a) ? hsva.a : 1)
  } else {
    throw new Error('It is not a valid hsv/hsva object')
  }
}

/**
 * hsv/hsva色值转为HSVA对象
 * @param {String|{h:String|Number,s:String|Number,v:String|Number,a?:Number}} hsva 颜色值
 */
export function cmyk2CMYK(cmyk) {
  if (isObject(cmyk) && isNumeric(cmyk.c) && isNumeric(cmyk.m) && isNumeric(cmyk.y) && isNumeric(cmyk.k)) {
    return new CMYK(cmyk.c, cmyk.m, cmyk.y, cmyk.k)
  } else {
    throw new Error('It is not a valid cmyk object')
  }
}

/**
 * 克隆颜色对象
 * @param {RGBA|RGBA|HEXA} object
 */
export function clone(object) {
  if (object instanceof RGBA) {
    return new RGBA(object._r, object._g, object._b, object._a)
  } else if (object instanceof HSLA) {
    return new HSLA(object._h, object._s, object._l, object._a)
  } else if (object instanceof HSVA) {
    return new HSVA(object._h, object._s, object._v, object._a)
  } else if (object instanceof HEXA) {
    return new HEXA(object._r, object._g, object._b, object._a)
  }

  return object
}

/**
 * 颜色构造器
 * @param {String|{r:Number,g:Number,b:Number,a?:Number}|{h:Number,s:string,l:string,a?:Number}} value 颜色值
 */
export function Color(value) {
  if (isObject(value)) {
    if (value instanceof RGBA || value instanceof HSLA || value instanceof HEXA || value instanceof HSVA) {
      return clone(value)
    } else if (isNumeric(value.r) && isNumeric(value.g) && isNumeric(value.b)) {
      return rgba2RGBA(value)
    } else if (isNumeric(value.h) && isLimitPercentage(value.s)) {
      if (isLimitPercentage(value.l)) {
        return hsla2HSLA(value)
      } else if (isLimitPercentage(value.v)) {
        return hsva2HSVA(value)
      }
    } else if (isNumeric(value.c) && isNumeric(value.m) && isNumeric(value.y) && isNumeric(value.k)) {
      return cmyk2CMYK(value)
    }
  } else if (isHexa(value)) {
    return hexa2HEXA(value)
  } else if (isRgba(value)) {
    return rgba2RGBA(value)
  } else if (isHsla(value)) {
    return hsla2HSLA(value)
  }

  throw new Error('invaild color value')
}

export default Color
