/* eslint-disable*/

describe('Color', function () {
  // getter
  describe('Getter', function () {
    var color = Colorfuls('rgba(92, 177, 248, 0.5)')
    describe('rgba: "rgba(92, 177, 248, 0.5)" -> RGBA', function () {
      it('rgba.getRed() -> 92', function () {
        should.equal(color.getRed(), 92)
      })
      it('rgba.getGreen() -> 177', function () {
        should.equal(color.getGreen(), 177)
      })
      it('rgba.getBlue() -> 248', function () {
        should.equal(color.getBlue(), 248)
      })
      it('rgba.getAlpha() -> 0.5', function () {
        should.equal(color.getAlpha(), 0.5)
      })
      it('rgba.toArray() -> "92,177,248,0.5"', function () {
        should.equal(color.toArray().toString(), '92,177,248,0.5')
      })
      it('rgba.toRawArray() -> "0.3607843137254902,0.6941176470588235,0.9725490196078431,0.5"', function () {
        should.equal(color.toRawArray().toString(), '0.3607843137254902,0.6941176470588235,0.9725490196078431,0.5')
      })
    })

    var hslColor = Colorfuls('hsl(207deg, 92%, 67%)')
    describe('hsl: "hsl(207deg, 92%, 67%)" -> HSLA', function () {
      it('hsl.getHue() -> "207deg"', function () {
        should.equal(hslColor.getHue(), '207deg')
      })
      it('hsl.getSaturation() -> "92%"', function () {
        should.equal(hslColor.getSaturation(), '92%')
      })
      it('hsl.getLightness() -> "67%"', function () {
        should.equal(hslColor.getLightness(), '67%')
      })
      it('hsl.getAlpha() -> 1', function () {
        should.equal(hslColor.getAlpha(), 1)
      })
      it('hsl.toArray() -> "207deg,92%,67%,1"', function () {
        should.equal(hslColor.toArray().toString(), '207deg,92%,67%,1')
      })
      it('hsl.toRawArray() -> "0.575,0.92,0.67,1"', function () {
        should.equal(hslColor.toRawArray().toString(), '0.575,0.92,0.67,1')
      })
    })

    var hsvColor = Colorfuls({ h: 207, s: '63%', v: '97%' })
    describe('hsv: "207deg, 63%, 97%" -> HSVA', function () {
      it('hsv.getHue() -> "207deg"', function () {
        should.equal(hsvColor.getHue(), '207deg')
      })
      it('hsv.getSaturation() -> "63%"', function () {
        should.equal(hsvColor.getSaturation(), '63%')
      })
      it('hsv.getValue() -> "97%"', function () {
        should.equal(hsvColor.getValue(), '97%')
      })
      it('hsv.getAlpha() -> 1', function () {
        should.equal(hsvColor.getAlpha(), 1)
      })
      it('hsv.toArray() -> "207deg,63%,97%,1"', function () {
        should.equal(hsvColor.toArray().toString(), '207deg,63%,97%,1')
      })
      it('hsv.toRawArray() -> "0.575,0.63,0.97,1"', function () {
        should.equal(hsvColor.toRawArray().toString(), '0.575,0.63,0.97,1')
      })
    })
  })

  describe('Conversion', function () {
    // hex rgb hsl hsv
    it('HEX "#5CB1F8" should be RGB "rgb(92, 177, 248)"', function () {
      should.equal(Colorfuls('#5CB1F8').rgb().toRgb(), 'rgb(92, 177, 248)')
    })
    it('HEX "#5CB1F8" should be HSL "hsl(207deg, 92%, 67%)"', function () {
      should.equal(Colorfuls('#5CB1F8').hsl().toHsl(), 'hsl(207deg, 92%, 67%)')
    })
    it('HEX "#5CB1F8" should be HSV "207deg, 63%, 97%"', function () {
      should.equal(Colorfuls('#5CB1F8').hsv().toHsv(), '207deg, 63%, 97%')
    })
    it('HEX "#5CB1F8" should be CMYK "63%, 29%, 0%, 3%"', function () {
      should.equal(Colorfuls('#5CB1F8').cmyk().toCmyk(), '63%, 29%, 0%, 3%')
    })
    it('RGB "rgb(92, 177, 248)" should be HEX "#5CB1F8"', function () {
      should.equal(Colorfuls('rgb(92, 177, 248)').hex().toHex(), '#5CB1F8')
    })
    it('RGB "rgb(92, 177, 248)" should be HSL "hsl(207deg, 92%, 67%)"', function () {
      should.equal(Colorfuls('rgb(92, 177, 248)').hsl().toHsl(), 'hsl(207deg, 92%, 67%)')
    })
    it('RGB "rgb(92, 177, 248)" should be HSV "207deg, 63%, 97%"', function () {
      should.equal(Colorfuls('rgb(92, 177, 248)').hsv().toHsv(), '207deg, 63%, 97%')
    })
    it('RGB "rgb(92, 177, 248)" should be CMYK "63%, 29%, 0%, 3%"', function () {
      should.equal(Colorfuls('rgb(92, 177, 248)').cmyk().toCmyk(), '63%, 29%, 0%, 3%')
    })
    it('HSL "hsl(207deg, 92%, 67%)" should be RGB "rgb(93, 179, 248)"', function () {
      should.equal(Colorfuls('hsl(207deg, 92%, 67%)').rgb().toRgb(), 'rgb(93, 179, 248)')
    })
    it('HSL "hsl(207deg, 92%, 67%)" should be HEX "#5DB3F8"', function () {
      should.equal(Colorfuls('hsl(207deg, 92%, 67%)').hex().toHex(), '#5DB3F8')
    })
    it('HSL "hsl(207deg, 92%, 67%)" should be HSV "207deg, 62%, 97%"', function () {
      should.equal(Colorfuls('hsl(207deg, 92%, 67%)').hsv().toHsv(), '207deg, 62%, 97%')
    })
    it('HSL "hsl(207deg, 92%, 67%)" should be CMYK "62%, 28%, 0%, 3%"', function () {
      should.equal(Colorfuls('hsl(207deg, 92%, 67%)').cmyk().toCmyk(), '62%, 28%, 0%, 3%')
    })
    it('HSV "207deg, 63%, 97%" should be RGB "rgb(92, 177, 248)"', function () {
      should.equal(Colorfuls({ h: 207, s: '63%', v: '97%' }).rgb().toRgb(), 'rgb(92, 177, 247)')
    })
    it('HSV "207deg, 63%, 97%" should be HEX "#5CB1F8"', function () {
      should.equal(Colorfuls({ h: 207, s: '63%', v: '97%' }).hex().toHex(), '#5CB1F7')
    })
    it('HSV "207deg, 63%, 97%" should be HSL "hsl(207deg, 91%, 66%)"', function () {
      should.equal(Colorfuls({ h: 207, s: '63%', v: '97%' }).hsl().toHsl(), 'hsl(207deg, 91%, 66%)')
    })
    it('HSV "207deg, 63%, 97%" should be CMYK "63%, 28%, 0%, 3%"', function () {
      should.equal(Colorfuls({ h: 207, s: '63%', v: '97%' }).cmyk().toCmyk(), '63%, 28%, 0%, 3%')
    })
    it('CMYK "63%, 29%, 0%, 3%" should be HEX "#5CB0F7"', function () {
      should.equal(Colorfuls({ c: 0.63, m: 0.29, y: 0, k: 0.03 }).hex().toHex(), '#5CB0F7')
    })
    it('CMYK "63%, 29%, 0%, 3%" should be RGB "rgb(92, 177, 248)"', function () {
      should.equal(Colorfuls({ c: 0.63, m: 0.29, y: 0, k: 0.03 }).rgb().toRgb(), 'rgb(92, 176, 247)')
    })
    it('CMYK "63%, 29%, 0%, 3%" should be HSL "hsl(208deg, 91%, 66%)"', function () {
      should.equal(Colorfuls({ c: 0.63, m: 0.29, y: 0, k: 0.03 }).hsl().toHsl(), 'hsl(208deg, 91%, 66%)')
    })
    it('CMYK "63%, 29%, 0%, 3%" should be HSV "208deg, 63%, 97%"', function () {
      should.equal(Colorfuls({ c: 0.63, m: 0.29, y: 0, k: 0.03 }).hsv().toHsv(), '208deg, 63%, 97%')
    })

    // rgba hexa hsla
    it('HEXA "#5CB1F8FF" should be RGBA "rgba(92, 177, 248, 1)"', function () {
      should.equal(Colorfuls('#5CB1F8FF').rgb().toRgba(), 'rgba(92, 177, 248, 1)')
    })
    it('HEXA "#5CB1F8FF" should be HSLA "hsla(207deg, 92%, 67%, 1)"', function () {
      should.equal(Colorfuls('#5CB1F8FF').hsl().toHsla(), 'hsla(207deg, 92%, 67%, 1)')
    })
    it('RGBA "rgba(92, 177, 248, 1)" should be HEXA "#5CB1F8FF"', function () {
      should.equal(Colorfuls('rgba(92, 177, 248, 1)').hex().toHexa(), '#5CB1F8FF')
    })
    it('RGBA "rgba(92, 177, 248, 1)" should be HSLA "hsla(207deg, 92%, 67%, 1)"', function () {
      should.equal(Colorfuls('rgba(92, 177, 248, 1)').hsl().toHsla(), 'hsla(207deg, 92%, 67%, 1)')
    })
    it('HSLA "hsla(207deg, 92%, 67%, 1)" should be RGBA "rgba(93, 179, 248, 1)"', function () {
      should.equal(Colorfuls('hsla(207deg, 92%, 67%, 1)').rgb().toRgba(), 'rgba(93, 179, 248, 1)')
    })
    it('HSLA "hsla(207deg, 92%, 67%, 1)" should be HEXA "#5DB3F8FF"', function () {
      should.equal(Colorfuls('hsla(207deg, 92%, 67%, 1)').hex().toHexa(), '#5DB3F8FF')
    })
    it('HSVA "106deg, 96%, 82%, 0.55" should be RGBA "rgba(55, 209, 8, 0.55)"', function () {
      should.equal(Colorfuls({ h: 106, s: '96%', v: '82%', a: 0.55 }).rgb().toRgba(), 'rgba(55, 209, 8, 0.55)')
    })
    it('HSVA "106deg, 96%, 82%, 0.55" should be HEXA "#37D1088C"', function () {
      should.equal(Colorfuls({ h: 106, s: '96%', v: '82%', a: 0.55 }).hex().toHexa(), '#37D1088C')
    })
    it('HSVA "106deg, 96%, 82%, 0.55" should be HSLA "hsla(106deg, 92%, 43%, 0.55)"', function () {
      should.equal(Colorfuls({ h: 106, s: '96%', v: '82%', a: 0.55 }).hsl().toHsla(), 'hsla(106deg, 92%, 43%, 0.55)')
    })
  })

  describe('Manipulation', function () {
    it('grayscale(#5CBF54) -> #959595', function () {
      should.equal(Colorfuls.grayscale('#5CBF54').hex().toHex(), '#959595')
    })
    it('complement(#7FFFD4): #7FFFD4 -> #FF7FAA', function () {
      should.equal(Colorfuls.complement('#7FFFD4').hex().toHex(), '#FF7FAA')
    })
    it('invert(rgb(0, 100, 255)): -> rgb(255, 155, 0)', function () {
      should.equal(Colorfuls.invert('rgb(0, 100, 255)').rgb().toRgb(), 'rgb(255, 155, 0)')
    })
    it('isDark(rgb(102, 103, 171)): -> true', function () {
      should.equal(Colorfuls.isDark('rgb(102, 103, 171)'), true)
    })
    it('isLight(rgb(102, 103, 171)): -> false', function () {
      should.equal(Colorfuls.isLight('rgb(102, 103, 171)'), false)
    })
    it('isDark(rgb(226, 192, 191)): -> true', function () {
      should.equal(Colorfuls.isDark('rgb(226, 192, 191)'), false)
    })
    it('isLight(rgb(226, 192, 191)): -> false', function () {
      should.equal(Colorfuls.isLight('rgb(226, 192, 191)'), true)
    })

    // rgba
    it('rgba.fade(): rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)', function () {
      should.equal(Colorfuls.Color('rgba(10, 10, 10, 0.8)').fade(0.5).rgb().toRgba(), 'rgba(10, 10, 10, 0.4)')
    })
    it('rgba.opaque(): rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 1)', function () {
      should.equal(Colorfuls.Color('rgba(10, 10, 10, 0.8)').opaque(0.5).rgb().toRgba(), 'rgba(10, 10, 10, 1)')
    })

    // hsla
    it('hsla.rotate(180): hsl(60deg, 20%, 20%) -> hsl(240deg, 20%, 20%)', function () {
      should.equal(Colorfuls.Color('hsl(60deg, 20%, 20%)').rotate(180).hsl().toHsl(), 'hsl(240deg, 20%, 20%)')
    })
    it('hsla.rotate(-90): hsl(60deg, 20%, 20%) -> hsl(330deg, 20%, 20%)', function () {
      should.equal(Colorfuls.Color('hsl(60deg, 20%, 20%)').rotate(-90).hsl().toHsl(), 'hsl(330deg, 20%, 20%)')
    })
    it('hsla.saturate(0.5): hsl(100deg, 50%, 50%) -> hsl(100deg, 75%, 50%)', function () {
      should.equal(Colorfuls.Color('hsl(100deg, 50%, 50%)').saturate(0.5).hsl().toHsl(), 'hsl(100deg, 75%, 50%)')
    })
    it('hsla.desaturate(0.5): hsl(100deg, 50%, 50%) -> hsl(100deg, 25%, 50%)', function () {
      should.equal(Colorfuls.Color('hsl(100deg, 50%, 50%)').desaturate(0.5).hsl().toHsl(), 'hsl(100deg, 25%, 50%)')
    })
    it('hsla.lighten(0.5): hsl(100deg, 50%, 50%) -> hsl(100deg, 50%, 75%)', function () {
      should.equal(Colorfuls.Color('hsl(100deg, 50%, 50%)').lighten(0.5).hsl().toHsl(), 'hsl(100deg, 50%, 75%)')
    })
    it('hsla.darken(0.5): hsl(100deg, 50%, 50%) -> hsl(100deg, 50%, 25%)', function () {
      should.equal(Colorfuls.Color('hsl(100deg, 50%, 50%)').darken(0.5).hsl().toHsl(), 'hsl(100deg, 50%, 25%)')
    })
  })

  // mix
  describe('Mix', function () {
    it('mix(#f00, #00f) -> #800080', function () {
      should.equal(Colorfuls.mix('#f00', '#00f').hex().toHex(), '#800080')
    })
    it('mix(#f00, #00f, 25%) -> #3F00BF', function () {
      should.equal(Colorfuls.mix('#f00', '#00f', '25%').hex().toHex(), '#4000BF')
    })
    it('mix(rgba(255, 0, 0, 0.5), #00f) -> rgba(64, 0, 191, 0.75)', function () {
      should.equal(Colorfuls.mix('rgba(255, 0, 0, 0.5)', '#00f').rgb().toRgba(), 'rgba(64, 0, 191, 0.75)')
    })
  })

  // translate
  describe('Translate', function () {
    var translation = Colorfuls.translate('hsla(207deg, 92%, 67%, 0.55)')

    describe('translation: translate("hsla(207deg, 92%, 67%, 0.55)")', function () {
      it('translation.Flutter -> Color(0x8C5DB3F8)', function () {
        should.equal(translation.Flutter, 'Color(0x8C5DB3F8)')
      })
      it('translation.Java -> new Color(93, 179, 248, 140)', function () {
        should.equal(translation.Java, 'new Color(93, 179, 248, 140)')
      })
      it('translation.Android -> Color.argb(140, 93, 179, 248)', function () {
        should.equal(translation.Android, 'Color.argb(140, 93, 179, 248)')
      })
      it('translation[".Net"] -> Color.FromArgb(140, 93, 179, 248)', function () {
        should.equal(translation['.Net'], 'Color.FromArgb(140, 93, 179, 248)')
      })
      it('translation.OpenGL -> glColor4f(0.36f, 0.70f, 0.97f, 0.55f)', function () {
        should.equal(translation.OpenGL, 'glColor4f(0.36f, 0.70f, 0.97f, 0.55f)')
      })
      it('translation.Unity3D -> new Color(0.36f, 0.70f, 0.97f, 0.55f)', function () {
        should.equal(translation.Unity3D, 'new Color(0.36f, 0.70f, 0.97f, 0.55f)')
      })
      it('translation.Swift -> UIColor(red:0.36, green:0.70, blue:0.97, alpha:0.55)', function () {
        should.equal(translation.Swift, 'UIColor(red:0.36, green:0.70, blue:0.97, alpha:0.55)')
      })
    })
  })
})
