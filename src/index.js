import {
  rgba2RGBA,
  hexa2RGBA,
  hsla2RGBA,
  isHexa,
  isRgba,
  isHsla
} from './color'
import { isLimitPercentage, isNumber, isObject } from './util'

/**
 * 颜色构造器
 * @param {String|{r:Number,g:Number,b:Number,a?:Number}|{h:Number,s:string,l:string,a?:Number}} value 颜色值
 */
export default function Color(value) {
  if (isHexa(value)) {
    return hexa2RGBA(value).hexa()
  } else if (isRgba(value)) {
    return rgba2RGBA(value)
  } else if (isHsla(value)) {
    return hsla2RGBA(value).hsla()
  } else if (isObject(value)) {
    if (isNumber(value.r) && isNumber(value.g) && isNumber(value.b)) {
      return rgba2RGBA(
        `rgba(${value.r},${value.g},${value.b},${
          isNumber(value.a) ? value.a : 1
        })`
      )
    } else if (
      isNumber(value.h) &&
      isLimitPercentage(value.s) &&
      isLimitPercentage(value.l)
    ) {
      return hsla2RGBA(
        `hsla(${value.r},${value.g},${value.b},${
          isNumber(value.a) ? value.a : 1
        })`
      ).hsla()
    }
  }
}

export function rgba2hexa(rgba) {
  return rgba2RGBA(rgba).toHexa()
}

export function rgba2hsla(rgba) {
  return rgba2RGBA(rgba).toHsla()
}

export function rgb2hex(rgb) {
  return rgba2RGBA(rgb).toHex()
}

export function rgb2hsl(rgb) {
  return rgba2RGBA(rgb).toHsl()
}

export function hexa2Rgba(hexa) {
  return hexa2RGBA(hexa).toRgba()
}

export function hexa2hsla(hexa) {
  return hexa2RGBA(hexa).toHsla()
}

export function hex2Rgb(hex) {
  return hexa2RGBA(hex).toRgb()
}

export function hex2hsl(hex) {
  return hexa2RGBA(hex).toHsl()
}

export function hsla2Rgba(hsla) {
  return hsla2RGBA(hsla).toRgba()
}

export function hsla2Hexa(hsla) {
  return hsla2RGBA(hsla).toHexa()
}

export function hsl2Rgb(hsl) {
  return hsla2RGBA(hsl).toRgb()
}

export function hsl2Hex(hsl) {
  return hsla2RGBA(hsl).toHex()
}
