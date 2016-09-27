define(['tools'], function (tools) {
    var Class = function () {
        var that      = this
        that.defaults = {
            time: 3000
        }

        return function (options, cb) {
            that.render(options, cb)
        }
    }

    Class.prototype = {
        construct: Class,

        render: function (options, cb) {
            var that = this

            options = Object.assign(that.defaults, options)

            var div = document.createElement('div')

            div.classList.add('toast-container')
            div.classList.add('fadeInRight')
            div.classList.add('animated')
            div.classList.add(options.className)
            div.innerHTML = options.content
            document.body.appendChild(div)

            setTimeout(function () {
                div.classList.remove('fadeInRight')
                div.classList.add('fadeOutRight')
                tools.animationEvent(div, 'AnimationEnd', function () {
                    div.remove()
                })
                cb && cb()
            }, options.time)
        }
    }

    return new Class()
})