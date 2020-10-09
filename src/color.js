import {
  isNumber,
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
  isBig
} from './util'

// PS：不会写比较骚的正则，这个虽然长，但是容易看懂
const hexaReg = /^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i
const rgbaReg = /^rgb[a]?[(][\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i
const hslaReg = /^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i

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
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h
  let s
  let l = (max + min) / 2

  if (max == min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: h * 360,
    s,
    l
  }
}

function _rgb2hsv(r, g, b) {
  let h = 0
  let s = 0
  let v = 0

  const arr = [r, g, b].sort(function(a, b) {
    return a - b
  })
  const max = arr[2]
  const min = arr[0]
  v = max / 255

  if (max === 0) {
    s = 0
  } else {
    s = 1 - min / max
  }
  if (max === min) {
    h = 0 //事实上，max===min的时候，h无论为多少都无所谓
  } else if (max === r && g >= b) {
    h = 60 * ((g - b) / (max - min)) + 0
  } else if (max === r && g < b) {
    h = 60 * ((g - b) / (max - min)) + 360
  } else if (max === g) {
    h = 60 * ((b - r) / (max - min)) + 120
  } else if (max === b) {
    h = 60 * ((r - g) / (max - min)) + 240
  }

  return { h, s, v }
}

function _hsv2rgb(h, s, v) {
  let r = 0
  let g = 0
  let b = 0

  const i = Math.floor((h / 60) % 6)
  const f = big(h).div(60).minus(i)
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
    r: Math.round(r.times(255)),
    g: Math.round(g.times(255)),
    b: Math.round(b.times(255))
  }
}

function _hsv2hsl(h, s, v) {
  return {
    h,
    s: s.times(v).div((h = big(2).minus(s).times(v)).lt(num1) ? h : big(2).minus(h)) || big(0),
    l: h.div(2)
  }
}

function _rgb2hex(r, g, b) {
  let str = ((r << 16) | (g << 8) | b).toString(16)

  for (let i = 0, len = 6 - str.length; i < len; i++) {
    str = '0' + str
  }

  return '#' + str
}

