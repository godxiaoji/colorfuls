# colorfuls

<p align="center"><img width="240" src="https://raw.githubusercontent.com/godxiaoji/colorfuls/master/logo.png" alt="colorfuls"></p>

A small Javascript library for color conversion and manipulation. Also provides color mixin and gradient.

## Install

### CDN

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/colorfuls/lib/index.js"></script>
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
import Color from 'colorfuls'
```

### Constructors

Support rgb/rgba, hex/hexa, cmyk, hsl/hsla and hsv/hsva.

`Color(options: ColorOptions)`

```
const color = Color('rgba(255, 255, 255, 0.5)')             // -> new RGBColor
const color = Color({ r: 255, g: 255, b: 255 })             // -> new RGBColor
const color = Color('#5CB1F8')                              // -> new HEXColor
const color = Color('#fff')                                 // -> new HEXColor
const color = Color('hsl(207deg, 92%, 67%)')                // -> new HSLColor
const color = Color({ h: 207, s: '92%', l: '67%', a: 0.5 }) // -> new HSLColor
const color = Color({ h: 106, s: '96%', v: '82%', a: 0.5 }) // -> new HSVColor
const color = Color({ c: 0.63, m: 0.29, y: 0, k: 0.03 })    // -> new CMYKColor
const cloneColor = Color(color)                             // -> clone
```

### Conversion

```
const rgbColor = Color('rgba(255, 255, 255, 0.5)')         // -> new RGBColor
const hslColor = rgbColor.hsl()                            // -> new HSLColor
const hexColor = hslColor.hex()                           // -> new HEXColor
const hsvaColor = hslColor.hsv()                           // -> new HSVColor
const cmykColor = hslColor.cmyk()                          // -> new CMYKColor
```

### getters

```
const color = Color('rgba(255, 255, 255, 0.5)')            // -> new RGBColor

