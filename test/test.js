const assert = require('assert')
const { hexa2Rgba } = require('../dist/colorful')

describe('Color', () => {
  describe('Color Transform.', () => {
    it('HEXA "#5CB1F8" should be RGBA "rgba(92, 177, 248, 1)"', () => {
      assert.strictEqual(hexa2Rgba('#5CB1F8'), 'rgba(92, 177, 248, 1)')
    })

    it('HEXA "#5CB1F8" should be HSLA "hsla(207, 92%, 67%, 1)"', () => {
      assert.strictEqual(hexa2Rgba('#5CB1F8'), 'hsla(207, 92%, 67%, 1)')
    })
  })
})
