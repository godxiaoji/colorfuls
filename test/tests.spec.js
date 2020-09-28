/* global should, Colorfuls */

describe('Color', function() {
  describe('Conversion', function() {
    // hex rgb rgba
    it('HEX "#5CB1F8" should be RGB "rgb(92, 177, 248)"', function() {
      should.equal(Colorfuls.hex2Rgb('#5CB1F8'), 'rgb(92, 177, 248)')
    })
    it('HEX "#5CB1F8" should be HSLA "hsl(207, 92%, 67%)"', function() {
      should.equal(Colorfuls.hex2Hsl('#5CB1F8'), 'hsl(207, 92%, 67%)')
    })
    it('RGB "rgb(92, 177, 248)" should be HEX "#5CB1F8"', function() {
      should.equal(Colorfuls.rgb2Hex('rgb(92, 177, 248)'), '#5CB1F8')
    })
    it('RGB "rgb(92, 177, 248)" should be HSL "hsl(207, 92%, 67%)"', function() {
      should.equal(Colorfuls.rgb2Hsl('rgb(92, 177, 248)'), 'hsl(207, 92%, 67%)')
    })
    it('HSL "hsl(207, 92%, 67%)" should be RGB "rgb(93, 179, 248)"', function() {
      should.equal(Colorfuls.hsl2Rgb('hsl(207, 92%, 67%)'), 'rgb(93, 179, 248)')
    })
    it('HSL "hsl(207, 92%, 67%)" should be HEX "#5DB3F8"', function() {
      should.equal(Colorfuls.hsl2Hex('hsl(207, 92%, 67%)'), '#5DB3F8')
    })

    // rgba hexa hsla
    it('HEXA "#5CB1F8FF" should be RGBA "rgba(92, 177, 248, 1)"', function() {
      should.equal(Colorfuls.hexa2Rgba('#5CB1F8FF'), 'rgba(92, 177, 248, 1)')
    })
    it('HEXA "#5CB1F8FF" should be HSLA "hsla(207, 92%, 67%, 1)"', function() {
      should.equal(Colorfuls.hexa2Hsla('#5CB1F8FF'), 'hsla(207, 92%, 67%, 1)')
    })
    it('RGBA "rgba(92, 177, 248, 1)" should be HEXA "#5CB1F8FF"', function() {
      should.equal(Colorfuls.rgba2Hexa('rgba(92, 177, 248, 1)'), '#5CB1F8FF')
    })
    it('RGBA "rgba(92, 177, 248, 1)" should be HSLA "hsla(207, 92%, 67%, 1)"', function() {
      should.equal(Colorfuls.rgba2Hsla('rgba(92, 177, 248, 1)'), 'hsla(207, 92%, 67%, 1)')
    })
    it('HSLA "hsla(207, 92%, 67%, 1)" should be RGBA "rgba(93, 179, 248, 1)"', function() {
      should.equal(Colorfuls.hsla2Rgba('hsla(207, 92%, 67%, 1)'), 'rgba(93, 179, 248, 1)')
    })
    it('HSLA "hsla(207, 92%, 67%, 1)" should be HEXA "#5DB3F8FF"', function() {
      should.equal(Colorfuls.hsla2Hexa('hsla(207, 92%, 67%, 1)'), '#5DB3F8FF')
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
})
