import {
  isNumber,
  isNumeric,
  isObject,
  isString,
  decimal2Hex,
  numberRange
} from './util'

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

function _parseAlpha(value) {
  let opacity = 1
  if (isNumeric(value)) {
    return percentageToRangeBetween0And1(value)
  }

  return opacity
}

/**
 * Rgba结构对象
 */
class RGBA {
  constructor(r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.alpha(a)
  }

  alpha(value) {
    this.a = _parseAlpha(value)
  }

  hsla() {
    const { h, s, l } = _rgb2hsl(this.r, this.g, this.b)

    return new HSLA(h, s, l, this.a)
  }

  toHsl() {
    return this.hsla().toHsl()
  }

  toHsla() {
    return this.hsla().toHsla()
  }

  hexa() {
    return new HEXA(_rgb2hex(this.r, this.g, this.b) + decimal2Hex(this.a, 2))
  }

  toHex() {
    return this.hexa().toHex()
  }

  toHexa() {
    return this.hexa().toHexa()
  }

  toRgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }

  toRgba() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  toString() {
    return this.toRgba()
  }
}

class HSLA {
  constructor(h, s, l, a) {
    this._h = h
    this._s = s
    this._l = l
    this.alpha(a)
  }

  alpha(value) {
    this._a = _parseAlpha(value)
  }

  rotate(deg) {
    if (isNumber(deg)) {
      this._h = ((this._h * 360 + deg + 360) % 360) / 360
    }
    return this
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
    return `hsl(${Math.round(this._h * 360)}, ${Math.round(
      this._s * 100
    )}%, ${Math.round(this._l * 100)}%)`
  }

  toHsla() {
    return `hsla(${Math.round(this._h * 360)}, ${Math.round(
      this._s * 100
    )}%, ${Math.round(this._l * 100)}%, ${this._a})`
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

function percentageToRangeBetween0And1(value) {
  if (isString(value) && value.endsWith('%')) {
    return parseFloat(value) / 100
  }

  return numberRange(parseFloat(value))
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

  const h = parseFloat(matches[1]) / 360
  const s = percentageToRangeBetween0And1(matches[2])
  const l = percentageToRangeBetween0And1(matches[3])

  return new HSLA(h, s, l, matches[4])
}
