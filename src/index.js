import { rgba2RGBA, hexa2HEXA, hsla2HSLA, Color } from './color'
import mix from './mix'
import gradient, { linearGradient } from './gradient'
import { invert, complement, isDark, isLight, grayscale } from './match'

const Colorful = function Colorful(...args) {
  return Color.apply(null, args)
}

Colorful.rgba2Hexa = function rgba2Hexa(rgba) {
  return rgba2RGBA(rgba).toHexa()
}

Colorful.rgba2Hsla = function rgba2Hsla(rgba) {
  return rgba2RGBA(rgba).toHsla()
}

Colorful.rgb2Hex = function rgb2Hex(rgb) {
  return rgba2RGBA(rgb).toHex()
}

Colorful.rgb2Hsl = function rgb2Hsl(rgb) {
  return rgba2RGBA(rgb).toHsl()
}

Colorful.hexa2Rgba = function hexa2Rgba(hexa) {
  return hexa2HEXA(hexa).toRgba()
}

Colorful.hexa2Hsla = function hexa2Hsla(hexa) {
  return hexa2HEXA(hexa).toHsla()
}

Colorful.hex2Rgb = function hex2Rgb(hex) {
  return hexa2HEXA(hex).toRgb()
}

Colorful.hex2Hsl = function hex2Hsl(hex) {
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

Colorful.invert = invert
Colorful.complement = complement
Colorful.isDark = isDark
Colorful.isLight = isLight
Colorful.grayscale = grayscale

export default Colorful
