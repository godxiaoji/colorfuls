(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es.regexp.exec.js'), require('core-js/modules/es.string.trim.js'), require('core-js/modules/es.object.to-string.js'), require('core-js/modules/es.regexp.to-string.js'), require('core-js/modules/es.number.to-fixed.js'), require('core-js/modules/es.array.join.js'), require('core-js/modules/es.array.slice.js'), require('core-js/modules/es.promise.js'), require('core-js/modules/es.array.concat.js')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/es.regexp.exec.js', 'core-js/modules/es.string.trim.js', 'core-js/modules/es.object.to-string.js', 'core-js/modules/es.regexp.to-string.js', 'core-js/modules/es.number.to-fixed.js', 'core-js/modules/es.array.join.js', 'core-js/modules/es.array.slice.js', 'core-js/modules/es.promise.js', 'core-js/modules/es.array.concat.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Colorfuls = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    Object.defineProperty(subClass, "prototype", {
      value: Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      }),
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function number2Percentage(number) {
    return (number * 100).toFixed(0) + '%';
  }
  /**
   * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
   * @param {any} object 值
   */

  function isNumeric(object) {
    return typeof object === 'number' && isFinite(object) || typeof object === 'string' && !isNaN(parseFloat(object)) && isFinite(parseFloat(object));
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

  function isLimitPercentage(object) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    if (isPercentage(object)) {
      var value = parseFloat(object);
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
    var hex = '0123456789abcdef';
    var s = '';

    while (num) {
      s = hex.charAt(num % 16) + s;
      num = Math.floor(num / 16);
    }

    if (typeof width === 'undefined' || width <= s.length) {
      return s.toUpperCase();
    }

    var delta = width - s.length;
    var padding = '';

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

  function numberRange(value) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
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
    return r * 38 + g * 75 + b * 15 >> 7;
  }

  var hexRegex = /^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i;
  var rgbRegex = /^rgb[a]?[(][\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,[\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,[\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,?[\s]*(0?\.\d{1,16}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;
  var hslRegex = /^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)(deg)*[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,16}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;
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
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h;
    var s;
    var l = (max + min) / 2;

    if (l === 0 || max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }

      h = h / 6;
    }

    return {
      h: h,
      s: s,
      l: l
    };
  }

  function _rgb2hsv(r, g, b) {
    var h = 0;
    var s = 0;
    var v = 0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    v = max;

    if (max === 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }

    var d = max - min;

    if (max === min) {
      h = 0;
    } else if (max === r && g >= b) {
      h = 60 * (g - b) / d + 0;
    } else if (max === r && g < b) {
      h = 60 * (g - b) / d + 360;
    } else if (max === g) {
      h = 60 * (b - r) / d + 120;
    } else if (max === b) {
      h = h = 60 * (r - g) / d + 240;
    }

    h = h / 360;
    return {
      h: h,
      s: s,
      v: v
    };
  }

  function _hsv2rgb(h, s, v) {
    var r = 0;
    var g = 0;
    var b = 0; // const i = Math.floor(h.times(6).mod(6))

    var i = Math.floor(h * 6 % 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - s * f);
    var t = v * (1 - s * (1 - f));

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
      r: r,
      g: g,
      b: b
    };
  }

  function _hsv2hsl(h, s, v) {
    // s.times(v).div((h = big(2).minus(s).times(v)).lt(num1) ? h : big(2).minus(h)) || num0,
    return {
      h: h,
      s: s * v / ((h = (2 - s) * v) < 1 ? h : 2 - h) || 0,
      l: h / 2
    };
  }

  function _rgb2hex(r, g, b) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    var str = (r << 16 | g << 8 | b).toString(16);

    for (var i = 0, len = 6 - str.length; i < len; i++) {
      str = '0' + str;
    }

    return '#' + str.toUpperCase();
  }

  function _hsl2rgb(h, s, l) {
    var r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      var p2 = l < 0.5 ? l * (s + 1) : l + s - l * s;
      var p1 = l * 2 - p2;
      r = hue2rgb(p1, p2, h + 1 / 3);
      g = hue2rgb(p1, p2, h);
      b = hue2rgb(p1, p2, h - 1 / 3);
    }

    return {
      r: r,
      g: g,
      b: b
    };
  }

  function _cmyk2rgb(c, m, y, k) {
    var t = 1 - k;
    return {
      r: (1 - c) * t,
      g: (1 - m) * t,
      b: (1 - y) * t
    };
  }

  function _rgb2cmyk(r, g, b) {
    var k = 1 - Math.max(r, g, b);
    return {
      c: (1 - r - k) / (1 - k),
      m: (1 - g - k) / (1 - k),
      y: (1 - b - k) / (1 - k),
      k: k
    };
  }

  function parseAlpha(value) {
    var opacity = 1;

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
    throw new Error("Parameter should be number/percentage instead of ".concat(_typeof(value)));
  }

  function setRatio(color, key, value) {
    if (isNumeric(value)) {
      color[key] = channel2Length(value);
    } else {
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
    } else {
      throwPercentageLikeError(value);
    }

    return color;
  }

  var BaseColor = /*#__PURE__*/function () {
    function BaseColor(a) {
      var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _classCallCheck(this, BaseColor);

      this._a = 1;

      if (raw) {
        this._a = a;
      } else {
        this.setAlpha(a);
      }
    }

    _createClass(BaseColor, [{
      key: "getAlpha",
      value: function getAlpha() {
        return parseFloat(this._a.toFixed(2));
      }
    }, {
      key: "setAlpha",
      value: function setAlpha(value) {
        if (typeof value === 'undefined') {
          this._a = 1;
        } else if (isNumeric(value)) {
          this._a = parseAlpha(value);
        } else {
          throwPercentageLikeError(value);
        }

        return this;
      }
    }, {
      key: "getRawAlpha",
      value: function getRawAlpha() {
        return this._a;
      }
      /**
       * 增加透明度
       * @param {Number|String} ratio 比值 0.5/50%
       */

    }, {
      key: "fadeOut",
      value: function fadeOut(ratio) {
        this._a = channelDown(this._a, ratio);
        return this;
      }
      /**
       * 降低透明度
       * @param {Number|String} ratio 比值 0.5/50%
       */

    }, {
      key: "fadeIn",
      value: function fadeIn(ratio) {
        this._a = channelUp(this._a, ratio);
        return this;
      }
      /**
       * 增加透明度
       * @param {Number|String} ratio 比值 0.5/50%
       */

    }, {
      key: "fade",
      value: function fade(ratio) {
        return this.fadeOut(ratio);
      }
      /**
       * 降低透明度
       * @param {Number|String} ratio 比值 0.5/50%
       */

    }, {
      key: "opaque",
      value: function opaque(ratio) {
        return this.fadeIn(ratio);
      }
    }]);

    return BaseColor;
  }();
  /**
   * RGBColor 构造
   */


  var RGBColor = /*#__PURE__*/function (_BaseColor) {
    _inherits(RGBColor, _BaseColor);

    var _super = _createSuper(RGBColor);

    /**
     * 构造器
     * @param {Number} r 红色通道
     * @param {Number} g 绿色通道
     * @param {Number} b 蓝色通道
     * @param {Number|String} a 透明通道
     */
    function RGBColor(r, g, b, a) {
      var _this;

      var raw = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      _classCallCheck(this, RGBColor);

      _this = _super.call(this, a, raw);
      _this._r = r;
      _this._g = g;
      _this._b = b;

      if (!raw) {
        _this.setRed(r);

        _this.setGreen(g);

        _this.setBlue(b);
      }

      return _this;
    }

    _createClass(RGBColor, [{
      key: "getRed",
      value: function getRed() {
        return getChannel(this, '_r');
      }
    }, {
      key: "setRed",
      value: function setRed(value) {
        return setChannel(this, '_r', value);
      }
    }, {
      key: "getGreen",
      value: function getGreen() {
        return getChannel(this, '_g');
      }
    }, {
      key: "setGreen",
      value: function setGreen(value) {
        return setChannel(this, '_g', value);
      }
    }, {
      key: "getBlue",
      value: function getBlue() {
        return getChannel(this, '_b');
      }
    }, {
      key: "setBlue",
      value: function setBlue(value) {
        return setChannel(this, '_b', value);
      }
    }, {
      key: "rgb",
      value: function rgb() {
        return this;
      }
    }, {
      key: "hsl",
      value: function hsl() {
        var _rgb2hsl2 = _rgb2hsl(this._r, this._g, this._b),
            h = _rgb2hsl2.h,
            s = _rgb2hsl2.s,
            l = _rgb2hsl2.l;

        return new HSLColor(h, s, l, this._a, true);
      }
    }, {
      key: "hsv",
      value: function hsv() {
        var _rgb2hsv2 = _rgb2hsv(this._r, this._g, this._b),
            h = _rgb2hsv2.h,
            s = _rgb2hsv2.s,
            v = _rgb2hsv2.v;

        return new HSVColor(h, s, v, this._a, true);
      }
    }, {
      key: "hex",
      value: function hex() {
        return new HEXColor(this._r, this._g, this._b, this._a, true);
      }
    }, {
      key: "cmyk",
      value: function cmyk() {
        var _rgb2cmyk2 = _rgb2cmyk(this._r, this._g, this._b),
            c = _rgb2cmyk2.c,
            m = _rgb2cmyk2.m,
            y = _rgb2cmyk2.y,
            k = _rgb2cmyk2.k;

        return new CMYKColor(c, m, y, k, this._a, true);
      }
    }, {
      key: "toRgb",
      value: function toRgb() {
        return "rgb(".concat(this.toArray().slice(0, 3).join(', '), ")");
      }
    }, {
      key: "toRgba",
      value: function toRgba() {
        return "rgba(".concat(this.toArray().join(', '), ")");
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.toRgba();
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.getRed(), this.getGreen(), this.getBlue(), this.getAlpha()];
      }
    }, {
      key: "toObject",
      value: function toObject() {
        var _this$toArray = this.toArray(),
            _this$toArray2 = _slicedToArray(_this$toArray, 4),
            r = _this$toArray2[0],
            g = _this$toArray2[1],
            b = _this$toArray2[2],
            a = _this$toArray2[3];

        return {
          r: r,
          g: g,
          b: b,
          a: a
        };
      }
    }, {
      key: "toRawArray",
      value: function toRawArray() {
        return [this._r, this._g, this._b, this._a];
      }
    }, {
      key: "toRawObject",
      value: function toRawObject() {
        var _this$toRawArray = this.toRawArray(),
            _this$toRawArray2 = _slicedToArray(_this$toRawArray, 4),
            r = _this$toRawArray2[0],
            g = _this$toRawArray2[1],
            b = _this$toRawArray2[2],
            a = _this$toRawArray2[3];

        return {
          r: r,
          g: g,
          b: b,
          a: a
        };
      }
    }, {
      key: "isDark",
      value: function isDark() {
        return rgb2Gray(this.getRed(), this.getGreen(), this.getBlue()) < 192;
      }
    }, {
      key: "isLight",
      value: function isLight() {
        return !this.isDark();
      }
    }]);

    return RGBColor;
  }(BaseColor);
  /**
   * HSA 构造
   */

  var HSA = /*#__PURE__*/function (_BaseColor2) {
    _inherits(HSA, _BaseColor2);

    var _super2 = _createSuper(HSA);

    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number} a 透明通道
     */
    function HSA(h, s, a) {
      var _this2;

      var raw = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      _classCallCheck(this, HSA);

      _this2 = _super2.call(this, a, raw);
      _this2._h = h;
      _this2._s = s;

      if (!raw) {
        _this2.setHue(h);

        _this2.setSaturation(s);
      }

      return _this2;
    }

    _createClass(HSA, [{
      key: "getHue",
      value: function getHue() {
        return "".concat(Math.round(this._h * 360), "deg");
      }
    }, {
      key: "setHue",
      value: function setHue(degree) {
        if (isNumeric(degree)) {
          this._h = numberRange(parseFloat(degree), 0, 360) / 360;
        } else {
          throw new Error("Parameter should be number instead of ".concat(_typeof(degree)));
        }

        return this;
      }
    }, {
      key: "getSaturation",
      value: function getSaturation() {
        return number2Percentage(this._s);
      }
    }, {
      key: "setSaturation",
      value: function setSaturation(value) {
        return setRatio(this, '_s', value);
      }
      /**
       * 调整色相
       * @param {Number} degree 加权角度值
       */

    }, {
      key: "rotate",
      value: function rotate(degree) {
        if (isNumeric(degree)) {
          // this._h = this._h.plus(big(parseFloat(degree)).div(360).plus(1)).mod(1)
          this._h = (this._h + degree / 360 + 1) % 1;
        } else {
          throw new Error("Parameter should be number instead of ".concat(_typeof(degree)));
        }

        return this;
      }
      /**
       * 增加饱和度
       * @param {Number|String} ratio 比值 0.5/50%
       */

    }, {
      key: "saturate",
      value: function saturate(ratio) {
        this._s = channelUp(this._s, ratio);
        return this;
      }
      /**
       * 降低饱和度
       * @param {Number|String} ratio 比值 0.5/50%
       */

    }, {
      key: "desaturate",
      value: function desaturate(ratio) {
        this._s = channelDown(this._s, ratio);
        return this;
      }
    }]);

    return HSA;
  }(BaseColor);
  /**
   * HSLColor 构造
   */

  var HSLColor = /*#__PURE__*/function (_HSA) {
    _inherits(HSLColor, _HSA);

    var _super3 = _createSuper(HSLColor);

    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number|String} l 亮度 0-100%
     * @param {Number} a 透明通道
     */
    function HSLColor(h, s, l, a) {
      var _this3;

      var raw = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      _classCallCheck(this, HSLColor);

      _this3 = _super3.call(this, h, s, a, raw);
      _this3._l = l;

      if (!raw) {
        _this3.setLightness(l);
      }

      return _this3;
    }
    /**
     * 获取/设置亮度
     * @param {Number|String} ratio 比值 0.5/50%
     */


    _createClass(HSLColor, [{
      key: "getLightness",
      value: function getLightness() {
        return number2Percentage(this._l);
      }
    }, {
      key: "setLightness",
      value: function setLightness(value) {
        return setRatio(this, '_l', value);
      }
      /**
       * 增加亮度
       * @param {Number|String} ratio 比值 0.5/50%
       */

    }, {
      key: "lighten",
      value: function lighten(ratio) {
        this._l = channelUp(this._l, ratio);
        return this;
      }
      /**
       * 降低亮度
       * @param {Number|String} ratio 比值 0.5/50%
       */

    }, {
      key: "darken",
      value: function darken(ratio) {
        this._l = channelDown(this._l, ratio);
        return this;
      }
    }, {
      key: "hsl",
      value: function hsl() {
        return this;
      }
    }, {
      key: "rgb",
      value: function rgb() {
        var _hsl2rgb2 = _hsl2rgb(this._h, this._s, this._l),
            r = _hsl2rgb2.r,
            g = _hsl2rgb2.g,
            b = _hsl2rgb2.b;

        return new RGBColor(r, g, b, this._a, true);
      }
    }, {
      key: "hex",
      value: function hex() {
        return this.rgb().hex();
      }
    }, {
      key: "cmyk",
      value: function cmyk() {
        return this.rgb().cmyk();
      }
    }, {
      key: "hsv",
      value: function hsv() {
        return this.rgb().hsv();
      }
    }, {
      key: "toHsl",
      value: function toHsl() {
        return "hsl(".concat(this.toArray().slice(0, 3).join(', '), ")");
      }
    }, {
      key: "toHsla",
      value: function toHsla() {
        return "hsla(".concat(this.toArray().join(', '), ")");
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.toHsla();
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.getHue(), this.getSaturation(), this.getLightness(), this.getAlpha()];
      }
    }, {
      key: "toObject",
      value: function toObject() {
        var _this$toArray3 = this.toArray(),
            _this$toArray4 = _slicedToArray(_this$toArray3, 4),
            h = _this$toArray4[0],
            s = _this$toArray4[1],
            l = _this$toArray4[2],
            a = _this$toArray4[3];

        return {
          h: h,
          s: s,
          l: l,
          a: a
        };
      }
    }, {
      key: "toRawArray",
      value: function toRawArray() {
        return [this._h, this._s, this._l, this._a];
      }
    }, {
      key: "toRawObject",
      value: function toRawObject() {
        var _this$toRawArray3 = this.toRawArray(),
            _this$toRawArray4 = _slicedToArray(_this$toRawArray3, 4),
            h = _this$toRawArray4[0],
            s = _this$toRawArray4[1],
            l = _this$toRawArray4[2],
            a = _this$toRawArray4[3];

        return {
          h: h,
          s: s,
          l: l,
          a: a
        };
      }
    }, {
      key: "isDark",
      value: function isDark() {
        return this.rgb().isDark();
      }
    }, {
      key: "isLight",
      value: function isLight() {
        return this.rgb().isLight();
      }
    }]);

    return HSLColor;
  }(HSA);
  /**
   * HSVColor 构造
   */

  var HSVColor = /*#__PURE__*/function (_HSA2) {
    _inherits(HSVColor, _HSA2);

    var _super4 = _createSuper(HSVColor);

    /**
     * 构造器
     * @param {Number} h 色相 0-360
     * @param {Number|String} s 饱和度 0-100%
     * @param {Number|String} v 色调 0-100%
     * @param {Number} a 透明通道
     */
    function HSVColor(h, s, v, a) {
      var _this4;

      var raw = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      _classCallCheck(this, HSVColor);

      _this4 = _super4.call(this, h, s, a, raw);
      _this4._v = v;

      if (!raw) {
        _this4.setValue(v);
      }

      return _this4;
    }

    _createClass(HSVColor, [{
      key: "getValue",
      value: function getValue() {
        return number2Percentage(this._v);
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        return setRatio(this, '_v', value);
      }
    }, {
      key: "hsv",
      value: function hsv() {
        return this;
      }
    }, {
      key: "rgb",
      value: function rgb() {
        var _hsv2rgb2 = _hsv2rgb(this._h, this._s, this._v),
            r = _hsv2rgb2.r,
            g = _hsv2rgb2.g,
            b = _hsv2rgb2.b;

        return new RGBColor(r, g, b, this._a, true);
      }
    }, {
      key: "hex",
      value: function hex() {
        return this.rgb().hex();
      }
    }, {
      key: "cmyk",
      value: function cmyk() {
        return this.rgb().cmyk();
      }
    }, {
      key: "hsl",
      value: function hsl() {
        var _hsv2hsl2 = _hsv2hsl(this._h, this._s, this._v),
            h = _hsv2hsl2.h,
            s = _hsv2hsl2.s,
            l = _hsv2hsl2.l;

        return new HSLColor(h, s, l, this._a, true);
      }
    }, {
      key: "toHsv",
      value: function toHsv() {
        return this.toArray().slice(0, 3).join(', ');
      }
    }, {
      key: "toHsva",
      value: function toHsva() {
        return this.toArray().join(', ');
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.toHsva();
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.getHue(), this.getSaturation(), this.getValue(), this.getAlpha()];
      }
    }, {
      key: "toObject",
      value: function toObject() {
        var _this$toArray5 = this.toArray(),
            _this$toArray6 = _slicedToArray(_this$toArray5, 4),
            h = _this$toArray6[0],
            s = _this$toArray6[1],
            v = _this$toArray6[2],
            a = _this$toArray6[3];

        return {
          h: h,
          s: s,
          v: v,
          a: a
        };
      }
    }, {
      key: "toRawArray",
      value: function toRawArray() {
        return [this._h, this._s, this._v, this._a];
      }
    }, {
      key: "toRawObject",
      value: function toRawObject() {
        var _this$toRawArray5 = this.toRawArray(),
            _this$toRawArray6 = _slicedToArray(_this$toRawArray5, 4),
            h = _this$toRawArray6[0],
            s = _this$toRawArray6[1],
            v = _this$toRawArray6[2],
            a = _this$toRawArray6[3];

        return {
          h: h,
          s: s,
          v: v,
          a: a
        };
      }
    }, {
      key: "isDark",
      value: function isDark() {
        return this.rgb().isDark();
      }
    }, {
      key: "isLight",
      value: function isLight() {
        return this.rgb().isLight();
      }
    }]);

    return HSVColor;
  }(HSA);
  /**
   * HEX 构造器
   */

  var HEXColor = /*#__PURE__*/function (_BaseColor3) {
    _inherits(HEXColor, _BaseColor3);

    var _super5 = _createSuper(HEXColor);

    function HEXColor(r, g, b, a) {
      var _this5;

      var raw = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      _classCallCheck(this, HEXColor);

      _this5 = _super5.call(this, a, raw);
      _this5._r = r;
      _this5._g = g;
      _this5._b = b;
      _this5._hex = _rgb2hex(r, g, b);
      return _this5;
    }

    _createClass(HEXColor, [{
      key: "getAlphaHex",
      value: function getAlphaHex() {
        return decimal2Hex(this._a, 2);
      }
    }, {
      key: "setAlphaHex",
      value: function setAlphaHex(value) {
        this.setAlpha(parseInt('0x' + value) / 255);
      }
    }, {
      key: "hex",
      value: function hex() {
        return this;
      }
    }, {
      key: "rgb",
      value: function rgb() {
        return new RGBColor(this._r, this._g, this._b, this._a, true);
      }
    }, {
      key: "hsl",
      value: function hsl() {
        return this.rgb().hsl();
      }
    }, {
      key: "hsv",
      value: function hsv() {
        return this.rgb().hsv();
      }
    }, {
      key: "cmyk",
      value: function cmyk() {
        return this.rgb().cmyk();
      }
    }, {
      key: "toHex",
      value: function toHex() {
        return this._hex;
      }
    }, {
      key: "toHexa",
      value: function toHexa() {
        return this._hex + this.getAlphaHex();
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.toHexa();
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this._hex.slice(1, 3), this._hex.slice(3, 5), this._hex.slice(5, 7), this.getAlphaHex()];
      }
    }, {
      key: "toObject",
      value: function toObject() {
        var _this$toArray7 = this.toArray(),
            _this$toArray8 = _slicedToArray(_this$toArray7, 4),
            r = _this$toArray8[0],
            g = _this$toArray8[1],
            b = _this$toArray8[2],
            a = _this$toArray8[3];

        return {
          r: r,
          g: g,
          b: b,
          a: a
        };
      }
    }, {
      key: "toRawArray",
      value: function toRawArray() {
        return [this._r, this._g, this._b, this._a];
      }
    }, {
      key: "toRawObject",
      value: function toRawObject() {
        var _this$toRawArray7 = this.toRawArray(),
            _this$toRawArray8 = _slicedToArray(_this$toRawArray7, 4),
            r = _this$toRawArray8[0],
            g = _this$toRawArray8[1],
            b = _this$toRawArray8[2],
            a = _this$toRawArray8[3];

        return {
          r: r,
          g: g,
          b: b,
          a: a
        };
      }
    }, {
      key: "isDark",
      value: function isDark() {
        return this.rgb().isDark();
      }
    }, {
      key: "isLight",
      value: function isLight() {
        return this.rgb().isLight();
      }
    }]);

    return HEXColor;
  }(BaseColor);
  var CMYKColor = /*#__PURE__*/function (_BaseColor4) {
    _inherits(CMYKColor, _BaseColor4);

    var _super6 = _createSuper(CMYKColor);

    function CMYKColor(c, m, y, k, a) {
      var _this6;

      var raw = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

      _classCallCheck(this, CMYKColor);

      // cmyk没有透明通道，存储只是为了防止转化丢失
      _this6 = _super6.call(this, a, raw);
      _this6._c = c;
      _this6._m = m;
      _this6._y = y;
      _this6._k = k;

      if (!raw) {
        _this6.setCyan(c);

        _this6.setMagenta(m);

        _this6.setYellow(y);

        _this6.setBlack(k);
      }

      return _this6;
    }

    _createClass(CMYKColor, [{
      key: "getCyan",
      value: function getCyan() {
        return number2Percentage(this._c);
      }
    }, {
      key: "setCyan",
      value: function setCyan(value) {
        return setRatio(this, '_c', value);
      }
    }, {
      key: "getMagenta",
      value: function getMagenta() {
        return number2Percentage(this._m);
      }
    }, {
      key: "setMagenta",
      value: function setMagenta(value) {
        return setRatio(this, '_m', value);
      }
    }, {
      key: "getYellow",
      value: function getYellow() {
        return number2Percentage(this._y);
      }
    }, {
      key: "setYellow",
      value: function setYellow(value) {
        return setRatio(this, '_y', value);
      }
    }, {
      key: "getBlack",
      value: function getBlack() {
        return number2Percentage(this._k);
      }
    }, {
      key: "setBlack",
      value: function setBlack(value) {
        return setRatio(this, '_k', value);
      }
    }, {
      key: "cmyk",
      value: function cmyk() {
        return this;
      }
    }, {
      key: "rgb",
      value: function rgb() {
        var _cmyk2rgb2 = _cmyk2rgb(this._c, this._m, this._y, this._k),
            r = _cmyk2rgb2.r,
            g = _cmyk2rgb2.g,
            b = _cmyk2rgb2.b;

        return new RGBColor(r, g, b, this._a, true);
      }
    }, {
      key: "hsl",
      value: function hsl() {
        return this.rgb().hsl();
      }
    }, {
      key: "hsv",
      value: function hsv() {
        return this.rgb().hsv();
      }
    }, {
      key: "hex",
      value: function hex() {
        return this.rgb().hex();
      }
    }, {
      key: "toCmyk",
      value: function toCmyk() {
        return this.toArray().join(', ');
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.toCmyk();
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.getCyan(), this.getMagenta(), this.getYellow(), this.getBlack()];
      }
    }, {
      key: "toObject",
      value: function toObject() {
        var _this$toArray9 = this.toArray(),
            _this$toArray10 = _slicedToArray(_this$toArray9, 4),
            c = _this$toArray10[0],
            m = _this$toArray10[1],
            y = _this$toArray10[2],
            k = _this$toArray10[3];

        return {
          c: c,
          m: m,
          y: y,
          k: k
        };
      }
    }, {
      key: "toRawArray",
      value: function toRawArray() {
        return [this._c, this._m, this._y, this._k];
      }
    }, {
      key: "toRawObject",
      value: function toRawObject() {
        var _this$toRawArray9 = this.toRawArray(),
            _this$toRawArray10 = _slicedToArray(_this$toRawArray9, 4),
            c = _this$toRawArray10[0],
            m = _this$toRawArray10[1],
            y = _this$toRawArray10[2],
            k = _this$toRawArray10[3];

        return {
          c: c,
          m: m,
          y: y,
          k: k
        };
      }
    }, {
      key: "isDark",
      value: function isDark() {
        return this.rgb().isDark();
      }
    }, {
      key: "isLight",
      value: function isLight() {
        return this.rgb().isLight();
      }
    }]);

    return CMYKColor;
  }(BaseColor);
  /**
   * rgb/rgba色值转为RGBA对象
   * @param rgba rgb(255,0,0)/rgba(255,0,0,.5)
   */

  function rgb2RGBColor(rgba) {
    if (isRgbString(rgba)) {
      var matches = rgbRegex.exec(rgba.trim()).slice(1, 5);
      return new RGBColor(matches[0], matches[1], matches[2], matches[3]);
    } else if (_typeof(rgba) === 'object' && isNumeric(rgba.r) && isNumeric(rgba.g) && isNumeric(rgba.b)) {
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

    var rH, gH, bH, aH;
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
      var matches = hslRegex.exec(hsla.trim()).slice(1, 6); // ['207', 'deg', '92%', '67%', '0.55']

      return new HSLColor(matches[0], matches[2], matches[3], matches[4]);
    } else if (_typeof(hsla) === 'object' && isNumeric(hsla.h) && isNumeric(hsla.s) && isNumeric(hsla.l)) {
      return new HSLColor(hsla.h, hsla.s, hsla.l, hsla.a);
    }

    throw new Error('It is not a valid hsl/hsla string');
  }
  /**
   * hsv/hsva色值转为HSVA对象
   * @param hsva 颜色值
   */

  function hsv2HSVColor(hsva) {
    if (_typeof(hsva) === 'object' && isNumeric(hsva.h) && isNumeric(hsva.s) && isNumeric(hsva.v)) {
      return new HSVColor(hsva.h, hsva.s, hsva.v, isNumeric(hsva.a) ? hsva.a : 1);
    } else {
      throw new Error('It is not a valid hsv/hsva object');
    }
  }
  /**
   * hsv/hsva色值转为HSVA对象
   * @param {String|{h:String|Number,s:String|Number,v:String|Number,a?:Number}} hsva 颜色值
   */

  function cmyk2CMYK(cmyk) {
    if (_typeof(cmyk) === 'object' && isNumeric(cmyk.c) && isNumeric(cmyk.m) && isNumeric(cmyk.y) && isNumeric(cmyk.k)) {
      return new CMYKColor(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    } else {
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
    } else if (object instanceof HSLColor) {
      return new HSLColor(object._h, object._s, object._l, object._a, true);
    } else if (object instanceof HSVColor) {
      return new HSVColor(object._h, object._s, object._v, object._a, true);
    } else if (object instanceof HEXColor) {
      return new HEXColor(object._r, object._g, object._b, object._a, true);
    } else if (object instanceof CMYKColor) {
      return new CMYKColor(object._c, object._m, object._y, object._k, object._a, true);
    }

    return object;
  }
  /**
   * 颜色构造器
   * @param value 颜色值
   */

  function Color(value) {
    if (_typeof(value) === 'object') {
      if (value instanceof RGBColor || value instanceof HSLColor || value instanceof HEXColor || value instanceof HSVColor || value instanceof CMYKColor) {
        return clone(value);
      } else if (isNumeric(value.r) && isNumeric(value.g) && isNumeric(value.b)) {
        return rgb2RGBColor(value);
      } else if (isNumeric(value.h) && isLimitPercentage(value.s)) {
        if (isLimitPercentage(value.l)) {
          return hsl2HSLColor(value);
        } else if (isLimitPercentage(value.v)) {
          return hsv2HSVColor(value);
        }
      } else if (isNumeric(value.c) && isNumeric(value.m) && isNumeric(value.y) && isNumeric(value.k)) {
        return cmyk2CMYK(value);
      }
    } else if (isHexString(value)) {
      return hex2HEXColor(value);
    } else if (isRgbString(value)) {
      return rgb2RGBColor(value);
    } else if (isHslString(value)) {
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
    var c1 = Color(color1).rgb();
    var c2 = Color(color2).rgb();
    var p = typeof weight === 'undefined' ? 0.5 : numberRange(percentage2Length(weight));
    var w = p * 2 - 1;
    var a = c1.getRawAlpha() - c2.getRawAlpha(); // const w1 = (
    //   w.times(a).eq(-1) ? w : w.plus(a).div(w.times(a).plus(1)).plus(1)
    // ).div(2.0)

    var w1 = (w * a === -1 ? w : (w + a) / (w * a + 1) + 1) / 2;
    var w2 = 1 - w1;
    return rgb2RGBColor({
      r: w1 * c1.getRed() + w2 * c2.getRed(),
      g: w1 * c1.getGreen() + w2 * c2.getGreen(),
      b: w1 * c1.getBlue() + w2 * c2.getBlue(),
      a: c1.getRawAlpha() * p + c2.getRawAlpha() * (1 - p)
    });
  }

  /**
   * 反色
   * @param value 颜色值
   * @returns Color实例
   */

  function invert(value) {
    var color = Color(value).rgb();
    return color.setRed(255 - color.getRed()).setGreen(255 - color.getGreen()).setBlue(255 - color.getBlue());
  }
  /**
   * 补色
   * @param value 颜色值
   * @returns Color实例
   */

  function complement(value) {
    return Color(value).hsl().rotate(180);
  }
  /**
   * 是否深色调
   * @param value 颜色值
   */

  function isDark(value) {
    return Color(value).isDark();
  }
  /**
   * 是否浅色调
   * @param value 颜色值
   */

  function isLight(value) {
    return Color(value).isLight();
  }
  /**
   * 转为灰度色
   * @param value 颜色值
   * @returns Color实例
   */

  function grayscale(value) {
    var color = Color(value).rgb();
    var gray = Math.round(rgb2Gray(color.getRed(), color.getGreen(), color.getBlue()));
    return color.setRed(gray).setGreen(gray).setBlue(gray);
  }

  function decimal2Ratio(number) {
    return (Math.round(number / 2.55) / 100).toFixed(2);
  }

  function translate(color) {
    var rgba = Color(color).rgb();

    var _rgba$toObject = rgba.toObject(),
        r = _rgba$toObject.r,
        g = _rgba$toObject.g,
        b = _rgba$toObject.b;

    var a = (rgba._a * 255).toFixed(0);
    var rR = decimal2Ratio(r);
    var rG = decimal2Ratio(g);
    var rB = decimal2Ratio(b);

    var rA = rgba._a.toFixed(2);

    var ahex = '#' + rgba.hex().getAlphaHex() + rgba.hex().toHex().substr(1);
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
      Java: "new Color(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"),
      '.Net': "Color.FromArgb(".concat(a, ", ").concat(r, ", ").concat(g, ", ").concat(b, ")"),
      Android: "Color.argb(".concat(a, ", ").concat(r, ", ").concat(g, ", ").concat(b, ")"),
      Unity3D: "new Color(".concat(rR, "f, ").concat(rG, "f, ").concat(rB, "f, ").concat(rA, "f)"),
      OpenGL: "glColor4f(".concat(rR, "f, ").concat(rG, "f, ").concat(rB, "f, ").concat(rA, "f)"),
      Flutter: "Color(0x".concat(ahex.substr(1), ")"),
      Swift: "UIColor(red:".concat(rR, ", green:").concat(rG, ", blue:").concat(rB, ", alpha:").concat(rA, ")")
    };
  }

  var Colorfuls = function Colorfuls(color) {
    return Color(color);
  };

  Colorfuls.Color = Color;
  Colorfuls.mix = mix;
  Colorfuls.invert = invert;
  Colorfuls.complement = complement;
  Colorfuls.isDark = isDark;
  Colorfuls.isLight = isLight;
  Colorfuls.grayscale = grayscale;
  Colorfuls.translate = translate; // export { Color, translate, grayscale, invert, complement, isDark, isLight }

  return Colorfuls;

}));
