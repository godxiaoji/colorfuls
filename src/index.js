import { rgba2RGBA, hexa2HEXA, hsla2HSLA, Color } from './color'
import mix from './mix'
import gradient, { linearGradient } from './gradient'

const Colorful = function Colorful(...args) {
  return Color.apply(null, args)
}

Colorful.rgba2hexa = function rgba2hexa(rgba) {
  return rgba2RGBA(rgba).toHexa()
}

Colorful.rgba2hsla = function rgba2hsla(rgba) {
  return rgba2RGBA(rgba).toHsla()
}

Colorful.rgb2hex = function rgb2hex(rgb) {
  return rgba2RGBA(rgb).toHex()
}

Colorful.rgb2hsl = function rgb2hsl(rgb) {
  return rgba2RGBA(rgb).toHsl()
}

Colorful.hexa2Rgba = function hexa2Rgba(hexa) {
  return hexa2HEXA(hexa).toRgba()
}

Colorful.hexa2hsla = function hexa2hsla(hexa) {
  return hexa2HEXA(hexa).toHsla()
}

Colorful.hex2Rgb = function hex2Rgb(hex) {
  return hexa2HEXA(hex).toRgb()
}

Colorful.hex2hsl = function hex2hsl(hex) {
  return hexa2HEXA(hex).toHsl()
}

Colorful.hsla2Rgba = function hsla2Rgba(hsla) {
  return hsla2HSLA(hsla).toRgba()
}

Colorful.hsla2Hexa = function hsla2Hexa(hsla) {
  return hsla2HSLA(hsla).toHexa()
}

Colorful.hsl2Rgb = function hsl2Rgb(hsl) {
  return hsla2HSLA(hsl).toRgb()
}

Colorful.hsl2Hex = function hsl2Hex(hsl) {
  return hsla2HSLA(hsl).toHex()
}

Colorful.Color = Color
Colorful.mix = mix
Colorful.gradient = gradient
Colorful.linearGradient = linearGradient

export default Colorful
