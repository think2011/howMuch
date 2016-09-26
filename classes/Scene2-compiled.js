'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene2 = function () {
    function Scene2() {
        _classCallCheck(this, Scene2);

        this.$container = document.querySelector('#scene2');
        this.$prices = this.$container.querySelector('.prices');
        this.$imgContainer = this.$container.querySelector('.img');

        this.init();
    }

    _createClass(Scene2, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$container.classList.add('slideInUp');
            this.$container.classList.add('animated');
            this.$container.style.display = 'block';

            this.$prices.addEventListener('click', function (event) {
                var $target = event.target;

                if ($target.tagName !== 'BUTTON') return;

                _this.judge(+$target.dataset.price, $target);
            });

            this.start();
        }
    }, {
        key: 'start',
        value: function start() {
            GAME_PARAMS.items.push(GAME_PARAMS.items.shift());
            var item = GAME_PARAMS.items[0];

            this.price = +(item.promoPrice || item.price);
            this.count = 4;
            this.renderPrices(this.price);
            this.renderGoods(item);
        }
    }, {
        key: 'renderPrices',
        value: function renderPrices(price) {
            var _this2 = this;

            var prices = tools.createPrices(price);

            this.$prices.innerHTML = '';
            prices.forEach(function (item) {
                _this2.$prices.innerHTML += '\n        <li class="item animated">\n            <button data-price="' + item + '">' + item + '</button>\n        </li>';
            });

            this.judgeing = false;
        }
    }, {
        key: 'renderGoods',
        value: function renderGoods(item) {
            this.$imgContainer.innerHTML = '\n            <img src="' + item.picUrl + '_500x500.jpg_.webp">\n            <div class="title">' + item.title + '</div>\n';
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
                high: ['fadeIn', '😂 太贵了', 3000],
                low: ['fadeIn', '😓 太便宜了', 3000]
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
                _this3.judgeing = false;

                if (result !== 'ok') {
                    $target.classList.remove(resultMap[result][0]);
                    toast({ content: '' + resultMap[result][1], time: resultMap[result][2] });
                } else {
                    return _this3.gamePass();
                }

                if (_this3.count < 0) {
                    _this3.judgeing = true;
                    setTimeout(function () {
                        return _this3.gameOver();
                    }, 500);
                }
            });
        }
    }, {
        key: 'gamePass',
        value: function gamePass() {
            dialog.success({
                content: '<div class="only-text">恭喜您获得了抽奖机会!</div>',
                btn1: {
                    title: '马上抽奖',
                    click: function click() {
                        dialog.close();
                        dialog.win(3, 100);
                    }
                }
            });
        }
    }, {
        key: 'gameOver',
        value: function gameOver() {
            var _this4 = this;

            dialog.fail({
                btn1: {
                    title: '再来一次',
                    click: function click() {
                        dialog.close();
                        _this4.start();
                    }
                }
            });
        }
    }]);

    return Scene2;
}();

//# sourceMappingURL=Scene2-compiled.js.map