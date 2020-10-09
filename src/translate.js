import { Color } from './color'
import { big } from './util'

function decimal2Ratio(number) {
  return big(number).div(2.55).round().div(100).toFixed(2)
}

export function translate(color) {
  const rgba = Color(color).rgba()

  const { r, g, b } = rgba.toObject()
  const a = rgba._a.times(255).toFixed(0)
  const rR = decimal2Ratio(r)
  const rG = decimal2Ratio(g)
  const rB = decimal2Ratio(b)
  const rA = rgba._a.times(100).round().div(100).toFixed(2)
  const ahex = '#' + rgba.hexa().alphaHex() + rgba.toHex().substr(1)

  return {
    RGB: rgba.toArray().slice(0, 3).join(', '),
    RGBA: rgba.toArray().join(', '),
    HEXA: rgba.toHexa(),
    AHEX: ahex,
    HEX: rgba.toHex(),
    HSL: rgba.hsla().toArray().slice(0, 3).join(', '),
    HSLA: rgba.hsla().toArray().join(', '),
    HSV: rgba.toHsv(),
    HSB: rgba.toHsv(),
    WEB: {
      HEX: rgba.toHex(),
      HEXA: rgba.toHexa(),
      RGB: rgba.toRgb(),
      RGBA: rgba.toRgba(),
      HSL: rgba.toHsl(),
      HSLA: rgba.toHsla()
    },
    Java: `new Color(${r}, ${g}, ${b}, ${a})`,
    '.Net': `Color.FromArgb(${a}, ${r}, ${g}, ${b})`,
    Android: `Color.argb(${a}, ${r}, ${g}, ${b})`,
    Unity3D: `new Color(${rR}f, ${rG}f, ${rB}f, ${rA}f)`,
    OpenGL: `glColor4f(${rR}f, ${rG}f, ${rB}f, ${rA}f)`,
    Flutter: `Color(0x${ahex.substr(1)})`,
    Swift: `UIColor(red:${rR}, green:${rG}, blue:${rB}, alpha:${rA})`
  }
}
