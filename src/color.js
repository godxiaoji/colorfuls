import { num2Hex } from './util'

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
    h: Math.round(h * 360).toString(),
    s: Math.round(s * 100) + '%',
    l: Math.round(l * 100) + '%'
  }
}

function _rgb2hex(r, g, b) {
  let str = ((r << 16) | (g << 8) | b).toString(16)

  for (let i = 0, len = 6 - str.length; i < len; i++) {
    str = '0' + str
  }

  return '#' + str
}

function _parseAlpha(value) {
  let opacity = 1
  if (value != null && value !== '') {
    value = value.toString()
    if (value.indexOf('%') !== -1) {
      opacity = Math.round(parseInt(value) / 100)
    } else {
      opacity = parseFloat(value)
    }
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
    return new HEXA(_rgb2hex(this.r, this.g, this.b) + num2Hex(this.a, 2))
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

  rgba() {
    return hsla2RGBA(this.toHsla())
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
    return `hsl(${this._h}, ${this._s}, ${this._l})`
  }

  toHsla() {
    return `hsla(${this._h}, ${this._s}, ${this._l}, ${this._a})`
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
    return hexa2RGBA(this._hexa)
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

/**
 * rgb/rgba色值转为rgba对象
 * @param {string} rgba rgb(255,0,0)/rgba(255,0,0,.5)
 * @returns RGBA
 */
export function rgba2RGBA(rgba) {
  if (!isRgba(rgba)) {
    throw new Error('It is not a valid rgb/rgba string')
  }

  function value2Binary(value) {
    if (value.indexOf('%') !== -1) {
      return Math.round((255 * parseInt(value)) / 100)
    }
    return parseInt(value)
  }

  const matches = rgbaReg.exec(rgba.trim())
  window.console.log(matches)

  const rgbaMap = new RGBA(
    value2Binary(matches[1]),
    value2Binary(matches[2]),
    value2Binary(matches[3]),
    matches[4]
  )

  return rgbaMap
}

/**
 * hex/hexa色值转为rgba对象
 * @param {string} hex #ff0000/#ff000080
 * @returns RGBA
 */
export function hexa2RGBA(hexa) {
  if (!isHexa(hexa)) {
    throw new Error('It is not a valid hex/hexa string')
  }

  let rH,
    gH,
    bH,
    aH = 'ff'

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
  }

  return new RGBA(
    parseInt('0x' + rH),
    parseInt('0x' + gH),
    parseInt('0x' + bH),
    parseFloat(parseInt('0x' + aH), 255)
  )
}

/**
 * hsl/hsla色值转为rgba对象
 * @param {string} hsla hsl(0,100%,50%)/hsla(0,100%,50%,0.5)
 * @returns RGBA
 */
export function hsla2RGBA(hsla) {
  if (!isHsla(hsla)) {
    throw new Error('It is not a valid hsl/hsla string')
  }

  const matches = hslaReg.exec(hsla.trim())
  const h = parseInt(matches[1]) / 360

  let s
  if (matches[2].indexOf('%') !== -1) {
    s = parseInt(matches[2]) / 100
  } else {
    s = parseFloat(matches[2])
  }
  let l
  if (matches[3].indexOf('%') !== -1) {
    l = parseInt(matches[3]) / 100
  } else {
    l = parseFloat(matches[3])
  }

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let r, g, b
  if (s == 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return new RGBA(r * 255, g * 255, b * 255, matches[4])
}
