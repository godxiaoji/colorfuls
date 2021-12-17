function number2Percentage(number) {
    return (number * 100).toFixed(0) + '%';
}
/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
function isNumeric(object) {
    return ((typeof object === 'number' && isFinite(object)) ||
        (typeof object === 'string' && !isNaN(parseFloat(object)) && isFinite(parseFloat(object))));
}
/**
 * 是否百分比值
 * @param {any} object 值
 */
function isPercentage(object) {
    return typeof object === 'string' && /^([\d.]+)%$/.test(object);
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
        return value >= min && value <= max;
    }
    return false;
}
/**
 * 数值转16进制
 * @param {Number} num 数值
 * @param {Number} width 多少位
 */
function decimal2Hex(num, width) {
    num = Math.round(num * 255);
    const hex = '0123456789abcdef';
    let s = '';
    while (num) {
        s = hex.charAt(num % 16) + s;
        num = Math.floor(num / 16);
    }
    if (typeof width === 'undefined' || width <= s.length) {
        return s.toUpperCase();
    }
    let delta = width - s.length;
    let padding = '';
    while (delta-- > 0) {
        padding += '0';
    }
    return (padding + s).toUpperCase();
}
/**
 * 数值限定范围
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
function numberRange(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
}
/**
 * 百分比转数值0-1
 * @param {String|number} value 100%/0.1
 */
function percentage2Length(value) {
    if (isPercentage(value)) {
        return parseFloat(value) / 100;
    }
    return parseFloat(value);
}

