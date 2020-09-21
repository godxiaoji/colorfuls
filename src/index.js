import {
  rgba2RGBA,
  hexa2HEXA,
  hsla2HSLA,
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
  if (isObject(value)) {
    if (isNumber(value.r) && isNumber(value.g) && isNumber(value.b)) {
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
  return hexa2HEXA(hexa).toRgba()
}

export function hexa2hsla(hexa) {
  return hexa2HEXA(hexa).toHsla()
}

export function hex2Rgb(hex) {
  return hexa2HEXA(hex).toRgb()
}

export function hex2hsl(hex) {
  return hexa2HEXA(hex).toHsl()
}

export function hsla2Rgba(hsla) {
  return hsla2HSLA(hsla).toRgba()
}

export function hsla2Hexa(hsla) {
  return hsla2HSLA(hsla).toHexa()
}

export function hsl2Rgb(hsl) {
  return hsla2HSLA(hsl).toRgb()
}

export function hsl2Hex(hsl) {
  return hsla2HSLA(hsl).toHex()
}
