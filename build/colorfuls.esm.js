import Big from 'big.js/big.mjs';

/**
 * 是否数值，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
function isNumber(object) {
  return typeof object === 'number' && isFinite(object)
}

/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
function isNumeric(object) {
  return object != null && !isNaN(parseFloat(object))
}

/**
 * 是否字符串
 * @param {any} object 值
 */
function isString(object) {
  return typeof object === 'string'
}

/**
 * 是否对象，包含常见的{}/[]，不含null
 * @param {any} object 值
 */
function isObject(object) {
  return typeof object === 'object' && object !== null
}

/**
 * 是否数组
 * @param {any} object 值
 */
function isArray(object) {
  return Array.isArray(object)
}

/**
 * 是否undefined
 * @param {any} object 值
 */
function isUndefined(object) {
  return typeof object === 'undefined'
}

/**
 * 是否百分比值
 * @param {any} object 值
 */
function isPercentage(object) {
  return isString(object) && /^(\d+)%$/.test(object)
}

/**
 * 是否限制的百分比值
 * @param {any} object 值
 * @param {Number} min 最小范围
 * @param {Number} max 最大范围
 */
function isLimitPercentage(object, min = 0, max = 100) {
  if (isPercentage(object)) {
    const value = parseFloat(object);
    return value >= min && value <= max
  }
  return false
}

/**
 * 数值转16进制
 * @param {Number} num 数值
 * @param {Number} width 多少位
 */
function decimal2Hex(num, width) {
  num = Math.round(num * 255);

  let hex = '0123456789abcdef';
  let s = '';
  while (num) {
    s = hex.charAt(num % 16) + s;
    num = Math.floor(num / 16);
  }
  if (typeof width === 'undefined' || width <= s.length) {
    return s
  }
  let delta = width - s.length;
  let padding = '';
  while (delta-- > 0) {
    padding += '0';
  }
  return padding + s
}

/**
 * 数值限定范围
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
function numberRange(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

/**
 * 数值限定范围
 * @param {Big} value
 * @param {Number} min
 * @param {Number} max
 */
function bigNumberRange(value, min = 0, max = 1) {
  if (value.gt(max)) {
    return new Big(max)
  } else if (value.lt(min)) {
    return new Big(min)
  }

  return value
}

/**
 * 百分比转数值0-1
 * @param {String|number} value 100%/0.1
 */
function percentage2Length(value) {
  if (isString(value) && value.substr(value.length - 1, 1) === '%') {
    return parseFloat(value) / 100
  }

  return parseFloat(value)
}

// PS：不会写比较骚的正则，这个虽然长，但是容易看懂
const hexaReg = /^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i;
const rgbaReg = /^rgb[a]?[(][\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;
const hslaReg = /^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;

/**
 * 是否hex/hexa
 * @param {string} color
 * @returns boolean
 */
function isHexa(color) {
  return hexaReg.test(color.trim())
}

/**
 * 是否rgb/rgba
 * @param {string} color
 * @returns boolean
 */
function isRgba(color) {
  return rgbaReg.test(color.trim())
}

/**
 * 是否hsl/hsla
 * @param {string} color
 * @returns boolean
 */
function isHsla(color) {
  return hslaReg.test(color.trim())
}

function _rgb2hsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;
  let l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break
      case g:
        h = (b - r) / d + 2;
        break
      case b:
        h = (r - g) / d + 4;
        break
    }
    h /= 6;
  }

  return {
    h: h * 360,
    s,
    l
  }
}

function _rgb2hex(r, g, b) {
  let str = ((r << 16) | (g << 8) | b).toString(16);

  for (let i = 0, len = 6 - str.length; i < len; i++) {
    str = '0' + str;
  }

  return '#' + str
}

function _hsl2rgb(h, s, l) {
  let r, g, b;
  if (s.eq(0)) {
    r = g = b = l;
  } else {
    h = new Big(h).div(360);

    const p2 = l.lt(0.5) ? l.times(s.plus(1)) : l.plus(s).minus(l.times(s));
    const p1 = l.times(2).minus(p2);

    r = hue2rgb(p1, p2, h.plus(1 / 3));
    g = hue2rgb(p1, p2, h);
    b = hue2rgb(p1, p2, h.minus(1 / 3));
  }

  return {
    r: Math.round(r.times(255)),
    g: Math.round(g.times(255)),
    b: Math.round(b.times(255))
  }
}

