let tools = new class Tools {
    constructor() {

    }

    animationEvent(element, type, callback) {
        let pfx = ["webkit", "moz", "MS", "o", ""]

        for (var p = 0; p < pfx.length; p++) {
            if (!pfx[p]) type = type.toLowerCase();
            element.addEventListener(pfx[p] + type, callback, false);
        }
    }

    random(min, max, retain = 2) {
        return this.decimal((Math.random() * (max - min + 1) + min), retain)
    }

    decimal(num, v) {
        let [a, b] = (num + '').split('.')

        return +(a + '.' + b.substr(0, v))
    }

    /**
     * 随机产生价格浮动范围
     * @param seed
     * @param num
     */
    createPrices(seed, num = 6) {
        seed    = (+seed)
        let ret = []
        let min = seed - (seed * 0.35)
        let max = seed + (seed * 0.35)

        while (--num) {
            ret.push(this.random(min, max))
        }

        ret.splice(this.random(0, ret.length), 0, seed.toFixed(2))

        return ret
    }
}

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