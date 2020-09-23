# colorfuls

A small Javascript library for color conversion and manipulation. Also provides color mixin and gradient.

## Install

### CDN

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/colorfuls@0.0.1/dist/colorful.js"></script>
<script>
    const color = Colorfuls('#000000')
</script>
```

### NPM

```
$ npm install colorfuls
```

## Usage

```
import {Color, gradient, mix, linearGradient} from 'colorfuls'
```

### Constructors

Support rgb/rgba, hex/hexa and hsl/hsla.

```
const color = Color('rgba(255, 255, 255, 0.5)')           // -> new RGBA
const color = Color({r: 255, g: 255, b: 255})             // -> new RGBA
const color = Color('#5CB1F8')                            // -> new HEXA
const color = Color('#fff')                               // -> new HEXA
const color = Color('hsl(207, 92%, 67%)')                 // -> new HSLA
const color = Color({h: 207, s: '92%', l: '67%', a: 0.5}) // -> new HSLA
const cloneColor = Color(color)                           // -> clone
```

### Conversion

```
const rgbaColor = Color('rgba(255, 255, 255, 0.5)')       // -> new RGBA
const hslaColor = rgbaColor.hsla()                        // -> new HSLA
const hexaColor = hslaColor.hexa()                        // -> new HEXA
```

### getters

```
const color = Color('rgba(255, 255, 255, 0.5)') // -> new RGBA

color.toRgb()        // rgb(255, 255, 255)
color.toRgba()       // rgba(255, 255, 255, 0.5)
color.toHex()        // #FFFFFF
color.toRgba()       // #FFFFFF80
color.toHsl()        // hsl(0, 0%, 100%)
color.toHsla()       // hsla(0, 0%, 100%, 0.5)

// RGBA
color.red()          // 255
color.green()        // 255
color.blue()         // 255
color.alpha()        // 0.5
color.toArray()      // [255, 255, 255, 0.5]

// HSLA
color = color.hsla() // -> new HSLA
color.hue()          // 0
color.saturation()   // 0%
color.lightness()    // 100%
color.alpha()        // 0.5
color.toArray()      // [0, '0%', '100%', 0.5]

```

### Manipulation

#### RGBA

```
const color = Color('rgba(255, 255, 255, 0.5)')

color
  .red(128)
  .green(0)
  .blue(128)
  .alpha(0.8)         // rgba(255, 255, 255, 0.5) -> rgba(128, 0, 128, 0.8)
color.fadeOut(0.5)    // rgba(128, 0, 128, 0.8) -> rgba(128, 0, 128, 0.4)
color.fadeIn(0.5)     // rgba(128, 0, 128, 0.4) -> rgba(128, 0, 128, 0.6)
```

#### HSLA

```
const color = Color('hsl(207, 92%, 67%)')

color
  .hue(60)
  .saturation('50%')
  .lightness('50%')
  .alpha(0.8)          // hsla(207, 92%, 67%, 1) -> hsla(60, 50%, 50%, 0.8)
color.rotate(180)      // hsla(60, 50%, 50%, 0.8) -> hsla(240, 50%, 50%, 0.8)
color.rotate(-300)     // hsla(240, 50%, 50%, 0.8) -> hsla(300, 50%, 50%, 0.8)
color.saturate(0.5)    // hsla(300, 50%, 50%, 0.8) -> hsla(300, 75%, 50%, 0.8)
color.desaturate(0.5)  // hsla(300, 75%, 50%, 0.8) -> hsla(300, 38%, 50%, 0.8)
color.lighten(0.5)     // hsla(300, 38%, 50%, 0.8) -> hsla(300, 38%, 75%, 0.8)
color.darken(0.5)      // hsla(300, 38%, 75%, 0.8) -> hsla(300, 38%, 38%, 0.8)
```

#### Common

```
const color = Color('rgb(0, 100, 255)')

color.invert()         // rgb(0, 100, 255) -> rgb(255, 155, 0)
color.complement()     // rgb(255, 155, 0) -> rgb(255, 155, 0)
color.isLight()        // -> true
color.isDark()         // -> false
color.grayscale()      // rgb(255, 155, 0) -> rgb(166, 166, 166)
```

### mix

The function mix is the same as [sass mix](https://sass-lang.com/documentation/values/colors).

#### mix(color1, color2[, weight])

- @params {String|RGBA|HEXA|HSLA} `color1`
- @params {String|RGBA|HEXA|HSLA} `color2`
- @params {String|Number} `weight` Percentage Like(0-1/0%-100%) default: 0.5
- @returns RGBA

```
mix('#f00', '#00f').toHex()                   // -> #800080
mix('#f00', '#00f', '25%').toHex()            // -> #4000BF
mix('rgba(255, 0, 0, 0.5)', '#00f').toRgba()  // -> rgba(64, 0, 191, 0.75)
```

### gradient

#### linearGradient(color1, color2, ...)

- @params {String|RGBA|HEXA|HSLA} `color1`
- @returns Gradient

```
const lg = linearGradient('#000', '#fff')
```

##### Gradient.prototype.step(value)

- @params {String|Number} `value` Percentage Like(0-1/0%-100%)
- @returns RGBA

```
lg.step(0.5).toHex()                         // -> #808080
```

##### Gradient.prototype.steps(length)

- @params {Number} `length` the length number of step
- @returns GradientSteps

```
const gs = lg.steps(5)                       // -> new GradientSteps
gs.toHexs()                                  // -> ["#000000", "#404040", "#808080", "#BFBFBF", "#FFFFFF"]
gs.toRgbs()                                  // -> ["rgb(0, 0, 0)", "rgb(64, 64, 64)", "rgb(128, 128, 128)", "rgb(191, 191, 191)", "rgb(255, 255, 255)"]
gs.toHsls()                                  // -> ["hsl(0, 0%, 0%)", "hsl(0, 0%, 25%)", "hsl(0, 0%, 50%)", "hsl(0, 0%, 75%)", "hsl(0, 0%, 100%)"]
gs[0].toHex()                                // -> #000000
```

## Author

[Travis](https://github.com/godxiaoji)