function parseAlpha(value) {
  let opacity = 1;

  if (isBig(value)) {
    return value
  }

  if (isNumeric(value)) {
    opacity = numberRange(percentage2Length(value));
  }

  return new Big(opacity)
}

function channelLength(value) {
  return bigNumberRange(new Big(percentage2Length(value)))
}

function channelDown(channel, ratio) {
  if (!isNumeric(ratio)) {
    throwPercentageLikeError(ratio);
  }

  return bigNumberRange(
    channel.times(new Big(1).minus(percentage2Length(ratio)))
  )
}

function channelUp(channel, ratio) {
  if (!isNumeric(ratio)) {
    throwPercentageLikeError(ratio);
  }

  return bigNumberRange(
    channel.times(new Big(1).plus(percentage2Length(ratio)))
  )
}

function isBig(object) {
  return object instanceof Big
}

function throwPercentageLikeError(value) {
  throw new Error(
    `parameter should be number/percentage instead of ${typeof value}`
  )
}

/**
 * RGBA 构造
 */
class RGBA {
  /**
   * 构造器
   * @param {Number} r 红色通道
   * @param {Number} g 绿色通道
   * @param {Number} b 蓝色通道
   * @param {Number|String} a 透明通道
   */
  constructor(r, g, b, a) {
    this.red(r);
    this.green(g);
    this.blue(b);
    this.alpha(isNumeric(a) || isBig(a) ? a : 1);
  }

  rgba() {
    return this
  }

  /**
   * 获取/设置红色通道
   * @param {Number|Sring?} value
   */
  red(value) {
    if (isUndefined(value)) {
      return this._r
    } else if (isNumeric(value)) {
      this._r = value2Binary(value);
    } else {
      throwPercentageLikeError(value);
    }
    return this
  }

  /**
   * 获取/设置绿色通道
   * @param {Number|Sring?} value
   */
  green(value) {
    if (isUndefined(value)) {
      return this._g
    } else if (isNumeric(value)) {
      this._g = value2Binary(value);
    } else {
      throwPercentageLikeError(value);
    }
    return this
  }

  /**
   * 获取/设置蓝色通道
   * @param {Number|Sring?} value
   */
  blue(value) {
    if (isUndefined(value)) {
      return this._b
    } else if (isNumeric(value)) {
      this._b = value2Binary(value);
    } else {
      throwPercentageLikeError(value);
    }
    return this
  }

  /**
   * 获取/设置透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  alpha(value) {
    if (isUndefined(value)) {
      return parseFloat(this._a)
    } else if (isNumeric(value) || isBig(value)) {
      this._a = parseAlpha(value);
    } else {
      throwPercentageLikeError(value);
    }
    return this
  }

  /**
   * 增加透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeOut(ratio) {
    this._a = channelDown(this._a, ratio);
    return this
  }

  /**
   * 降低透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeIn(ratio) {
    this._a = channelUp(this._a, ratio);
    return this
  }

  /**
   * 增加透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fade(ratio) {
    return this.fadeOut(ratio)
  }

  /**
   * 降低透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  opaque(ratio) {
    return this.fadeIn(ratio)
  }

  hsla() {
    const { h, s, l } = _rgb2hsl(this._r, this._g, this._b);

    return new HSLA(h, s, l, this._a)
  }

  toHsl() {
    return this.hsla().toHsl()
  }

  toHsla() {
    return this.hsla().toHsla()
  }

  hexa() {
    return new HEXA(
      _rgb2hex(this._r, this._g, this._b) + decimal2Hex(this._a, 2)
    )
  }

  toHex() {
    return this.hexa().toHex()
  }

  toHexa() {
    return this.hexa().toHexa()
  }

  toRgb() {
    return `rgb(${this._r}, ${this._g}, ${this._b})`
  }

  toRgba() {
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${this.alpha()})`
  }

  toString() {
    return this.toRgba()
  }

  toArray() {
    return [this._r, this._g, this._b, this.alpha()]
  }
}

/**
 * HSLA 构造
 */
class HSLA {
  /**
   * 构造器
   * @param {Number} h 色相 0-360
   * @param {Number|String} s 饱和度 0-100%
   * @param {Number|String} l 亮度 0-100%
   * @param {Number} a 透明通道
   */
  constructor(h, s, l, a) {
    this.hue(h);
    this.saturation(s);
    this.lightness(l);
    this.alpha(isNumeric(a) || isBig(a) ? a : 1);
  }

  hsla() {
    return this
  }

