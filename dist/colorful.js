!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define("colorful",[],r):"object"==typeof exports?exports.colorful=r():t.colorful=r()}(this,(function(){return function(t){var r={};function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,r){if(1&r&&(t=n(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)n.d(e,o,function(r){return t[r]}.bind(null,o));return e},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},n.p="",n(n.s=0)}([function(t,r,n){"use strict";function e(t){return"number"==typeof t&&isFinite(t)}function o(t,r=0,n=100){if(function(t){return function(t){return"string"==typeof t}(t)&&/^(\d+)%$/.test(t)}(t)){const e=parseFloat(t);return e>=r&&e<=n}return!1}n.r(r),n.d(r,"default",(function(){return H})),n.d(r,"rgba2hexa",(function(){return $})),n.d(r,"rgba2hsla",(function(){return _})),n.d(r,"rgb2hex",(function(){return y})),n.d(r,"rgb2hsl",(function(){return R})),n.d(r,"hexa2Rgba",(function(){return m})),n.d(r,"hexa2hsla",(function(){return w})),n.d(r,"hex2Rgb",(function(){return v})),n.d(r,"hex2hsl",(function(){return I})),n.d(r,"hsla2Rgba",(function(){return M})),n.d(r,"hsla2Hexa",(function(){return j})),n.d(r,"hsl2Rgb",(function(){return O})),n.d(r,"hsl2Hex",(function(){return S}));const s=/^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i,i=/^rgb[a]?[(][\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i,u=/^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;function a(t){return s.test(t.trim())}function h(t){return i.test(t.trim())}function l(t){return u.test(t.trim())}function f(t){let r=1;return null!=t&&""!==t&&(r=-1!==(t=t.toString()).indexOf("%")?Math.round(parseInt(t)/100):parseFloat(t)),r}class c{constructor(t,r,n,e){this.r=t,this.g=r,this.b=n,this.alpha(e)}alpha(t){this.a=f(t)}hsla(){const{h:t,s:r,l:n}=function(t,r,n){t/=255,r/=255,n/=255;const e=Math.max(t,r,n),o=Math.min(t,r,n);let s,i,u=(e+o)/2;if(e==o)s=i=0;else{let a=e-o;switch(i=u>.5?a/(2-e-o):a/(e+o),e){case t:s=(r-n)/a+(r<n?6:0);break;case r:s=(n-t)/a+2;break;case n:s=(t-r)/a+4}s/=6}return{h:Math.round(360*s).toString(),s:Math.round(100*i)+"%",l:Math.round(100*u)+"%"}}(this.r,this.g,this.b);return new g(t,r,n,this.a)}toHsl(){return this.hsla().toHsl()}toHsla(){return this.hsla().toHsla()}hexa(){return new b(function(t,r,n){let e=(t<<16|r<<8|n).toString(16);for(let t=0,r=6-e.length;t<r;t++)e="0"+e;return"#"+e}(this.r,this.g,this.b)+function(t,r){t=Math.round(255*t);let n="";for(;t;)n="0123456789abcdef".charAt(t%16)+n,t=Math.floor(t/16);if(void 0===r||r<=n.length)return n;let e=r-n.length,o="";for(;e-- >0;)o+="0";return o+n}(this.a,2))}toHex(){return this.hexa().toHex()}toHexa(){return this.hexa().toHexa()}toRgb(){return`rgb(${this.r}, ${this.g}, ${this.b})`}toRgba(){return`rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`}toString(){return this.toRgba()}}class g{constructor(t,r,n,e){this._h=t,this._s=r,this._l=n,this.alpha(e)}alpha(t){this._a=f(t)}rgba(){return p(this.toHsla())}toRgb(){return this.rgba().toRgb()}toRgba(){return this.rgba().toRgba()}hexa(){return this.rgba().hexa()}toHex(){return this.hexa().toHex()}toHexa(){return this.hexa().toHexa()}toHsl(){return`hsl(${this._h}, ${this._s}, ${this._l})`}toHsla(){return`hsla(${this._h}, ${this._s}, ${this._l}, ${this._a})`}toString(){return this.toHsla()}}class b{constructor(t){7===(t=t.toUpperCase()).length?(this._hex=t,this._hexa=t+"FF"):(this._hexa=t,this._hex=t.slice(0,7))}rgba(){return d(this._hexa)}toRgb(){return this.rgba().toRgb()}toRgba(){return this.rgba().toRgba()}hsla(){return this.rgba().hsla()}toHsl(){return this.hsla().toHsl()}toHsla(){return this.hsla().toHsla()}toHex(){return this._hex}toHexa(){return this._hexa}toString(){return this.toHexa()}}function x(t){if(!h(t))throw new Error("It is not a valid rgb/rgba string");function r(t){return-1!==t.indexOf("%")?Math.round(255*parseInt(t)/100):parseInt(t)}const n=i.exec(t.trim());window.console.log(n);return new c(r(n[1]),r(n[2]),r(n[3]),n[4])}function d(t){if(!a(t))throw new Error("It is not a valid hex/hexa string");let r,n,e,o="ff";return 4===(t=t.trim()).length?(r=t.slice(1,2)+t.slice(1,2),n=t.slice(2,3)+t.slice(2,3),e=t.slice(3,4)+t.slice(3,4)):(r=t.slice(1,3),n=t.slice(3,5),e=t.slice(5,7)),9===t.length&&(o=t.slice(7,9)),new c(parseInt("0x"+r),parseInt("0x"+n),parseInt("0x"+e),parseFloat(parseInt("0x"+o),255))}function p(t){if(!l(t))throw new Error("It is not a valid hsl/hsla string");const r=u.exec(t.trim()),n=parseInt(r[1])/360;let e,o,s,i,a;function h(t,r,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(r-t)*n:n<.5?r:n<2/3?t+(r-t)*(2/3-n)*6:t}if(e=-1!==r[2].indexOf("%")?parseInt(r[2])/100:parseFloat(r[2]),o=-1!==r[3].indexOf("%")?parseInt(r[3])/100:parseFloat(r[3]),0==e)s=i=a=o;else{const t=o<.5?o*(1+e):o+e-o*e,r=2*o-t;s=h(r,t,n+1/3),i=h(r,t,n),a=h(r,t,n-1/3)}return new c(255*s,255*i,255*a,r[4])}function H(t){if(a(t))return d(t).hexa();if(h(t))return x(t);if(l(t))return p(t).hsla();if("object"==typeof(r=t)&&null!==r){if(e(t.r)&&e(t.g)&&e(t.b))return x(`rgba(${t.r},${t.g},${t.b},${e(t.a)?t.a:1})`);if(e(t.h)&&o(t.s)&&o(t.l))return p(`hsla(${t.r},${t.g},${t.b},${e(t.a)?t.a:1})`).hsla()}var r}function $(t){return x(t).toHexa()}function _(t){return x(t).toHsla()}function y(t){return x(t).toHex()}function R(t){return x(t).toHsl()}function m(t){return d(t).toRgba()}function w(t){return d(t).toHsla()}function v(t){return d(t).toRgb()}function I(t){return d(t).toHsl()}function M(t){return p(t).toRgba()}function j(t){return p(t).toHexa()}function O(t){return p(t).toRgb()}function S(t){return p(t).toHex()}}])}));