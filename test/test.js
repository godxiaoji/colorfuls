const assert = require('assert')
const {
  Color,
  hexa2Rgba,
  hexa2hsla,
  rgba2hsla,
  rgba2hexa,
  hsla2Rgba,
  hsla2Hexa,
  hex2Rgb,
  hex2hsl,
  rgb2hex,
  rgb2hsl,
  hsl2Rgb,
  hsl2Hex,
  mix,
  gradient,
  linearGradient
} = require('../dist/colorfuls')

describe('Color', () => {
  describe('Conversion', () => {
    // hex rgb rgba
    it('HEX "#5CB1F8" should be RGB "rgb(92, 177, 248)"', () => {
      assert.strictEqual(hex2Rgb('#5CB1F8'), 'rgb(92, 177, 248)')
    })
    it('HEX "#5CB1F8" should be HSLA "hsl(207, 92%, 67%)"', () => {
      assert.strictEqual(hex2hsl('#5CB1F8'), 'hsl(207, 92%, 67%)')
    })
    it('RGB "rgb(92, 177, 248)" should be HEX "#5CB1F8"', () => {
      assert.strictEqual(rgb2hex('rgb(92, 177, 248)'), '#5CB1F8')
    })
    it('RGB "rgb(92, 177, 248)" should be HSL "hsl(207, 92%, 67%)"', () => {
      assert.strictEqual(rgb2hsl('rgb(92, 177, 248)'), 'hsl(207, 92%, 67%)')
    })
    it('HSL "hsl(207, 92%, 67%)" should be RGB "rgb(93, 179, 248)"', () => {
      assert.strictEqual(hsl2Rgb('hsl(207, 92%, 67%)'), 'rgb(93, 179, 248)')
    })
    it('HSL "hsl(207, 92%, 67%)" should be HEX "#5DB3F8"', () => {
      assert.strictEqual(hsl2Hex('hsl(207, 92%, 67%)'), '#5DB3F8')
    })

    // rgba hexa hsla
    it('HEXA "#5CB1F8FF" should be RGBA "rgba(92, 177, 248, 1)"', () => {
      assert.strictEqual(hexa2Rgba('#5CB1F8FF'), 'rgba(92, 177, 248, 1)')
    })
    it('HEXA "#5CB1F8FF" should be HSLA "hsla(207, 92%, 67%, 1)"', () => {
      assert.strictEqual(hexa2hsla('#5CB1F8FF'), 'hsla(207, 92%, 67%, 1)')
    })
    it('RGBA "rgba(92, 177, 248, 1)" should be HEXA "#5CB1F8FF"', () => {
      assert.strictEqual(rgba2hexa('rgba(92, 177, 248, 1)'), '#5CB1F8FF')
    })
    it('RGBA "rgba(92, 177, 248, 1)" should be HSLA "hsla(207, 92%, 67%, 1)"', () => {
      assert.strictEqual(
        rgba2hsla('rgba(92, 177, 248, 1)'),
        'hsla(207, 92%, 67%, 1)'
      )
    })
    it('HSLA "hsla(207, 92%, 67%, 1)" should be RGBA "rgba(93, 179, 248, 1)"', () => {
      assert.strictEqual(
        hsla2Rgba('hsla(207, 92%, 67%, 1)'),
        'rgba(93, 179, 248, 1)'
      )
    })
    it('HSLA "hsla(207, 92%, 67%, 1)" should be HEXA "#5DB3F8FF"', () => {
      assert.strictEqual(hsla2Hexa('hsla(207, 92%, 67%, 1)'), '#5DB3F8FF')
    })
  })

  describe('Manipulation', () => {
    // rgba
    it('rgba.invert(): rgb(0, 100, 255) -> rgb(255, 155, 0)', () => {
      assert.strictEqual(
        Color('rgb(0, 100, 255)').invert().toRgb(),
        'rgb(255, 155, 0)'
      )
    })
    it('rgba.fade(): rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)', () => {
      assert.strictEqual(
        Color('rgba(10, 10, 10, 0.8)').fade(0.5).toRgba(),
        'rgba(10, 10, 10, 0.4)'
      )
    })
    it('rgba.opaque(): rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 1)', () => {
      assert.strictEqual(
        Color('rgba(10, 10, 10, 0.8)').opaque(0.5).toRgba(),
        'rgba(10, 10, 10, 1)'
      )
    })

    // hexa
    it('hexa.grayscale(): #5CBF54 -> #959595', () => {
      assert.strictEqual(Color('#5CBF54').grayscale().toHex(), '#959595')
    })
    it('hexa.complement(): #7FFFD4 -> #FF7FAA', () => {
      assert.strictEqual(Color('#7FFFD4').complement().toHex(), '#FF7FAA')
    })

    // hsla

    it('hsla.rotate(180): hsl(60, 20%, 20%) -> hsl(240, 20%, 20%)', () => {
      assert.strictEqual(
        Color('hsl(60, 20%, 20%)').rotate(180).toHsl(),
        'hsl(240, 20%, 20%)'
      )
    })
    it('hsla.rotate(-90): hsl(60, 20%, 20%) -> hsl(330, 20%, 20%)', () => {
      assert.strictEqual(
        Color('hsl(60, 20%, 20%)').rotate(-90).toHsl(),
        'hsl(330, 20%, 20%)'
      )
    })
    it('hsla.saturate(0.5): hsl(100, 50%, 50%) -> hsl(100, 75%, 50%)', () => {
      assert.strictEqual(
        Color('hsl(100, 50%, 50%)').saturate(0.5).toHsl(),
        'hsl(100, 75%, 50%)'
      )
    })
    it('hsla.desaturate(0.5): hsl(100, 50%, 50%) -> hsl(100, 25%, 50%)', () => {
      assert.strictEqual(
        Color('hsl(100, 50%, 50%)').desaturate(0.5).toHsl(),
        'hsl(100, 25%, 50%)'
      )
    })
    it('hsla.lighten(0.5): hsl(100, 50%, 50%) -> hsl(100, 50%, 75%)', () => {
      assert.strictEqual(
        Color('hsl(100, 50%, 50%)').lighten(0.5).toHsl(),
        'hsl(100, 50%, 75%)'
      )
    })
    it('hsla.darken(0.5): hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)', () => {
      assert.strictEqual(
        Color('hsl(100, 50%, 50%)').darken(0.5).toHsl(),
        'hsl(100, 50%, 25%)'
      )
    })
  })

  // mix
  describe('Mix', () => {
    it(`mix(#f00, #00f) -> #800080`, () => {
      assert.strictEqual(mix('#f00', '#00f').toHex(), '#800080')
    })
    it(`mix(#f00, #00f, 25%) -> #3F00BF`, () => {
      assert.strictEqual(mix('#f00', '#00f', '25%').toHex(), '#4000BF')
    })
    it(`mix(rgba(255, 0, 0, 0.5), #00f) -> rgba(64, 0, 191, 0.75)`, () => {
      assert.strictEqual(
        mix('rgba(255, 0, 0, 0.5)', '#00f').toRgba(),
        'rgba(64, 0, 191, 0.75)'
      )
    })
  })

  // gradient
  describe('Gradient', () => {
    it(`gradient(#000, #fff).step(0.5) -> #808080`, () => {
      assert.strictEqual(gradient('#000', '#fff').step(0.5).toHex(), '#808080')
    })
    it(`gradient(#000, #fff).steps(3) -> #000000, #808080, #FFFFFF`, () => {
      assert.strictEqual(
        gradient('#000', '#fff').steps(3).toHexs().join(', '),
        '#000000, #808080, #FFFFFF'
      )
    })
    it(`linearGradient(#000, #fff, #000).steps(3) -> #000000, #FFFFFF, #000000`, () => {
      assert.strictEqual(
        linearGradient('#000', '#fff', '#000').steps(3).toHexs().join(', '),
        '#000000, #FFFFFF, #000000'
      )
    })
    it(`linearGradient(#000, #fff, #000).steps(5) -> #000000, #808080, #FFFFFF, #808080, #000000`, () => {
      assert.strictEqual(
        linearGradient('#000', '#fff', '#000').steps(5).toHexs().join(', '),
        '#000000, #808080, #FFFFFF, #808080, #000000'
      )
    })
    it(`linearGradient(#000, #111, #222, #333, [#444, 0.4], #fff).steps(11) -> #000000, #111111, #222222, #333333, #444444, #636363, #828282, #A2A2A2, #C1C1C1, #E0E0E0, #FFFFFF`, () => {
      assert.strictEqual(
        linearGradient('#000', '#111', '#222', '#333', ['#444', '40%'], '#fff')
          .steps(11)
          .toHexs()
          .join(', '),
        '#000000, #111111, #222222, #333333, #444444, #636363, #828282, #A2A2A2, #C1C1C1, #E0E0E0, #FFFFFF'
      )
    })
    it(`linearGradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1)).steps(5) -> rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)`, () => {
      assert.strictEqual(
        linearGradient(
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
