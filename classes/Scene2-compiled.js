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

            this.$container.classList.add('slideInUp');
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
                var html = '\n        <li class="item animated">\n            <button data-price="' + item + '">' + item + '</button>\n        </li>';

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
                ok: ['flip', '😘 没错, 就是这个价!', 3000],
                high: ['wobble', '😂 太贵了', 3000],
                low: ['wobble', '😓 太便宜了', 3000]
            };
            var result = price === this.price ? 'ok' : price > this.price ? 'high' : 'low';

            if (result !== 'ok') {
                $target.setAttribute('disabled', 'disabled');
                $target.classList.add('disabled');
            } else {
                $target.classList.add('success');
            }

            $target.classList.add('animated');
            $target.classList.add(resultMap[result][0]);
            tools.animationEvent($target, 'AnimationEnd', function () {
                $target.classList.remove(resultMap[result][0]);
                toast({ content: '' + resultMap[result][1], time: resultMap[result][2] });

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