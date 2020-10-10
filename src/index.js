import { Color, hexa2HEXA, hsla2HSLA, hsva2HSVA, rgba2RGBA, cmyk2CMYK } from './color'
import mix from './mix'
import gradient, { linearGradient } from './gradient'
import { invert, complement, isDark, isLight, grayscale } from './match'
import { translate } from './translate'

const Colorfuls = function Colorfuls(...args) {
  return Color.apply(null, args)
}

Colorfuls.Color = Color
Colorfuls.hexa2HEXA = hexa2HEXA
Colorfuls.hsla2HSLA = hsla2HSLA
Colorfuls.hsva2HSVA = hsva2HSVA
Colorfuls.rgba2RGBA = rgba2RGBA
Colorfuls.cmyk2CMYK = cmyk2CMYK

Colorfuls.mix = mix
Colorfuls.gradient = gradient
Colorfuls.linearGradient = linearGradient

Colorfuls.invert = invert
Colorfuls.complement = complement
Colorfuls.isDark = isDark
Colorfuls.isLight = isLight
Colorfuls.grayscale = grayscale

Colorfuls.translate = translate

export default Colorfuls
