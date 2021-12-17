export declare function number2Percentage(number: number): string;
/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
export declare function isNumeric(object: unknown): boolean;
/**
 * 是否百分比值
 * @param {any} object 值
 */
export declare function isPercentage(object: unknown): boolean;
/**
 * 是否限制的百分比值
 * @param {any} object 值
 * @param {Number} min 最小范围
 * @param {Number} max 最大范围
 */
export declare function isLimitPercentage(object: unknown, min?: number, max?: number): boolean;
/**
 * 数值转16进制
 * @param {Number} num 数值
 * @param {Number} width 多少位
 */
export declare function decimal2Hex(num: number, width: number): string;
/**
 * 数值限定范围
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
export declare function numberRange(value: number, min?: number, max?: number): number;
/**
 * 百分比转数值0-1
 * @param {String|number} value 100%/0.1
 */
export declare function percentage2Length(value: string | number): number;