function _hsl2rgb(h, s, l) {
  let r, g, b
  if (s.eq(0)) {
    r = g = b = l
  } else {
    h = big(h).div(360)

    const p2 = l.lt(0.5) ? l.times(s.plus(1)) : l.plus(s).minus(l.times(s))
    const p1 = l.times(2).minus(p2)

    r = hue2rgb(p1, p2, h.plus(1 / 3))
    g = hue2rgb(p1, p2, h)
    b = hue2rgb(p1, p2, h.minus(1 / 3))
  }

  return {
    r: Math.round(r.times(255)),
    g: Math.round(g.times(255)),
    b: Math.round(b.times(255))
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

class BaseColor {
  /**
   * 获取/设置透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  alpha(value) {
    if (isUndefined(value)) {
      return parseFloat(this._a)
    } else if (isNumeric(value) || isBig(value)) {
      this._a = parseAlpha(value)
    } else {
      throwPercentageLikeError(value)
    }
    return this
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
    if (isUndefined(value)) {
      return this._r
    } else if (isNumeric(value)) {
      this._r = value2Binary(value)
    } else {
      throwPercentageLikeError(value)
    }
    return this
  }

  /**
   * 获取/设置绿色通道
   * @param {Number|Sring?} value
   */
  green(value) {
    if (isUndefined(value)) {
      return this._g
    } else if (isNumeric(value)) {
      this._g = value2Binary(value)
    } else {
      throwPercentageLikeError(value)
    }
    return this
  }

  /**
   * 获取/设置蓝色通道
   * @param {Number|Sring?} value
   */
  blue(value) {
    if (isUndefined(value)) {
      return this._b
    } else if (isNumeric(value)) {
      this._b = value2Binary(value)
    } else {
      throwPercentageLikeError(value)
    }
    return this
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
    return new HEXA(_rgb2hex(this._r, this._g, this._b) + decimal2Hex(this._a, 2))
  }

  toRgb() {
    return `rgb(${this._r}, ${this._g}, ${this._b})`
  }

  toRgba() {
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${this.alpha()})`
  }

  toString() {
    return this.toRgba()
  }

  toArray() {
    return [this._r, this._g, this._b, this.alpha()]
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
      return Math.round(this._h)
    } else if (isNumeric(degree)) {
      this._h = numberRange(parseFloat(degree), 0, 360)
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
    if (isUndefined(value)) {
      return this._s.times(100).round().toFixed(0) + '%'
    } else if (isNumeric(value)) {
      this._s = channelLength(value)
    } else {
      throwPercentageLikeError(value)
    }
    return this
  }

  /**
   * 调整色相
   * @param {Number} degree 加权角度值
   */
  rotate(degree) {
    if (isNumber(degree)) {
      this._h = (this._h + degree + 360) % 360
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
    if (isUndefined(value)) {
      return this._l.times(100).round().toFixed(0) + '%'
    } else if (isNumeric(value)) {
      this._l = channelLength(value)
    } else {
      throwPercentageLikeError(value)
    }
    return this
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
    return `hsl(${this.hue()}, ${this.saturation()}, ${this.lightness()})`
  }

  toHsla() {
    return `hsla(${this.hue()}, ${this.saturation()}, ${this.lightness()}, ${this.alpha()})`
  }

  toString() {
    return this.toHsla()
  }

  toArray() {
    return [this.hue(), this.saturation(), this.lightness(), this.alpha()]
  }

  toNumberArray() {
    return [this.hue(), parseFloat(this._s), parseFloat(this._l), this.alpha()]
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
    if (isUndefined(value)) {
      return this._v.times(100).round().toFixed(0) + '%'
    } else if (isNumeric(value)) {
      this._v = channelLength(value)
    } else {
      throwPercentageLikeError(value)
    }
    return this
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
    return `${this.hue()}°, ${this.saturation()}, ${this.value()}`
  }

  toHsva() {
    return `${this.hue()}°, ${this.saturation()}, ${this.value()}, ${this.alpha()}`
  }

  toString() {
    return this.toHsva()
  }

  toArray() {
    return [this.hue(), this.saturation(), this.value(), this.alpha()]
  }

  toNumberArray() {
    return [this.hue(), parseFloat(this._s), parseFloat(this._v), this.alpha()]
  }
}

/**
 * HEX 构造器
 */
class HEXA extends BaseColor {
  constructor(hexa) {
    super()

    hexa = hexa.toUpperCase()

    let alpha = 'FF'

    if (hexa.length === 7) {
      this._hex = hexa
    } else {
      this._hex = hexa.slice(0, 7)

      alpha = hexa.slice(7, 9)
    }

    this.alpha(parseFloat(parseInt('0x' + alpha) / 255))
  }

  rgba() {
    return new RGBA(
      parseInt('0x' + this._hex.slice(1, 3)),
      parseInt('0x' + this._hex.slice(3, 5)),
      parseInt('0x' + this._hex.slice(5, 7)),
      this._a
    )
  }

  hsla() {
    return this.rgba().hsla()
  }

  hsva() {
    return this.rgba().hsva()
  }

  toHex() {
    return this._hex
  }

  toHexa() {
    return this._hex + decimal2Hex(this._a, 2)
  }

  toString() {
    return this.toHexa()
  }

  toArray() {
    return [this._hex.slice(1, 3), this._hex.slice(3, 5), this._hex.slice(5, 7), decimal2Hex(this._a, 2)]
  }
}

function value2Binary(value) {
  if (isString(value) && value.substr(value.length - 1, 1) === '%') {
    value = (255 * parseFloat(value)) / 100
  } else {
    value = parseFloat(value)
  }
  return numberRange(Math.round(value), 0, 255)
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

  return new HEXA(`#${rH}${gH}${bH}${aH}`.toUpperCase())
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
 * @param {String|{h:Number,s:String|Number,l:String|Number,a?:Number}} hsla 颜色值
 */
export function hsla2HSLA(hsla) {
  let matches

  if (isObject(hsla) && isNumber(hsla.h) && isNumeric(hsla.s) && isNumeric(hsla.l)) {
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
 * @param {String|{h:Number,s:String|Number,v:String|Number,a?:Number}} hsva 颜色值
 */
export function hsva2HSVA(hsva) {
  let matches

  if (isObject(hsva) && isNumber(hsva.h) && isNumeric(hsva.s) && isNumeric(hsva.v)) {
    matches = [null, hsva.h, hsva.s, hsva.v, isNumeric(hsva.a) ? hsva.a : 1]
  } else {
    throw new Error('It is not a valid hsv/hsva string')
  }

  return new HSVA(...matches.slice(1, 5))
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
    return new HEXA(object._hex + decimal2Hex(object._a, 2))
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
    } else if (isNumber(value.h) && isLimitPercentage(value.s)) {
      if (isLimitPercentage(value.l)) {
        return hsla2HSLA(value)
      } else if (isLimitPercentage(value.v)) {
        return hsva2HSVA(value)
      }
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
