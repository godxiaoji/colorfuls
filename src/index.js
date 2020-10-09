import { Color } from './color'
import mix from './mix'
import gradient, { linearGradient } from './gradient'
import { invert, complement, isDark, isLight, grayscale } from './match'

const Colorful = function Colorful(...args) {
  return Color.apply(null, args)
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
