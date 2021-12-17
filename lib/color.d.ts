export declare type PercentageLike = number | string;
/**
 * 是否hex/hexa
 * @param {string} color
 * @returns boolean
 */
export declare function isHexString(color: string): boolean;
/**
 * 是否rgb/rgba
 * @param {string} color
 * @returns boolean
 */
export declare function isRgbString(color: string): boolean;
/**
 * 是否hsl/hsla
 * @param {string} color
 * @returns boolean
 */
export declare function isHslString(color: string): boolean;
declare class BaseColor {
    _a: number;
    constructor(a?: PercentageLike, raw?: boolean);
    getAlpha(): number;
    setAlpha(value?: PercentageLike): this;
    getRawAlpha(): number;
    /**
     * 增加透明度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    fadeOut(ratio: number | string): this;
    /**
     * 降低透明度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    fadeIn(ratio: PercentageLike): this;
    /**
     * 增加透明度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    fade(ratio: PercentageLike): this;
    /**
     * 降低透明度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    opaque(ratio: PercentageLike): this;
}
/**
 * RGBColor 构造
 */
export declare class RGBColor extends BaseColor {
    _r: number;
    _g: number;
    _b: number;
    /**
     * 构造器
     * @param {Number} r 红色通道
     * @param {Number} g 绿色通道
     * @param {Number} b 蓝色通道
     * @param {Number|String} a 透明通道
     */
    constructor(r: number | PercentageLike, g: number | PercentageLike, b: number | PercentageLike, a?: PercentageLike, raw?: boolean);
    getRed(): number;
    setRed(value: number | PercentageLike): this;
    getGreen(): number;
    setGreen(value: number | PercentageLike): this;
    getBlue(): number;
    setBlue(value: number | PercentageLike): this;
    rgb(): this;
    hsl(): HSLColor;
    hsv(): HSVColor;
    hex(): HEXColor;
    cmyk(): CMYKColor;
    toRgb(): string;
    toRgba(): string;
    toString(): string;
    toArray(): number[];
    toObject(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    toRawArray(): number[];
    toRawObject(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
/**
 * HSA 构造
 */
export declare class HSA extends BaseColor {
    _h: number;
    _s: number;
    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number} a 透明通道
     */
    constructor(h: number, s: PercentageLike, a?: PercentageLike, raw?: boolean);
    getHue(): string;
    setHue(degree?: number | string): this;
    getSaturation(): string;
    setSaturation(value: PercentageLike): this;
    /**
     * 调整色相
     * @param {Number} degree 加权角度值
     */
    rotate(degree: number): this;
    /**
     * 增加饱和度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    saturate(ratio: PercentageLike): this;
    /**
     * 降低饱和度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    desaturate(ratio: PercentageLike): this;
}
/**
 * HSLColor 构造
 */
export declare class HSLColor extends HSA {
    _l: number;
    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number|String} l 亮度 0-100%
     * @param {Number} a 透明通道
     */
    constructor(h: number, s: PercentageLike, l: PercentageLike, a?: PercentageLike, raw?: boolean);
    /**
     * 获取/设置亮度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    getLightness(): string;
    setLightness(value: PercentageLike): this;
    /**
     * 增加亮度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    lighten(ratio: PercentageLike): this;
    /**
     * 降低亮度
     * @param {Number|String} ratio 比值 0.5/50%
     */
    darken(ratio: PercentageLike): this;
    hsl(): this;
    rgb(): RGBColor;
    hex(): HEXColor;
    cmyk(): CMYKColor;
    hsv(): HSVColor;
    toHsl(): string;
    toHsla(): string;
    toString(): string;
    toArray(): (string | number)[];
    toObject(): {
        h: string | number;
        s: string | number;
        l: string | number;
        a: string | number;
    };
    toRawArray(): number[];
    toRawObject(): {
        h: number;
        s: number;
        l: number;
        a: number;
    };
}
/**
 * HSVColor 构造
 */
export declare class HSVColor extends HSA {
    _v: number;
    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number|String} v 色调 0-100%
     * @param {Number} a 透明通道
     */
    constructor(h: number, s: PercentageLike, v: PercentageLike, a?: PercentageLike, raw?: boolean);
    getValue(): string;
    setValue(value: PercentageLike): this;
    hsv(): this;
    rgb(): RGBColor;
    hex(): HEXColor;
    cmyk(): CMYKColor;
    hsl(): HSLColor;
    toHsv(): string;
    toHsva(): string;
    toString(): string;
    toArray(): (string | number)[];
    toObject(): {
        h: string | number;
        s: string | number;
        v: string | number;
        a: string | number;
    };
    toRawArray(): number[];
    toRawObject(): {
        h: number;
        s: number;
        v: number;
        a: number;
    };
}
/**
 * HEX 构造器
 */
export declare class HEXColor extends BaseColor {
    _r: number;
    _g: number;
    _b: number;
    _hex: string;
    constructor(r: number, g: number, b: number, a?: PercentageLike, raw?: boolean);
    getAlphaHex(): string;
    setAlphaHex(value?: string): void;
    hex(): this;
    rgb(): RGBColor;
    hsl(): HSLColor;
    hsv(): HSVColor;
    cmyk(): CMYKColor;
    toHex(): string;
    toHexa(): string;
    toString(): string;
    toArray(): string[];
    toObject(): {
        r: string;
        g: string;
        b: string;
        a: string;
    };
    toRawArray(): number[];
    toRawObject(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
export declare class CMYKColor extends BaseColor {
    _c: number;
    _m: number;
    _y: number;
    _k: number;
    constructor(c: PercentageLike, m: PercentageLike, y: PercentageLike, k: PercentageLike, a?: PercentageLike, raw?: boolean);
    getCyan(): string;
    setCyan(value: PercentageLike): this;
    getMagenta(): string;
    setMagenta(value: PercentageLike): this;
    getYellow(): string;
    setYellow(value: PercentageLike): this;
    getBlack(): string;
    setBlack(value: PercentageLike): this;
    cmyk(): this;
    rgb(): RGBColor;
    hsl(): HSLColor;
    hsv(): HSVColor;
    hex(): HEXColor;
    toCmyk(): string;
    toString(): string;
    toArray(): string[];
    toObject(): {
        c: string;
        m: string;
        y: string;
        k: string;
    };
    toRawArray(): number[];
    toRawObject(): {
        c: number;
        m: number;
        y: number;
        k: number;
    };
}
interface RGBOptions {
    r: PercentageLike;
    g: PercentageLike;
    b: PercentageLike;
    a?: PercentageLike;
}
/**
 * rgb/rgba色值转为RGBA对象
 * @param rgba rgb(255,0,0)/rgba(255,0,0,.5)
 */
export declare function rgb2RGBColor(rgba: string | RGBOptions): RGBColor;
/**
 * hex/hexa色值转为HEXA对象
 * @param {string} hex #ff0000/#ff000080
 */
export declare function hex2HEXColor(hexa: string): HEXColor;
interface HSLOptions {
    h: number;
    s: PercentageLike;
    l: PercentageLike;
    a?: PercentageLike;
}
/**
 * hsl/hsla色值转为HSLA对象
 * @param hsla 颜色值
 */
export declare function hsl2HSLColor(hsla: string | HSLOptions): HSLColor;
interface HSVOptions {
    h: number;
    s: PercentageLike;
    v: PercentageLike;
    a?: PercentageLike;
}
/**
 * hsv/hsva色值转为HSVA对象
 * @param hsva 颜色值
 */
export declare function hsv2HSVColor(hsva: HSVOptions): HSVColor;
interface CMYKOptions {
    c: PercentageLike;
    m: PercentageLike;
    y: PercentageLike;
    k: PercentageLike;
}
/**
 * hsv/hsva色值转为HSVA对象
 * @param {String|{h:String|Number,s:String|Number,v:String|Number,a?:Number}} hsva 颜色值
 */
export declare function cmyk2CMYK(cmyk: CMYKOptions): CMYKColor;
/**
 * 克隆颜色对象
 * @param {RGBColor|RGBColor|HEXColor} object
 */
export declare function clone(object: RGBColor | HEXColor | HSVColor | HSLColor | CMYKColor): RGBColor | HSLColor | HSVColor | HEXColor | CMYKColor;
export declare type ColorOptions = string | RGBOptions | CMYKOptions | HSVOptions | HSLOptions | RGBColor | HSLColor | HEXColor | HSVColor | CMYKColor;
/**
 * 颜色构造器
 * @param value 颜色值
 */
export declare function Color(value: ColorOptions): RGBColor | HSLColor | HSVColor | HEXColor | CMYKColor;
export default Color;
