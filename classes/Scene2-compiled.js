'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene2 = function () {
    function Scene2() {
        _classCallCheck(this, Scene2);

        this.$container = document.querySelector('#scene2');
        this.$prices = this.$container.querySelector('.prices');
        this.price = 200;
        this.count = 3;

        this.init();
    }

    _createClass(Scene2, [{
        key: 'init',
        value: function init() {
            var _this = this;

            setTimeout(function () {
                // toast({content: '🙏 最多只能定3次价格噢, 不然来不及了', time: 4000})
            }, 1000);

            this.$container.classList.add('bounceInDown');
            this.$container.classList.add('animated');
            this.$container.style.display = 'block';

            this.renderPrices(this.price);
            this.$prices.addEventListener('click', function (event) {
                var $target = event.target;

                if ($target.tagName !== 'BUTTON') return;

                _this.judge(+$target.dataset.price, $target);
            });
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.count = 3;
            this.renderPrices(this.price);
        }
    }, {
        key: 'renderPrices',
        value: function renderPrices(price) {
            var _this2 = this;

            var prices = tools.createPrices(price);

            this.$prices.innerHTML = '';
            prices.forEach(function (item) {
                var html = '\n        <li class="item">\n            <button data-price="' + item + '">￥' + item + '</button>\n        </li>';

                _this2.$prices.innerHTML += html;
            });
        }
    }, {
        key: 'judge',
        value: function judge(price, $target) {
            var _this3 = this;

            if (this.judgeing) return;

            price = +price;

            this.judgeing = true;
            this.count--;

            var resultMap = {
                ok: ['flip', '看起来很合适, 就定这个价!', 1000000],
                high: ['wobble', '太贵了吧', 3000],
                low: ['wobble', '太便宜了吧', 3000]
            };
            var result = price === this.price ? 'ok' : price > this.price ? 'high' : 'low';

            $target.classList.add('animated');
            $target.classList.add(resultMap[result][0]);
            tools.animationEvent($target, 'AnimationEnd', function () {
                var face = null;

                if (result !== 'ok') {
                    $target.setAttribute('disabled', 'disabled');
                    face = ['😂', '😨', '😥', '😓'][parseInt(Math.random() * 4)];
                } else {
                    face = '😘';
                }

                $target.classList.remove(resultMap[result][0]);
                toast({ content: face + ' ' + resultMap[result][1], time: resultMap[result][2] });

                _this3.judgeing = false;

                if (_this3.count < 1) {
                    return _this3.gameOver();
                }
            });
        }
    }, {
        key: 'gameOver',
        value: function gameOver() {
            // this.restart()
        }
    }]);

    return Scene2;
}();

//# sourceMappingURL=Scene2-compiled.js.map