  /**
   * 获取/设置色相
   * @param {Number} degree 角度值
   */
  hue(degree) {
    if (isUndefined(degree)) {
      return Math.round(this._h)
    } else if (isNumeric(degree)) {
      this._h = numberRange(parseFloat(degree), 0, 360);
    } else {
      throw new Error(`parameter should be number instead of ${typeof degree}`)
    }
    return this
  }

  /**
   * 获取/设置饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  saturation(value) {
    if (isUndefined(value)) {
      return this._s.times(100).round().toFixed(0) + '%'
    } else if (isNumeric(value)) {
      this._s = channelLength(value);
    } else {
      throwPercentageLikeError(value);
    }
    return this
  }

  /**
   * 获取/设置亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  lightness(value) {
    if (isUndefined(value)) {
      return this._l.times(100).round().toFixed(0) + '%'
    } else if (isNumeric(value)) {
      this._l = channelLength(value);
    } else {
      throwPercentageLikeError(value);
    }
    return this
  }

  /**
   * 获取/设置透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  alpha(value) {
    if (isUndefined(value)) {
      return parseFloat(this._a)
    } else if (isNumeric(value) || isBig(value)) {
      this._a = parseAlpha(value);
    } else {
      throwPercentageLikeError(value);
    }
    return this
  }

  /**
   * 增加透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeOut(ratio) {
    this._a = channelDown(this._a, ratio);
    return this
  }

  /**
   * 降低透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fadeIn(ratio) {
    this._a = channelUp(this._a, ratio);
    return this
  }

  /**
   * 增加透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  fade(ratio) {
    return this.fadeOut(ratio)
  }

  /**
   * 降低透明度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  opaque(ratio) {
    return this.fadeIn(ratio)
  }

  /**
   * 调整色相
   * @param {Number} degree 加权角度值
   */
  rotate(degree) {
    if (isNumber(degree)) {
      this._h = (this._h + degree + 360) % 360;
    } else {
      throw new Error(`parameter should be number instead of ${typeof degree}`)
    }
    return this
  }

  /**
   * 增加饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  saturate(ratio) {
    this._s = channelUp(this._s, ratio);
    return this
  }

  /**
   * 降低饱和度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  desaturate(ratio) {
    this._s = channelDown(this._s, ratio);
    return this
  }

  /**
   * 增加亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  lighten(ratio) {
    this._l = channelUp(this._l, ratio);
    return this
  }

  /**
   * 降低亮度
   * @param {Number|String} ratio 比值 0.5/50%
   */
  darken(ratio) {
    this._l = channelDown(this._l, ratio);
    return this
  }

  rgba() {
    const { r, g, b } = _hsl2rgb(this._h, this._s, this._l);

    return new RGBA(r, g, b, this._a)
  }

  toRgb() {
    return this.rgba().toRgb()
  }

  toRgba() {
    return this.rgba().toRgba()
  }

  hexa() {
    return this.rgba().hexa()
  }

  toHex() {
    return this.hexa().toHex()
  }

  toHexa() {
    return this.hexa().toHexa()
  }

  toHsl() {
    return `hsl(${this.hue()}, ${this.saturation()}, ${this.lightness()})`
  }

  toHsla() {
    return `hsla(${this.hue()}, ${this.saturation()}, ${this.lightness()}, ${this.alpha()})`
  }

  toString() {
    return this.toHsla()
  }

  toArray() {
    return [this.hue(), this.saturation(), this.lightness(), this.alpha()]
  }
}

/**
 * HEX 构造器
 */
class HEXA {
  constructor(hexa) {
    hexa = hexa.toUpperCase();

    if (hexa.length === 7) {
      this._hex = hexa;
      this._hexa = hexa + 'FF';
    } else {
      this._hexa = hexa;
      this._hex = hexa.slice(0, 7);
    }
  }

  hexa() {
    return this
  }

  rgba() {
    return new RGBA(
      parseInt('0x' + this._hexa.slice(1, 3)),
      parseInt('0x' + this._hexa.slice(3, 5)),
      parseInt('0x' + this._hexa.slice(5, 7)),
      parseFloat(parseInt('0x' + this._hexa.slice(7, 9)) / 255)
    )
  }

  toRgb() {
    return this.rgba().toRgb()
  }

  toRgba() {
    return this.rgba().toRgba()
  }

  hsla() {
    return this.rgba().hsla()
  }

  toHsl() {
    return this.hsla().toHsl()
  }

  toHsla() {
    return this.hsla().toHsla()
  }

