import type { ColorOptions } from './color';
/**
 * 反色
 * @param value 颜色值
 * @returns Color实例
 */
export declare function invert(value: ColorOptions): import("./color").RGBColor;
/**
 * 补色
 * @param value 颜色值
 * @returns Color实例
 */
export declare function complement(value: ColorOptions): import("./color").HSLColor;
/**
 * 相近色
 * @param value 颜色值
 * @returns Color实例
 */
export declare function nears(value: ColorOptions): import("./color").HSLColor[];
/**
 * 对比色
 * @param value 颜色值
 * @returns Color实例
 */
export declare function contrasts(value: ColorOptions): import("./color").HSLColor[];
/**
 * 是否深色调
 * @param value 颜色值
 */
export declare function isDark(value: ColorOptions): boolean;
/**
 * 是否浅色调
 * @param value 颜色值
 */
export declare function isLight(value: ColorOptions): boolean;
/**
 * 转为灰度色
 * @param value 颜色值
 * @returns Color实例
 */
export declare function grayscale(value: ColorOptions): import("./color").RGBColor;
