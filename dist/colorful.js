!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("colorful",[],e):"object"==typeof exports?exports.colorful=e():t.colorful=e()}(this,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e),r.d(e,"rgba2hexa",(function(){return Q})),r.d(e,"rgba2hsla",(function(){return V})),r.d(e,"rgb2hex",(function(){return X})),r.d(e,"rgb2hsl",(function(){return Y})),r.d(e,"hexa2Rgba",(function(){return Z})),r.d(e,"hexa2hsla",(function(){return tt})),r.d(e,"hex2Rgb",(function(){return et})),r.d(e,"hex2hsl",(function(){return rt})),r.d(e,"hsla2Rgba",(function(){return nt})),r.d(e,"hsla2Hexa",(function(){return st})),r.d(e,"hsl2Rgb",(function(){return it})),r.d(e,"hsl2Hex",(function(){return ot})),r.d(e,"mix",(function(){return T})),r.d(e,"gradient",(function(){return B})),r.d(e,"linearGradient",(function(){return K}));var n="[big.js] ",s=n+"Invalid ",i=s+"decimal places",o={},u=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;function a(t,e,r,n){var s=t.c,i=t.e+e+1;if(i<s.length){if(1===r)n=s[i]>=5;else if(2===r)n=s[i]>5||5==s[i]&&(n||i<0||void 0!==s[i+1]||1&s[i-1]);else if(3===r)n=n||!!s[0];else if(n=!1,0!==r)throw Error("[big.js] Invalid rounding mode");if(i<1)s.length=1,n?(t.e=-e,s[0]=1):s[0]=t.e=0;else{if(s.length=i--,n)for(;++s[i]>9;)s[i]=0,i--||(++t.e,s.unshift(1));for(i=s.length;!s[--i];)s.pop()}}else if(r<0||r>3||r!==~~r)throw Error("[big.js] Invalid rounding mode");return t}function h(t,e,r,n){var o,u,h=t.constructor,c=!t.c[0];if(void 0!==r){if(r!==~~r||r<(3==e)||r>1e6)throw Error(3==e?s+"precision":i);for(r=n-(t=new h(t)).e,t.c.length>++n&&a(t,r,h.RM),2==e&&(n=t.e+r+1);t.c.length<n;)t.c.push(0)}if(o=t.e,r=(u=t.c.join("")).length,2!=e&&(1==e||3==e&&n<=o||o<=h.NE||o>=h.PE))u=u.charAt(0)+(r>1?"."+u.slice(1):"")+(o<0?"e":"e+")+o;else if(o<0){for(;++o;)u="0"+u;u="0."+u}else if(o>0)if(++o>r)for(o-=r;o--;)u+="0";else o<r&&(u=u.slice(0,o)+"."+u.slice(o));else r>1&&(u=u.charAt(0)+"."+u.slice(1));return t.s<0&&(!c||4==e)?"-"+u:u}o.abs=function(){var t=new this.constructor(this);return t.s=1,t},o.cmp=function(t){var e,r=this,n=r.c,s=(t=new r.constructor(t)).c,i=r.s,o=t.s,u=r.e,a=t.e;if(!n[0]||!s[0])return n[0]?i:s[0]?-o:0;if(i!=o)return i;if(e=i<0,u!=a)return u>a^e?1:-1;for(o=(u=n.length)<(a=s.length)?u:a,i=-1;++i<o;)if(n[i]!=s[i])return n[i]>s[i]^e?1:-1;return u==a?0:u>a^e?1:-1},o.div=function(t){var e=this,r=e.constructor,n=e.c,s=(t=new r(t)).c,o=e.s==t.s?1:-1,u=r.DP;if(u!==~~u||u<0||u>1e6)throw Error(i);if(!s[0])throw Error("[big.js] Division by zero");if(!n[0])return new r(0*o);var h,c,l,f,g,p=s.slice(),b=h=s.length,d=n.length,m=n.slice(0,h),_=m.length,x=t,w=x.c=[],v=0,H=u+(x.e=e.e-t.e)+1;for(x.s=o,o=H<0?0:H,p.unshift(0);_++<h;)m.push(0);do{for(l=0;l<10;l++){if(h!=(_=m.length))f=h>_?1:-1;else for(g=-1,f=0;++g<h;)if(s[g]!=m[g]){f=s[g]>m[g]?1:-1;break}if(!(f<0))break;for(c=_==h?s:p;_;){if(m[--_]<c[_]){for(g=_;g&&!m[--g];)m[g]=9;--m[g],m[_]+=10}m[_]-=c[_]}for(;!m[0];)m.shift()}w[v++]=f?l:++l,m[0]&&f?m[_]=n[b]||0:m=[n[b]]}while((b++<d||void 0!==m[0])&&o--);return w[0]||1==v||(w.shift(),x.e--),v>H&&a(x,u,r.RM,void 0!==m[0]),x},o.eq=function(t){return!this.cmp(t)},o.gt=function(t){return this.cmp(t)>0},o.gte=function(t){return this.cmp(t)>-1},o.lt=function(t){return this.cmp(t)<0},o.lte=function(t){return this.cmp(t)<1},o.minus=o.sub=function(t){var e,r,n,s,i=this,o=i.constructor,u=i.s,a=(t=new o(t)).s;if(u!=a)return t.s=-a,i.plus(t);var h=i.c.slice(),c=i.e,l=t.c,f=t.e;if(!h[0]||!l[0])return l[0]?(t.s=-a,t):new o(h[0]?i:0);if(u=c-f){for((s=u<0)?(u=-u,n=h):(f=c,n=l),n.reverse(),a=u;a--;)n.push(0);n.reverse()}else for(r=((s=h.length<l.length)?h:l).length,u=a=0;a<r;a++)if(h[a]!=l[a]){s=h[a]<l[a];break}if(s&&(n=h,h=l,l=n,t.s=-t.s),(a=(r=l.length)-(e=h.length))>0)for(;a--;)h[e++]=0;for(a=e;r>u;){if(h[--r]<l[r]){for(e=r;e&&!h[--e];)h[e]=9;--h[e],h[r]+=10}h[r]-=l[r]}for(;0===h[--a];)h.pop();for(;0===h[0];)h.shift(),--f;return h[0]||(t.s=1,h=[f=0]),t.c=h,t.e=f,t},o.mod=function(t){var e,r=this,n=r.constructor,s=r.s,i=(t=new n(t)).s;if(!t.c[0])throw Error("[big.js] Division by zero");return r.s=t.s=1,e=1==t.cmp(r),r.s=s,t.s=i,e?new n(r):(s=n.DP,i=n.RM,n.DP=n.RM=0,r=r.div(t),n.DP=s,n.RM=i,this.minus(r.times(t)))},o.plus=o.add=function(t){var e,r=this,n=r.constructor,s=r.s,i=(t=new n(t)).s;if(s!=i)return t.s=-i,r.minus(t);var o=r.e,u=r.c,a=t.e,h=t.c;if(!u[0]||!h[0])return h[0]?t:new n(u[0]?r:0*s);if(u=u.slice(),s=o-a){for(s>0?(a=o,e=h):(s=-s,e=u),e.reverse();s--;)e.push(0);e.reverse()}for(u.length-h.length<0&&(e=h,h=u,u=e),s=h.length,i=0;s;u[s]%=10)i=(u[--s]=u[s]+h[s]+i)/10|0;for(i&&(u.unshift(i),++a),s=u.length;0===u[--s];)u.pop();return t.c=u,t.e=a,t},o.pow=function(t){var e=this,r=new e.constructor(1),n=r,i=t<0;if(t!==~~t||t<-1e6||t>1e6)throw Error(s+"exponent");for(i&&(t=-t);1&t&&(n=n.times(e)),t>>=1;)e=e.times(e);return i?r.div(n):n},o.round=function(t,e){var r=this.constructor;if(void 0===t)t=0;else if(t!==~~t||t<-1e6||t>1e6)throw Error(i);return a(new r(this),t,void 0===e?r.RM:e)},o.sqrt=function(){var t,e,r,s=this,i=s.constructor,o=s.s,u=s.e,h=new i(.5);if(!s.c[0])return new i(s);if(o<0)throw Error(n+"No square root");0===(o=Math.sqrt(s+""))||o===1/0?((e=s.c.join("")).length+u&1||(e+="0"),u=((u+1)/2|0)-(u<0||1&u),t=new i(((o=Math.sqrt(e))==1/0?"1e":(o=o.toExponential()).slice(0,o.indexOf("e")+1))+u)):t=new i(o),u=t.e+(i.DP+=4);do{r=t,t=h.times(r.plus(s.div(r)))}while(r.c.slice(0,u).join("")!==t.c.slice(0,u).join(""));return a(t,i.DP-=4,i.RM)},o.times=o.mul=function(t){var e,r=this,n=r.constructor,s=r.c,i=(t=new n(t)).c,o=s.length,u=i.length,a=r.e,h=t.e;if(t.s=r.s==t.s?1:-1,!s[0]||!i[0])return new n(0*t.s);for(t.e=a+h,o<u&&(e=s,s=i,i=e,h=o,o=u,u=h),e=new Array(h=o+u);h--;)e[h]=0;for(a=u;a--;){for(u=0,h=o+a;h>a;)u=e[h]+i[a]*s[h-a-1]+u,e[h--]=u%10,u=u/10|0;e[h]=(e[h]+u)%10}for(u?++t.e:e.shift(),a=e.length;!e[--a];)e.pop();return t.c=e,t},o.toExponential=function(t){return h(this,1,t,t)},o.toFixed=function(t){return h(this,2,t,this.e+t)},o.toPrecision=function(t){return h(this,3,t,t-1)},o.toString=function(){return h(this)},o.valueOf=o.toJSON=function(){return h(this,4)};var c=function t(){function e(r){var n=this;if(!(n instanceof e))return void 0===r?t():new e(r);r instanceof e?(n.s=r.s,n.e=r.e,n.c=r.c.slice()):function(t,e){var r,n,i;if(0===e&&1/e<0)e="-0";else if(!u.test(e+=""))throw Error(s+"number");t.s="-"==e.charAt(0)?(e=e.slice(1),-1):1,(r=e.indexOf("."))>-1&&(e=e.replace(".",""));(n=e.search(/e/i))>0?(r<0&&(r=n),r+=+e.slice(n+1),e=e.substring(0,n)):r<0&&(r=e.length);for(i=e.length,n=0;n<i&&"0"==e.charAt(n);)++n;if(n==i)t.c=[t.e=0];else{for(;i>0&&"0"==e.charAt(--i););for(t.e=r-n-1,t.c=[],r=0;n<=i;)t.c[r++]=+e.charAt(n++)}}(n,r),n.constructor=e}return e.prototype=o,e.DP=20,e.RM=1,e.NE=-7,e.PE=21,e.version="5.2.2",e}();function l(t){return"number"==typeof t&&isFinite(t)}function f(t){return null!=t&&!isNaN(parseFloat(t))}function g(t){return"string"==typeof t}function p(t){return"object"==typeof t&&null!==t}function b(t){return void 0===t}function d(t,e=0,r=100){if(function(t){return g(t)&&/^(\d+)%$/.test(t)}(t)){const n=parseFloat(t);return n>=e&&n<=r}return!1}function m(t,e=0,r=1){return Math.min(r,Math.max(e,t))}function _(t,e=0,r=1){return t.gt(r)?new c(r):t.lt(e)?new c(e):t}function x(t){return g(t)&&t.endsWith("%")?parseFloat(t)/100:parseFloat(t)}const w=/^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i,v=/^rgb[a]?[(][\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?|100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i,H=/^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,2}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;function y(t){return w.test(t.trim())}function R(t){return v.test(t.trim())}function M(t){return H.test(t.trim())}function I(t){let e=1;return F(t)?t:(f(t)&&(e=m(x(t))),new c(e))}function $(t){return _(new c(x(t)))}function j(t,e){return _(t.times(new c(1).minus(x(e))))}function E(t,e){return _(t.times(new c(1).plus(x(e))))}function F(t){return t instanceof c}function D(t,e,r){return 38*t+75*e+15*r>>7}class O{constructor(t,e,r,n){this._r=t,this._g=e,this._b=r,this.alpha(n)}rgba(){return this}red(t){return b(t)?this._r:(l(t)&&(this._r=parseInt(m(t,0,255))),this)}green(t){return b(t)?this._g:(l(t)&&(this._g=parseInt(m(t,0,255))),this)}blue(t){return b(t)?this._b:(l(t)&&(this._b=parseInt(m(t,0,255))),this)}alpha(t){return b(t)?parseFloat(this._a):(this._a=I(t),this)}fadeOut(t){return this._a=j(this._a,t),this}fadeIn(t){return this._a=E(this._a,t),this}fade(t){return this.fadeOut(t)}opaque(t){return this.fadeIn(t)}invert(){return this._r=255-this._r,this._g=255-this._g,this._b=255-this._b,this}complement(){return this.hsla().complement().rgba()}grayscale(){const t=Math.round(D(this._r,this._g,this._b));return this._r=t,this._g=t,this._b=t,this}isLight(){return!this.isDark()}isDark(){return D(this._r,this._g,this._b)<128}hsla(){const{h:t,s:e,l:r}=function(t,e,r){t/=255,e/=255,r/=255;const n=Math.max(t,e,r),s=Math.min(t,e,r);let i,o,u=(n+s)/2;if(n==s)i=o=0;else{let a=n-s;switch(o=u>.5?a/(2-n-s):a/(n+s),n){case t:i=(e-r)/a+(e<r?6:0);break;case e:i=(r-t)/a+2;break;case r:i=(t-e)/a+4}i/=6}return{h:360*i,s:o,l:u}}(this._r,this._g,this._b);return new P(t,e,r,this._a)}toHsl(){return this.hsla().toHsl()}toHsla(){return this.hsla().toHsla()}hexa(){return new k(function(t,e,r){let n=(t<<16|e<<8|r).toString(16);for(let t=0,e=6-n.length;t<e;t++)n="0"+n;return"#"+n}(this._r,this._g,this._b)+function(t,e){t=Math.round(255*t);let r="";for(;t;)r="0123456789abcdef".charAt(t%16)+r,t=Math.floor(t/16);if(void 0===e||e<=r.length)return r;let n=e-r.length,s="";for(;n-- >0;)s+="0";return s+r}(this._a,2))}toHex(){return this.hexa().toHex()}toHexa(){return this.hexa().toHexa()}toRgb(){return`rgb(${this._r}, ${this._g}, ${this._b})`}toRgba(){return`rgba(${this._r}, ${this._g}, ${this._b}, ${this.alpha()})`}toString(){return this.toRgba()}toArray(){return[this._r,this._g,this._b,this.alpha()]}}class P{constructor(t,e,r,n){this.hue(t),this.saturation(e),this.lightness(r),this.alpha(n)}hsla(){return this}hue(t){return b(t)?Math.round(this._h):(f(t)&&(this._h=m(parseFloat(t),0,360)),this)}saturation(t){return b(t)?this._s.times(100).toFixed(0)+"%":(f(t)&&(this._s=$(t)),this)}lightness(t){return b(t)?this._l.times(100).toFixed(0)+"%":(f(t)&&(this._l=$(t)),this)}alpha(t){return b(t)?parseFloat(this._a):(this._a=I(t),this)}fadeOut(t){return this._a=j(this._a,t),this}fadeIn(t){return this._a=E(this._a,t),this}fade(t){return this.fadeOut(t)}opaque(t){return this.fadeIn(t)}rotate(t){return l(t)&&(this._h=(this._h+t+360)%360),this}saturate(t){return l(t)&&(this._s=E(this._s,t)),this}desaturate(t){return l(t)&&(this._s=j(this._s,t)),this}lighten(t){return l(t)&&(this._l=E(this._l,t)),this}darken(t){return l(t)&&(this._l=j(this._l,t)),this}grayscale(){return this.rgba().grayscale().hsla()}invert(){return this.rgba().invert().hsla()}complement(){return this.rotate(180)}isLight(){return this.rgba().isLight()}isDark(){return this.rgba().isDark()}rgba(){const{r:t,g:e,b:r}=function(t,e,r){let n,s,i;if(0==e)n=s=i=r;else{t=new c(t).div(360);const o=r.lt(.5)?r.times(e.plus(1)):r.plus(e).minus(r.times(e)),u=r.times(2).minus(o);n=N(u,o,t.plus(1/3)),s=N(u,o,t),i=N(u,o,t.minus(1/3))}return{r:Math.round(n.times(255)),g:Math.round(s.times(255)),b:Math.round(i.times(255))}}(this._h,this._s,this._l);return new O(t,e,r,this._a)}toRgb(){return this.rgba().toRgb()}toRgba(){return this.rgba().toRgba()}hexa(){return this.rgba().hexa()}toHex(){return this.hexa().toHex()}toHexa(){return this.hexa().toHexa()}toHsl(){return`hsl(${this.hue()}, ${this.saturation()}, ${this.lightness()})`}toHsla(){return`hsla(${this.hue()}, ${this.saturation()}, ${this.lightness()}, ${this.alpha()})`}toString(){return this.toHsla()}}class k{constructor(t){7===(t=t.toUpperCase()).length?(this._hex=t,this._hexa=t+"FF"):(this._hexa=t,this._hex=t.slice(0,7))}hexa(){return this}grayscale(){return this.rgba().grayscale().hexa()}isLight(){return this.rgba().isLight()}isDark(){return this.rgba().isDark()}invert(){return this.rgba().invert().hexa()}complement(){return this.hsla().complement().hexa()}rgba(){return new O(parseInt("0x"+this._hexa.slice(1,3)),parseInt("0x"+this._hexa.slice(3,5)),parseInt("0x"+this._hexa.slice(5,7)),parseFloat(parseInt("0x"+this._hexa.slice(7,9))/255))}toRgb(){return this.rgba().toRgb()}toRgba(){return this.rgba().toRgba()}hsla(){return this.rgba().hsla()}toHsl(){return this.hsla().toHsl()}toHsla(){return this.hsla().toHsla()}toHex(){return this._hex}toHexa(){return this._hexa}toString(){return this.toHexa()}}function A(t){return g(t)&&t.endsWith("%")?Math.round(255*parseInt(t)/100):parseInt(t)}function S(t){let e;if(p(t)&&l(t.r)&&l(t.g)&&l(t.b))e=[null,t.r,t.g,t.b,F(t.a)||f(t.a)?t.a:1];else{if(!R(t))throw new Error("It is not a valid rgb/rgba string");e=v.exec(t.trim())}return new O(A(e[1]),A(e[2]),A(e[3]),e[4])}function q(t){if(!y(t))throw new Error("It is not a valid hex/hexa string");let e,r,n,s;return 4===(t=t.trim()).length?(e=t.slice(1,2)+t.slice(1,2),r=t.slice(2,3)+t.slice(2,3),n=t.slice(3,4)+t.slice(3,4)):(e=t.slice(1,3),r=t.slice(3,5),n=t.slice(5,7)),s=9===t.length?t.slice(7,9):"ff",new k(`#${e}${r}${n}${s}`.toUpperCase())}function N(t,e,r){return r.lt(0)&&(r=r.plus(1)),r.gt(1)&&(r=r.minus(1)),r.times(6).lt(1)?t.plus(e.minus(t).times(6).times(r)):r.times(2).lt(1)?e:r.times(3).lt(2)?t.plus(e.minus(t).times(new c(2/3).minus(r).times(6))):t}function L(t){let e;if(p(t)&&l(t.h)&&f(t.s)&&f(t.l))e=[null,t.h,t.s,t.l,f(t.a)?t.a:1];else{if(!M(t))throw new Error("It is not a valid hsl/hsla string");e=H.exec(t.trim())}return new P(...e.slice(1,5))}function z(t){return t instanceof O?new O(t._r,t._g,t._b,t._a):t instanceof P?new P(t._h,t._s,t._l,t._a):t instanceof k?new k(t._hexa):t}function C(t){if(p(t)){if(t instanceof O||t instanceof P||t instanceof k)return z(t);if(l(t.r)&&l(t.g)&&l(t.b))return S(t);if(l(t.h)&&d(t.s)&&d(t.l))return L(t)}else{if(y(t))return q(t);if(R(t))return S(t);if(M(t))return L(t)}throw new Error("Invaild color value.")}function T(t,e,r){const n=C(t).rgba(),s=C(e).rgba(),i=new c(b(r)?.5:m(x(r))),o=i.times(2).minus(1),u=n._a.minus(s._a),a=(o.times(u).eq(-1)?o:o.plus(u).div(o.times(u).plus(1)).plus(1)).div(2),h=new c(1).minus(a);return S({r:parseFloat(a.times(n.red()).plus(h.times(s.red()))),g:parseFloat(a.times(n.green()).plus(h.times(s.green()))),b:parseFloat(a.times(n.blue()).plus(h.times(s.blue()))),a:n._a.times(i).plus(s._a.times(new c(1).minus(i)))})}function U(t,e){return t.toArray().map((t,r)=>(3===r?new c(t):new c(t).div(255)).pow(e))}function W(t,e,r){let n,s;for(let i=0,o=e.length;i<o;i++){const o=e[i];if(o.percentage.eq(t))return z(o.color);if(o.percentage.gt(t)){const u=e[i-1];n=U(u.color,r),s=U(o.color,r),t=(t-u.percentage)/(o.percentage-u.percentage);break}}const i=[];for(let e=0;e<4;e++){const o=n[e].times(new c(1).minus(t)).plus(s[e].times(t)).pow(1/r);i[e]=3===e?o:o.times(255).round().toString()}return C({r:parseInt(i[0]),g:parseInt(i[1]),b:parseInt(i[2]),a:i[3]})}class G extends Array{toRgbs(){return this.map(t=>t.toRgb())}toHexs(){return this.map(t=>t.toHex())}toHsls(){return this.map(t=>t.toHsl())}toRgbas(){return this.map(t=>t.toRgba())}toHexas(){return this.map(t=>t.toHexa())}toHslas(){return this.map(t=>t.toHsla())}toString(){return this.toRgbas().join(", ")}}class J{constructor(t,e=1){this.colors=function(t){const e=[];let r=[],n=0;for(let i=0,o=t.length;i<o;i++){const u={percentage:null};if(s=t[i],Array.isArray(s)?(u.color=C(t[i][0]).rgba(),u.percentage=new c(m(x(t[i][1]),n,1))):u.color=C(t[i]).rgba(),0===i?u.percentage=new c(0):i===o-1&&(u.percentage=new c(1)),null===u.percentage)r.push(i);else if(i>0&&(n=u.percentage,r.length>0)){const t=u.percentage.minus(e[r[0]-1].percentage).div(r.length+1);r.forEach((n,s)=>{e[n].percentage=u.percentage.minus(t.times(r.length-s))}),r=[]}e.push(u)}var s;return e}(t),this.gamma=e}steps(t){const e=new G;if(t>=2)for(let r=0;r<t;r++)e.push(W(r/(t-1),this.colors,this.gamma));return e}step(t){return W(m(x(t)),this.colors,this.gamma)}}function B(t,e,r=1){return new J([t,e],r)}function K(...t){return new J(t,1)}e.default=C;function Q(t){return S(t).toHexa()}function V(t){return S(t).toHsla()}function X(t){return S(t).toHex()}function Y(t){return S(t).toHsl()}function Z(t){return q(t).toRgba()}function tt(t){return q(t).toHsla()}function et(t){return q(t).toRgb()}function rt(t){return q(t).toHsl()}function nt(t){return L(t).toRgba()}function st(t){return L(t).toHexa()}function it(t){return L(t).toRgb()}function ot(t){return L(t).toHex()}}])}));