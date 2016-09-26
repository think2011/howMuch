"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tools = new (function () {
    function Tools() {
        _classCallCheck(this, Tools);
    }

    _createClass(Tools, [{
        key: "animationEvent",
        value: function animationEvent(element, type, callback) {
            var pfx = ["webkit", "moz", "MS", "o", ""];

            for (var p = 0; p < pfx.length; p++) {
                if (!pfx[p]) type = type.toLowerCase();
                element.addEventListener(pfx[p] + type, callback, false);
            }
        }
    }, {
        key: "random",
        value: function random(min, max) {
            var retain = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];

            return this.decimal(Math.random() * (max - min + 1) + min, retain);
        }
    }, {
        key: "decimal",
        value: function decimal(num, v) {
            var _split = (num + '').split('.');

            var _split2 = _slicedToArray(_split, 2);

            var a = _split2[0];
            var b = _split2[1];


            return +(a + '.' + b.substr(0, v));
        }

        /**
         * 随机产生价格浮动范围
         * @param seed
         * @param num
         */

    }, {
        key: "createPrices",
        value: function createPrices(seed) {
            var num = arguments.length <= 1 || arguments[1] === undefined ? 6 : arguments[1];

            seed = +seed;
            var ret = [];
            var min = seed - seed * 0.35;
            var max = seed + seed * 0.35;

            while (--num) {
                ret.push(this.random(min, max));
            }

            ret.splice(this.random(0, ret.length), 0, seed.toFixed(2));

            return ret;
        }
    }]);

    return Tools;
}())();

// Polyfill
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        'use strict';

        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

//# sourceMappingURL=Tools-compiled.js.map