  toHex() {
    return this._hex
  }

  toHexa() {
    return this._hexa
  }

  toString() {
    return this.toHexa()
  }
}

function value2Binary(value) {
  if (isString(value) && value.substr(value.length - 1, 1) === '%') {
    value = (255 * parseFloat(value)) / 100;
  } else {
    value = parseFloat(value);
  }
  return numberRange(Math.round(value), 0, 255)
}

/**
 * rgb/rgba色值转为RGBA对象
 * @param {string|{r:Number,g:Number,b:Number,a?:Number}} rgba rgb(255,0,0)/rgba(255,0,0,.5)
 */
function rgba2RGBA(rgba) {
  let matches;

  if (
    isObject(rgba) &&
    isNumeric(rgba.r) &&
    isNumeric(rgba.g) &&
    isNumeric(rgba.b)
  ) {
    matches = [
      null,
      rgba.r,
      rgba.g,
      rgba.b,
      isBig(rgba.a) || isNumeric(rgba.a) ? rgba.a : 1
    ];
  } else if (isRgba(rgba)) {
    matches = rgbaReg.exec(rgba.trim());
  } else {
    throw new Error('It is not a valid rgb/rgba string')
  }

  return new RGBA(...matches.slice(1, 5))
}

/**
 * hex/hexa色值转为HEXA对象
 * @param {string} hex #ff0000/#ff000080
 */
function hexa2HEXA(hexa) {
  if (!isHexa(hexa)) {
    throw new Error('It is not a valid hex/hexa string')
  }

  let rH, gH, bH, aH;

  hexa = hexa.trim();

  if (hexa.length === 4) {
    // #fff
    rH = hexa.slice(1, 2) + hexa.slice(1, 2);
    gH = hexa.slice(2, 3) + hexa.slice(2, 3);
    bH = hexa.slice(3, 4) + hexa.slice(3, 4);
  } else {
    rH = hexa.slice(1, 3);
    gH = hexa.slice(3, 5);
    bH = hexa.slice(5, 7);
  }

  if (hexa.length === 9) {
    aH = hexa.slice(7, 9);
  } else {
    aH = 'ff';
  }

  return new HEXA(`#${rH}${gH}${bH}${aH}`.toUpperCase())
}

function hue2rgb(p1, p2, hue) {
  if (hue.lt(0)) hue = hue.plus(1);
  if (hue.gt(1)) hue = hue.minus(1);
  if (hue.times(6).lt(1)) return p1.plus(p2.minus(p1).times(6).times(hue))
  if (hue.times(2).lt(1)) return p2
  if (hue.times(3).lt(2))
    return p1.plus(p2.minus(p1).times(new Big(2 / 3).minus(hue).times(6)))
  return p1
}

/**
 * hsl/hsla色值转为HSLA对象
 * @param {String|{h:Number,s:String|Number,l:String|Number,a?:Number}} hsla 颜色值
 */
function hsla2HSLA(hsla) {
  let matches;

  if (
    isObject(hsla) &&
    isNumber(hsla.h) &&
    isNumeric(hsla.s) &&
    isNumeric(hsla.l)
  ) {
    matches = [null, hsla.h, hsla.s, hsla.l, isNumeric(hsla.a) ? hsla.a : 1];
  } else if (isHsla(hsla)) {
    matches = hslaReg.exec(hsla.trim());
  } else {
    throw new Error('It is not a valid hsl/hsla string')
  }

  return new HSLA(...matches.slice(1, 5))
}

/**
 * 克隆颜色对象
 * @param {RGBA|RGBA|HEXA} object
 */
function clone(object) {
  if (object instanceof RGBA) {
    return new RGBA(object._r, object._g, object._b, object._a)
  } else if (object instanceof HSLA) {
    return new HSLA(object._h, object._s, object._l, object._a)
  } else if (object instanceof HEXA) {
    return new HEXA(object._hexa)
  }

  return object
}

/**
 * 颜色构造器
 * @param {String|{r:Number,g:Number,b:Number,a?:Number}|{h:Number,s:string,l:string,a?:Number}} value 颜色值
 */
function Color(value) {
  if (isObject(value)) {
    if (
      value instanceof RGBA ||
      value instanceof HSLA ||
      value instanceof HEXA
    ) {
      return clone(value)
    } else if (isNumeric(value.r) && isNumeric(value.g) && isNumeric(value.b)) {
      return rgba2RGBA(value)
    } else if (
      isNumber(value.h) &&
      isLimitPercentage(value.s) &&
      isLimitPercentage(value.l)
    ) {
      return hsla2HSLA(value)
    }
  } else if (isHexa(value)) {
    return hexa2HEXA(value)
  } else if (isRgba(value)) {
    return rgba2RGBA(value)
  } else if (isHsla(value)) {
    return hsla2HSLA(value)
  }

  throw new Error('invaild color value')
}

/**
 * 混合颜色
 * @param {String} color1 颜色值或者实例1
 * @param {String} color2 颜色值或者实例2
 * @param {String|Number} weight 权重 0.5/50%
 * @see https://sass-lang.com/documentation/values/colors
 */
function mix(color1, color2, weight) {
  const c1 = Color(color1).rgba();
  const c2 = Color(color2).rgba();

  const p = new Big(
    isUndefined(weight) ? 0.5 : numberRange(percentage2Length(weight))
  );

  const w = p.times(2).minus(1);
  const a = c1._a.minus(c2._a);
  const w1 = (w.times(a).eq(-1)
    ? w
    : w.plus(a).div(w.times(a).plus(1)).plus(1)
  ).div(2.0);
  const w2 = new Big(1).minus(w1);

  return rgba2RGBA({
    r: parseFloat(w1.times(c1.red()).plus(w2.times(c2.red()))),
    g: parseFloat(w1.times(c1.green()).plus(w2.times(c2.green()))),
    b: parseFloat(w1.times(c1.blue()).plus(w2.times(c2.blue()))),
    a: c1._a.times(p).plus(c2._a.times(new Big(1).minus(p)))
  })
}

function color2Array(color, gamma) {
  return color.toArray().map((channel, k) => {
    return (k === 3 ? new Big(channel) : new Big(channel).div(255)).pow(gamma)
  })
}

function getStepColor(p, colors, gamma) {
  let start;
  let end;

  for (let i = 0, len = colors.length; i < len; i++) {
    const item = colors[i];

    if (item.percentage.eq(p)) {
      return clone(item.color)
    } else if (item.percentage.gt(p)) {
      const prevItem = colors[i - 1];
      start = color2Array(prevItem.color, gamma);
      end = color2Array(item.color, gamma);

      p = p
        .minus(prevItem.percentage)
        .div(item.percentage.minus(prevItem.percentage));
      break
    }
  }

  const arr = [];

  for (let i = 0; i < 4; i++) {
    const channel = start[i]
      .times(new Big(1).minus(p))
      .plus(end[i].times(p))
      .pow(1 / gamma);

    if (i === 3) {
      arr[i] = channel;
    } else {
      arr[i] = channel.times(255);
    }
  }

  return rgba2RGBA({
    r: parseFloat(arr[0]),
    g: parseFloat(arr[1]),
    b: parseFloat(arr[2]),
    a: arr[3]
  })
}

function parseColors(args) {
  const colors = [];
  let unknownPercentageIndexs = [];
  let minPercentage = 0;

  for (let i = 0, len = args.length; i < len; i++) {
    const item = { percentage: null };

    if (isArray(args[i])) {
      item.color = Color(args[i][0]).rgba();
      item.percentage = new Big(
        numberRange(percentage2Length(args[i][1]), minPercentage, 1)
      );
    } else {
      item.color = Color(args[i]).rgba();
    }

    if (i === 0) {
      item.percentage = new Big(0);
    } else if (i === len - 1) {
      item.percentage = new Big(1);
    }

    if (item.percentage === null) {
      unknownPercentageIndexs.push(i);
    } else if (i > 0) {
      minPercentage = item.percentage;
      if (unknownPercentageIndexs.length > 0) {
        const step = item.percentage
          .minus(colors[unknownPercentageIndexs[0] - 1].percentage)
          .div(unknownPercentageIndexs.length + 1);

        unknownPercentageIndexs.forEach((colorIndex, k) => {
          colors[colorIndex].percentage = item.percentage.minus(
            step.times(unknownPercentageIndexs.length - k)
          );
        });
        unknownPercentageIndexs = [];
      }
    }
    colors.push(item);
  }

  //   colors.forEach(v => {
  //     console.log(v.percentage.toFixed(5))
  //   })

  return colors
}

function steps2ColorArray(gs, method) {
  const arr = [];

  gs.forEach(color => {
    arr.push(color[method]());
  });

  return arr
}

class GradientSteps extends Array {
  toRgbs() {
    return steps2ColorArray(this, 'toRgb')
  }

