import { ColorOptions, PercentageLike } from './color';
/**
 * 混合颜色
 * @param {String} color1 颜色值或者实例1
 * @param {String} color2 颜色值或者实例2
 * @param {String|Number} weight 权重 0.5/50%
 * @see https://sass-lang.com/documentation/values/colors
 */
export declare function mix(color1: ColorOptions, color2: ColorOptions, weight?: PercentageLike): import("./color").RGBColor;
