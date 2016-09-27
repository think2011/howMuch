define(['tools', 'Scene2'], function (tools, Scene2) {
    var Class = function () {
        this.$container = document.querySelector('#scene1')
        this.$action    = this.$container.querySelector('.action')
        this.$start     = this.$container.querySelector('button')

        this.init()
    }

    Class.prototype = {
        construct: Class,

        init: function () {
            var that = this

            that.$container.style.display = 'block'

            tools.animationEvent(that.$action, 'AnimationEnd', function () {
                that.$action.classList.remove('fadeInUp')
                that.$action.classList.add('flash')
            })

            // 开始游戏
            that.$start.addEventListener('click', function () {
                new Scene2()
                that.destroy()
            })
        },

        destroy: function () {
            this.$container.remove()
        }
    }

    return Class
})