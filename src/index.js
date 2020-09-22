import { rgba2RGBA, hexa2HEXA, hsla2HSLA, Color } from './color'
import mix from './mix'

export default Color

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

export { mix }