// PS：不会写比较骚的正则，这个虽然长，但是容易看懂
const hexRegex = /^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i;
const rgbRegex = /^rgb[a]?[(][\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,[\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,[\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,?[\s]*(0?\.\d{1,16}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;
const hslRegex = /^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)(deg)*[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,16}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;
/**
 * 是否hex/hexa
 * @param {string} color
 * @returns boolean
 */
function isHexString(color) {
    return typeof color === 'string' && hexRegex.test(color.trim());
}
/**
 * 是否rgb/rgba
 * @param {string} color
 * @returns boolean
 */
function isRgbString(color) {
    return typeof color === 'string' && rgbRegex.test(color.trim());
}
/**
 * 是否hsl/hsla
 * @param {string} color
 * @returns boolean
 */
function isHslString(color) {
    return typeof color === 'string' && hslRegex.test(color.trim());
}
function _rgb2hsl(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const l = (max + min) / 2;
    if (l === 0 || max === min) {
        h = s = 0; // achromatic
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) {
            h = (g - b) / d + (g < b ? 6 : 0);
        }
        else if (max === g) {
            h = (b - r) / d + 2;
        }
        else {
            h = (r - g) / d + 4;
        }
        h = h / 6;
    }
    return {
        h,
        s,
        l
    };
}
function _rgb2hsv(r, g, b) {
    let h = 0;
    let s = 0;
    let v = 0;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    v = max;
    if (max === 0) {
        s = 0;
    }
    else {
        s = 1 - min / max;
    }
    const d = max - min;
    if (max === min) {
        h = 0;
    }
    else if (max === r && g >= b) {
        h = (60 * (g - b)) / d + 0;
    }
    else if (max === r && g < b) {
        h = (60 * (g - b)) / d + 360;
    }
    else if (max === g) {
        h = (60 * (b - r)) / d + 120;
    }
    else if (max === b) {
        h = h = (60 * (r - g)) / d + 240;
    }
    h = h / 360;
    return {
        h,
        s,
        v
    };
}
function _hsv2rgb(h, s, v) {
    let r = 0;
    let g = 0;
    let b = 0;
    // const i = Math.floor(h.times(6).mod(6))
    const i = Math.floor((h * 6) % 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return {
        r,
        g,
        b
    };
}
function _hsv2hsl(h, s, v) {
    // s.times(v).div((h = big(2).minus(s).times(v)).lt(num1) ? h : big(2).minus(h)) || num0,
    return {
        h,
        s: (s * v) / ((h = (2 - s) * v) < 1 ? h : 2 - h) || 0,
        l: h / 2
    };
}
function _rgb2hex(r, g, b) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    let str = ((r << 16) | (g << 8) | b).toString(16);
    for (let i = 0, len = 6 - str.length; i < len; i++) {
        str = '0' + str;
    }
    return '#' + str.toUpperCase();
}
function _hsl2rgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    }
    else {
        const p2 = l < 0.5 ? l * (s + 1) : l + s - l * s;
        const p1 = l * 2 - p2;
        r = hue2rgb(p1, p2, h + 1 / 3);
        g = hue2rgb(p1, p2, h);
        b = hue2rgb(p1, p2, h - 1 / 3);
    }
    return {
        r,
        g,
        b
    };
}
function _cmyk2rgb(c, m, y, k) {
    const t = 1 - k;
    return {
        r: (1 - c) * t,
        g: (1 - m) * t,
        b: (1 - y) * t
    };
}
function _rgb2cmyk(r, g, b) {
    const k = 1 - Math.max(r, g, b);
    return {
        c: (1 - r - k) / (1 - k),
        m: (1 - g - k) / (1 - k),
        y: (1 - b - k) / (1 - k),
        k
    };
}
function parseAlpha(value) {
    let opacity = 1;
    if (isNumeric(value)) {
        opacity = channel2Length(value);
    }
    return opacity;
}
function channel2Length(value) {
    return numberRange(percentage2Length(value));
}
function channelDown(channel, ratio) {
    if (!isNumeric(ratio)) {
        throwPercentageLikeError(ratio);
    }
    return numberRange(channel * (1 - percentage2Length(ratio)));
}
function channelUp(channel, ratio) {
    if (!isNumeric(ratio)) {
        throwPercentageLikeError(ratio);
    }
    return numberRange(channel * (1 + percentage2Length(ratio)));
}
function throwPercentageLikeError(value) {
    throw new Error(`Parameter should be number/percentage instead of ${typeof value}`);
}
function setRatio(color, key, value) {
    if (isNumeric(value)) {
        color[key] = channel2Length(value);
    }
    else {
        throwPercentageLikeError(value);
    }
    return color;
}
function getChannel(color, key) {
    return Math.round(color[key] * 255);
}
function setChannel(color, key, value) {
    if (isNumeric(value)) {
        color[key] = isPercentage(value) ? channel2Length(value) : numberRange(parseFloat(value) / 255);
    }
    else {
        throwPercentageLikeError(value);
    }
    return color;
}
class BaseColor {
    constructor(a, raw = false) {
        this._a = 1;
        if (raw) {
            this._a = a;
        }
        else {
            this.setAlpha(a);
        }
    }
    getAlpha() {
        return parseFloat(this._a.toFixed(2));
    }
    setAlpha(value) {
        if (typeof value === 'undefined') {
            this._a = 1;
        }
        else if (isNumeric(value)) {
            this._a = parseAlpha(value);
        }
        else {
            throwPercentageLikeError(value);
        }
        return this;
    }
    getRawAlpha() {
        return this._a;
    }
    /**
     * 增加透明度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    fadeOut(ratio) {
        this._a = channelDown(this._a, ratio);
        return this;
    }
    /**
     * 降低透明度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    fadeIn(ratio) {
        this._a = channelUp(this._a, ratio);
        return this;
    }
    /**
     * 增加透明度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    fade(ratio) {
        return this.fadeOut(ratio);
    }
    /**
     * 降低透明度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    opaque(ratio) {
        return this.fadeIn(ratio);
    }
}
/**
 * RGBColor 构造
 */
class RGBColor extends BaseColor {
    /**
     * 构造器
     * @param {Number} r 红色通道
     * @param {Number} g 绿色通道
     * @param {Number} b 蓝色通道
     * @param {Number|String} a 透明通道
     */
    constructor(r, g, b, a, raw = false) {
        super(a, raw);
        this._r = r;
        this._g = g;
        this._b = b;
        if (!raw) {
            this.setRed(r);
            this.setGreen(g);
            this.setBlue(b);
        }
    }
    getRed() {
        return getChannel(this, '_r');
    }
    setRed(value) {
        return setChannel(this, '_r', value);
    }
    getGreen() {
        return getChannel(this, '_g');
    }
    setGreen(value) {
        return setChannel(this, '_g', value);
    }
    getBlue() {
        return getChannel(this, '_b');
    }
    setBlue(value) {
        return setChannel(this, '_b', value);
    }
    rgb() {
        return this;
    }
    hsl() {
        const { h, s, l } = _rgb2hsl(this._r, this._g, this._b);
        return new HSLColor(h, s, l, this._a, true);
    }
    hsv() {
        const { h, s, v } = _rgb2hsv(this._r, this._g, this._b);
        return new HSVColor(h, s, v, this._a, true);
    }
    hex() {
        return new HEXColor(this._r, this._g, this._b, this._a, true);
    }
    cmyk() {
        const { c, m, y, k } = _rgb2cmyk(this._r, this._g, this._b);
        return new CMYKColor(c, m, y, k, this._a, true);
    }
    toRgb() {
        return `rgb(${this.toArray().slice(0, 3).join(', ')})`;
    }
    toRgba() {
        return `rgba(${this.toArray().join(', ')})`;
    }
    toString() {
        return this.toRgba();
    }
    toArray() {
        return [this.getRed(), this.getGreen(), this.getBlue(), this.getAlpha()];
    }
    toObject() {
        const [r, g, b, a] = this.toArray();
        return { r, g, b, a };
    }
    toRawArray() {
        return [this._r, this._g, this._b, this._a];
    }
    toRawObject() {
        const [r, g, b, a] = this.toRawArray();
        return { r, g, b, a };
    }
}
/**
 * HSA 构造
 */
class HSA extends BaseColor {
    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number} a 透明通道
     */
    constructor(h, s, a, raw = false) {
        super(a, raw);
        this._h = h;
        this._s = s;
        if (!raw) {
            this.setHue(h);
            this.setSaturation(s);
        }
    }
    getHue() {
        return `${Math.round(this._h * 360)}deg`;
    }
    setHue(degree) {
        if (isNumeric(degree)) {
            this._h = numberRange(parseFloat(degree), 0, 360) / 360;
        }
        else {
            throw new Error(`Parameter should be number instead of ${typeof degree}`);
        }
        return this;
    }
    getSaturation() {
        return number2Percentage(this._s);
    }
    setSaturation(value) {
        return setRatio(this, '_s', value);
    }
    /**
     * 调整色相
     * @param {Number} degree 加权角度值
     */
    rotate(degree) {
        if (isNumeric(degree)) {
            // this._h = this._h.plus(big(parseFloat(degree)).div(360).plus(1)).mod(1)
            this._h = (this._h + degree / 360 + 1) % 1;
        }
        else {
            throw new Error(`Parameter should be number instead of ${typeof degree}`);
        }
        return this;
    }
    /**
     * 增加饱和度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    saturate(ratio) {
        this._s = channelUp(this._s, ratio);
        return this;
    }
    /**
     * 降低饱和度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    desaturate(ratio) {
        this._s = channelDown(this._s, ratio);
        return this;
    }
}
/**
 * HSLColor 构造
 */
class HSLColor extends HSA {
    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number|String} l 亮度 0-100%
     * @param {Number} a 透明通道
     */
    constructor(h, s, l, a, raw = false) {
        super(h, s, a, raw);
        this._l = l;
        if (!raw) {
            this.setLightness(l);
        }
    }
    /**
     * 获取/设置亮度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    getLightness() {
        return number2Percentage(this._l);
    }
    setLightness(value) {
        return setRatio(this, '_l', value);
    }
    /**
     * 增加亮度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    lighten(ratio) {
        this._l = channelUp(this._l, ratio);
        return this;
    }
    /**
     * 降低亮度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    darken(ratio) {
        this._l = channelDown(this._l, ratio);
        return this;
    }
    hsl() {
        return this;
    }
    rgb() {
        const { r, g, b } = _hsl2rgb(this._h, this._s, this._l);
        return new RGBColor(r, g, b, this._a, true);
    }
    hex() {
        return this.rgb().hex();
    }
    cmyk() {
        return this.rgb().cmyk();
    }
    hsv() {
        return this.rgb().hsv();
    }
    toHsl() {
        return `hsl(${this.toArray().slice(0, 3).join(', ')})`;
    }
    toHsla() {
        return `hsla(${this.toArray().join(', ')})`;
    }
    toString() {
        return this.toHsla();
    }
    toArray() {
        return [this.getHue(), this.getSaturation(), this.getLightness(), this.getAlpha()];
    }
    toObject() {
        const [h, s, l, a] = this.toArray();
        return { h, s, l, a };
    }
    toRawArray() {
        return [this._h, this._s, this._l, this._a];
    }
    toRawObject() {
        const [h, s, l, a] = this.toRawArray();
        return { h, s, l, a };
    }
}
/**
 * HSVColor 构造
 */
class HSVColor extends HSA {
    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number|String} v 色调 0-100%
     * @param {Number} a 透明通道
     */
    constructor(h, s, v, a, raw = false) {
        super(h, s, a, raw);
        this._v = v;
        if (!raw) {
            this.setValue(v);
        }
    }
    getValue() {
        return number2Percentage(this._v);
    }
    setValue(value) {
        return setRatio(this, '_v', value);
    }
    hsv() {
        return this;
    }
    rgb() {
        const { r, g, b } = _hsv2rgb(this._h, this._s, this._v);
        return new RGBColor(r, g, b, this._a, true);
    }
    hex() {
        return this.rgb().hex();
    }
    cmyk() {
        return this.rgb().cmyk();
    }
    hsl() {
        const { h, s, l } = _hsv2hsl(this._h, this._s, this._v);
        return new HSLColor(h, s, l, this._a, true);
    }
    toHsv() {
        return this.toArray().slice(0, 3).join(', ');
    }
    toHsva() {
        return this.toArray().join(', ');
    }
    toString() {
        return this.toHsva();
    }
    toArray() {
        return [this.getHue(), this.getSaturation(), this.getValue(), this.getAlpha()];
    }
    toObject() {
        const [h, s, v, a] = this.toArray();
        return { h, s, v, a };
    }
    toRawArray() {
        return [this._h, this._s, this._v, this._a];
    }
    toRawObject() {
        const [h, s, v, a] = this.toRawArray();
        return { h, s, v, a };
    }
}
/**
 * HEX 构造器
 */
class HEXColor extends BaseColor {
    constructor(r, g, b, a, raw = false) {
        super(a, raw);
        this._r = r;
        this._g = g;
        this._b = b;
        this._hex = _rgb2hex(r, g, b);
    }
    getAlphaHex() {
        return decimal2Hex(this._a, 2);
    }
    setAlphaHex(value) {
        this.setAlpha(parseInt('0x' + value) / 255);
    }
    hex() {
        return this;
    }
    rgb() {
        return new RGBColor(this._r, this._g, this._b, this._a, true);
    }
    hsl() {
        return this.rgb().hsl();
    }
    hsv() {
        return this.rgb().hsv();
    }
    cmyk() {
        return this.rgb().cmyk();
    }
    toHex() {
        return this._hex;
    }
    toHexa() {
        return this._hex + this.getAlphaHex();
    }
    toString() {
        return this.toHexa();
    }
    toArray() {
        return [this._hex.slice(1, 3), this._hex.slice(3, 5), this._hex.slice(5, 7), this.getAlphaHex()];
    }
    toObject() {
        const [r, g, b, a] = this.toArray();
        return { r, g, b, a };
    }
    toRawArray() {
        return [this._r, this._g, this._b, this._a];
    }
    toRawObject() {
        const [r, g, b, a] = this.toRawArray();
        return { r, g, b, a };
    }
}
class CMYKColor extends BaseColor {
    constructor(c, m, y, k, a, raw = false) {
        // cmyk没有透明通道，存储只是为了防止转化丢失
        super(a, raw);
        this._c = c;
        this._m = m;
        this._y = y;
        this._k = k;
        if (!raw) {
            this.setCyan(c);
            this.setMagenta(m);
            this.setYellow(y);
            this.setBlack(k);
        }
    }
    getCyan() {
        return number2Percentage(this._c);
    }
    setCyan(value) {
        return setRatio(this, '_c', value);
    }
    getMagenta() {
        return number2Percentage(this._m);
    }
    setMagenta(value) {
        return setRatio(this, '_m', value);
    }
    getYellow() {
        return number2Percentage(this._y);
    }
    setYellow(value) {
        return setRatio(this, '_y', value);
    }
    getBlack() {
        return number2Percentage(this._k);
    }
    setBlack(value) {
        return setRatio(this, '_k', value);
    }
    cmyk() {
        return this;
    }
    rgb() {
        const { r, g, b } = _cmyk2rgb(this._c, this._m, this._y, this._k);
        return new RGBColor(r, g, b, this._a, true);
    }
    hsl() {
        return this.rgb().hsl();
    }
    hsv() {
        return this.rgb().hsv();
    }
    hex() {
        return this.rgb().hex();
    }
    toCmyk() {
        return this.toArray().join(', ');
    }
    toString() {
        return this.toCmyk();
    }
    toArray() {
        return [this.getCyan(), this.getMagenta(), this.getYellow(), this.getBlack()];
    }
    toObject() {
        const [c, m, y, k] = this.toArray();
        return { c, m, y, k };
    }
    toRawArray() {
        return [this._c, this._m, this._y, this._k];
    }
    toRawObject() {
        const [c, m, y, k] = this.toRawArray();
        return { c, m, y, k };
    }
}
/**
 * rgb/rgba色值转为RGBA对象
 * @param rgba rgb(255,0,0)/rgba(255,0,0,.5)
 */
function rgb2RGBColor(rgba) {
    if (isRgbString(rgba)) {
        const matches = rgbRegex.exec(rgba.trim()).slice(1, 5);
        return new RGBColor(matches[0], matches[1], matches[2], matches[3]);
    }
    else if (typeof rgba === 'object' && isNumeric(rgba.r) && isNumeric(rgba.g) && isNumeric(rgba.b)) {
        return new RGBColor(rgba.r, rgba.g, rgba.b, rgba.a);
    }
    throw new Error('It is not a valid rgb/rgba string');
}
/**
 * hex/hexa色值转为HEXA对象
 * @param {string} hex #ff0000/#ff000080
 */
function hex2HEXColor(hexa) {
    if (!isHexString(hexa)) {
        throw new Error('It is not a valid hex/hexa string');
    }
    let rH, gH, bH, aH;
    hexa = hexa.trim();
    if (hexa.length === 4) {
        // #fff
        rH = hexa.slice(1, 2) + hexa.slice(1, 2);
        gH = hexa.slice(2, 3) + hexa.slice(2, 3);
        bH = hexa.slice(3, 4) + hexa.slice(3, 4);
    }
    else {
        rH = hexa.slice(1, 3);
        gH = hexa.slice(3, 5);
        bH = hexa.slice(5, 7);
    }
    if (hexa.length === 9) {
        aH = hexa.slice(7, 9);
    }
    else {
        aH = 'ff';
    }
    return new HEXColor(hex2Length(rH), hex2Length(gH), hex2Length(bH), hex2Length(aH));
}
function hex2Length(channel) {
    return parseInt('0x' + channel) / 255;
}
function hue2rgb(p1, p2, hue) {
    if (hue < 0) {
        hue = hue + 1;
    }
    if (hue > 1) {
        hue = hue - 1;
    }
    if (hue * 6 < 1) {
        return p1 + (p2 - p1) * 6 * hue;
    }
    if (hue * 2 < 1) {
        return p2;
    }
    if (hue * 3 < 2) {
        return p1 + (p2 - p1) * (2 / 3 - hue) * 6;
    }
    return p1;
}
/**
 * hsl/hsla色值转为HSLA对象
 * @param hsla 颜色值
 */
function hsl2HSLColor(hsla) {
    if (isHslString(hsla)) {
        const matches = hslRegex.exec(hsla.trim()).slice(1, 6); // ['207', 'deg', '92%', '67%', '0.55']
        return new HSLColor(matches[0], matches[2], matches[3], matches[4]);
    }
    else if (typeof hsla === 'object' && isNumeric(hsla.h) && isNumeric(hsla.s) && isNumeric(hsla.l)) {
        return new HSLColor(hsla.h, hsla.s, hsla.l, hsla.a);
    }
    throw new Error('It is not a valid hsl/hsla string');
}
/**
 * hsv/hsva色值转为HSVA对象
 * @param hsva 颜色值
 */
function hsv2HSVColor(hsva) {
    if (typeof hsva === 'object' && isNumeric(hsva.h) && isNumeric(hsva.s) && isNumeric(hsva.v)) {
        return new HSVColor(hsva.h, hsva.s, hsva.v, isNumeric(hsva.a) ? hsva.a : 1);
    }
    else {
        throw new Error('It is not a valid hsv/hsva object');
    }
}
/**
 * hsv/hsva色值转为HSVA对象
 * @param {String|{h:String|Number,s:String|Number,v:String|Number,a?:Number}} hsva 颜色值
 */
function cmyk2CMYK(cmyk) {
    if (typeof cmyk === 'object' && isNumeric(cmyk.c) && isNumeric(cmyk.m) && isNumeric(cmyk.y) && isNumeric(cmyk.k)) {
        return new CMYKColor(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    }
    else {
        throw new Error('It is not a valid cmyk object');
    }
}
/**
 * 克隆颜色对象
 * @param {RGBColor|RGBColor|HEXColor} object
 */
function clone(object) {
    if (object instanceof RGBColor) {
        return new RGBColor(object._r, object._g, object._b, object._a, true);
    }
    else if (object instanceof HSLColor) {
        return new HSLColor(object._h, object._s, object._l, object._a, true);
    }
    else if (object instanceof HSVColor) {
        return new HSVColor(object._h, object._s, object._v, object._a, true);
    }
    else if (object instanceof HEXColor) {
        return new HEXColor(object._r, object._g, object._b, object._a, true);
    }
    else if (object instanceof CMYKColor) {
        return new CMYKColor(object._c, object._m, object._y, object._k, object._a, true);
    }
    return object;
}
/**
 * 颜色构造器
 * @param value 颜色值
 */
function Color(value) {
    if (typeof value === 'object') {
        if (value instanceof RGBColor ||
            value instanceof HSLColor ||
            value instanceof HEXColor ||
            value instanceof HSVColor ||
            value instanceof CMYKColor) {
            return clone(value);
        }
        else if (isNumeric(value.r) &&
            isNumeric(value.g) &&
            isNumeric(value.b)) {
            return rgb2RGBColor(value);
        }
        else if (isNumeric(value.h) && isLimitPercentage(value.s)) {
            if (isLimitPercentage(value.l)) {
                return hsl2HSLColor(value);
            }
            else if (isLimitPercentage(value.v)) {
                return hsv2HSVColor(value);
            }
        }
        else if (isNumeric(value.c) &&
            isNumeric(value.m) &&
            isNumeric(value.y) &&
            isNumeric(value.k)) {
            return cmyk2CMYK(value);
        }
    }
    else if (isHexString(value)) {
        return hex2HEXColor(value);
    }
    else if (isRgbString(value)) {
        return rgb2RGBColor(value);
    }
    else if (isHslString(value)) {
        return hsl2HSLColor(value);
    }
    throw new Error('Invalid color value.');
}

/**
 * 混合颜色
 * @param {String} color1 颜色值或者实例1
 * @param {String} color2 颜色值或者实例2
 * @param {String|Number} weight 权重 0.5/50%
 * @see https://sass-lang.com/documentation/values/colors
 */
function mix(color1, color2, weight) {
    const c1 = Color(color1).rgb();
    const c2 = Color(color2).rgb();
    const p = typeof weight === 'undefined' ? 0.5 : numberRange(percentage2Length(weight));
    const w = p * 2 - 1;
    const a = c1.getRawAlpha() - c2.getRawAlpha();
    // const w1 = (
    //   w.times(a).eq(-1) ? w : w.plus(a).div(w.times(a).plus(1)).plus(1)
    // ).div(2.0)
    const w1 = (w * a === -1 ? w : (w + a) / (w * a + 1) + 1) / 2;
    const w2 = 1 - w1;
    return rgb2RGBColor({
        r: w1 * c1.getRed() + w2 * c2.getRed(),
        g: w1 * c1.getGreen() + w2 * c2.getGreen(),
        b: w1 * c1.getBlue() + w2 * c2.getBlue(),
        a: c1.getRawAlpha() * p + c2.getRawAlpha() * (1 - p)
    });
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
    return (r * 38 + g * 75 + b * 15) >> 7;
}
function invert(value) {
    const color = Color(value).rgb();
    return color
        .setRed(255 - color.getRed())
        .setGreen(255 - color.getGreen())
        .setBlue(255 - color.getBlue());
}
function complement(value) {
    return Color(value).hsl().rotate(180);
}
/**
 * 是否深色调
 * @param {String} value
 */
function isDark(value) {
    const color = Color(value).rgb();
    return rgb2Gray(color.getRed(), color.getGreen(), color.getBlue()) < 128;
}
/**
 * 是否浅色调
 * @param {String} value
 */
function isLight(value) {
    return !isDark(value);
}
function grayscale(value) {
    const color = Color(value).rgb();
    const gray = Math.round(rgb2Gray(color.getRed(), color.getGreen(), color.getBlue()));
    return color.setRed(gray).setGreen(gray).setBlue(gray);
}

function decimal2Ratio(number) {
    return (Math.round(number / 2.55) / 100).toFixed(2);
}
function translate(color) {
    const rgba = Color(color).rgb();
    const { r, g, b } = rgba.toObject();
    const a = (rgba._a * 255).toFixed(0);
    const rR = decimal2Ratio(r);
    const rG = decimal2Ratio(g);
    const rB = decimal2Ratio(b);
    const rA = rgba._a.toFixed(2);
    const ahex = '#' + rgba.hex().getAlphaHex() + rgba.hex().toHex().substr(1);
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
    };
}

const Colorfuls = function Colorfuls(color) {
    return Color(color);
};
Colorfuls.Color = Color;
Colorfuls.mix = mix;
Colorfuls.invert = invert;
Colorfuls.complement = complement;
Colorfuls.isDark = isDark;
Colorfuls.isLight = isLight;
Colorfuls.grayscale = grayscale;
Colorfuls.translate = translate;

export { Colorfuls as default };