color.rgb().toRgb()            // rgb(255, 255, 255)
color.rgb().toRgba()           // rgba(255, 255, 255, 0.5)
color.hex().toHex()            // #FFFFFF
color.hex().toHexa()           // #FFFFFF80
color.hsl().toHsl()            // hsl(0deg, 0%, 100%)
color.hsl().toHsla()           // hsla(0deg, 0%, 100%, 0.5)
color.hsv().toHsv()            // 0deg, 0%, 100%
color.hsv().toHsva()           // 0deg, 0%, 100%, 0.5
color.cmyk().toCmyk()          // 0%, 0%, 0%, 0%
```

#### RGBColor

```
const rgbColor = Color('rgba(92, 177, 248, 1)')            // -> new RGBColor
rgbColor.getRed()           // 92
rgbColor.getGreen()         // 177
rgbColor.getBlue()          // 248
rgbColor.getAlpha()         // 1
rgbColor.toArray()          // [92, 177, 248, 1]
rgbColor.toObject()         // { r: 92, g: 177, b: 248, a: 1}
```

#### HEXColor

```
const hexColor = Color('#FFFFFF80')                        // -> new HEXColor
hexColor.getAlpha()         // 0.5
hexColor.toArray()          // ['FF', 'FF', 'FF', '80']
hexColor.toObject()         // {hex: '#FFFFFF', hexa: 'FFFFFF80', alpha: 0.5}
```

#### HSLColor

```
const hslColor = Color('hsla(207deg, 92%, 67%, 1)')        // -> new HSLColor
hslColor.getHue()           // 207deg
hslColor.getSaturation()    // 92%
hslColor.getLightness()     // 67%
hslColor.getAlpha()         // 1
hslColor.toArray()          // ['207deg', '92%', '67%', 1]
hslColor.toObject()         // { h: '207deg', s: '92%', l: '67%', a: 1 }
hslColor.toRawArray()       // [0.575, 0.92, 0.67, 1]
hslColor.toRawObject()      // { h: 0.575, s: 0.92, l: 0.67, a: 1 }
```

#### HSVColor

```
const hsvaColor = Color('hsva(207, 92%, 67%, 1)')  // -> new HSVColor
hsvaColor.getHue()           // 207deg
hsvaColor.getSaturation()    // 92%
hsvaColor.getValue()         // 67%
hsvaColor.getAlpha()         // 1
hsvaColor.toArray()          // ['207deg', '92%', '67%', 1]
hsvaColor.toObject()         // { h: '207deg', s: '92%', l: '67%', a: 1 }
hsvaColor.toRawArray()       // [0.575, 0.92, 0.67, 1]
hsvaColor.toRawObject()      // { h: 0.575, s: 0.92, l: 0.67, a: 1 }
```

#### CMYKColor

```
const cmykColor = Color({ c: 0.63, m: 0.29, y: 0, k: 0.03 } // -> new CMYKColor
cmykColor.getCyan()          // 63%
cmykColor.getMagenta()       // 29%
cmykColor.getYellow()        // 0%
cmykColor.getBlack()         // 3%
cmykColor.toArray()          // ['63%', '29%', '0%', '3%']
cmykColor.toObject()         // { c: '63%', m: '29%', y: '0%', k: '3%' }
cmykColor.toRawArray()       // [0.63, 0.29, 0, 0.03]
cmykColor.toRawObject()      // { c: 0.63, m: 0.29, y: 0, k: 0.03 }

```

### Manipulation

#### RGBColor

```
const color = Color('rgba(255, 255, 255, 0.5)')

color
  .setRed(128)
  .setGreen(0)
  .setBlue(128)
  .setAlpha(0.8)      // rgba(255, 255, 255, 0.5) -> rgba(128, 0, 128, 0.8)
color.fadeOut(0.5)    // rgba(128, 0, 128, 0.8)   -> rgba(128, 0, 128, 0.4)
color.fadeIn(0.5)     // rgba(128, 0, 128, 0.4)   -> rgba(128, 0, 128, 0.6)
```

#### HSLColor

```
const color = Color('hsl(207deg, 92%, 67%)')

color
  .setHue(60)
  .setSaturation('50%')
  .setLightness('50%')
  .setAlpha(0.8)       // hsla(207deg, 92%, 67%, 1)   -> hsla(60deg, 50%, 50%, 0.8)
color.rotate(180)      // hsla(60deg, 50%, 50%, 0.8)  -> hsla(240deg, 50%, 50%, 0.8)
color.rotate(-300)     // hsla(240deg, 50%, 50%, 0.8) -> hsla(300deg, 50%, 50%, 0.8)
color.saturate(0.5)    // hsla(300deg, 50%, 50%, 0.8) -> hsla(300deg, 75%, 50%, 0.8)
color.desaturate(0.5)  // hsla(300deg, 75%, 50%, 0.8) -> hsla(300deg, 38%, 50%, 0.8)
color.lighten(0.5)     // hsla(300deg, 38%, 50%, 0.8) -> hsla(300deg, 38%, 75%, 0.8)
color.darken(0.5)      // hsla(300deg, 38%, 75%, 0.8) -> hsla(300deg, 38%, 38%, 0.8)
```

#### Match

```
invert('rgb(0, 100, 255)')         // -> rgb(255, 155, 0)
complement('rgb(255, 155, 0)')     // -> rgb(255, 155, 0)
isLight('rgb(255, 155, 0)')        // -> true
isDark('rgb(255, 155, 0)')         // -> false
grayscale('rgb(255, 155, 0)')      // -> rgb(166, 166, 166)
```

### Mix

The function mix is the same as [sass mix](https://sass-lang.com/documentation/values/colors).

#### mix(color1, color2[, weight])

- @params ColorOptions `color1`
- @params ColorOptions `color2`
- @params string | number `weight` Percentage Like(0-1/0%-100%) default: 0.5
- @returns RGBColor

```
mix('#f00', '#00f').hex().toHex()             // -> #800080
mix('#f00', '#00f', '25%').hex().toHex()      // -> #4000BF
mix('rgba(255, 0, 0, 0.5)', '#00f').toRgba()  // -> rgba(64, 0, 191, 0.75)
```

### Translate

The result of `translate('hsl(207deg, 92%, 67%, 0.55)')` :

```
{
  "RGB": "93, 179, 248",
  "RGBA": "93, 179, 248, 0.55",
  "HEXA": "#5DB3F88C",
  "AHEX": "#8C5DB3F8",
  "HEX": "#5DB3F8",
  "HSL": "207deg, 92%, 67%",
  "HSLA": "207deg, 92%, 67%, 0.55",
  "HSV": "207deg, 63%, 97%",
  "HSB": "207deg, 63%, 97%",
  "CMYK": "62%, 28%, 0%, 3%",
  "WEB": {
    "HEX": "#5DB3F8",
    "HEXA": "#5DB3F88C",
    "RGB": "rgb(93, 179, 248)",
    "RGBA": "rgba(93, 179, 248, 0.55)",
    "HSL": "hsl(207deg, 92%, 67%)",
    "HSLA": "hsla(207deg, 92%, 67%, 0.55)"
  },
  "Java": "new Color(93, 179, 248, 140)",
  ".Net": "Color.FromArgb(140, 93, 179, 248)",
  "Android": "Color.argb(140, 93, 179, 248)",
  "Unity3D": "new Color(0.36f, 0.70f, 0.97f, 0.55f)",
  "OpenGL": "glColor4f(0.36f, 0.70f, 0.97f, 0.55f)",
  "Flutter": "Color(0x8C5DB3F8)",
  "Swift": "UIColor(red:0.36, green:0.70, blue:0.97, alpha:0.55)"
}
```

## Author

[Travis](https://github.com/godxiaoji)
