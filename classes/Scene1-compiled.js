'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene1 = function () {
    function Scene1() {
        _classCallCheck(this, Scene1);

        this.$container = document.querySelector('#scene1');
        this.$chatContainer = this.$container.querySelector('.chat-container');
        this.$prize = this.$chatContainer.querySelectorAll('.item')[3];
        this.$sendContainer = this.$container.querySelector('.send-container');
        this.$start = this.$container.querySelector('.start');

        this.init();
    }

    _createClass(Scene1, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$container.style.display = 'block';

            tools.animationEvent(this.$prize, 'AnimationEnd', function () {
                setTimeout(function () {
                    _this.startTyping();
                }, 300);
            });

            // 开始游戏
            this.$start.addEventListener('click', function () {
                tools.animationEvent(_this.$container, 'AnimationEnd', _this.destroy.bind(_this));

                _this.$container.classList.add('bounceOutLeft');
                _this.$container.classList.add('animated');
                new Scene2();
            }, false);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.$container.remove();
        }
    }, {
        key: 'startTyping',
        value: function startTyping() {
            var theater = theaterJS({
                "minSpeed": 50,
                "maxSpeed": 150
            });

            theater.addActor('typeing').addScene('typeing:😏 多大的事啊, 我来帮你吧!', 2500).addScene(theater.replay.bind(theater));

            this.$sendContainer.classList.add('bounceInUp');
            this.$sendContainer.classList.add('active');
        }
    }]);

    return Scene1;
}();

//# sourceMappingURL=Scene1-compiled.js.map