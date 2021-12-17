import { Color, ColorOptions } from './color';
import { mix } from './mix';
import { invert, complement, isDark, isLight, grayscale } from './match';
import { translate } from './translate';
declare const Colorfuls: {
    (color: ColorOptions): import("./color").RGBColor | import("./color").HSLColor | import("./color").HEXColor | import("./color").HSVColor | import("./color").CMYKColor;
    Color: typeof Color;
    mix: typeof mix;
    invert: typeof invert;
    complement: typeof complement;
    isDark: typeof isDark;
    isLight: typeof isLight;
    grayscale: typeof grayscale;
    translate: typeof translate;
};
export default Colorfuls;
