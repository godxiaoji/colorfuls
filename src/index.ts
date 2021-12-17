import { Color, ColorOptions } from './color'
import { mix } from './mix'
import { invert, complement, isDark, isLight, grayscale } from './match'
import { translate } from './translate'

const Colorfuls = function Colorfuls(color: ColorOptions) {
  return Color(color)
}

Colorfuls.Color = Color

Colorfuls.mix = mix

Colorfuls.invert = invert
Colorfuls.complement = complement
Colorfuls.isDark = isDark
Colorfuls.isLight = isLight
Colorfuls.grayscale = grayscale

Colorfuls.translate = translate

// export { Color, translate, grayscale, invert, complement, isDark, isLight }

export default Colorfuls
