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
  bigNumberRange
} from './util'
import Big from 'big.js/big.mjs'

// PS：不会写比较骚的正则，这个虽然长，但是容易看懂
const hexaReg = /^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i
const rgbaReg = /^rgb[a]?[(][\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i
const hslaReg = /^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i

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
    h,
    s,
    l
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
  if (s == 0) {
    r = g = b = l
  } else {
    const p2 = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p1 = 2 * l - p2
    r = hue2rgb(p1, p2, h + 1 / 3)
    g = hue2rgb(p1, p2, h)
    b = hue2rgb(p1, p2, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
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

  return new Big(opacity)
}

function fadeOut(alpha, ratio) {
  return bigNumberRange(alpha.times(new Big(1).minus(percentage2Length(ratio))))
}

function fadeIn(alpha, ratio) {
  return bigNumberRange(alpha.times(new Big(1).plus(percentage2Length(ratio))))
}

function isBig(object) {
  return object instanceof Big
}

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

/**
 * RGBA 构造
 */
class RGBA {
  /**
   * 构造器
   * @param {Number} r 红色通道
   * @param {Number} g 绿色通道
   * @param {Number} b 蓝色通道
   * @param {Number|String} a 透明通道
   */
  constructor(r, g, b, a) {
    this._r = r
    this._g = g
    this._b = b
    this.alpha(a)
  }

  rgba() {
    return this
  }

  /**
   * 获取/设置红色通道
   * @param {Number} value
   */
  red(value) {
    if (isUndefined(value)) {
      return this._r
    } else if (isNumber(value)) {
      this._r = parseInt(numberRange(value, 0, 255))
    }
    return this
  }

  /**
   * 获取/设置绿色通道
   * @param {Number} value
   */
  green(value) {
    if (isUndefined(value)) {
      return this._g
    } else if (isNumber(value)) {
      this._g = parseInt(numberRange(value, 0, 255))
    }
    return this
  }

  /**
   * 获取/设置蓝色通道
   * @param {Number} value
   */
  blue(value) {
    if (isUndefined(value)) {
      return this._b
    } else if (isNumber(value)) {
      this._b = parseInt(numberRange(value, 0, 255))
    }
    return this
  }

  /**
   * 获取/设置透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  alpha(value) {
    if (isUndefined(value)) {
      return parseFloat(this._a)
    } else {
      this._a = parseAlpha(value)
    }
    return this
  }

  /**
   * 增加透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeOut(ratio) {
    this._a = fadeOut(this._a, ratio)
    return this
  }

  /**
   * 降低透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeIn(ratio) {
    this._a = fadeIn(this._a, ratio)
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

  /**
   *  反向色
   */
  invert() {
    this._r = 255 - this._r
    this._g = 255 - this._g
    this._b = 255 - this._b

    return this
  }

  /**
   * 补充色
   */
  complement() {
    return this.hsla().complement().rgba()
  }

  /**
   * 灰阶
   */
  grayscale() {
    const gray = Math.round(rgb2Gray(this._r, this._g, this._b))

    this._r = gray
    this._g = gray
    this._b = gray

    return this
  }

  isLight() {
    return !this.isDark()
  }

  /**
   * 是否深色调
   * @see YIQ equation from http://24ways.org/2010/calculating-color-contrast
   */
  isDark() {
    return rgb2Gray(this._r, this._g, this._b) < 128
  }

  hsla() {
    const { h, s, l } = _rgb2hsl(this._r, this._g, this._b)

    return new HSLA(h, s, l, this._a)
  }

  toHsl() {
    return this.hsla().toHsl()
  }

  toHsla() {
    return this.hsla().toHsla()
  }

  hexa() {
    return new HEXA(
      _rgb2hex(this._r, this._g, this._b) + decimal2Hex(this._a, 2)
    )
  }

  toHex() {
    return this.hexa().toHex()
  }

  toHexa() {
    return this.hexa().toHexa()
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
 * HSLA 构造
 */
class HSLA {
  /**
   * 构造器
   * @param {Number} h 色相 0-360
   * @param {Number} s 饱和度 0-100%
   * @param {Number} l 亮度 0-100%
   * @param {Number} a 透明通道
   */
  constructor(h, s, l, a) {
    this._h = h
    this._s = s
    this._l = l
    this.alpha(a)
  }

  hsla() {
    return this
  }

  /**
   * 获取/设置色相
   * @param {Number} deg 角度值
   */
  hue(deg) {
    if (isUndefined(deg)) {
      return Math.round(this._h * 360)
    } else if (isNumber(deg)) {
      this._h = parseInt(numberRange(deg, 0, 360)) / 360
    }
    return this
  }

  /**
   * 获取/设置饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  saturation(value) {
    if (isUndefined(value)) {
      return Math.round(this._s * 100) + '%'
    } else if (isNumeric(value)) {
      this._s = percentage2Length(value)
    }
    return this
  }

  /**
   * 获取/设置亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  lightness(value) {
    if (isUndefined(value)) {
      return Math.round(this._l * 100) + '%'
    } else if (isNumeric(value)) {
      this._l = percentage2Length(value)
    }
    return this
  }

  /**
   * 获取/设置透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  alpha(value) {
    if (isUndefined(value)) {
      return this._a
    } else {
      this._a = parseAlpha(value)
    }
    return this
  }

  /**
   * 增加透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeOut(ratio) {
    this._a = fadeOut(this._a, ratio)
    return this
  }

  /**
   * 降低透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeIn(ratio) {
    this._a = fadeIn(this._a, ratio)
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

  /**
   * 调整色相
   * @param {Number} deg 加权角度值
   */
  rotate(deg) {
    if (isNumber(deg)) {
      this._h = ((this._h * 360 + deg + 360) % 360) / 360
    }
    return this
  }

  /**
   * 增加饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  saturate(ratio) {
    if (isNumber(ratio)) {
      this._s = numberRange(this._s * (1 + percentage2Length(ratio)))
    }
    return this
  }

  /**
   * 降低饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  desaturate(ratio) {
    if (isNumber(ratio)) {
      this._s = numberRange(this._s * (1 - percentage2Length(ratio)))
    }
    return this
  }

  /**
   * 增加亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  lighten(ratio) {
    if (isNumber(ratio)) {
      this._l = numberRange(this._l * (1 + percentage2Length(ratio)))
    }
    return this
  }

  /**
   * 降低亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  darken(ratio) {
    if (isNumber(ratio)) {
      this._l = numberRange(this._l * (1 - percentage2Length(ratio)))
    }
    return this
  }

  /**
   * 灰阶
   */
  grayscale() {
    return this.rgba().grayscale().hsla()
  }

  /**
   *  反向色
   */
  invert() {
    return this.rgba().invert().hsla()
  }

  /**
   * 补充色
   */
  complement() {
    return this.rotate(180)
  }

  isLight() {
    return this.rgba().isLight()
  }

  isDark() {
    return this.rgba().isDark()
  }

  rgba() {
    const { r, g, b } = _hsl2rgb(this._h, this._s, this._l)

    return new RGBA(r, g, b, this._a)
  }

  toRgb() {
    return this.rgba().toRgb()
  }

  toRgba() {
    return this.rgba().toRgba()
  }

  hexa() {
    return this.rgba().hexa()
  }

  toHex() {
    return this.hexa().toHex()
  }

  toHexa() {
    return this.hexa().toHexa()
  }

  toHsl() {
    return `hsl(${this.hue()}, ${this.saturation()}, ${this.lightness()})`
  }

  toHsla() {
    return `hsla(${this.hue()}, ${this.saturation()}, ${this.lightness()}, ${
      this._a
    })`
  }

  toString() {
    return this.toHsla()
  }
}

/**
 * HEX 构造器
 */
class HEXA {
  constructor(hexa) {
    hexa = hexa.toUpperCase()

    if (hexa.length === 7) {
      this._hex = hexa
      this._hexa = hexa + 'FF'
    } else {
      this._hexa = hexa
      this._hex = hexa.slice(0, 7)
    }
  }

  hexa() {
    return this
  }

  /**
   * 灰阶
   */
  grayscale() {
    return this.rgba().grayscale().hexa()
  }

  isLight() {
    return this.rgba().isLight()
  }

  isDark() {
    return this.rgba().isDark()
  }

  /**
   *  反向色
   */
  invert() {
    return this.rgba().invert().hexa()
  }

  /**
   * 补充色
   */
  complement() {
    return this.hsla().complement().hexa()
  }

  rgba() {
    return new RGBA(
      parseInt('0x' + this._hexa.slice(1, 3)),
      parseInt('0x' + this._hexa.slice(3, 5)),
      parseInt('0x' + this._hexa.slice(5, 7)),
      parseFloat(parseInt('0x' + this._hexa.slice(7, 9)) / 255)
    )
  }

  toRgb() {
    return this.rgba().toRgb()
  }

  toRgba() {
    return this.rgba().toRgba()
  }

  hsla() {
    return this.rgba().hsla()
  }

  toHsl() {
    return this.hsla().toHsl()
  }

  toHsla() {
    return this.hsla().toHsla()
  }

  toHex() {
    return this._hex
  }

  toHexa() {
    return this._hexa
  }

  toString() {
    return this.toHexa()
  }
}

function value2Binary(value) {
  if (isString(value) && value.endsWith('%')) {
    return Math.round((255 * parseInt(value)) / 100)
  }
  return parseInt(value)
}

/**
 * rgb/rgba色值转为RGBA对象
 * @param {string|{r:Number,g:Number,b:Number,a?:Number}} rgba rgb(255,0,0)/rgba(255,0,0,.5)
 */
export function rgba2RGBA(rgba) {
  let matches

  if (
    isObject(rgba) &&
    isNumber(rgba.r) &&
    isNumber(rgba.g) &&
    isNumber(rgba.b)
  ) {
    matches = [null, rgba.r, rgba.g, rgba.b, isNumeric(rgba.a) ? rgba.a : 1]
  } else if (isRgba(rgba)) {
    matches = rgbaReg.exec(rgba.trim())
  } else {
    throw new Error('It is not a valid rgb/rgba string')
  }

  const rgbaMap = new RGBA(
    value2Binary(matches[1]),
    value2Binary(matches[2]),
    value2Binary(matches[3]),
    matches[4]
  )

  return rgbaMap
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
  if (hue < 0) hue += 1
  if (hue > 1) hue -= 1
  if (6 * hue < 1) return p1 + (p2 - p1) * 6 * hue
  if (2 * hue < 1) return p2
  if (3 * hue < 2) return p1 + (p2 - p1) * (2 / 3 - hue) * 6
  return p1
}

/**
 * hsl/hsla色值转为HSLA对象
 * @param {String|{h:Number,s:String|Number,l:String|Number,a?:Number}} hsla 颜色值
 */
export function hsla2HSLA(hsla) {
  let matches

  if (
    isObject(hsla) &&
    isNumber(hsla.h) &&
    isNumeric(hsla.s) &&
    isNumeric(hsla.l)
  ) {
    matches = [null, hsla.h, hsla.s, hsla.l, isNumeric(hsla.a) ? hsla.a : 1]
  } else if (isHsla(hsla)) {
    matches = hslaReg.exec(hsla.trim())
  } else {
    throw new Error('It is not a valid hsl/hsla string')
  }

  const h = parseInt(matches[1]) / 360
  const s = numberRange(percentage2Length(matches[2]))
  const l = numberRange(percentage2Length(matches[3]))

  return new HSLA(h, s, l, matches[4])
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
  } else if (object instanceof HEXA) {
    return new HEXA(object._hexa)
  }

  return object
}

/**
 * 颜色构造器
 * @param {String|{r:Number,g:Number,b:Number,a?:Number}|{h:Number,s:string,l:string,a?:Number}} value 颜色值
 */
export function Color(value) {
  if (isObject(value)) {
    if (
      value instanceof RGBA ||
      value instanceof HSLA ||
      value instanceof HEXA
    ) {
      return clone(value)
    } else if (isNumber(value.r) && isNumber(value.g) && isNumber(value.b)) {
      return rgba2RGBA(value)
    } else if (
      isNumber(value.h) &&
      isLimitPercentage(value.s) &&
      isLimitPercentage(value.l)
    ) {
      return hsla2HSLA(value)
    }
  } else if (isHexa(value)) {
    return hexa2HEXA(value)
  } else if (isRgba(value)) {
    return rgba2RGBA(value)
  } else if (isHsla(value)) {
    return hsla2HSLA(value)
  }

  throw new Error('Invaild color value.')
}

export default Color
