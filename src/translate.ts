import { Color, ColorOptions } from './color'

function decimal2Ratio(number: number) {
  return (Math.round(number / 2.55) / 100).toFixed(2)
}

export function translate(color: ColorOptions) {
  const rgba = Color(color).rgb()

  const { r, g, b } = rgba.toObject()
  const a = (rgba._a * 255).toFixed(0)
  const rR = decimal2Ratio(r)
  const rG = decimal2Ratio(g)
  const rB = decimal2Ratio(b)
  const rA = rgba._a.toFixed(2)
  const ahex = '#' + rgba.hex().getAlphaHex() + rgba.hex().toHex().substr(1)

  return {
    RGB: rgba.toArray().slice(0, 3).join(', '),
    RGBA: rgba.toArray().join(', '),
    HEXA: rgba.hex().toHexa(),
    AHEX: ahex,
    HEX: rgba.hex().toHex(),
    HSL: rgba.hsl().toArray().slice(0, 3).join(', '),
    HSLA: rgba.hsl().toArray().join(', '),
    HSV: rgba.hsv().toHsv(),
    HSB: rgba.hsv().toHsv(),
    CMYK: rgba.cmyk().toCmyk(),
    WEB: {
      HEX: rgba.hex().toHex(),
      HEXA: rgba.hex().toHexa(),
      RGB: rgba.toRgb(),
      RGBA: rgba.toRgba(),
      HSL: rgba.hsl().toHsl(),
      HSLA: rgba.hsl().toHsla()
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
