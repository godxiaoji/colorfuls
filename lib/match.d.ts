import { ColorOptions } from './color';
export declare function invert(value: ColorOptions): import("./color").RGBColor;
export declare function complement(value: ColorOptions): import("./color").HSLColor;
export declare function nears(value: ColorOptions): import("./color").HSLColor[];
export declare function contrasts(value: ColorOptions): import("./color").HSLColor[];
/**
 * 是否深色调
 * @param {String} value
 */
export declare function isDark(value: ColorOptions): boolean;
/**
 * 是否浅色调
 * @param {String} value
 */
export declare function isLight(value: ColorOptions): boolean;
export declare function grayscale(value: ColorOptions): import("./color").RGBColor;