  toHexs() {
    return steps2ColorArray(this, 'toHex')
  }

  toHsls() {
    return steps2ColorArray(this, 'toHsl')
  }

  toRgbas() {
    return steps2ColorArray(this, 'toRgba')
  }

  toHexas() {
    return steps2ColorArray(this, 'toHexa')
  }

  toHslas() {
    return steps2ColorArray(this, 'toHsla')
  }

  toString() {
    return this.toRgbas().join(', ')
  }
}

class Gradient {
  constructor(colors, gamma = 1) {
    this.colors = parseColors(colors);
    this.gamma = gamma;
  }

  steps(length) {
    if (isNumber(length) && length >= 2) {
      const output = new GradientSteps();

      for (let i = 0; i < length; i++) {
        output.push(
          getStepColor(new Big(i).div(length - 1), this.colors, this.gamma)
        );
      }

      return output
    }

    throw new Error(`parameter "length" should be more then 1`)
  }

  step(value) {
    const p = numberRange(percentage2Length(value));

    return getStepColor(new Big(p), this.colors, this.gamma)
  }
}

function gradient(color1, color2, gamma = 1) {
  return new Gradient([color1, color2], gamma)
}

/**
 * 线性渐变
 * @param  {...string|string[]} args
 */
function linearGradient(...args) {
  return new Gradient(args, 1)
}

/**
 * 计算灰阶值
 * @param {Number} r red
 * @param {Number} g green
 * @param {Number} b blue
 * @see https://www.cnblogs.com/zhangjiansheng/p/6925722.html
 */
function rgb2Gray(r, g, b) {
  // 著名的心理学公式
  // return (r * 299 + g * 587 + b * 114) / 1000
  return (r * 38 + g * 75 + b * 15) >> 7
}

function invert(value) {
  const color = Color(value).rgba();

  return color
    .red(255 - color.red())
    .green(255 - color.green())
    .blue(255 - color.blue())
}

function complement(value) {
  return Color(value).hsla().rotate(180)
}

/**
 * 是否深色调
 * @param {String} value
 */
function isDark(value) {
  const color = Color(value).rgba();

  return rgb2Gray(color.red(), color.green(), color.blue()) < 128
}

/**
 * 是否浅色调
 * @param {String} value
 */
function isLight(value) {
  return !isDark(value)
}

function grayscale(value) {
  const color = Color(value).rgba();
  const gray = Math.round(rgb2Gray(color.red(), color.green(), color.blue()));

  return color.red(gray).green(gray).blue(gray)
}

const Colorful = function Colorful(...args) {
  return Color.apply(null, args)
};

Colorful.rgba2Hexa = function rgba2Hexa(rgba) {
  return rgba2RGBA(rgba).toHexa()
};

Colorful.rgba2Hsla = function rgba2Hsla(rgba) {
  return rgba2RGBA(rgba).toHsla()
};

Colorful.rgb2Hex = function rgb2Hex(rgb) {
  return rgba2RGBA(rgb).toHex()
};

Colorful.rgb2Hsl = function rgb2Hsl(rgb) {
  return rgba2RGBA(rgb).toHsl()
};

Colorful.hexa2Rgba = function hexa2Rgba(hexa) {
  return hexa2HEXA(hexa).toRgba()
};

Colorful.hexa2Hsla = function hexa2Hsla(hexa) {
  return hexa2HEXA(hexa).toHsla()
};

Colorful.hex2Rgb = function hex2Rgb(hex) {
  return hexa2HEXA(hex).toRgb()
};

Colorful.hex2Hsl = function hex2Hsl(hex) {
  return hexa2HEXA(hex).toHsl()
};

Colorful.hsla2Rgba = function hsla2Rgba(hsla) {
  return hsla2HSLA(hsla).toRgba()
};

Colorful.hsla2Hexa = function hsla2Hexa(hsla) {
  return hsla2HSLA(hsla).toHexa()
};

Colorful.hsl2Rgb = function hsl2Rgb(hsl) {
  return hsla2HSLA(hsl).toRgb()
};

Colorful.hsl2Hex = function hsl2Hex(hsl) {
  return hsla2HSLA(hsl).toHex()
};

Colorful.Color = Color;
Colorful.mix = mix;
Colorful.gradient = gradient;
Colorful.linearGradient = linearGradient;

Colorful.invert = invert;
Colorful.complement = complement;
Colorful.isDark = isDark;
Colorful.isLight = isLight;
Colorful.grayscale = grayscale;

export default Colorful;
