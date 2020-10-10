/* global should, Colorfuls */

describe('Color', function() {
  // getter
  describe('Getter', function() {
    var color = Colorfuls('rgba(92, 177, 248, 0.5)')
    describe('rgba: "rgba(92, 177, 248, 0.5)" -> RGBA', function() {
      it('rgba.red() -> 92', function() {
        should.equal(color.red(), 92)
      })
      it('rgba.green() -> 177', function() {
        should.equal(color.green(), 177)
      })
      it('rgba.blue() -> 248', function() {
        should.equal(color.blue(), 248)
      })
      it('rgba.alpha() -> 0.5', function() {
        should.equal(color.alpha(), 0.5)
      })
      it('rgba.toArray() -> "92,177,248,0.5"', function() {
        should.equal(color.toArray().toString(), '92,177,248,0.5')
      })
    })

    var hslColor = Colorfuls('hsl(207, 92%, 67%)')
    describe('hsl: "hsl(207, 92%, 67%)" -> HSLA', function() {
      it('hsl.hue() -> "207°"', function() {
        should.equal(hslColor.hue(), '207°')
      })
      it('hsl.saturation() -> "92%"', function() {
        should.equal(hslColor.saturation(), '92%')
      })
      it('hsl.lightness() -> "67%"', function() {
        should.equal(hslColor.lightness(), '67%')
      })
      it('hsl.alpha() -> 1', function() {
        should.equal(hslColor.alpha(), 1)
      })
      it('hsl.toArray() -> "207°,92%,67%,1"', function() {
        should.equal(hslColor.toArray().toString(), '207°,92%,67%,1')
      })
      it('hsl.toRawArray() -> "207,0.92,0.67,1"', function() {
        should.equal(hslColor.toRawArray().toString(), '207,0.92,0.67,1')
      })
    })

    var hsvColor = Colorfuls({ h: 207, s: '63%', v: '97%' })
    describe('hsv: "207°, 63%, 97%" -> HSVA', function() {
      it('hsv.hue() -> "207°"', function() {
        should.equal(hsvColor.hue(), '207°')
      })
      it('hsv.saturation() -> "63%"', function() {
        should.equal(hsvColor.saturation(), '63%')
      })
      it('hsv.value() -> "97%"', function() {
        should.equal(hsvColor.value(), '97%')
      })
      it('hsv.alpha() -> 1', function() {
        should.equal(hsvColor.alpha(), 1)
      })
      it('hsv.toArray() -> "207°,63%,97%,1"', function() {
        should.equal(hsvColor.toArray().toString(), '207°,63%,97%,1')
      })
      it('hsv.toRawArray() -> "207,0.63,0.97,1"', function() {
        should.equal(hsvColor.toRawArray().toString(), '207,0.63,0.97,1')
      })
    })
  })

  describe('Conversion', function() {
    // hex rgb hsl hsv
    it('HEX "#5CB1F8" should be RGB "rgb(92, 177, 248)"', function() {
      should.equal(Colorfuls('#5CB1F8').toRgb(), 'rgb(92, 177, 248)')
    })
    it('HEX "#5CB1F8" should be HSL "hsl(207, 92%, 67%)"', function() {
      should.equal(Colorfuls('#5CB1F8').toHsl(), 'hsl(207, 92%, 67%)')
    })
    it('HEX "#5CB1F8" should be HSV "207°, 63%, 97%"', function() {
      should.equal(Colorfuls('#5CB1F8').toHsv(), '207°, 63%, 97%')
    })
    it('HEX "#5CB1F8" should be CMYK "63%, 29%, 0%, 3%"', function() {
      should.equal(Colorfuls('#5CB1F8').toCmyk(), '63%, 29%, 0%, 3%')
    })
    it('RGB "rgb(92, 177, 248)" should be HEX "#5CB1F8"', function() {
      should.equal(Colorfuls('rgb(92, 177, 248)').toHex(), '#5CB1F8')
    })
    it('RGB "rgb(92, 177, 248)" should be HSL "hsl(207, 92%, 67%)"', function() {
      should.equal(Colorfuls('rgb(92, 177, 248)').toHsl(), 'hsl(207, 92%, 67%)')
    })
    it('RGB "rgb(92, 177, 248)" should be HSV "207°, 63%, 97%"', function() {
      should.equal(Colorfuls('rgb(92, 177, 248)').toHsv(), '207°, 63%, 97%')
    })
    it('RGB "rgb(92, 177, 248)" should be CMYK "63%, 29%, 0%, 3%"', function() {
      should.equal(Colorfuls('rgb(92, 177, 248)').toCmyk(), '63%, 29%, 0%, 3%')
    })
    it('HSL "hsl(207, 92%, 67%)" should be RGB "rgb(93, 179, 248)"', function() {
      should.equal(Colorfuls('hsl(207, 92%, 67%)').toRgb(), 'rgb(93, 179, 248)')
    })
    it('HSL "hsl(207, 92%, 67%)" should be HEX "#5DB3F8"', function() {
      should.equal(Colorfuls('hsl(207, 92%, 67%)').toHex(), '#5DB3F8')
    })
    it('HSL "hsl(207, 92%, 67%)" should be HSV "207°, 63%, 97%"', function() {
      should.equal(Colorfuls('hsl(207, 92%, 67%)').toHsv(), '207°, 63%, 97%')
    })
    it('HSL "hsl(207, 92%, 67%)" should be CMYK "63%, 28%, 0%, 3%"', function() {
      should.equal(Colorfuls('hsl(207, 92%, 67%)').toCmyk(), '63%, 28%, 0%, 3%')
    })
    it('HSV "207°, 63%, 97%" should be RGB "rgb(92, 177, 248)"', function() {
      should.equal(Colorfuls({ h: 207, s: '63%', v: '97%' }).toRgb(), 'rgb(92, 177, 247)')
    })
    it('HSV "207°, 63%, 97%" should be HEX "#5CB1F8"', function() {
      should.equal(Colorfuls({ h: 207, s: '63%', v: '97%' }).toHex(), '#5CB1F7')
    })
    it('HSV "207°, 63%, 97%" should be HSL "hsl(207, 91%, 66%)"', function() {
      should.equal(Colorfuls({ h: 207, s: '63%', v: '97%' }).toHsl(), 'hsl(207, 91%, 66%)')
    })
    it('HSV "207°, 63%, 97%" should be CMYK "63%, 28%, 0%, 3%"', function() {
      should.equal(Colorfuls({ h: 207, s: '63%', v: '97%' }).toCmyk(), '63%, 28%, 0%, 3%')
    })
    it('CMYK "67%, 0%, 100%, 0%" should be HEX "#5CB0F7"', function() {
      should.equal(Colorfuls({ c: 0.63, m: 0.29, y: 0, k: 0.03 }).toHex(), '#5CB0F7')
    })
    it('CMYK "67%, 0%, 100%, 0%" should be RGB "rgb(92, 177, 248)"', function() {
      should.equal(Colorfuls({ c: 0.63, m: 0.29, y: 0, k: 0.03 }).toRgb(), 'rgb(92, 176, 247)')
    })
    it('CMYK "67%, 0%, 100%, 0%" should be HSL "hsl(207, 91%, 66%)"', function() {
      should.equal(Colorfuls({ c: 0.63, m: 0.29, y: 0, k: 0.03 }).toHsl(), 'hsl(207, 91%, 66%)')
    })
    it('CMYK "67%, 0%, 100%, 0%" should be HSV "207°, 63%, 97%"', function() {
      should.equal(Colorfuls({ c: 0.63, m: 0.29, y: 0, k: 0.03 }).toHsv(), '207°, 63%, 97%')
    })

    // rgba hexa hsla
    it('HEXA "#5CB1F8FF" should be RGBA "rgba(92, 177, 248, 1)"', function() {
      should.equal(Colorfuls('#5CB1F8FF').toRgba(), 'rgba(92, 177, 248, 1)')
    })
    it('HEXA "#5CB1F8FF" should be HSLA "hsla(207, 92%, 67%, 1)"', function() {
      should.equal(Colorfuls('#5CB1F8FF').toHsla(), 'hsla(207, 92%, 67%, 1)')
    })
    it('RGBA "rgba(92, 177, 248, 1)" should be HEXA "#5CB1F8FF"', function() {
      should.equal(Colorfuls('rgba(92, 177, 248, 1)').toHexa(), '#5CB1F8FF')
    })
    it('RGBA "rgba(92, 177, 248, 1)" should be HSLA "hsla(207, 92%, 67%, 1)"', function() {
      should.equal(Colorfuls('rgba(92, 177, 248, 1)').toHsla(), 'hsla(207, 92%, 67%, 1)')
    })
    it('HSLA "hsla(207, 92%, 67%, 1)" should be RGBA "rgba(93, 179, 248, 1)"', function() {
      should.equal(Colorfuls('hsla(207, 92%, 67%, 1)').toRgba(), 'rgba(93, 179, 248, 1)')
    })
    it('HSLA "hsla(207, 92%, 67%, 1)" should be HEXA "#5DB3F8FF"', function() {
      should.equal(Colorfuls('hsla(207, 92%, 67%, 1)').toHexa(), '#5DB3F8FF')
    })
    it('HSVA "106°, 96%, 82%, 0.55" should be RGBA "rgba(55, 209, 8, 0.55)"', function() {
      should.equal(Colorfuls({ h: 106, s: '96%', v: '82%', a: 0.55 }).toRgba(), 'rgba(55, 209, 8, 0.55)')
    })
    it('HSVA "106°, 96%, 82%, 0.55" should be HEXA "#37D1088C"', function() {
      should.equal(Colorfuls({ h: 106, s: '96%', v: '82%', a: 0.55 }).toHexa(), '#37D1088C')
    })
    it('HSVA "106°, 96%, 82%, 0.55" should be HSLA "hsla(106, 92%, 43%, 0.55)"', function() {
      should.equal(Colorfuls({ h: 106, s: '96%', v: '82%', a: 0.55 }).toHsla(), 'hsla(106, 92%, 43%, 0.55)')
    })
  })

  describe('Manipulation', function() {
    it('grayscale(#5CBF54) -> #959595', function() {
      should.equal(Colorfuls.grayscale('#5CBF54').toHex(), '#959595')
    })
    it('complement(#7FFFD4): #7FFFD4 -> #FF7FAA', function() {
      should.equal(Colorfuls.complement('#7FFFD4').toHex(), '#FF7FAA')
    })
    it('invert(rgb(0, 100, 255)): -> rgb(255, 155, 0)', function() {
      should.equal(Colorfuls.invert('rgb(0, 100, 255)').toRgb(), 'rgb(255, 155, 0)')
    })
    it('isDark(rgb(255, 155, 0)): -> true', function() {
      should.equal(Colorfuls.isDark('rgb(255, 155, 0)'), false)
    })
    it('isLight(rgb(255, 155, 0)): -> false', function() {
      should.equal(Colorfuls.isLight('rgb(255, 155, 0)'), true)
    })

    // rgba
    it('rgba.fade(): rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)', function() {
      should.equal(Colorfuls.Color('rgba(10, 10, 10, 0.8)').fade(0.5).toRgba(), 'rgba(10, 10, 10, 0.4)')
    })
    it('rgba.opaque(): rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 1)', function() {
      should.equal(Colorfuls.Color('rgba(10, 10, 10, 0.8)').opaque(0.5).toRgba(), 'rgba(10, 10, 10, 1)')
    })

    // hsla
    it('hsla.rotate(180): hsl(60, 20%, 20%) -> hsl(240, 20%, 20%)', function() {
      should.equal(Colorfuls.Color('hsl(60, 20%, 20%)').rotate(180).toHsl(), 'hsl(240, 20%, 20%)')
    })
    it('hsla.rotate(-90): hsl(60, 20%, 20%) -> hsl(330, 20%, 20%)', function() {
      should.equal(Colorfuls.Color('hsl(60, 20%, 20%)').rotate(-90).toHsl(), 'hsl(330, 20%, 20%)')
    })
    it('hsla.saturate(0.5): hsl(100, 50%, 50%) -> hsl(100, 75%, 50%)', function() {
      should.equal(Colorfuls.Color('hsl(100, 50%, 50%)').saturate(0.5).toHsl(), 'hsl(100, 75%, 50%)')
    })
    it('hsla.desaturate(0.5): hsl(100, 50%, 50%) -> hsl(100, 25%, 50%)', function() {
      should.equal(Colorfuls.Color('hsl(100, 50%, 50%)').desaturate(0.5).toHsl(), 'hsl(100, 25%, 50%)')
    })
    it('hsla.lighten(0.5): hsl(100, 50%, 50%) -> hsl(100, 50%, 75%)', function() {
      should.equal(Colorfuls.Color('hsl(100, 50%, 50%)').lighten(0.5).toHsl(), 'hsl(100, 50%, 75%)')
    })
    it('hsla.darken(0.5): hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)', function() {
      should.equal(Colorfuls.Color('hsl(100, 50%, 50%)').darken(0.5).toHsl(), 'hsl(100, 50%, 25%)')
    })
  })

  // mix
  describe('Mix', function() {
    it('mix(#f00, #00f) -> #800080', function() {
      should.equal(Colorfuls.mix('#f00', '#00f').toHex(), '#800080')
    })
    it('mix(#f00, #00f, 25%) -> #3F00BF', function() {
      should.equal(Colorfuls.mix('#f00', '#00f', '25%').toHex(), '#4000BF')
    })
    it('mix(rgba(255, 0, 0, 0.5), #00f) -> rgba(64, 0, 191, 0.75)', function() {
      should.equal(Colorfuls.mix('rgba(255, 0, 0, 0.5)', '#00f').toRgba(), 'rgba(64, 0, 191, 0.75)')
    })
  })

  // gradient
  describe('Gradient', function() {
    it('gradient(#000, #fff).step(0.5) -> #808080', function() {
      should.equal(Colorfuls.gradient('#000', '#fff').step(0.5).toHex(), '#808080')
    })
    it('gradient(#000, #fff).steps(3) -> #000000, #808080, #FFFFFF', function() {
      should.equal(Colorfuls.gradient('#000', '#fff').steps(3).toHexs().join(', '), '#000000, #808080, #FFFFFF')
    })
    it('linearGradient(#000, #fff, #000).steps(3) -> #000000, #FFFFFF, #000000', function() {
      should.equal(
        Colorfuls.linearGradient('#000', '#fff', '#000').steps(3).toHexs().join(', '),
        '#000000, #FFFFFF, #000000'
      )
    })
    it('linearGradient(#000, #fff, #000).steps(5) -> #000000, #808080, #FFFFFF, #808080, #000000', function() {
      should.equal(
        Colorfuls.linearGradient('#000', '#fff', '#000').steps(5).toHexs().join(', '),
        '#000000, #808080, #FFFFFF, #808080, #000000'
      )
    })
    it('linearGradient(#000, #111, #222, #333, [#444, 0.4], #fff).steps(11) -> #000000, #111111, #222222, #333333, #444444, #636363, #828282, #A2A2A2, #C1C1C1, #E0E0E0, #FFFFFF', function() {
      should.equal(
        Colorfuls.linearGradient('#000', '#111', '#222', '#333', ['#444', '40%'], '#fff').steps(11).toHexs().join(', '),
        '#000000, #111111, #222222, #333333, #444444, #636363, #828282, #A2A2A2, #C1C1C1, #E0E0E0, #FFFFFF'
      )
    })
    it('linearGradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1)).steps(5) -> rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)', function() {
      should.equal(
        Colorfuls.linearGradient(
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0.6)',
          'rgba(0, 0, 0, 0.8)',
          'rgba(0, 0, 0, 1)'
        )
          .steps(5)
          .toRgbas()
          .join(', '),
        'rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)'
      )
    })
  })

  // translate
  describe('Translate', function() {
    const translation = Colorfuls.translate('hsl(207, 92%, 67%, 0.55)')

    describe('translation: translate("hsl(207, 92%, 67%, 0.55)")', function() {
      it('translation.Flutter -> Color(0x8C5DB3F8)', function() {
        should.equal(translation.Flutter, 'Color(0x8C5DB3F8)')
      })
      it('translation.Java -> new Color(93, 179, 248, 140)', function() {
        should.equal(translation.Java, 'new Color(93, 179, 248, 140)')
      })
      it('translation.Android -> Color.argb(140, 93, 179, 248)', function() {
        should.equal(translation.Android, 'Color.argb(140, 93, 179, 248)')
      })
      it('translation[".Net"] -> Color.FromArgb(140, 93, 179, 248)', function() {
        should.equal(translation['.Net'], 'Color.FromArgb(140, 93, 179, 248)')
      })
      it('translation.OpenGL -> glColor4f(0.36f, 0.70f, 0.97f, 0.55f)', function() {
        should.equal(translation.OpenGL, 'glColor4f(0.36f, 0.70f, 0.97f, 0.55f)')
      })
      it('translation.Unity3D -> new Color(0.36f, 0.70f, 0.97f, 0.55f)', function() {
        should.equal(translation.Unity3D, 'new Color(0.36f, 0.70f, 0.97f, 0.55f)')
      })
      it('translation.Swift -> UIColor(red:0.36, green:0.70, blue:0.97, alpha:0.55)', function() {
        should.equal(translation.Swift, 'UIColor(red:0.36, green:0.70, blue:0.97, alpha:0.55)')
      })
    })
  })
})
